import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { readFileSync } from 'node:fs'
import { ConcordiumService } from '../concordium/concordium.service.js'
import { ProcessTrackingService } from './process-tracking.service.js'
import { TokenId, TokenAmount, Token, TokenHolder, CborMemo, Cbor } from '@concordium/web-sdk/plt'
import { v4 as uuidv4 } from 'uuid'
import { AddToAllowListDto } from './dto/add-to-allow-list.dto.js'
import {
  TransactionSummaryType,
  TransactionKindString,
  RejectReasonTag,
  TransactionEventTag
} from '@concordium/web-sdk'

export interface ProofStatementConfig {
  type: 'AttributeInSet' | 'AttributeNotInSet' | 'AttributeInRange'
  attributeTag: string
  set?: string[]
  lower?: string
  upper?: string
}

export interface ProofConfig {
  description: string
  statements: ProofStatementConfig[]
  issuers: number[]
}

export interface TokenConfig {
  id: string
  amount: number
  hasAllowList: boolean
  proof?: ProofConfig
  iconUrl?: string
  description?: string
}

interface TokenConfigFileEntry {
  id: string
  amount?: number
  hasAllowList?: boolean
  proof?: ProofConfig
}

interface TokenConfigFile {
  tokens: TokenConfigFileEntry[]
}

@Injectable()
export class TokenDistributionService implements OnModuleInit {
  private readonly logger = new Logger(TokenDistributionService.name)
  private readonly tokenConfigs: TokenConfig[]

  constructor(
    private readonly concordiumService: ConcordiumService,
    private readonly processTrackingService: ProcessTrackingService,
    private readonly configService: ConfigService,
  ) {
    this.tokenConfigs = this.loadTokenConfigs()

    this.logger.log(`Initialized with token configs: ${JSON.stringify(this.tokenConfigs)}`)
  }

  async onModuleInit() {
    await this.enrichTokensWithIcons()
  }

  private async enrichTokensWithIcons() {
    const client = this.concordiumService.getClient()
    for (const tokenConfig of this.tokenConfigs) {
      try {
        const token = await Token.fromId(client, TokenId.fromString(tokenConfig.id))
        const metadataUrl = token.moduleState.metadata.url
        const response = await fetch(metadataUrl)
        if (response.ok) {
          const metadata = await response.json() as { thumbnail?: { url: string }; display?: { url: string }; description?: string }
          tokenConfig.iconUrl = metadata.thumbnail?.url ?? metadata.display?.url
          tokenConfig.description = metadata.description
          this.logger.log(`Loaded metadata for ${tokenConfig.id}: icon=${tokenConfig.iconUrl}, description=${tokenConfig.description}`)
        }
      } catch (error) {
        this.logger.warn(`Could not load icon for token ${tokenConfig.id}: ${error.message}`)
      }
    }
  }

  private loadTokenConfigs(): TokenConfig[] {
    const tokenConfigPath = this.configService.get<string>('TOKEN_CONFIG_PATH', '')

    if (tokenConfigPath) {
      try {
        const configFile = readFileSync(tokenConfigPath, 'utf8')
        const parsed = JSON.parse(configFile) as TokenConfigFile

        if (!Array.isArray(parsed.tokens) || parsed.tokens.length === 0) {
          throw new Error('token config file must have a non-empty "tokens" array')
        }

        return parsed.tokens.map((entry, index) => {
          if (!entry?.id) {
            throw new Error(`token config entry at index ${index} is missing id`)
          }

          return {
            id: entry.id,
            amount: typeof entry.amount === 'number' ? entry.amount : this.getDefaultMintAmount(),
            hasAllowList: entry.hasAllowList ?? true,
            proof: entry.proof,
          }
        })
      } catch (error) {
        this.logger.error(`Failed to load token config from ${tokenConfigPath}: ${error.message}`)
        throw new Error(`Token config initialization failed: ${error.message}`)
      }
    }

    return [
      {
        id: this.configService.get('DEFAULT_TOKEN_ID', 'TestLists'),
        amount: this.getDefaultMintAmount(),
        hasAllowList: true,
      },
    ]
  }

  private getDefaultMintAmount(): number {
    return parseInt(this.configService.get('DEFAULT_MINT_AMOUNT', '100'))
  }

  getConfiguredTokens(): TokenConfig[] {
    return this.tokenConfigs
  }

