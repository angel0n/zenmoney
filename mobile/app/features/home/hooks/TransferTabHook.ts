import { useState } from "react";
import { TransferTabState } from "../types/TypeState";
import { fetchWalletsApi, getAllTransferenciaCategoryApi, saveTransaction } from "../services/HomeService";

const initialState: TransferTabState = {
    transactionTypeSelected: { value: "INCOME", label: "Entrada" },
    valor: "",
    wallets: [],
    categories: [],
    descricao: "",
    targetCategory: null,
    walletEntrada: null,
    walletSaida: null,
    loading: false,
    error: null,
};

export function useTransferTabHook() {
    const [state, setState] = useState<TransferTabState>(initialState)

    function setTransactionType(value: any) {
        setState(prev => ({ ...prev, transactionTypeSelected: value }))
    }
    function setWalletEntrada(value: any) {
        setState(prev => ({ ...prev, walletEntrada: value }))
    }
    function setWalletSaida(value: any) {
        setState(prev => ({ ...prev, walletSaida: value }))
    }
    function setValor(value: string) {
        setState(prev => ({ ...prev, valor: value }))
    }
    function setTargetCategory(value: any) {
        setState(prev => ({ ...prev, targetCategory: value }))
    }
    function setDescricao(value: any) {
        setState(prev => ({ ...prev, descricao: value }))
    }

    function resetState() {
        setState(prev => ({
            ...initialState,
            wallets: prev.wallets,
            categories: prev.categories,
            transactionTypeSelected: prev.transactionTypeSelected
        }));
    }

    async function fetchWallets() {
        setState(prev => ({ ...prev, wallets: [], loading: true }));
        try {
            const wallets = await fetchWalletsApi();
            setState(prev => ({ ...prev, wallets, loading: false }));
        } catch (error: any) {
            setState(prev => ({ ...prev, loading: false, error: error.message }));
        }
    }

    async function fetchCategory() {
        setState(prev => ({ ...prev, wallets: [], loading: true }));
        try {
            const categories = await getAllTransferenciaCategoryApi();
            setState(prev => ({ ...prev, categories, loading: false }));
        } catch (error: any) {
            setState(prev => ({ ...prev, loading: false, error: error.message }));
        }
    }

    async function salvarTransaction() {
        setState(prev => ({ ...prev, wallets: [], loading: true }));
        try {
            const body = {
                type: state.transactionTypeSelected?.value,
                amount: Number(state.valor.replace(",",".")),
                categoryId: state.targetCategory?.value != null ? Number(state.targetCategory?.value) : null,
                description: state.descricao,
                fromWalletId: state.walletSaida?.value != null ? Number(state.walletSaida?.value) : null,
                toWalletId: state.walletEntrada?.value != null ? Number(state.walletEntrada?.value) : null
            }
            await saveTransaction(body)
            resetState()
            setState(prev => ({ ...prev, loading: false }));
        } catch (error: any) {
            setState(prev => ({ ...prev, loading: false, error: error.message }));
        }
    }

    return {
        state,
        setTransactionType,
        setValor,
        fetchWallets,
        setWalletEntrada,
        setWalletSaida,
        fetchCategory,
        setTargetCategory,
        setDescricao,
        salvarTransaction
    }
}