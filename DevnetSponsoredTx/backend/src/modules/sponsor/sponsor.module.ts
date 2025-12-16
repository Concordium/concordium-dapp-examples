import { Module } from '@nestjs/common'
import { SponsorController } from './sponsor.controller.js'
import { SponsorService } from './sponsor.service.js'
import { ConcordiumModule } from '../concordium/concordium.module.js'

@Module({
  imports: [ConcordiumModule],
  controllers: [SponsorController],
  providers: [SponsorService],
})
export class SponsorModule {}
