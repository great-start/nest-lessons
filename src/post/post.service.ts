import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  private posts = [];

  create(createPostDto: CreatePostDto) {
    this.posts.push({
      ...createPostDto,
      id: new Date().valueOf(),
    });
  }

  getAll() {
    return this.posts;
  }

  getOne(id: number) {
    return this.posts.find((post) => post.id === id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const foundPost = this.posts.find((post) => post.id === id);
    for (const findKey in updatePostDto) {
      foundPost[findKey] ? (foundPost[findKey] = updatePostDto[findKey]) : false;
    }
    return { message: 'Post was updated' };
  }

  remove(id: number) {
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
