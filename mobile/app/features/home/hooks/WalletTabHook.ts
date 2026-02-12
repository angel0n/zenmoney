import { useState } from "react";
import { HomeTabState } from "../types/TypeState";
import { fetchTotalWalletBalanceApi, fetchWalletsApi, getAllCurrencyApi } from "../services/HomeService";
import { CurrencyEntity } from "@/shared/entity/CurrencyEntity";

export function useHomeTab() {
    const [state, setState] = useState<HomeTabState>({
        wallets: [],
        currencies: [],
        targetCurrency: null,
        total: 0,
        modalVisible: false,
        loading: false,
        error: null,
    })

    async function init(){
        try {
            setState(prev => ({ ...prev, wallets: [], loading: true }));
            await fetchWallets()
            await getTotalWalletBalance()
            await getAllCurrency()
        } catch (error:any) {
            setState(prev => ({ ...prev, loading: false, error: error.message }));
        }
    }

    function setTargetCurrency(target: CurrencyEntity){
        setState(prev => ({ ...prev, targetCurrency: target}))
    }

    function setModalVisible(target: boolean){
        setState(prev => ({ ...prev, modalVisible: target}))
    }

    async function fetchWallets() {
        setState(prev => ({ ...prev, wallets: [], loading: true }));
        try {
            const wallets = await fetchWalletsApi();
            setState(prev => ({ ...prev, wallets, loading: false }));
        } catch (error:any) {
            setState(prev => ({ ...prev, loading: false, error: error.message }));
        }
    }

    async function getTotalWalletBalance() {
        setState(prev => ({ ...prev, loading: true }));
        try {
            if(state.targetCurrency == null){
                setState(prev => ({ ...prev, loading: false }));
                return
            }
            const value = await fetchTotalWalletBalanceApi(state.targetCurrency.id)
            
            const wallets = state.wallets.map(wallet =>{
                const walletIdValue = value.walletIdValue.find(w => w.id === wallet.id)
                wallet.convertedBalance = walletIdValue?.valor ?? wallet.balance
                return wallet
            })

            setState(prev => ({ ...prev, wallets: wallets,  total: value.total, loading: false }));
        } catch (error:any) {
            setState(prev => ({ ...prev, loading: false, error: error.message }));
        }
    }

    async function getAllCurrency(){
        setState(prev => ({ ...prev, loading: true }));
        try {
            const currencies = await getAllCurrencyApi()
            setState(prev => ({ ...prev, currencies, targetCurrency: currencies[0], loading: false }));
        } catch (error:any) {            
            setState(prev => ({ ...prev, loading: false, error: error.message }));
        }
    }

    return {
        state,
        init,
        getTotalWalletBalance,
        setTargetCurrency,
        setModalVisible
    }
}