import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { credentials } from '@grpc/grpc-js'
import {
  AccountAddress,
  parseWallet,
  buildAccountSigner,
  AccountSigner,
  TransactionHash,
} from '@concordium/web-sdk'
import { readFileSync } from 'node:fs'
import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs'

@Injectable()
export class ConcordiumService implements OnModuleInit {
  private readonly logger = new Logger(ConcordiumService.name)
  private client: ConcordiumGRPCNodeClient
  private sponsorWallet: { sender: AccountAddress.Type; signer: AccountSigner } | null = null

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.initializeClient()
    this.loadSponsorWallet()
  }

  private initializeClient() {
    const grpcHost = this.configService.get('CONCORDIUM_GRPC_HOST', 'localhost')
    const grpcPort = this.configService.get('CONCORDIUM_GRPC_PORT', '20000')
    const useSSL = this.configService.get('CONCORDIUM_USE_SSL', 'true') === 'true'

    this.client = new ConcordiumGRPCNodeClient(
      grpcHost,
      Number(grpcPort),
      useSSL ? credentials.createSsl() : credentials.createInsecure()
    )

    this.logger.log(`Concordium client initialized: ${grpcHost}:${grpcPort} (SSL: ${useSSL})`)
  }

  private loadSponsorWallet() {
    try {
      const walletPath = this.configService.get('SPONSOR_WALLET_PATH', './wallet/sponsor.export')

      this.logger.log(`Loading sponsor wallet from: ${walletPath}`)

      const walletFile = readFileSync(walletPath, 'utf8')
      const walletExport = parseWallet(walletFile)
      const sender = AccountAddress.fromBase58(walletExport.value.address)
      const signer = buildAccountSigner(walletExport)

      this.sponsorWallet = { sender, signer }

      this.logger.log(`Sponsor wallet loaded successfully. Address: ${sender.toString()}`)
    } catch (error) {
      this.logger.error(`Failed to load sponsor wallet: ${error.message}`)
      throw new Error(`Sponsor wallet initialization failed: ${error.message}`)
    }
  }

  getClient(): ConcordiumGRPCNodeClient {
    return this.client
  }

  getSponsorSigner(): AccountSigner {
    if (!this.sponsorWallet) {
      throw new Error('Sponsor wallet not initialized')
    }
    return this.sponsorWallet.signer
  }

  getSponsorAccount(): AccountAddress.Type {
    if (!this.sponsorWallet) {
      throw new Error('Sponsor wallet not initialized')
    }
    return this.sponsorWallet.sender
  }

  async waitForTransactionFinalization(
    txHash: TransactionHash.Type,
    timeoutMs: number = 10000
  ): Promise<any> {
    this.logger.log(`Waiting for transaction finalization: ${txHash.toString()}`)

    try {
      const result = await this.client.waitForTransactionFinalization(txHash, timeoutMs)
      this.logger.log(`Transaction finalized: ${txHash.toString()}`)
      return result
    } catch (error) {
      this.logger.error(`Transaction finalization failed: ${error.message}`)
      throw new Error(`Transaction did not finalize within ${timeoutMs}ms: ${txHash.toString()}`)
    }
  }

  parseAccountAddress(address: string): AccountAddress.Type {
    return AccountAddress.fromBase58(address)
  }
}
