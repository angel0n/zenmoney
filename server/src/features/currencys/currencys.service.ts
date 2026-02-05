import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ConflictException } from 'src/exceptions/ConflictException';

@Injectable()
export class CurrencysService {
  constructor(
    private readonly prisma: PrismaService
  ) { }
  async create(createCurrencyDto: CreateCurrencyDto) {
    createCurrencyDto.code = createCurrencyDto.code.toLowerCase()
    const currency = await this.prisma.currency.findUnique({ where: { code: createCurrencyDto.code } })
    if (currency != null) throw new ConflictException("Currency exist.");

    await this.prisma.currency.create({
      data: createCurrencyDto
    })
  }
}
