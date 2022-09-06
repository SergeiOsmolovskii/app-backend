import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  
  @ApiProperty({example: 'Test_USER_login', description: 'User login'})
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({example: 'testmail@gmail.com', description: 'User email'})
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({example: '123456789aA@', description: 'User password'})
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  @IsString()
  @IsNotEmpty()
  password?: string;
}