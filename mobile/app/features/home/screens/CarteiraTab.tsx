import { Header } from "@/shared/components/header/Header";
import { useTheme } from "@/theme/ThemeContext";
import { StyleSheet, Text, View } from "react-native";



export default function CarteiraTab() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Header title="Carteiras" />
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