import { Injectable, Logger, BadRequestException, TooManyRequestsException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
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
  private readonly rateLimits = new Map<string, { count: number; windowStart: number }>()
  private readonly rateLimitMax: number
  private readonly rateLimitWindowMs: number
  private readonly maxAmountCcd: number
  private readonly inflight = new Set<string>()

  constructor(
    private readonly concordiumService: ConcordiumService,
    private readonly configService: ConfigService,
  ) {
    this.rateLimitMax = parseInt(this.configService.get('SPONSOR_RATE_LIMIT_MAX', '30'), 10)
    this.rateLimitWindowMs = parseInt(this.configService.get('SPONSOR_RATE_LIMIT_WINDOW_SECONDS', '3600'), 10) * 1000
    this.maxAmountCcd = parseFloat(this.configService.get('SPONSOR_MAX_AMOUNT_CCD', '1000'))
  }

  async sponsorTransaction(
    sender: string,
    recipient: string,
    amount: string,
    tokenId: string,
    decimals: number
  ): Promise<any> {
    this.validateInput(sender, recipient, amount, tokenId, decimals)
    this.checkRateLimit(sender)
    const inflightKey = `${sender}:${tokenId}:${amount}`
    if (this.inflight.has(inflightKey)) {
      throw new BadRequestException('Identical sponsorship request already in progress')
    }
    this.inflight.add(inflightKey)

    try {
      this.logger.log(`Sponsoring transfer: ${sender} -> ${recipient}, amount: ${amount} ${tokenId}`)

      const amountCcd = parseFloat(amount) / Math.pow(10, decimals)
      if (amountCcd > this.maxAmountCcd) {
        throw new BadRequestException(`Amount exceeds maximum allowed (${this.maxAmountCcd} CCD)`)
      }

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

      const builder = Transaction.tokenUpdate({
        tokenId: TokenId.fromString(tokenId),
        operations: Cbor.encode(ops),
      })
      
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
      throw error
    } finally {
      this.inflight.delete(inflightKey)
    }
  }

  private validateInput(
    sender: string,
    recipient: string,
    amount: string,
    tokenId: string,
    decimals: number,
  ): void {
    if (!sender || !recipient || !tokenId) {
      throw new BadRequestException('sender, recipient, and tokenId are required')
    }
    try {
      AccountAddress.fromBase58(sender)
      AccountAddress.fromBase58(recipient)
    } catch {
      throw new BadRequestException('Invalid sender or recipient address format')
    }
    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      throw new BadRequestException('Amount must be a positive number')
    }
    if (!Number.isInteger(decimals) || decimals < 0 || decimals > 18) {
      throw new BadRequestException('Invalid decimals value')
    }
  }

  private checkRateLimit(account: string): void {
    const now = Date.now()
    const entry = this.rateLimits.get(account)
    if (!entry || now - entry.windowStart > this.rateLimitWindowMs) {
      this.rateLimits.set(account, { count: 1, windowStart: now })
      return
    }
    if (entry.count >= this.rateLimitMax) {
      throw new TooManyRequestsException(`Rate limit exceeded for account ${account}. Try again later.`)
    }
    entry.count++
  }
}
