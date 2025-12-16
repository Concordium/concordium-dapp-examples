import { Injectable, Logger } from '@nestjs/common'
import { ConcordiumService } from '../concordium/concordium.service.js'
import {
  AccountAddress,
  TransactionExpiry,
  TokenId,
  TokenOperationType,
  TokenAmount,
  CborMemo,
  Cbor,
  CborAccountAddress,
} from '@concordium/web-sdk'
import { Transaction } from '@concordium/web-sdk/transactions'

@Injectable()
export class SponsorService {
  private readonly logger = new Logger(SponsorService.name)

  constructor(private concordiumService: ConcordiumService) {}

  async sponsorTransaction(
    sender: string,
    recipient: string,
    amount: string,
    tokenId: string,
    decimals: number
  ): Promise<any> {
    this.logger.log(`Sponsoring transfer: ${sender} -> ${recipient}, amount: ${amount}`)

    try {
      const tokenAmount = TokenAmount.fromDecimal(parseFloat(amount), decimals)

      const ops = [
        {
          [TokenOperationType.Transfer]: {
            amount: tokenAmount,
            recipient: CborAccountAddress.fromAccountAddress(AccountAddress.fromBase58(recipient)),
            memo: CborMemo.fromString('Sponsored transfer'),
          },
        },
      ]

      const transaction = Transaction.tokenUpdate({
        tokenId: TokenId.fromString(tokenId),
        operations: Cbor.encode(ops),
      })

      const builder = Transaction.builderFromJSON(Transaction.toJSON(transaction))
      const grpcClient = this.concordiumService.getClient()
      const senderAddress = AccountAddress.fromBase58(sender)
      const nonce = await grpcClient.getNextAccountNonce(senderAddress)

      const sponsorable = builder
        .addMetadata({
          sender: senderAddress,
          nonce: nonce.nonce,
          expiry: TransactionExpiry.futureMinutes(5),
        })
        .addSponsor(this.concordiumService.getSponsorAccount())
        .build()

      const sponsored = await Transaction.sponsor(sponsorable, this.concordiumService.getSponsorSigner())
      const sponsoredJSON = Transaction.toJSON(sponsored)

      this.logger.log('Transaction sponsored')

      // BigInt values need to be converted for HTTP transport. Small values become
      // numbers, large values become strings to avoid precision loss.
      const serialized = JSON.parse(
        JSON.stringify(sponsoredJSON, (_, value) => {
          if (typeof value === 'bigint') {
            if (value <= Number.MAX_SAFE_INTEGER && value >= Number.MIN_SAFE_INTEGER) {
              return Number(value)
            }
            return value.toString()
          }
          return value
        })
      )

      return serialized
    } catch (error) {
      this.logger.error(`Failed to sponsor transaction: ${error.message}`)
      throw new Error(`Failed to sponsor transaction: ${error.message}`)
    }
  }
}
