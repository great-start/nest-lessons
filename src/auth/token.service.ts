import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
import { ITokenPair } from './interface/auth.token.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async saveTokenPair(tokenPair: Prisma.TokenUncheckedCreateInput) {
    return this.prismaService.token.create({
      data: tokenPair,
    });
  }

  getTokenPair(user: User) {
    return this._generateTokenPair(user);
  }

  private _generateTokenPair(user: User): ITokenPair {
    const payload = { id: user.id, email: user.email, name: user.username };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });

    return {
      accessToken,
      refreshToken,
      userId: user.id,
    };
  }
}
