import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  @ApiProperty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNumber()
  @Min(15)
  @Max(99)
  @ApiProperty()
  age: number;
}
