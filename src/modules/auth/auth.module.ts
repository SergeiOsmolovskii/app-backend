import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/service/user.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { TokenEntity } from './entity/token.entity';
import { AuthService } from './service/auth.service';
import { TokenService } from './service/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TokenEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRE_TIME
      },
    }),
    forwardRef(() => UserModule),
  ],
  exports: [JwtModule],
  providers: [AuthService, UserService, TokenService],
  controllers: [AuthController]
})
export class AuthModule {}
