import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { PayloadDto } from '../auth/dto/payload.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private readonly prisma: PrismaService){}

  async create(createWalletDto: CreateWalletDto, user: PayloadDto) {
    const wallet = await this.prisma.wallet.findUnique({where:{ currencyId: createWalletDto.currencyId, userId: user.id }})
    return 'This action adds a new wallet';
  }
}
