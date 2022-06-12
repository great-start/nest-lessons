import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { UserModule } from '../user/user.module';
import { RefreshMiddleware } from './middleware/refresh.middleware';
import { LogoutMiddleware } from './middleware/logout.middleware';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService, PrismaService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
  exports: [],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RefreshMiddleware).forRoutes('auth/refresh');
    consumer.apply(LogoutMiddleware).forRoutes('auth/logout');
  }
}
