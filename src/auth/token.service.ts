import { Injectable } from '@nestjs/common';
import { Prisma, User, Token } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma.service';
import { ITokenPair } from './interface/auth.token.interface';

@Injectable()
export class TokenService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

  public async saveTokenPair(tokenPair: Prisma.TokenUncheckedCreateInput) {
    return this.prismaService.token.create({
      data: tokenPair,
    });
  }

  public getTokenPair(user: User) {
    return this._generateTokenPair(user);
  }

  public async getTokenFromDB(token: string): Promise<Token> {
    return this.prismaService.token.findFirst({
      where: {
        OR: [{ accessToken: token }, { refreshToken: token }],
      },
    });
  }

  private _generateTokenPair(user: User): ITokenPair {
    const payload = { id: user.id, email: user.email, name: user.username };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });

    return {
      accessToken,
      refreshToken,
      userId: user.id,
    };
  }

  public async deleteTokenPair(id: string) {
    await this.prismaService.token.delete({
      where: {
        userId: id,
      },
    });
  }
}
