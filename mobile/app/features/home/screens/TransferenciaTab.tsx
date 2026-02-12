import { ComboBox } from "@/shared/components/comboBox/ComboBox";
import { Header } from "@/shared/components/header/Header";
import { useTheme } from "@/theme/ThemeContext";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTransferTabHook } from "../hooks/TransferTabHook";
import { Card } from "@/shared/components/cards/Card";
import { InputNumber } from "@/shared/components/inputs/InputNumber";
import { KeyboardContainer } from "@/shared/components/containers/KeyboardContainer";
import { useEffect } from "react";
import { Button } from "@/shared/components/buttons/Button";
import { InputText } from "@/shared/components/inputs/InputText";



export default function TransferenciaTab() {
  const { theme } = useTheme();
  const { state, setTransactionType, setValor, fetchWallets, setWalletEntrada, setWalletSaida, fetchCategory, setTargetCategory, setDescricao, salvarTransaction } = useTransferTabHook()
  const styles = createStyles(theme);

  const transactionType = [
    { value: "INCOME", label: "Entrada" },
    { value: "EXPENSE", label: "Saida" },
    { value: "TRANSFER", label: "Transferencia" },
  ]

  useEffect(() => {
    fetchWallets()
    fetchCategory()
  }, [])

  return (
    <View style={styles.container}>
      <Header title="Transferências" />
      <KeyboardContainer >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Card tilte="Tipo de Operação">
            <ComboBox
              onSelect={setTransactionType}
              selectedValue={state.transactionTypeSelected}
              values={transactionType}
            />
          </Card>
          {state.transactionTypeSelected?.value != "EXPENSE" && (
            <Card tilte="Entrada em">
              <ComboBox
                onSelect={setWalletEntrada}
                selectedValue={state.walletEntrada}
                values={state.wallets.map(wa => ({ value: wa.id.toString(), label: wa.name, symbol: wa.currency.symbol ?? null }))}
              />
            </Card>
          )}
          {state.transactionTypeSelected?.value != "INCOME" && (
            <Card tilte="Saida de">
              <ComboBox
                onSelect={setWalletSaida}
                selectedValue={state.walletSaida}
                values={state.wallets.map(wa => ({ value: wa.id.toString(), label: wa.name, symbol: wa.currency.symbol ?? null }))}
              />
            </Card>
          )}
          <Card tilte="Categoria">
            <ComboBox
              onSelect={setTargetCategory}
              selectedValue={state.targetCategory}
              values={state.categories.map(wa => ({ value: wa.id.toString(), label: wa.name, symbol: wa.icon ?? undefined, }))}
            />
          </Card>
          <Card tilte="Descrição">
            <InputText
              onChangeText={setDescricao}
              value={state.descricao}
            />
          </Card>
          <Card tilte="Valor">
            <InputNumber
              onChangeText={setValor}
              value={state.valor}
            />
          </Card>

          <Button onPress={salvarTransaction} title="Salvar" loading={state.loading} error={state.error != null} />
          {state.error && <Text style={styles.error}>{state.error}</Text>}

        </ScrollView>
      </KeyboardContainer>
    </View>
  )
}

function createStyles(theme: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 20,
    },
    error: {
      color: theme.colors.error,
      marginTop: 6,
      fontSize: 12,
    },
  })
}