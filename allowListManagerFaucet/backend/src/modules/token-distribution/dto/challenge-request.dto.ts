import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChallengeRequestDto {
    @ApiProperty({
        description: 'User account address the proof challenge is issued for',
        example: '4tFVVpFpgiEmSjWjZg5sZQ2oR5yKCpjUgoubZ3sdXXZekaPbm2',
    })
    @IsString()
    @IsNotEmpty()
    userAccount: string;
}