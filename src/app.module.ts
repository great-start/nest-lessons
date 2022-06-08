import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AppController } from './app.controller';
import { CarModule } from './car/car.module';

@Module({
  imports: [UserModule, PostModule, CarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
