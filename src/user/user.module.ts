import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../auth/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [AuthService, TokenService, UserService, PrismaService, JwtService],
  exports: [UserService],
})
export class UserModule {}
