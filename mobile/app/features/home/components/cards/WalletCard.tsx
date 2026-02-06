import { CurrencyEntity } from "@/shared/entity/CurrencyEntity"
import { WalletEntity } from "@/shared/entity/WalletEntity"
import { formatCurrencyString } from "@/shared/services/uteis/StringUteis"
import { useTheme } from "@/theme/ThemeContext"
import { TypeTheme } from "@/theme/typeTheme"
import { StyleSheet, Text, View } from "react-native"

type WalletCardProp = {
    wallet: WalletEntity,
    targetCurrency: CurrencyEntity | null
}

export function WalletCard({ wallet, targetCurrency }: WalletCardProp) {
    const { theme } = useTheme()
    const styles = createStyles(theme)
    return (
        <View style={styles.card}>
            <View style={styles.currencyRow}>
                <View style={styles.currencyInfo}>
                    <View style={styles.currencyIcon}>
                        <Text style={styles.currencyIconText}>
                            {wallet.currency.symbol}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.currencyName}>{wallet.currency.name}</Text>
                        <Text style={styles.originalAmount}>
                            {wallet.currency.symbol} {formatCurrencyString(wallet.balance)}
                        </Text>
                    </View>
                </View>
                <View style={styles.convertedAmountContainer}>
                    <Text style={styles.convertedAmount}>
                        {targetCurrency?.symbol ?? wallet.currency.symbol}{' '}
                        {formatCurrencyString(wallet.convertedBalance)}
                    </Text>
                </View>
            </View>
        </View>
    )
}

function createStyles(theme: TypeTheme) {
    return StyleSheet.create({
        card: {
            borderRadius: 16,
            marginBottom: 12,
            backgroundColor: theme.colors.backgroundSecondary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
        },
        currencyRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
        },
        currencyInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
        },
        currencyIcon: {
            width: 48,
            height: 48,
            borderRadius: 50,
            backgroundColor: theme.colors.background,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
        },
        currencyIconText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.colors.primary,
        },
        currencyName: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.colors.text,
            marginBottom: 4,
        },
        originalAmount: {
            fontSize: 14,
            color: theme.colors.textSecondary,
        },
        convertedAmountContainer: {
            alignItems: 'flex-end',
        },
        convertedAmount: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.colors.primary,
        },
    })
}