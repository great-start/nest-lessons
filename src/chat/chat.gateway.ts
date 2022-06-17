import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@WebSocketGateway({
  pingTimeout: 60000,
  cors: true,
})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private userService: UserService) {}

  @SubscribeMessage('getUsers')
  @UseInterceptors(ClassSerializerInterceptor)
  // @Cron(CronExpression.EVERY_SECOND)
  async handleEvent(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    // async joinRoom(client: Socket, data: { token: string }) {
    // const userId = await this.authService.getVerifiedUseId(data.token);
    // if(!userId) {
    //   client.emit('user-no-uth',
    //     {
    //       statusCode: 401,
    //       error: 'No auth'
    //     })
    // }

    console.log(client.id);

    const users = await this.userService.getOneById(data);

    // const sum = await this.userService.countUsers();

    // console.log(users);

    // from server to all clients
    // this.server.emit('users', { data: client.id });

    // to one client
    const promise = await this.sendUsersQuantity();
    client.emit('users', { data: promise });
    // return { event: 'users', data: users };
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async clientSend() {
    const promise = await this.sendUsersQuantity();
    this.server.emit('users', { data: promise });
  }

  async sendUsersQuantity() {
    return this.userService.countUsers();
  }

  afterInit() {
    this.server.emit('message', { data: 'asdasdasdasdasdasd' });
  }
}
