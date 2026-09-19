import { Module } from '@nestjs/common';
import { ConcordiumModule } from '../concordium/concordium.module.js';
import { TokenDistributionController } from './token-distribution.controller.js';
import { TokenDistributionService } from './token-distribution.service.js';
import { ProcessTrackingService } from './process-tracking.service.js';
import { VerifierService } from './verifier.service.js';

@Module({
    imports: [ConcordiumModule],
    controllers: [TokenDistributionController],
    providers: [TokenDistributionService, ProcessTrackingService, VerifierService],
    exports: [TokenDistributionService],
})
export class TokenDistributionModule {}
