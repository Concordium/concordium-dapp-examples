import { Controller, Post, Body } from '@nestjs/common'
import { SponsorService } from './sponsor.service.js'

@Controller('sponsor')
export class SponsorController {
  constructor(private sponsorService: SponsorService) {}

  @Post()
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
    const sponsoredTransaction = await this.sponsorService.sponsorTransaction(
      body.sender,
      body.recipient,
      body.amount,
      body.tokenId,
      body.decimals
    )

    return { sponsoredTransaction }
  }
}
