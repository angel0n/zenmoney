import { Categories } from "@/shared/entity/CategoriesEntity";
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

export type TransferTabState = {
    transactionTypeSelected: { value: any, label: string } | null
    valor: string
    wallets: Array<WalletEntity>
    categories: Array<Categories>
    descricao: string,
    walletEntrada: { value: any, label: string } | null
    walletSaida: { value: any, label: string } | null
    targetCategory: { value: any, label: string } | null
    loading: boolean;
    error: string | null;
}