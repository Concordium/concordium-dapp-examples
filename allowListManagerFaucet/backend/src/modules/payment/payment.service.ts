import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConcordiumService } from '../concordium/concordium.service.js'
import { TransferTokensDto } from './dto/transfer-tokens.dto.js'
import { TokenId, TokenAmount, V1, CborMemo } from '@concordium/web-sdk/plt';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name)

  constructor(
    private readonly concordiumService: ConcordiumService,
    private readonly configService: ConfigService,
  ) {}

  async transferTokens(dto: TransferTokensDto): Promise<string> {
    try {
      const client = this.concordiumService.getClient()
      const recipientAddress = this.concordiumService.parseAccountAddress(dto.to)
      
      // Load governance wallet directly 
      const { sender, signer } = this.concordiumService.loadGovernanceWallet()

      // Parse token ID and amount using PLT SDK 
      const tokenId = TokenId.fromString(dto.tokenId)
      const amount = TokenAmount.fromDecimal(dto.amount)

      this.logger.log(`Transferring ${amount.toString()} tokens of ${tokenId.toString()} to ${dto.to}`)

      // Create token instance using PLT SDK 
      const token = await V1.Token.fromId(client, tokenId)

      // Create transfer object 
      const transfer: V1.TokenTransfer = {
        recipient: recipientAddress,
        amount,
        memo: dto.memo ? CborMemo.fromString(dto.memo) : undefined
      }

      // Execute the transfer using PLT SDK 
      const transaction = await V1.Token.transfer(token, sender, transfer, signer)
      
      this.logger.log(`Transfer transaction submitted with hash: ${transaction.toString()}`)

      // Wait for finalization 
      const result = await this.concordiumService.waitForTransactionFinalization(transaction)
      
      this.logger.log(`Successfully transferred ${dto.amount} tokens. TX finalized:`, result)
      return transaction.toString()
    } catch (error) {
      this.logger.error(`Failed to transfer tokens: ${error.message}`)
      throw new Error(`Failed to transfer tokens: ${error.message}`)
    }
  }
}