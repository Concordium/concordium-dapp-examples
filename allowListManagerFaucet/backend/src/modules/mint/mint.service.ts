import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConcordiumService } from '../concordium/concordium.service.js'
import { MintTokensDto } from './dto/mint-tokens.dto.js'
import { TokenId, TokenAmount, V1 } from '@concordium/web-sdk/plt';

@Injectable()
export class MintService {
  private readonly logger = new Logger(MintService.name)

  constructor(
    private readonly concordiumService: ConcordiumService,
    private readonly configService: ConfigService,
  ) {}

  async mintTokens(dto: MintTokensDto): Promise<string> {
    try {
      const client = this.concordiumService.getClient()
      
      // Load governance wallet directly (like your examples)
      const { sender, signer } = this.concordiumService.loadGovernanceWallet()

      // Parse token ID and amount using PLT SDK
      const tokenId = TokenId.fromString(dto.tokenId)
      const tokenAmount = TokenAmount.fromDecimal(dto.amount)

      this.logger.log(`Minting ${tokenAmount.toString()} tokens of ${tokenId.toString()} to governance account`)

      // Create token instance using PLT SDK (exactly like your examples)
      const token = await V1.Token.fromId(client, tokenId)

      // Execute the mint operation using PLT SDK (exactly like your examples)
      const transaction = await V1.Governance.mint(token, sender, tokenAmount, signer)
      
      this.logger.log(`Mint transaction submitted with hash: ${transaction.toString()}`)

      // Wait for finalization (like your examples)
      const result = await this.concordiumService.waitForTransactionFinalization(transaction)
      
      this.logger.log(`Successfully minted ${dto.amount} tokens. TX finalized:`, result)
      return transaction.toString()
    } catch (error) {
      this.logger.error(`Failed to mint tokens: ${error.message}`)
      throw new Error(`Failed to mint tokens: ${error.message}`)
    }
  }

  async getTokenBalance(tokenId: string, accountAddress: string): Promise<string> {
    try {
      const userAddress = this.concordiumService.parseAccountAddress(accountAddress)
      const client = this.concordiumService.getClient()

      this.logger.log(`Getting balance for ${accountAddress} on token ${tokenId}`)

      // Get account information including PLT token balances
      const accountInfo = await client.getAccountInfo(userAddress)
      
      const tokenAccountInfo = accountInfo.accountTokens;
      // Debug: Log all tokens in the account (like your example)
      this.logger.log(`All tokens in account ${accountAddress}:`)
      tokenAccountInfo.forEach(balance =>
        this.logger.log(`Token ${balance.id}, balance ${balance.state.balance}`)
      );

      // Find the specific token in the account's token list
      // Use balance.id.symbol for comparison
      const tokenInfo = tokenAccountInfo.find(balance => 
        balance.id.symbol === tokenId
      )
      
      if (!tokenInfo) {
        this.logger.log(`Token ${tokenId} not found in account ${accountAddress} - balance is 0`)
        this.logger.log(`Available tokens: ${tokenAccountInfo.map(t => t.id.symbol).join(', ')}`)
        return "0"
      }

      // Get the token balance - properly convert TokenAmount to string
      const balance = tokenInfo.state.balance.toString()
      
      this.logger.log(`Account ${accountAddress} has balance ${balance} for token ${tokenId}`)
      
      return balance
    } catch (error) {
      this.logger.error(`Failed to get token balance: ${error.message}`)
      return "0"
    }
  }
}