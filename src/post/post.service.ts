import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async getAll(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prismaService.post.create({ data });
  }

  async getOne(id: string): Promise<Post> {
    return this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
  }

  async update(data: Prisma.PostUpdateInput, id: string): Promise<Post> {
    return this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }

  async remove(id: string): Promise<any> {
    return this.prismaService.post.delete({
      where: {
        id,
      },
    });
  }
}
