import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Token')
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  tokenId: string;

  @ApiProperty()
  @Column()
  userId: string;

  @ApiProperty()
  @Column()
  accessToken: string;

  @ApiProperty()
  @Column()
  refreshToken: string;
}