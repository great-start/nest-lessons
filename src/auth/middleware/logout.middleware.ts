import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

import { TokenService } from '../token.service';
import { IRequestExtended } from '../interface/extented.requets.interface';
import { UserService } from '../../user/user.service';

@Injectable()
export class RefreshMiddleware implements NestMiddleware {
  constructor(private tokenService: TokenService,
              private jwtService: JwtService,
              private userService:UserService) {}

  async use(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization'];
      const bearer = authHeader.split(' ')[0];
      const accessToken = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !accessToken) {
        throw new Error('No token');
      }

      const tokensDataFromDB = await this.tokenService.getTokenFromDB(accessToken);

      if (!tokensDataFromDB) {
        throw new Error('Token not valid');
      }

      const { email } = this.jwtService.verify(accessToken, { secret: process.env.SECRET_KEY });

      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        throw new Error('Token validation failed');
      }

      req.userData = user;
      next();
    } catch (e) {
      throw new UnauthorizedException({ message: e.message });
    }
  }
}