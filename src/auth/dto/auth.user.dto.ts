import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({
    example: 'google@gmail.com',
    description: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'swd4ve45dverAA11',
    description: 'password',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
