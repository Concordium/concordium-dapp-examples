import { Module } from '@nestjs/common'
import { ConcordiumModule } from '../concordium/concordium.module.js'
import { MintModule } from '../mint/mint.module.js'
import { PaymentModule } from '../payment/payment.module.js'
import { AllowListController } from './allowlist.controller.js'
import { AllowListService } from './allowlist.service.js'
import { ProcessTrackingService } from './process-tracking.service.js'

@Module({
  imports: [ConcordiumModule, MintModule, PaymentModule],
  controllers: [AllowListController],
  providers: [AllowListService, ProcessTrackingService],
  exports: [AllowListService],
})
export class AllowListModule {}