import { IsString, IsNotEmpty, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AddToAllowListDto {
  @ApiProperty({
    description: 'User account address to add to allow list',
    example: '4tFVVpFpgiEmSjWjZg5sZQ2oR5yKCpjUgoubZ3sdXXZekaPbm2'
  })
  @IsString()
  @IsNotEmpty()
  userAccount: string

  @ApiProperty({
    description: 'Optional token ID to manage (defaults to configured PLT)',
    required: false
  })
  @IsString()
  @IsOptional()
  tokenId?: string
}