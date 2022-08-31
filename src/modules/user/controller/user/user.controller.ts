import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdatePasswordDto } from '../../dto/update-password.dto';
import { UserEntity } from '../../entity/user.entity';
import { UserService } from '../../service/user.service';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService ) {}
  
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all users',
    type: [UserEntity],
  })

  @HttpCode(HttpStatus.OK)
  public async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post new user',
    type: CreateUserDto,
  })
  
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() newUser: CreateUserDto) {
    return this.userService.createUser(newUser);
  }

  @Get('/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Get user by ID',
    type: OmitType(UserEntity, ['password']),
  })
  @HttpCode(HttpStatus.OK)
  public async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.getUserById(id);
  }

  @Put('/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Update user',
    type: CreateUserDto,
  })
  @HttpCode(HttpStatus.OK)
  public async updateUser(@Param('id', new ParseUUIDPipe()) id: string, @Body() newPassword: UpdatePasswordDto) {  
    return this.userService.updateUser(id, newPassword);
  }

  @Delete('/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Delete user',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}