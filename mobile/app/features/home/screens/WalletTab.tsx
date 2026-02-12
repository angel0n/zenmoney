import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useHomeTab } from "../hooks/WalletTabHook";
import { useEffect } from "react";
import { useTheme } from "@/theme/ThemeContext";
import { TypeTheme } from "@/theme/typeTheme";
import Loading from "@/shared/components/loading/Loading";
import { Header } from "@/shared/components/header/Header";
import { WalletTotalCard } from "../components/cards/WalletTotalCard";
import { CurrencyModal } from "../components/modal/CurrencyModal";
import { WalletCard } from "../components/cards/WalletCard";

export function WalletTab() {
  const { theme } = useTheme();
  const styles = createStyles(theme)
  const { state, init, setModalVisible, setTargetCurrency, getTotalWalletBalance } = useHomeTab();

  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    getTotalWalletBalance()
  }, [state.targetCurrency])

  if (state.loading) {
    return (
      <View style={styles.container}>
        <Header title="Carteiras" />
        <Loading />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Header title="Carteiras" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <WalletTotalCard openModal={setModalVisible} amount={state.total} currency={state.targetCurrency} />

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Suas Moedas</Text>
          {state.wallets.map((wallet, index) => (
            <View key={wallet.id.toString()} style={styles.currencyItem}>
              <Text style={styles.itemNumber}>{index + 1}°</Text>
              <View style={styles.itemContent}>
                <WalletCard wallet={wallet} targetCurrency={state.targetCurrency} />
              </View>
            </View>
          ))}
        </View>

      </ScrollView>

      <CurrencyModal
        modalVisible={state.modalVisible}
        closeModal={setModalVisible}
        currencies={state.currencies}
        selectedCurrency={setTargetCurrency}
        targetcurrency={state.targetCurrency}
      />
    </View>
  )
}

function createStyles(theme: TypeTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 20,
    },
    listContainer: {
      marginBottom: 30,
    },
    listTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 16,
    },
    currencyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    itemNumber: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      width: 30,
    },
    itemContent: {
      flex: 1,
    },
  })
}