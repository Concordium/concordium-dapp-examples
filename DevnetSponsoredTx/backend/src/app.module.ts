import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConcordiumModule } from './modules/concordium/concordium.module.js'
import { SponsorModule } from './modules/sponsor/sponsor.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConcordiumModule,
    SponsorModule,
  ],
})
export class AppModule {}
