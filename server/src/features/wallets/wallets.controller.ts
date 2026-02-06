import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { PayloadDto } from '../auth/dto/payload.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto, @CurrentUser() user: PayloadDto) {
    return this.walletsService.create(createWalletDto, user);
  }

  @Get()
  findAllByUser(@CurrentUser() user: PayloadDto) {
    return this.walletsService.findAllByUser(user);
  }

  @Get('total/:targetCurrencyId')
  getWalletTotal(@CurrentUser() user: PayloadDto, @Param('targetCurrencyId') targetCurrencyId: number) {
    return this.walletsService.getWalletTotal(user, Number(targetCurrencyId));
  }
}
