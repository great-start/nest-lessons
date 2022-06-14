import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { TokenService } from '../auth/token.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [TokenService, UserService, PrismaService, JwtService],
  exports: [UserService],
})
export class UserModule {}
