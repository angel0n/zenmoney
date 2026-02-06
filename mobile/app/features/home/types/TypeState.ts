import { CurrencyEntity } from "@/shared/entity/CurrencyEntity";
import { WalletEntity } from "@/shared/entity/WalletEntity";

export type HomeTabState = {
    wallets: Array<WalletEntity>
    currencies: Array<CurrencyEntity>
    targetCurrency: CurrencyEntity | null,
    total: number
    modalVisible: boolean
    loading: boolean;
    error: string | null;
}