import { Module } from '@nestjs/common';
import { CurrencysService } from './currencys.service';
import { CurrencysController } from './currencys.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CurrencysController],
  providers: [CurrencysService],
})
export class CurrencysModule {}
