import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class TransferTokensDto {
  @ApiProperty({
    description: 'Token ID to transfer',
    example: 'PabloToken2'
  })
  @IsString()
  @IsNotEmpty()
  tokenId: string

  @ApiProperty({
    description: 'Recipient account address',
    example: '4TgSK7EWa1m3RFT3LmvgtgCtswDsniiKD4h95wzkEjURkS4fjo'
  })
  @IsString()
  @IsNotEmpty()
  to: string

  @ApiProperty({
    description: 'Amount of tokens to transfer',
    example: 10
  })
  @IsNumber()
  @IsPositive()
  amount: number

  @ApiProperty({
    description: 'Optional memo to include with transfer',
    required: false
  })
  @IsString()
  @IsOptional()
  memo?: string
}