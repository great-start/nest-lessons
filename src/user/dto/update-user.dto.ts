import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @Min(15)
  @Max(99)
  age: number;
}
