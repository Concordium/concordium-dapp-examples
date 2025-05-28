import { Module } from '@nestjs/common'
import { ConcordiumModule } from '../concordium/concordium.module.js'
import { PaymentService } from './payment.service.js'
import { PaymentController } from './payment.controller.js'

@Module({
  imports: [ConcordiumModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
