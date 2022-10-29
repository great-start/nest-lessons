import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenService } from './token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new Error('No token');
      }

      const tokensDataFromDB = await this.tokenService.getTokenFromDB(token);

      if (!tokensDataFromDB) {
        throw new Error('Token not valid');
      }

      const user = this.jwtService.verify(token, { secret: process.env.SECRET_KEY });

      if (!user) {
        throw new Error('User is not authorized');
      }
      request.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: e.message });
    }
  }
}
