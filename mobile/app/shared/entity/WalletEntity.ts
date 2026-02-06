import { CurrencyEntity } from "./CurrencyEntity";

export type WalletEntity = {
    id: number;
    balance: number;
    name: string;
    currency: CurrencyEntity;
    convertedBalance: number;
}