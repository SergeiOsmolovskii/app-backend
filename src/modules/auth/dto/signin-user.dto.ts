import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SigninUserDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly login!: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}