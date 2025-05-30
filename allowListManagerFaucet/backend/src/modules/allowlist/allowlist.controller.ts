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
import { AllowListService } from './allowlist.service.js'
import { ProcessTrackingService } from './process-tracking.service.js'
import { AddToAllowListDto } from './dto/add-to-allow-list.dto.js'
import { ProcessStatusDto } from './dto/process-status.dto.js'

@ApiTags('allowlist')
@Controller('allowlist')
export class AllowListController {
  private readonly logger = new Logger(AllowListController.name)

  constructor(
    private readonly allowListService: AllowListService,
    private readonly processTrackingService: ProcessTrackingService,
  ) {}

  @Post('add-user')
  @ApiOperation({ summary: 'Add user to allowlist and mint tokens (proof already verified in frontend)' })
  @ApiResponse({ status: 201, description: 'Process started successfully', type: ProcessStatusDto })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async addUserToAllowList(@Body() addToAllowListDto: AddToAllowListDto): Promise<ProcessStatusDto> {
    try {
      this.logger.log(`Starting allowlist process for user: ${addToAllowListDto.userAccount}`)
      
      // Start the async process (proof already verified in frontend)
      const processId = await this.allowListService.startAllowListProcess(addToAllowListDto)
      
      // Return initial status
      return this.processTrackingService.getProcessStatus(processId)
    } catch (error) {
      this.logger.error(`Failed to start allowlist process: ${error.message}`)
      throw new HttpException(
        `Failed to start allowlist process: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get('status/:processId')
  @ApiOperation({ summary: 'Get status of allowlist process' })
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

  @Get('verify-user/:userAccount/:tokenId?')
  @ApiOperation({ summary: 'Check if user is on allowlist' })
  @ApiResponse({ status: 200, description: 'User allowlist status' })
  async verifyUserOnAllowList(
    @Param('userAccount') userAccount: string,
    @Param('tokenId') tokenId?: string
  ) {
    try {
      const isOnAllowList = await this.allowListService.isUserOnAllowList(userAccount, tokenId)
      return {
        userAccount,
        tokenId: tokenId || 'default',
        isOnAllowList,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      this.logger.error(`Failed to verify user allowlist status: ${error.message}`)
      throw new HttpException(
        'Failed to verify allowlist status',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}