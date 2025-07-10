import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConcordiumModule } from './modules/concordium/concordium.module.js';
import { AppController } from './app.controller.js';
import { TokenDistributionModule } from './modules/token-distribution/token-distribution.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConcordiumModule,
    TokenDistributionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}