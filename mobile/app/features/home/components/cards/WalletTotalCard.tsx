import { CurrencyEntity } from "@/shared/entity/CurrencyEntity";
import { formatCurrencyString } from "@/shared/services/uteis/StringUteis";
import { useTheme } from "@/theme/ThemeContext";
import { TypeTheme } from "@/theme/typeTheme";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CardWalletTotalProp = {
    openModal: (value: boolean) => void,
    currency: CurrencyEntity | null,
    amount?: number
}

export function WalletTotalCard({ openModal, currency, amount }: CardWalletTotalProp) {
    const { theme } = useTheme()
    const styles = createStyles(theme)

    return (
        <View style={styles.card}>
            <LinearGradient
                colors={[theme.colors.backgroundSecondary, theme.colors.background, theme.colors.backgroundSecondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientCard}
            >
                <Text style={styles.totalLabel}>Total em</Text>
                <TouchableOpacity
                    style={styles.currencySelector}
                    onPress={() => openModal(true)}
                >
                    <Text style={styles.selectedCurrencyText}>
                        {currency?.name ?? ""}
                    </Text>
                    <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
                <Text style={styles.totalAmount}>
                    {currency?.symbol ?? ""}{' '}
                    {formatCurrencyString(amount ?? 0)}
                </Text>
            </LinearGradient>
        </View>
    )
}

function createStyles(theme: TypeTheme) {
    return StyleSheet.create({
        card: {
            borderRadius: 16,
            backgroundColor: theme.colors.primary,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
            marginBottom: 30,
            marginTop: 15,
            overflow: 'hidden',
        },
        gradientCard: {
            padding: 24,
            borderRadius: 16,
        },
        totalLabel: {
            fontSize: 16,
            color: theme.colors.text,
            opacity: 0.9,
            marginBottom: 8,
        },
        currencySelector: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.colors.background,
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 12,
            marginBottom: 16,
        },
        selectedCurrencyText: {
            fontSize: 16,
            color: theme.colors.text,
            fontWeight: '600',
        },
        dropdownIcon: {
            fontSize: 12,
            color: theme.colors.text,
        },
        totalAmount: {
            fontSize: 36,
            fontWeight: 'bold',
            color: theme.colors.text,
        },
    })
}