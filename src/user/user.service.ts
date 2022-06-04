import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users = [];

  getAll() {
    return this.users;
  }

  getOneById(id: string) {
    return this.users.find((user) => Number(id) === user.id);
  }

  createUser(userDto: CreateUserDto) {
    this.users.push({
      ...userDto,
      id: new Date().valueOf(),
    });
  }
}
