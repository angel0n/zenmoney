import { useTheme } from "@/theme/ThemeContext";
import { StyleSheet, Text, View } from "react-native";



export default function HomeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  return (
    <View style={styles.container}>
      <Text style={{color: theme.colors.text}}>Teste</Text>
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