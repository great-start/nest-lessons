import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CarModule } from './car/car.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { AsdModule } from './asd/asd.module';
import { AsdModule } from './asd/asd.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    CarModule,
    AuthModule,
    ConfigModule.forRoot(),
    ChatModule,
    ScheduleModule.forRoot(),
    TasksModule,
    AsdModule,
  ],
  controllers: [],
  providers: [AppService, ChatService, TasksService],
})
export class AppModule {}