  /**
   * Starts the token distribution process for a verified user.
   * Resolves the token ID from the DTO (or first configured token) and its configured mint amount.
   */
  async startTokenDistribution(dto: AddToAllowListDto): Promise<string> {
    const processId = uuidv4()
    const tokenId = dto.tokenId || this.tokenConfigs[0].id
    const tokenConfig = this.tokenConfigs.find(c => c.id === tokenId) ?? this.tokenConfigs[0]

    // Eligible only if the account has no token entry at all (never held this token).
    // A null balance means no entry; any string value (including '0') means the account
    // has held the token before, even if the balance is now zero.
    const currentBalance = await this.getTokenBalance(tokenConfig.id, dto.userAccount)
    if (currentBalance !== null) {
      throw new Error(`Account ${dto.userAccount} has previously held token ${tokenConfig.id} and is not eligible for distribution`)
    }

    this.logger.log(`Starting token distribution process ${processId} for user ${dto.userAccount} on token ${tokenId} (allowList: ${tokenConfig.hasAllowList})`)

    this.processTrackingService.initializeProcess(processId, [
      { step: 'Execute Token Distribution', status: 'pending', progress: 0 },
    ])

    this.executeTokenDistribution(processId, dto, tokenConfig).catch(error => {
      this.logger.error(`Process ${processId} failed: ${error.message}`)
      this.processTrackingService.markProcessFailed(processId, error.message)
    })

    return processId
  }

  private async executeTokenDistribution(processId: string, dto: AddToAllowListDto, tokenConfig: TokenConfig) {
    try {
      this.processTrackingService.updateStep(processId, 0, 'processing')

      const txHash = await this.executeCombinedTokenOperation(
        dto.userAccount,
        tokenConfig.id,
        tokenConfig.amount,
        tokenConfig.hasAllowList,
      )

      this.processTrackingService.updateStep(processId, 0, 'completed', txHash)

      const operations = [
        ...(tokenConfig.hasAllowList ? ['addToAllowList'] : []),
        ...(tokenConfig.amount > 0 ? ['mint', 'transfer'] : []),
      ]
      this.processTrackingService.markProcessCompleted(processId, {
        transactionHash: txHash,
        operations,
        tokensTransferred: tokenConfig.amount,
      })

      this.logger.log(`Process ${processId} completed successfully with transaction: ${txHash}`)
    } catch (error) {
      this.logger.error(`Process ${processId} failed: ${error.message}`)
      this.processTrackingService.markProcessFailed(processId, error.message)
      throw error
    }
  }

  /**
   * Executes combined token operations in a single atomic transaction:
   * 1. Adds user to allowlist
   * 2. Mints new tokens
   * 3. Transfers tokens to user
   */
  private async executeCombinedTokenOperation(
    userAccount: string,
    tokenIdStr: string,
    amount: number,
    hasAllowList: boolean,
  ): Promise<string> {
    try {
      const client = this.concordiumService.getClient()
      const userAddress = this.concordiumService.parseAccountAddress(userAccount)
      const { sender, signer } = this.concordiumService.loadGovernanceWallet()

      this.logger.log(`Executing combined operation for ${userAccount} on token ${tokenIdStr} (allowList: ${hasAllowList})`)

      const tokenId = TokenId.fromString(tokenIdStr)
      const token = await Token.fromId(client, tokenId)
      const tokenAmount = TokenAmount.fromDecimal(amount, token.info.state.decimals)
      const targetHolder = TokenHolder.fromAccountAddress(userAddress)

      const ops = [
        ...(hasAllowList ? [{ addAllowList: { target: targetHolder } }] : []),
        ...(amount > 0 ? [
          { mint: { amount: tokenAmount } },
          {
            transfer: {
              recipient: targetHolder,
              amount: tokenAmount,
              memo: CborMemo.fromString(`Faucet distribution to ${userAccount}`)
            }
          }
        ] : []),
      ]

      this.logger.log(`Sending transaction: ${hasAllowList ? 'addAllowList + ' : ''}mint ${amount} + transfer to ${userAccount}`)

      const combinedTx = await Token.sendOperations(token, sender, ops, signer)

      this.logger.log(`Combined transaction submitted: ${combinedTx}`)

      // Wait for finalization
      const result = await client.waitForTransactionFinalization(combinedTx)

      // Validate transaction result
      if (result.summary.type !== TransactionSummaryType.AccountTransaction) {
        throw new Error('Unexpected transaction type: ' + result.summary.type)
      }

      switch (result.summary.transactionType) {
        case TransactionKindString.TokenUpdate:
          this.logger.log('Token operations successful. Events:')
          result.summary.events.forEach((e) => {
            // Simply log all events without trying to decode details
            this.logger.log(`  - Event (${e.tag}): ${JSON.stringify(e)}`);
          })
          break
        case TransactionKindString.Failed:
          if (result.summary.rejectReason.tag !== RejectReasonTag.TokenUpdateTransactionFailed) {
            throw new Error('Unexpected reject reason tag: ' + result.summary.rejectReason.tag)
          }
          const details = this.concordiumService.decodeCborError(result.summary.rejectReason.contents.details)
          throw new Error(`Transaction failed: ${JSON.stringify(details)}`)
        default:
          throw new Error('Unexpected transaction kind: ' + result.summary.transactionType)
      }

      this.logger.log(`Combined transaction successful: ${combinedTx}`)
      return combinedTx.toString()

    } catch (error) {
      this.logger.error(`Failed to execute combined operation: ${error.message}`)
      throw new Error(`Failed to execute token distribution: ${error.message}`)
    }
  }

