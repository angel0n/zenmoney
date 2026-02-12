import { useTheme } from '@/theme/ThemeContext';
import { TypeTheme } from '@/theme/typeTheme';
import { TextInput, View, Text, StyleSheet } from 'react-native';


type InputProps = {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    error?: string;
    secureTextEntry?: boolean;
};

export function InputNumber({ label, value, onChangeText, placeholder, error, secureTextEntry }: InputProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    function handleChange(text: string) {
        const onlyNumbers = text.replace(/[^0-9.,]/g, '').replace(/([.,].*)[.,]/g, '$1');;
        onChangeText(onlyNumbers);
    }

    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>
                    {label}
                </Text>
            )}

            <TextInput
                value={value}
                onChangeText={handleChange}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.textSecondary}
                secureTextEntry={secureTextEntry}
                keyboardType="number-pad"
                style={[
                    styles.input,
                    error && styles.inputError,
                ]}
            />

            {error && (
                <Text style={styles.error}>
                    {error}
                </Text>
            )}
        </View>
    );
}

export function createStyles(theme: TypeTheme) {
    return StyleSheet.create({
        container: {
            marginBottom: 16,
        },

        label: {
            color: theme.colors.textSecondary,
            marginBottom: 6,
            fontSize: 14,
        },

        input: {
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 12,
            color: theme.colors.text,
            fontSize: 16,
        },

        inputError: {
            borderColor: theme.colors.error,
        },

        error: {
            color: theme.colors.error,
            marginTop: 6,
            fontSize: 12,
        },
    });
}
