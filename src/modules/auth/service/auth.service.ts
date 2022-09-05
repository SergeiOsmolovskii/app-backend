import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { SigninUserDto } from '../dto/signin-user.dto';
import { TokenService } from './token.service';
import { TokenDto } from '../dto/token.dto';

@Injectable()
export class AuthService {

  constructor(

    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService,
  ) {}

  public async signin(body: SigninUserDto): Promise<TokenDto> {    
    const user = await this.usersRepository.findOne({ select: ['id', 'password'], where: { login: body.login } });
 
    if (!user) {
      throw new HttpException('User was not founded!', HttpStatus.FORBIDDEN);
    }

    const isValid = await bcrypt.compare(body.password, user.password);

    if (!isValid) {
      throw new HttpException('User was not founded!', HttpStatus.FORBIDDEN);
    }

    return await this.tokenService.genereateToken(user.id, body.login);
  }

  public async refresh(body: { refreshToken: string }): Promise<TokenDto> {
    const refreshToken = body.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }
    return this.tokenService.refreshToken(refreshToken);
  }
}