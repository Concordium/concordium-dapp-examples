import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ChannelCredentials, credentials } from '@grpc/grpc-js'
import { 
  AccountAddress,
  parseWallet,
  buildAccountSigner,
  AccountSigner,
  TransactionHash,
  TransactionStatusEnum 
} from '@concordium/web-sdk'
import { readFileSync } from 'node:fs'
import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';

@Injectable()
export class ConcordiumService implements OnModuleInit {
  private readonly logger = new Logger(ConcordiumService.name)
  private client: ConcordiumGRPCNodeClient

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.initializeClient()
  }

  private initializeClient() {
    const grpcHost = this.configService.get('CONCORDIUM_GRPC_HOST', 'localhost')
    const grpcPort = this.configService.get('CONCORDIUM_GRPC_PORT', '00000')
    const useSSL = this.configService.get('CONCORDIUM_USE_SSL', 'true') === 'true'

    this.client = new ConcordiumGRPCNodeClient(
      grpcHost,
      Number(grpcPort),
      useSSL ? credentials.createSsl() : credentials.createInsecure()
    )

    this.logger.log(`Concordium client initialized: ${grpcHost}:${grpcPort} (SSL: ${useSSL})`)
  }

  getClient(): ConcordiumGRPCNodeClient {
    return this.client
  }

  async waitForTransactionFinalization(
    txHash: TransactionHash.Type,
    timeoutMs: number = 30000
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

  // Load governance wallet directly from file 
  loadGovernanceWallet(): { sender: AccountAddress.Type; signer: AccountSigner } {
    try {
      const walletPath = this.configService.get('GOVERNANCE_WALLET_PATH', './wallet/wallet.export')
      
      this.logger.log(`Loading governance wallet from: ${walletPath}`)

      // Read wallet file directly 
      const walletFile = readFileSync(walletPath, 'utf8')
      const walletExport = parseWallet(walletFile)
      const sender = AccountAddress.fromBase58(walletExport.value.address)
      const signer = buildAccountSigner(walletExport)
      
      this.logger.log(`Governance wallet loaded successfully. Address: ${sender.toString()}`)
      
      return { sender, signer }
    } catch (error) {
      this.logger.error(`Failed to load governance wallet: ${error.message}`)
      throw new Error(`Governance wallet initialization failed: ${error.message}`)
    }
  }
}