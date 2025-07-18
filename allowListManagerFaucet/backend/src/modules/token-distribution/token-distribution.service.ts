import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
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

@Injectable()
export class TokenDistributionService {
  private readonly logger = new Logger(TokenDistributionService.name)
  private readonly defaultTokenId: string
  private readonly defaultMintAmount: number

  constructor(
    private readonly concordiumService: ConcordiumService,
    private readonly processTrackingService: ProcessTrackingService,
    private readonly configService: ConfigService,
  ) {
    this.defaultTokenId = this.configService.get('DEFAULT_TOKEN_ID', 'PabloToken2')
    this.defaultMintAmount = parseInt(this.configService.get('DEFAULT_MINT_AMOUNT', '100'))
    this.logger.log(`Initialized with default token: ${this.defaultTokenId}, amount: ${this.defaultMintAmount}`)
  }

  /**
   * Starts the token distribution process for a verified user
   * Executes all operations in a single atomic transaction
   */
  async startTokenDistribution(dto: AddToAllowListDto): Promise<string> {
    const processId = uuidv4()
    const tokenId = dto.tokenId || this.defaultTokenId

    this.logger.log(`Starting token distribution process ${processId} for user ${dto.userAccount}`)

    // Initialize process tracking with single step
    this.processTrackingService.initializeProcess(processId, [
      { step: 'Execute Token Distribution', status: 'pending', progress: 0 },
    ])

    // Start async process
    this.executeTokenDistribution(processId, dto, tokenId).catch(error => {
      this.logger.error(`Process ${processId} failed: ${error.message}`)
      this.processTrackingService.markProcessFailed(processId, error.message)
    })

    return processId
  }

  private async executeTokenDistribution(processId: string, dto: AddToAllowListDto, tokenIdStr: string) {
    try {
      // Update status to processing
      this.processTrackingService.updateStep(processId, 0, 'processing')

      // Execute the combined transaction
      const txHash = await this.executeCombinedTokenOperation(
        dto.userAccount,
        tokenIdStr,
        this.defaultMintAmount
      )

      // Update status to completed
      this.processTrackingService.updateStep(processId, 0, 'completed', txHash)

      // Mark process as completed
      this.processTrackingService.markProcessCompleted(processId, {
        transactionHash: txHash,
        operations: ['addToAllowList', 'mint', 'transfer'],
        tokensTransferred: this.defaultMintAmount,
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
    amount: number
  ): Promise<string> {
    try {
      const client = this.concordiumService.getClient()
      const userAddress = this.concordiumService.parseAccountAddress(userAccount)
      const { sender, signer } = this.concordiumService.loadGovernanceWallet()

      this.logger.log(`Executing combined operation for ${userAccount} on token ${tokenIdStr}`)

      // Create token instance and prepare parameters
      const tokenId = TokenId.fromString(tokenIdStr)
      const token = await Token.fromId(client, tokenId)
      const tokenAmount = TokenAmount.fromDecimal(amount, token.info.state.decimals)
      const targetHolder = TokenHolder.fromAccountAddress(userAddress)

      // Execute all operations in a single transaction
      this.logger.log(`Sending combined transaction: add to allowlist + mint ${amount} + transfer to ${userAccount}`)

      const combinedTx = await Token.sendOperations(
        token,
        sender,
        [
          { addAllowList: { target: targetHolder } },
          { mint: { amount: tokenAmount } },
          {
            transfer: {
              recipient: targetHolder,
              amount: tokenAmount,
              memo: CborMemo.fromString(`Faucet distribution to ${userAccount}`)
            }
          }
        ],
        signer
      )

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
            if (e.tag !== TransactionEventTag.TokenModuleEvent) {
              throw new Error('Unexpected event type: ' + e.tag);
            }
            // Log the event without trying to decode with a specific type
            this.logger.log(`  - Event: ${JSON.stringify(e)}`);
            // Optionally, try to decode the details generically
            try {
              const decodedDetails = Cbor.decode(e.details);
              this.logger.log(`    Decoded details: ${JSON.stringify(decodedDetails)}`);
            } catch (decodeError) {
              this.logger.log(`    Could not decode event details: ${decodeError.message}`);
            }
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
      const checkTokenId = tokenId || this.defaultTokenId
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
   * Gets token balance for a user
   */
  async getTokenBalance(tokenId: string, accountAddress: string): Promise<string> {
    try {
      const userAddress = this.concordiumService.parseAccountAddress(accountAddress)
      const client = this.concordiumService.getClient()

      this.logger.log(`Getting balance for ${accountAddress} on token ${tokenId}`)

      const accountInfo = await client.getAccountInfo(userAddress)
      const tokenAccountInfo = accountInfo.accountTokens

      const tokenInfo = tokenAccountInfo.find(balance => balance.id.value === tokenId)

      if (!tokenInfo) {
        this.logger.log(`Token ${tokenId} not found in account ${accountAddress} - balance is 0`)
        return "0"
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