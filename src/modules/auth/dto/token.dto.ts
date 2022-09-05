import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TokenDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}