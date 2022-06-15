import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { UserResponseDto } from './dto/user.response.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async getOneById(userId: string): Promise<UserResponseDto> {
    const userById = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        posts: true,
        cars: true,
      },
    });
    return new UserResponseDto(userById);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  async saveToDB(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  async update(data: Prisma.UserUpdateInput, userId: string): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        email: data.email,
        username: data.username,
      },
    });
  }

  async delete(userId: string): Promise<any> {
    return this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
