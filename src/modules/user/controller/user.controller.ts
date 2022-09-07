import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@ApiTags('User')
@ApiBearerAuth('token')
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService ) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all users',
    type: [UserEntity],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Add new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create new user',
    type: OmitType(UserEntity, ['password']),
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() newUser: CreateUserDto) {
    return this.userService.createUser(newUser);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user by id',
    type: OmitType(UserEntity, ['password']),
  })
  @ApiParam({ name: 'id', description: 'User ID' })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Update user',
    type: OmitType(UserEntity, ['password']),
  })
  @ApiParam({ name: 'id', description: 'User ID' })
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateUser(@Param('id', new ParseUUIDPipe()) id: string, @Body() newPassword: UpdatePasswordDto) {  
    return this.userService.updateUser(id, newPassword);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete user',
  })
  @ApiParam({ name: 'id', description: 'User ID' })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}