import { Module } from '@nestjs/common'
import { ConcordiumModule } from '../concordium/concordium.module.js'
import { MintService } from './mint.service.js'
import { MintController } from './mint.controller.js'

@Module({
  imports: [ConcordiumModule],
  controllers: [MintController],
  providers: [MintService],
  exports: [MintService],
})
export class MintModule {}