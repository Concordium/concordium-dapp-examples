import { Controller, Post, Body, Get, Param, Logger } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { MintService } from './mint.service.js'
import { MintTokensDto } from './dto/mint-tokens.dto.js'

@ApiTags('mint')
@Controller('mint')
export class MintController {
  private readonly logger = new Logger(MintController.name)

  constructor(private readonly mintService: MintService) {}

  @Post('tokens')
  @ApiOperation({ summary: 'Mint tokens to governance account' })
  @ApiResponse({ status: 201, description: 'Tokens minted successfully' })
  async mintTokens(@Body() mintTokensDto: MintTokensDto) {
    const transactionHash = await this.mintService.mintTokens(mintTokensDto)
    return {
      success: true,
      transactionHash,
      tokenId: mintTokensDto.tokenId,
      amount: mintTokensDto.amount,
      message: 'Tokens minted to governance account successfully'
    }
  }

  @Get('balance/:tokenId/:accountAddress')
  @ApiOperation({ summary: 'Get token balance for account' })
  async getBalance(
    @Param('tokenId') tokenId: string,
    @Param('accountAddress') accountAddress: string,
  ) {
    const balance = await this.mintService.getTokenBalance(tokenId, accountAddress)
    return {
      tokenId,
      accountAddress,
      balance,
    }
  }
}