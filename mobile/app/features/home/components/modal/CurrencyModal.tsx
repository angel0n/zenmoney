import { CurrencyEntity } from "@/shared/entity/CurrencyEntity";
import { useTheme } from "@/theme/ThemeContext";
import { TypeTheme } from "@/theme/typeTheme";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CurrencyModalProp = {
    modalVisible: boolean,
    targetcurrency: CurrencyEntity | null
    currencies: Array<CurrencyEntity>
    closeModal: (target: boolean) => void
    selectedCurrency: (target: CurrencyEntity) => void
}

export function CurrencyModal({ modalVisible, targetcurrency, currencies, closeModal, selectedCurrency }: CurrencyModalProp) {
    const { theme } = useTheme()
    const styles = createStyles(theme)
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => closeModal(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Selecione a Moeda</Text>
                    <FlatList
                        data={currencies}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.modalItem,
                                    targetcurrency === item && styles.modalItemSelected,
                                ]}
                                onPress={() => {
                                    selectedCurrency(item);
                                    closeModal(false);
                                }}
                            >
                                <Text style={styles.modalItemSymbol}>
                                    {item.symbol}
                                </Text>
                                <Text style={styles.modalItemText}>{item.name}</Text>
                                {targetcurrency === item && (
                                    <Text style={styles.checkmark}>✓</Text>
                                )}
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => closeModal(false)}
                    >
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

function createStyles(theme: TypeTheme) {
    return StyleSheet.create({
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