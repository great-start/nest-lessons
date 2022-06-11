import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService, PrismaService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
})
export class AuthModule {}
