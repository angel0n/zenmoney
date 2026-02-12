import { useTheme } from '@/theme/ThemeContext';
import { TypeTheme } from '@/theme/typeTheme';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';


type ButtonProps = {
    title: string;
    onPress: () => void;
    loading?: boolean;
    error?: boolean;
    disabled?: boolean;
};

export function Button({
    title,
    onPress,
    loading = false,
    error = false,
    disabled = false,
}: ButtonProps) {
    const {theme} = useTheme();
    const styles = createStyles(theme);

    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            style={[styles.container, isDisabled && styles.disabled, error && styles.error]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={isDisabled}
        >
            {loading ? (
                <ActivityIndicator color={theme.colors.text} />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

export function createStyles(theme: TypeTheme) {
    return StyleSheet.create({
        container: {
            height: 52,
            backgroundColor: theme.colors.primary,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            color: theme.colors.text,
            fontSize: 16,
            fontWeight: '600',
        },
        disabled: {
            opacity: 0.6,
        },
        error: {
            backgroundColor: theme.colors.error,
        }
    });
}

