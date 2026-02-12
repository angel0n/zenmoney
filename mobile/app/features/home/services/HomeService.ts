import { api } from "@/shared/services/api/Api";
import { WalletEntity } from "@/shared/entity/WalletEntity";

export async function fetchWalletsApi(): Promise<Array<WalletEntity>> {
    const response = await api.get('/wallets');
    return response.data;
}

export async function fetchTotalWalletBalanceApi(targetCurrencyId: number): Promise<{total: number, walletIdValue: { id: number, valor: number }[]}> {
    const response = await api.get(`/wallets/total/${targetCurrencyId}`);
    return response.data;
}

export async function getAllCurrencyApi(){
    const response = await api.get("/currencys");
    return response.data
}

export async function getAllTransferenciaCategoryApi(){
    const response = await api.get("/categorys");
    return response.data
}

export async function saveTransaction(body: any){
    const response = await api.post("/transaction",body)
    console.log(response.data);
    
    return response.data
}