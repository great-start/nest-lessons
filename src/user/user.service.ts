import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async getOneById(userId: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id: userId },
      include: { posts: true, cars: true },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  async update(data: Prisma.UserUpdateInput, userId: string): Promise<User> {
    return this.prismaService.user.update({
      where: { id: userId },
      data: { email: data.email, username: data.username },
    });
  }

  async delete(userId: string): Promise<any> {
    return this.prismaService.user.delete({
      where: { id: userId },
    });
  }
}
