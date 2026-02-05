import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurrencysService } from './currencys.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Controller('currencys')
export class CurrencysController {
  constructor(private readonly currencysService: CurrencysService) {}

  @Post()
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencysService.create(createCurrencyDto);
  }
}
