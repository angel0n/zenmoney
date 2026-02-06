import { IsNumber, IsOptional } from 'class-validator';

export class GetWalletTotalDto {
  @IsOptional()
  @IsNumber()
  targetCurrencyId?: number; 
}