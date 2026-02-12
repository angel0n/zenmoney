import { useTheme } from "@/theme/ThemeContext";
import { TypeTheme } from "@/theme/typeTheme";
import { LinearGradient } from "expo-linear-gradient";
import { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CardProps = {
    children: ReactElement,
    tilte: string
}

export function Card({ children, tilte }: CardProps) {
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
                <Text style={styles.totalLabel}>{tilte}</Text>
                {children}
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
    })
}