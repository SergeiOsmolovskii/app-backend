import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SigninUserDto {
  
  @ApiProperty({ example: 'Test_USER', description: 'Test user' })
  @IsString()
  @IsNotEmpty()
  readonly login!: string;
  
  @ApiProperty({ example: '123456789aA@', description: 'Test password' })
  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}