import { Controller, Post, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common'
import { SponsorService } from './sponsor.service.js'
import { TooManyRequestsException, BadRequestException } from '@nestjs/common'

@Controller('sponsor')
export class SponsorController {
  constructor(private sponsorService: SponsorService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async sponsor(
    @Body()
    body: {
      sender: string
      recipient: string
      amount: string
      tokenId: string
      decimals: number
    }
  ) {
    try {
      const sponsoredTransaction = await this.sponsorService.sponsorTransaction(
        body.sender,
        body.recipient,
        body.amount,
        body.tokenId,
        body.decimals
      )

      return { sponsoredTransaction }
    } catch (error) {
      if (error instanceof TooManyRequestsException || error instanceof BadRequestException) {
        throw new HttpException(error.message, error.getStatus())
      }
      throw new HttpException('Failed to sponsor transaction', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
