import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('user')

export class UserEntity {
  
  @ApiProperty({ example: '40af606c-c0bb-47d1-bc20-a2857242cde3', description: 'Unique user ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Test_USER_login', description: 'User login' })
  @Column()
  login: string;

  @ApiProperty({example: 'testmail@gmail.com', description: 'User email'})
  @Column()
  email: string;

  @ApiProperty({example: '123456789aA@', description: 'User password'})
  @Column()
  password: string;

  @ApiProperty({ example: 1, description: 'Version of user' })
  @VersionColumn({default: 1})
  version: number;
  
  @ApiProperty({ example: 1662489170323, description: 'User creation date' })
  @CreateDateColumn({ type: 'timestamp', nullable: true, default: () => "CURRENT_TIMESTAMP()" })
  createdAt: number;

  @ApiProperty({ example: 1662489170323, description: 'User updation date' })
  @UpdateDateColumn({ type: 'timestamp', nullable: true, default: () => "CURRENT_TIMESTAMP()", onUpdate: "CURRENT_TIMESTAMP()" })
  updatedAt: number;

  toResponse() {
    const { id, login, createdAt, updatedAt, version, email } = this;
    return { id, login, createdAt: +new Date(createdAt), updatedAt: +updatedAt, version, email };
  }
}