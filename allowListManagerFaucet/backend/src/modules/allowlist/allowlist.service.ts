import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConcordiumService } from '../concordium/concordium.service.js'
import { MintService } from '../mint/mint.service.js'
import { PaymentService } from '../payment/payment.service.js'
import { ProcessTrackingService } from './process-tracking.service.js'
import { TokenId, V1 } from '@concordium/web-sdk/plt'
import { v4 as uuidv4 } from 'uuid'
import { AddToAllowListDto } from './dto/add-to-allow-list.dto.js'

@Injectable()
export class AllowListService {
  private readonly logger = new Logger(AllowListService.name)
  private readonly defaultTokenId: string

  constructor(
    private readonly concordiumService: ConcordiumService,
    private readonly mintService: MintService,
    private readonly paymentService: PaymentService,
    private readonly processTrackingService: ProcessTrackingService,
    private readonly configService: ConfigService,
  ) {
    this.defaultTokenId = this.configService.get('DEFAULT_TOKEN_ID', 'DragosToken')
    this.logger.log(`Initialized with default token: ${this.defaultTokenId}`)
  }

  async startAllowListProcess(dto: AddToAllowListDto): Promise<string> {
    const processId = uuidv4()
    const tokenId = dto.tokenId || this.defaultTokenId

    this.logger.log(`Starting allowlist process ${processId} for user ${dto.userAccount}`)

    // Initialize process tracking with new order: Allow List -> Mint -> Transfer
    this.processTrackingService.initializeProcess(processId, [
      { step: 'Add to Allow List', status: 'pending', progress: 0 },
      { step: 'Mint Tokens', status: 'pending', progress: 33 },
      { step: 'Transfer Tokens', status: 'pending', progress: 67 },
    ])

    // Start async process
    this.executeAllowListProcess(processId, dto, tokenId).catch(error => {
      this.logger.error(`Process ${processId} failed: ${error.message}`)
      this.processTrackingService.markProcessFailed(processId, error.message)
    })

    return processId
  }

  private async executeAllowListProcess(processId: string, dto: AddToAllowListDto, tokenId: string) {
    try {
      const defaultMintAmount = this.configService.get('DEFAULT_MINT_AMOUNT', '10')

      // Step 1: Add to allow list FIRST
      this.processTrackingService.updateStep(processId, 0, 'processing')
      const allowListTxHash = await this.addUserToAllowList(dto.userAccount, tokenId)
      this.processTrackingService.updateStep(processId, 0, 'completed', allowListTxHash)

      // Step 2: Mint tokens AFTER user is on allow list
      this.processTrackingService.updateStep(processId, 1, 'processing')
      const mintTxHash = await this.mintService.mintTokens({
        tokenId,
        amount: parseInt(defaultMintAmount),
      })
      this.processTrackingService.updateStep(processId, 1, 'completed', mintTxHash)

      // Step 3: Transfer tokens to user
      this.processTrackingService.updateStep(processId, 2, 'processing')
      const transferTxHash = await this.paymentService.transferTokens({
        tokenId,
        to: dto.userAccount,
        amount: parseInt(defaultMintAmount),
      })
      this.processTrackingService.updateStep(processId, 2, 'completed', transferTxHash)

      // Mark process as completed
      this.processTrackingService.markProcessCompleted(processId, {
        allowListTransactionHash: allowListTxHash,
        mintTransactionHash: mintTxHash,
        transferTransactionHash: transferTxHash,
        tokensTransferred: parseInt(defaultMintAmount),
      })

      this.logger.log(`Process ${processId} completed successfully`)
    } catch (error) {
      this.logger.error(`Process ${processId} failed: ${error.message}`)
      throw error
    }
  }

  async addUserToAllowList(userAccount: string, tokenId: string): Promise<string> {
    try {
      const userAddress = this.concordiumService.parseAccountAddress(userAccount)
      const client = this.concordiumService.getClient()
      
      // Load governance wallet directly (like your examples)
      const { sender, signer } = this.concordiumService.loadGovernanceWallet()

      this.logger.log(`Adding ${userAccount} to allowlist for token ${tokenId}`)

      // Create token instance using PLT SDK (exactly like your examples)
      const token = await V1.Token.fromId(client, TokenId.fromString(tokenId))

      // Execute the add to allow list operation using PLT SDK (exactly like your examples)
      const transaction = await V1.Governance.addAllowList(token, sender, userAddress, signer)
      
      this.logger.log(`Add to allowlist transaction submitted with hash: ${transaction.toString()}`)

      // Wait for finalization (like your examples)
      await this.concordiumService.waitForTransactionFinalization(transaction)

      this.logger.log(`Successfully added ${userAccount} to allowlist. TX: ${transaction.toString()}`)
      return transaction.toString()
    } catch (error) {
      this.logger.error(`Failed to add user to allowlist: ${error.message}`)
      throw new Error(`Failed to add user to allowlist: ${error.message}`)
    }
  }

  async isUserOnAllowList(userAccount: string, tokenId?: string): Promise<boolean> {
    try {
      const userAddress = this.concordiumService.parseAccountAddress(userAccount)
      const checkTokenId = tokenId || this.defaultTokenId
      const client = this.concordiumService.getClient()

      this.logger.log(`Checking allowlist status for ${userAccount} on token ${checkTokenId}`)

      // Get account information including PLT token balances and list memberships
      const accountInfo = await client.getAccountInfo(userAddress)
      
      const tokenAccountInfo = accountInfo.accountTokens;
      
      // Debug: Log all tokens in the account (properly handle TokenAmount and TokenId)
      this.logger.log(`All tokens in account ${userAccount}:`)
      tokenAccountInfo.forEach(balance =>
        this.logger.log(`Token ${balance.id.symbol}, allowList=${balance.state.memberAllowList}, denyList=${balance.state.memberDenyList}`)
      );
      
      // Find the specific token in the account's token list
      // Use balance.id.symbol for comparison
      const tokenInfo = tokenAccountInfo.find(balance => 
        balance.id.symbol === checkTokenId
      )

      if (!tokenInfo) {
        this.logger.log(`Token ${checkTokenId} not found in account ${userAccount} - user not on allow list`)
        this.logger.log(`Available tokens: ${tokenAccountInfo.map(t => t.id.symbol).join(', ')}`)
        return false
      }

      // Check if user is on the allow list for this token
      const isOnAllowList = tokenInfo.state.memberAllowList === true
      
      this.logger.log(`User ${userAccount} allow list status for token ${checkTokenId}: ${isOnAllowList}`)
      this.logger.log(`Token state: allowList=${tokenInfo.state.memberAllowList}, denyList=${tokenInfo.state.memberDenyList}`)
      
      return isOnAllowList
    } catch (error) {
      this.logger.error(`Failed to check allowlist status: ${error.message}`)
      return false
    }
  }
}