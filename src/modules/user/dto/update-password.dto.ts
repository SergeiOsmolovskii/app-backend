import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePasswordDto {

  @ApiProperty({example: '123456789aA@', description: 'Old user password'})
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({example: '@Aa987654321', description: 'New user password'})
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}