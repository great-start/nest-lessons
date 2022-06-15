import { Exclude } from 'class-transformer';

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
