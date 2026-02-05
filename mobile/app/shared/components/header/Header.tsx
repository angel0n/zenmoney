import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TypeTheme } from '@/theme/typeTheme';
import { useTheme } from '@/theme/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export function Header({ title }: { title: string }) {
    const { theme } = useTheme();
    const navigation = useNavigation();

    const styles = createStyles(theme);

    return (
        <LinearGradient
            colors={[
                theme.colors.background,
                theme.colors.surface,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <Text style={styles.title}>{title}</Text>
            <View style={{ width: 40 }} />
        </LinearGradient>
    );
}

function createStyles(theme: TypeTheme) {
    return StyleSheet.create({
        container: {
            height: 56,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            backgroundColor: theme.colors.surface,
        },
        backButton: {
            width: 40,
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        backText: {
            fontSize: 22,
        },
        title: {
            flex: 1,
            textAlign: 'left',
            fontSize: 18,
            fontWeight: '600',
            color: theme.colors.text,
        },
    });

}