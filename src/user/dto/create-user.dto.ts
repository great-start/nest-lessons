import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'Vanya', description: 'User`s name' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  username: string;

  @ApiProperty({ example: 'asdasd@gmail.com', description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 35, description: 'User age' })
  @IsNumber()
  @Min(15)
  @Max(99)
  @Type(() => Number)
  age: number;

  @ApiProperty({ example: 'sd123R4vde3', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
