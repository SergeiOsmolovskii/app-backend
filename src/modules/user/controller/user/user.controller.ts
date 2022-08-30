import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../../dto/create-user.dto';
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

}
