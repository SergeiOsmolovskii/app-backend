import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { UserEntity } from '../../user/entity/user.entity';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UserService } from '../../user/service/user.service';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { TokenDto } from '../dto/token.dto';
import { SigninUserDto } from '../dto/signin-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  
  constructor(private authService: AuthService, private usersService: UserService, private tokenService: TokenService ) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Register new user',
    type: OmitType(UserEntity, ['password']),
  })
  @Post('/signup')
  public signup(@Body() body: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.createUser(body);
  }

  @ApiOperation({ summary: 'Create user access and refresh tokens' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create user access and refresh tokens',
    type: TokenDto,
  })
  @Post('/signin') 
  public signin(@Body() body: SigninUserDto): Promise<TokenDto> {
    return this.authService.signin(body);
  }

  @ApiOperation({ summary: 'Create new user access and refresh tokens' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create new user access and refresh tokens',
    type: TokenDto,
  })
  @Post('/refresh')
  public refresh(@Body() body: { refreshToken: string }): Promise<TokenDto> {
    return this.authService.refresh(body);
  }
}
