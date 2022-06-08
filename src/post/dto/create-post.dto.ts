import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  @ApiProperty()
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  @ApiProperty()
  title: string;
}
