import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AppController } from './app.controller';
import { CarModule } from './car/car.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PostModule, CarModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
