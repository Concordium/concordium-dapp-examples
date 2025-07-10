import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  HttpStatus, 
  HttpException,
  Logger 
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { TokenDistributionService } from './token-distribution.service.js'
import { ProcessTrackingService } from './process-tracking.service.js'
import { AddToAllowListDto } from './dto/add-to-allow-list.dto.js'
import { ProcessStatusDto } from './dto/process-status.dto.js'

@ApiTags('token-distribution')
@Controller('token-distribution')
export class TokenDistributionController {
  private readonly logger = new Logger(TokenDistributionController.name)

  constructor(
    private readonly tokenDistributionService: TokenDistributionService,
    private readonly processTrackingService: ProcessTrackingService,
  ) {}

  @Post('distribute')
  @ApiOperation({ 
    summary: 'Start token distribution process', 
    description: 'Adds user to allowlist, mints tokens, and transfers them in a single atomic transaction' 
  })
  @ApiResponse({ status: 201, description: 'Process started successfully', type: ProcessStatusDto })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async distributeTokens(@Body() dto: AddToAllowListDto): Promise<ProcessStatusDto> {
    try {
      this.logger.log(`Starting token distribution for user: ${dto.userAccount}`)
      
      // Start the async process (proof already verified in frontend)
      const processId = await this.tokenDistributionService.startTokenDistribution(dto)
      
      // Return initial status
      return this.processTrackingService.getProcessStatus(processId)
    } catch (error) {
      this.logger.error(`Failed to start token distribution: ${error.message}`)
      throw new HttpException(
        `Failed to start token distribution: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get('status/:processId')
  @ApiOperation({ summary: 'Get status of token distribution process' })
  @ApiResponse({ status: 200, description: 'Process status retrieved', type: ProcessStatusDto })
  @ApiResponse({ status: 404, description: 'Process not found' })
  async getProcessStatus(@Param('processId') processId: string): Promise<ProcessStatusDto> {
    try {
      return this.processTrackingService.getProcessStatus(processId)
    } catch (error) {
      this.logger.error(`Failed to get process status: ${error.message}`)
      throw new HttpException('Process not found', HttpStatus.NOT_FOUND)
    }
  }

  @Get('allowlist/:userAccount/:tokenId?')
  @ApiOperation({ summary: 'Check if user is on token allowlist' })
  @ApiResponse({ status: 200, description: 'User allowlist status' })
  async checkAllowListStatus(
    @Param('userAccount') userAccount: string,
    @Param('tokenId') tokenId?: string
  ) {
    try {
      const isOnAllowList = await this.tokenDistributionService.isUserOnAllowList(userAccount, tokenId)
      return {
        userAccount,
        tokenId: tokenId || 'default',
        isOnAllowList,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      this.logger.error(`Failed to check allowlist status: ${error.message}`)
      throw new HttpException(
        'Failed to check allowlist status',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get('balance/:tokenId/:accountAddress')
  @ApiOperation({ summary: 'Get token balance for account' })
  @ApiResponse({ status: 200, description: 'Token balance retrieved' })
  async getTokenBalance(
    @Param('tokenId') tokenId: string,
    @Param('accountAddress') accountAddress: string,
  ) {
    try {
      const balance = await this.tokenDistributionService.getTokenBalance(tokenId, accountAddress)
      return {
        tokenId,
        accountAddress,
        balance,
      }
    } catch (error) {
      this.logger.error(`Failed to get token balance: ${error.message}`)
      throw new HttpException(
        'Failed to get token balance',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}