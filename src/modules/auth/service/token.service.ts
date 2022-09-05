import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from '../entity/token.entity';
import { TokenDto } from '../dto/token.dto';

@Injectable()
export class TokenService {

  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private jwtService: JwtService,
  ) {}

  async genereateToken(userId: string, login: string): Promise<TokenDto> {
    await this.tokenRepository.delete({ userId });
    const accessToken = this.jwtService.sign({ userId, login }, { expiresIn: process.env.TOKEN_EXPIRE_TIME });
    const refreshToken = this.jwtService.sign({ userId, login }, { expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME });
    const currentTokens = this.tokenRepository.create({ userId, accessToken, refreshToken });
    await this.tokenRepository.save(currentTokens);
    return { accessToken, refreshToken }; 
  }

  async refreshToken(refreshToken: string): Promise<TokenDto> {
    try {

      const verifyToken = this.jwtService.verify(refreshToken, {secret: process.env.JWT_SECRET_REFRESH_KEY});

      if (Date.now() > verifyToken.exp * 1000) {
        throw new ForbiddenException('Refresh token expired');
      }

      const foundToken = await this.tokenRepository.findOne({where: { userId: verifyToken.userId, refreshToken }});
      
      if (!foundToken) {
        throw new ForbiddenException('Refresh token not found');
      }

      return this.genereateToken(verifyToken.userId, verifyToken.login);

    } catch (e) {
      throw new ForbiddenException('Invalid token');
    }
  }
}