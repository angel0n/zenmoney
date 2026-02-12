import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ConflictException } from 'src/exceptions/ConflictException';

@Injectable()
export class CategorysService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.transactionCategory.findFirst({ where: { name: createCategoryDto.name } })
    if (category != null) throw new ConflictException("Category is exist.")

    return await this.prisma.transactionCategory.create({
      data: {
        name: createCategoryDto.name,
        color: createCategoryDto.color,
        icon: createCategoryDto.icon
      }
    })
  }

  async findAll() {
    return await this.prisma.transactionCategory.findMany()
  }

}
