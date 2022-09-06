import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Token')
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '40af606c-c0bb-47d1-bc20-a2857242cde3', description: 'Unique token ID' })
  tokenId: string;

  @ApiProperty({ example: 'e684dfa0-1888-48b7-96be-3dac06017429', description: 'Unique user ID' })
  @Column()
  userId: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYTllOTQ5MS05ZjUxLTQ3ZWUtODYyZC1mMTc4ZjE0NzAwMDEiLCJsb2dpbiI6InRlc3QxMSIsImlhdCI6MTY2MjQ4OTA0MiwiZXhwIjoxNjYyNDkyNjQyfQ.dvboxk-UQAXxTPyRKpWdvSu2N9U4J6Lg1wFljLkvaO8', description: 'Access token' })
  @Column()
  accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYTllOTQ5MS05ZjUxLTQ3ZWUtODYyZC1mMTc4ZjE0NzAwMDEiLCJsb2dpbiI6InRlc3QxMSIsImlhdCI6MTY2MjQ4OTA0MiwiZXhwIjoxNjYyNTc1NDQyfQ.2xHuUYONfAa6Vfu7Lz6KacBI_LT25ipUj8C9qslKTMI', description: 'Refresh token' })
  @Column()
  refreshToken: string;
}