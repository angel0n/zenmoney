export function getExchangeRates() {
    return {
        BRL: 4.95,
        USD: 1.0,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 149.50,
        CAD: 1.36,
        AUD: 1.52,
        CHF: 0.88,
    };
}

export function getCurrencySymbols() {
    return {
        BRL: 'R$',
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
        CAD: 'C$',
        AUD: 'A$',
        CHF: 'CHF',
    };
}

export function getCurrencyName() {
    return {
        BRL: 'Real Brasileiro',
        USD: 'Dólar Americano',
        EUR: 'Euro',
        GBP: 'Libra Esterlina',
        JPY: 'Iene Japonês',
        CAD: 'Dólar Canadense',
        AUD: 'Dólar Australiano',
        CHF: 'Franco Suíço',
    };
}

export function getwalletData() {
    return [
        { currency: 'BRL', amount: 5000 },
        { currency: 'USD', amount: 1000 },
        { currency: 'EUR', amount: 500 },
        { currency: 'GBP', amount: 300 },
        { currency: 'JPY', amount: 50000 },
    ];
}