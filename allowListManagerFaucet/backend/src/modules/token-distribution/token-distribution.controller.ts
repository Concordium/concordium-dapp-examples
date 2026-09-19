import { Controller, Post, Body, Get, Param, HttpStatus, HttpException, Logger, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TokenDistributionService } from './token-distribution.service.js';
import { ProcessTrackingService } from './process-tracking.service.js';
import { AddToAllowListDto } from './dto/add-to-allow-list.dto.js';
import { ChallengeRequestDto } from './dto/challenge-request.dto.js';
import { ProcessStatusDto } from './dto/process-status.dto.js';
import { VerifierService, VerificationError } from './verifier.service.js';

@ApiTags('token-distribution')
@Controller('token-distribution')
export class TokenDistributionController {
    private readonly logger = new Logger(TokenDistributionController.name);

    constructor(
        private readonly tokenDistributionService: TokenDistributionService,
        private readonly processTrackingService: ProcessTrackingService,
        private readonly verifierService: VerifierService,
    ) {}

    @Get('tokens')
    @ApiOperation({ summary: 'List configured PLT tokens available for distribution' })
    @ApiResponse({ status: 200, description: 'Array of configured tokens with their mint amounts' })
    getConfiguredTokens() {
        return this.tokenDistributionService.getConfiguredTokens();
    }

    @Post('distribute')
    @ApiOperation({
        summary: 'Start token distribution process',
        description: 'Adds user to allowlist, mints tokens, and transfers them in a single atomic transaction. Requires server-side verified presentation for tokens with proof config.',
    })
    @ApiResponse({ status: 201, description: 'Process started successfully', type: ProcessStatusDto })
    @ApiResponse({ status: 400, description: 'Invalid request data or verification failed' })
    @ApiResponse({ status: 409, description: 'Distribution already in progress' })
    @ApiResponse({ status: 429, description: 'Rate limit exceeded' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async distributeTokens(@Body() dto: AddToAllowListDto, @Req() req: Request): Promise<ProcessStatusDto> {
        const ip = req.ip ?? req.socket?.remoteAddress;
        try {
            this.logger.log(`Starting token distribution for user: ${dto.userAccount} from IP: ${ip}`);

            const processId = await this.tokenDistributionService.startTokenDistribution(dto, ip);

            // Return initial status
            return this.processTrackingService.getProcessStatus(processId);
        } catch (error) {
            if (error instanceof VerificationError) {
                this.logger.warn(`Verification failed: ${error.message}`);
                throw new HttpException(error.message, error.statusCode);
            }
            this.logger.error(`Failed to start token distribution: ${error.message}`);
            throw new HttpException(
                `Failed to start token distribution: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('challenge')
    @ApiOperation({
        summary: 'Get a verification challenge for a user account',
        description: 'Returns a single-use, time-limited challenge hex string. Must be used with requestVerifiablePresentation in the wallet before calling /distribute.',
    })
    @ApiResponse({ status: 200, description: 'Challenge issued', schema: { properties: { challenge: { type: 'string' } } } })
    @ApiResponse({ status: 429, description: 'Rate limit exceeded' })
    async issueChallenge(@Body() dto: ChallengeRequestDto, @Req() req: Request): Promise<{ challenge: string }> {
        const ip = req.ip ?? req.socket?.remoteAddress;
        this.tokenDistributionService.checkRateLimit(ip);
        const challenge = this.verifierService.issueChallenge(dto.userAccount);
        return { challenge };
    }

    @Get('status/:processId')
    @ApiOperation({ summary: 'Get status of token distribution process' })
    @ApiResponse({ status: 200, description: 'Process status retrieved', type: ProcessStatusDto })
    @ApiResponse({ status: 404, description: 'Process not found' })
    async getProcessStatus(@Param('processId') processId: string): Promise<ProcessStatusDto> {
        try {
            return this.processTrackingService.getProcessStatus(processId);
        } catch (error) {
            this.logger.error(`Failed to get process status: ${error.message}`);
            throw new HttpException('Process not found', HttpStatus.NOT_FOUND);
        }
    }

    @Get('allowlist/:userAccount/:tokenId?')
    @ApiOperation({ summary: 'Check if user is on token allowlist' })
    @ApiResponse({ status: 200, description: 'User allowlist status' })
    async checkAllowListStatus(@Param('userAccount') userAccount: string, @Param('tokenId') tokenId?: string) {
        try {
            const isOnAllowList = await this.tokenDistributionService.isUserOnAllowList(userAccount, tokenId);
            return {
                userAccount,
                tokenId: tokenId || 'default',
                isOnAllowList,
                timestamp: new Date().toISOString(),
            };
        } catch (error) {
            this.logger.error(`Failed to check allowlist status: ${error.message}`);
            throw new HttpException('Failed to check allowlist status', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('balance/:tokenId/:accountAddress')
    @ApiOperation({ summary: 'Get token balance for account' })
    @ApiResponse({ status: 200, description: 'Token balance retrieved' })
    async getTokenBalance(@Param('tokenId') tokenId: string, @Param('accountAddress') accountAddress: string) {
        try {
            const balance = await this.tokenDistributionService.getTokenBalance(tokenId, accountAddress);
            return {
                tokenId,
                accountAddress,
                balance,
            };
        } catch (error) {
            this.logger.error(`Failed to get token balance: ${error.message}`);
            throw new HttpException('Failed to get token balance', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
