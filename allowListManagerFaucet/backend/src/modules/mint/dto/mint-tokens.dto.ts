import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class MintTokensDto {
  @ApiProperty({
    description: 'Token ID to mint',
    example: 'PabloToken2'
  })
  @IsString()
  @IsNotEmpty()
  tokenId: string

  @ApiProperty({
    description: 'Amount of tokens to mint',
    example: 10
  })
  @IsNumber()
  @IsPositive()
  amount: number

  @ApiProperty({
    description: 'Recipient account address (optional, defaults to governance account)',
    required: false
  })
  @IsString()
  @IsOptional()
  recipient?: string
}