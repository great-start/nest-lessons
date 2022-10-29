import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body()
    createPostDto: CreatePostDto,
  ) {
    console.log(createPostDto);
    return this.postService.create(createPostDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.postService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOne(
    @Param('id')
    id: string,
  ) {
    return this.postService.getOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @Body()
    updatePostDto: UpdatePostDto,
    @Param('id')
    id: string,
  ) {
    return this.postService.update(updatePostDto, id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.postService.remove(id);
  }
}
