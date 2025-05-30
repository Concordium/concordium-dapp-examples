import { Module } from '@nestjs/common'
import { ConcordiumService } from './concordium.service.js'

@Module({
  providers: [ConcordiumService],
  exports: [ConcordiumService],
})
export class ConcordiumModule {}