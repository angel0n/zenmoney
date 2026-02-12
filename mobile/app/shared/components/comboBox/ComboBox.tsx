import { useTheme } from "@/theme/ThemeContext";
import { TypeTheme } from "@/theme/typeTheme";
import { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ComboBoxProps = {
    selectedValue: { value: any, label: string, symbol?: string } | null
    values: Array<{ value: any, label: string, symbol?: string }>
    onSelect: (value:{ value: any, label: string, symbol?: string } ) => void
}

export function ComboBox({ selectedValue, values, onSelect }: ComboBoxProps) {
    const { theme } = useTheme()
    const styles = createStyles(theme)

    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <TouchableOpacity
                style={styles.selector}
                onPress={() => setOpenModal(true)}
            >
                <Text style={styles.selectedText}>
                    {selectedValue?.label ?? ""}
                </Text>
                <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={openModal}
                onRequestClose={() => setOpenModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecione a Moeda</Text>
                        <FlatList
                            data={values}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.modalItem,
                                        selectedValue?.value === item.value && styles.modalItemSelected,
                                    ]}
                                    onPress={() => {
                                        onSelect(item);
                                        setOpenModal(false);
                                    }}
                                >
                                    {item.symbol && <Text style={styles.modalItemSymbol}>
                                        {item.symbol}
                                    </Text>}
                                    <Text style={styles.modalItemText}>{item.label}</Text>
                                    {selectedValue?.value === item.value && (
                                        <Text style={styles.checkmark}>✓</Text>
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setOpenModal(false)}
                        >
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

function createStyles(theme: TypeTheme) {
    return StyleSheet.create({
        selector: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 12,
            marginBottom: 16,
        },
        selectedText: {
            fontSize: 16,
            color: theme.colors.text,
            fontWeight: '600',
        },
        dropdownIcon: {
            fontSize: 12,
            color: theme.colors.text,
        },

        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
        },
        modalContent: {
            backgroundColor: theme.colors.background,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: 20,
            paddingHorizontal: 20,
            paddingBottom: 40,
            maxHeight: '70%',
        },
        modalTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.colors.text,
            marginBottom: 20,
            textAlign: 'center',
        },
        modalItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderRadius: 12,
            marginBottom: 8,
            backgroundColor: theme.colors.backgroundSecondary,
        },
        modalItemSelected: {
            backgroundColor: theme.colors.surface,
        },
        modalItemSymbol: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.colors.primary,
            width: 40,
        },
        modalItemText: {
            fontSize: 16,
            color: theme.colors.text,
            flex: 1,
        },
        checkmark: {
            fontSize: 20,
            color: theme.colors.primary,
            fontWeight: 'bold',
        },
        closeButton: {
            backgroundColor: theme.colors.primary,
            paddingVertical: 16,
            borderRadius: 12,
            marginTop: 16,
            alignItems: 'center',
        },
        closeButtonText: {
            color: theme.colors.text,
            fontSize: 16,
            fontWeight: '600',
        },
    })
}