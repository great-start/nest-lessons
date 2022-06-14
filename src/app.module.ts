import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CarModule } from './car/car.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, PostModule, CarModule, AuthModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
