import { Inject, Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { PayloadDto } from '../auth/dto/payload.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ConflictException } from 'src/exceptions/ConflictException';
import { Prisma } from 'generated/prisma/browser';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import axios from 'axios';

@Injectable()
export class WalletsService {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    private readonly prisma: PrismaService
  ) { }

  async create(createWalletDto: CreateWalletDto, user: PayloadDto) {
    const wallet = await this.prisma.wallet.findUnique({ where: { userId_currencyId: { currencyId: createWalletDto.currencyId, userId: user.id } } })
    if (wallet != null) throw new ConflictException('Wallet already exists for this currency');

    await this.prisma.wallet.create({
      data: {
        balance: new Prisma.Decimal(createWalletDto.balance),
        currencyId: createWalletDto.currencyId,
        userId: user.id,
        name: createWalletDto.name,
      }
    })
  }

  async findAllByUser(user: PayloadDto) {
    return await this.prisma.wallet.findMany({
      where: { userId: user.id },
      include: { currency: true }
    })
  }

  async getWalletTotal(user: PayloadDto, targetCurrencyId: number) {
    const currency = await this.prisma.currency.findUnique({ where: { id: targetCurrencyId } });
    if (currency == null) {
      throw new NotFoundException('Target currency not found');
    }

    const walltes = await this.findAllByUser(user);

    let total = new Prisma.Decimal(0);
    const walletIdValue: Array<{id: number, valor: number}> = []
    for (const wallet of walltes!) {
      if (wallet.currencyId === currency.id) {
        total = total.plus(wallet.balance);
      } else {
        const cacheKey = `exchange_rate:from${wallet.currency.code}_to${currency.code}`;
        let exchangeRate: number | undefined = await this.cache.get<number>(cacheKey);
        
        if (exchangeRate === undefined || exchangeRate === null) {
          exchangeRate = await this.getExchangeRates(wallet.currency.code, currency.code);
          await this.cache.set(cacheKey, exchangeRate);
        }
        
        walletIdValue.push({
          id: wallet.id,
          valor: wallet.balance.mul(exchangeRate).toNumber()
        })
        total = total.plus(wallet.balance.mul(exchangeRate));
        
      }
    }
    
    return {total, walletIdValue};
  }


  private async getExchangeRates(from: string, to: string): Promise<number> {
    const response = await axios.get(
      process.env.EXCHANGE_RATE_API_URL!,
      {
        params: {
          from,
          to,
        },
      },
    );
    return response.data.rates[to.toUpperCase()];
  }
}
