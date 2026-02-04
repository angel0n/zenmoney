// src/shared/components/layout/KeyboardScreen.tsx
import { useTheme } from "@/theme/ThemeContext";
import { TypeTheme } from "@/theme/typeTheme";
import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, ViewStyle } from "react-native";

interface KeyboardContainerProps {
    children: ReactNode;
}

export function KeyboardContainer({
    children,

}: KeyboardContainerProps) {
    const styles = createStyles();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

function createStyles() {
    return StyleSheet.create({
        scrollContent: {
            flexGrow: 1,
        },
    });
}