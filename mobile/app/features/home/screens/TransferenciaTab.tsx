import { Header } from "@/shared/components/header/Header";
import { useTheme } from "@/theme/ThemeContext";
import { StyleSheet, Text, View } from "react-native";



export default function TransferenciaTab() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  return (
    <View style={styles.container}>
      <Header title="Transferências" />
    </View>
  )
}

function createStyles(theme: any) {
  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
})
}