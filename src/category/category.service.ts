import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  getCategories() {
    return this.prismaService.category.findMany();
  }

  createCategory(params: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: {
        id: randomUUID(),
        name: params.name,
      },
    });
  }
}
