import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AllowListModule } from './modules/allowlist/allowlist.module.js';
import { MintModule } from './modules/mint/mint.module.js';
import { PaymentModule } from './modules/payment/payment.module.js';
import { ConcordiumModule } from './modules/concordium/concordium.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConcordiumModule,
    AllowListModule,
    MintModule,
    PaymentModule,
  ],
})
export class AppModule {}