import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToAllowListDto {
    @ApiProperty({
        description: 'User account address to add to allow list',
        example: '4tFVVpFpgiEmSjWjZg5sZQ2oR5yKCpjUgoubZ3sdXXZekaPbm2',
    })
    @IsString()
    @IsNotEmpty()
    userAccount: string;

    @ApiProperty({
        description: 'Optional token ID to manage (defaults to first configured PLT)',
        required: false,
    })
    @IsString()
    @IsOptional()
    tokenId?: string;

    @ApiProperty({
        description: 'Verifiable Presentation JSON string (required when token requires proof)',
        required: false,
    })
    @IsString()
    @IsOptional()
    presentation?: string;

    @ApiProperty({
        description: 'Challenge hex string returned by /token-distribution/challenge (required with presentation)',
        required: false,
    })
    @IsString()
    @IsOptional()
    challenge?: string;
}
