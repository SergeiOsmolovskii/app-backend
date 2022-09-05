import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../user/entity/user.entity';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UserService } from '../../user/service/user.service';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { TokenDto } from '../dto/token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UserService, private tokenService: TokenService ) {}

  @Post('/signup')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Register new user',
    type: [UserEntity],
  })
  public signup(@Body() body: CreateUserDto): Promise<CreateUserDto> {

    return this.usersService.createUser(body);
  }

  @Post('/signin') 
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login user',
    type: TokenDto,
  })
  public signin(@Body() body: { login: string, password: string }): Promise<{accessToken: string, refreshToken: string}> {
    return this.authService.signin(body);
  }

  @Post('/refresh')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get refresh token',
    type: TokenDto,
  })
  public refresh(@Body() body: { refreshToken: string }): Promise<{accessToken: string, refreshToken: string}> {
    return this.authService.refresh(body);
  }
}
