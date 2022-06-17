import { Exclude } from 'class-transformer';
import { WsResponse } from '@nestjs/websockets';

export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  age: number;

  @Exclude()
  photo: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

export class UserResponseDtoWs implements WsResponse {
  data: UserResponseDto;
  event: string;
}
