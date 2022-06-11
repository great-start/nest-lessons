import { Injectable } from '@nestjs/common';
import { Car, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CarService {
  constructor(private prismaService: PrismaService) {}

  async getAll(): Promise<Car[]> {
    return this.prismaService.car.findMany();
  }

  async create(data: Prisma.CarCreateInput): Promise<Car> {
    return this.prismaService.car.create({ data });
  }

  async findOne(id: string): Promise<Car> {
    return this.prismaService.car.findUnique({
      where: {
        id,
      },
    });
  }

  async update(data: Prisma.CarUpdateInput, id: string): Promise<Car> {
    return this.prismaService.car.update({
      where: {
        id,
      },
      data: {
        model: data.model,
        year: data.year,
      },
    });
  }

  async remove(id: string): Promise<any> {
    return this.prismaService.car.delete({
      where: {
        id,
      },
    });
  }
}
