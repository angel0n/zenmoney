import { useTheme } from "@/theme/ThemeContext";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { TypeTheme } from "@/theme/typeTheme";



export default function Loading() {
    const { theme } = useTheme()
    const styles = createStyles(theme);
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={theme.colors.primary}/>
        </View>
    );
}

function createStyles(theme: TypeTheme) {
    return StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center' 
        },
    })
}


