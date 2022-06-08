import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  content: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  title: string;
}
