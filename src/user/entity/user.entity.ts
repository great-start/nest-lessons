import { Car, Post } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String, minLength: 2, maxLength: 20 })
  username: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: Number, minimum: 15, maximum: 99 })
  age: number;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: [] })
  posts?: Post[];

  @ApiProperty({ type: [] })
  cars?: Car[];
}