  /**
   * Checks if a user is on the allowlist for a specific token
   */
  async isUserOnAllowList(userAccount: string, tokenId?: string): Promise<boolean> {
    try {
      const userAddress = this.concordiumService.parseAccountAddress(userAccount)
      const checkTokenId = tokenId || this.tokenConfigs[0].id
      const client = this.concordiumService.getClient()

      this.logger.log(`Checking allowlist status for ${userAccount} on token ${checkTokenId}`)

      // Get account information
      const accountInfo = await client.getAccountInfo(userAddress)
      const tokenAccountInfo = accountInfo.accountTokens

      this.logger.log(`All tokens in account ${userAccount}:`)
      tokenAccountInfo.forEach(balance =>
        this.logger.log(`Token ${balance.id.value}, raw state: ${JSON.stringify(balance.state)}`)
      )

      // Find the specific token
      const tokenInfo = tokenAccountInfo.find(balance => balance.id.value === checkTokenId)

      if (!tokenInfo) {
        this.logger.log(`Token ${checkTokenId} not found in account ${userAccount} - user not on allow list`)
        this.logger.log(`Available tokens: ${tokenAccountInfo.map(t => t.id.value).join(', ')}`)
        return false
      }

      // Check if memberAllowList property exists directly
      if ('memberAllowList' in tokenInfo.state) {
        const isOnAllowList = tokenInfo.state.memberAllowList === true
        this.logger.log(`User ${userAccount} allow list status for token ${checkTokenId}: ${isOnAllowList}`)
        return isOnAllowList
      }

      // If not, try decoding CBOR-encoded moduleState
      if (tokenInfo.state.moduleState) {
        try {
          const decodedState = Cbor.decode(tokenInfo.state.moduleState)
          this.logger.log(`Decoded state for token ${checkTokenId}: ${JSON.stringify(decodedState, null, 2)}`)

          if (typeof decodedState === 'object' && decodedState !== null && 'allowList' in decodedState) {
            const allowListValue = (decodedState as Record<string, unknown>).allowList
            const isOnAllowList = allowListValue === true
            this.logger.log(`User ${userAccount} allow list status for token ${checkTokenId}: ${isOnAllowList}`)
            return isOnAllowList
          }
        } catch (decodeError) {
          this.logger.error(`Failed to decode moduleState for token ${checkTokenId}: ${decodeError.message}`)
        }
      }

      this.logger.warn(`Could not determine allowlist status for user ${userAccount} on token ${checkTokenId}`)
      return false
    } catch (error) {
      this.logger.error(`Failed to check allowlist status: ${error.message}`)
      return false
    }
  }

  /**
   * Gets token balance for a user.
   * Returns null when the account has no entry for this token (never held it) — the caller
   * can use this to distinguish "never held" (eligible) from "held but spent" (ineligible).
   */
  async getTokenBalance(tokenId: string, accountAddress: string): Promise<string | null> {
    try {
      const userAddress = this.concordiumService.parseAccountAddress(accountAddress)
      const client = this.concordiumService.getClient()

      this.logger.log(`Getting balance for ${accountAddress} on token ${tokenId}`)

      const accountInfo = await client.getAccountInfo(userAddress)
      const tokenAccountInfo = accountInfo.accountTokens

      const tokenInfo = tokenAccountInfo.find(balance => balance.id.value === tokenId)

      if (!tokenInfo) {
        this.logger.log(`Token ${tokenId} not found in account ${accountAddress} - never held`)
        return null
      }

      const balance = tokenInfo.state.balance.toString()
      this.logger.log(`Account ${accountAddress} has balance ${balance} for token ${tokenId}`)

      return balance
    } catch (error) {
      this.logger.error(`Failed to get token balance: ${error.message}`)
      return "0"
    }
  }
}
