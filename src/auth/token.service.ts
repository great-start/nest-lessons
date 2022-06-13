import { Injectable } from '@nestjs/common';
import { Prisma, User, Token } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma.service';
import { ITokenPair } from './interface/auth.token.interface';

@Injectable()
export class TokenService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

  async saveTokenPair(tokenPair: Prisma.TokenUncheckedCreateInput) {
    return this.prismaService.token.create({
      data: tokenPair,
    });
  }

  getTokenPair(user: User) {
    return this._generateTokenPair(user);
  }

  async getTokenFromDB(token: string): Promise<Token> {
    return this.prismaService.token.findFirst({
      where: {
        OR: [{ accessToken: token }, { refreshToken: token }],
      },
    });
  }

  private _generateTokenPair(user: User): ITokenPair {
    const payload = { id: user.id, email: user.email, name: user.username };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '40s' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });

    return {
      accessToken,
      refreshToken,
      userId: user.id,
    };
  }

  async deleteTokenPair(id: string) {
    await this.prismaService.token.delete({
      where: {
        userId: id,
      },
    });
  }
}
