import { Controller, Post, Body, Logger } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { PaymentService } from './payment.service.js'
import { TransferTokensDto } from './dto/transfer-tokens.dto.js'

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name)

  constructor(private readonly paymentService: PaymentService) {}

  @Post('transfer')
  @ApiOperation({ summary: 'Transfer tokens to specified recipient' })
  @ApiResponse({ status: 201, description: 'Tokens transferred successfully' })
  async transferTokens(@Body() transferTokensDto: TransferTokensDto) {
    const transactionHash = await this.paymentService.transferTokens(transferTokensDto)
    return {
      success: true,
      transactionHash,
      tokenId: transferTokensDto.tokenId,
      amount: transferTokensDto.amount,
      recipient: transferTokensDto.to,
      memo: transferTokensDto.memo,
    }
  }
}