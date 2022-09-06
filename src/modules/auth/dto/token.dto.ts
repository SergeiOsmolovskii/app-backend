import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TokenDto {

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYTllOTQ5MS05ZjUxLTQ3ZWUtODYyZC1mMTc4ZjE0NzAwMDEiLCJsb2dpbiI6InRlc3QxMSIsImlhdCI6MTY2MjQ4OTA0MiwiZXhwIjoxNjYyNDkyNjQyfQ.dvboxk-UQAXxTPyRKpWdvSu2N9U4J6Lg1wFljLkvaO8', description: 'Access token' })
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYTllOTQ5MS05ZjUxLTQ3ZWUtODYyZC1mMTc4ZjE0NzAwMDEiLCJsb2dpbiI6InRlc3QxMSIsImlhdCI6MTY2MjQ4OTA0MiwiZXhwIjoxNjYyNTc1NDQyfQ.2xHuUYONfAa6Vfu7Lz6KacBI_LT25ipUj8C9qslKTMI', description: 'Refresh token' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}