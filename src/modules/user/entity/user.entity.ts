import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";


@Entity('user')

export class UserEntity {
  
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  login: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @VersionColumn({default: 1})
  version: number;
  
  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp', nullable: true, default: () => "CURRENT_TIMESTAMP()" })
  createdAt: number;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp', nullable: true, default: () => "CURRENT_TIMESTAMP()", onUpdate: "CURRENT_TIMESTAMP()" })
  updatedAt: number;

  toResponse() {
    const { id, login, createdAt, updatedAt, version } = this;
    return { id, login, createdAt: +new Date(createdAt), updatedAt: +updatedAt, version };
  }
}