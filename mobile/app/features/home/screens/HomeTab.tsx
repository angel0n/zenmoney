//@ts-nocheck
import React, { use, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TypeTheme } from '@/theme/typeTheme';
import { useTheme } from '@/theme/ThemeContext';

// Taxas de câmbio simuladas (base: USD)
const exchangeRates = {
  BRL: 4.95,
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.88,
};

const currencySymbols = {
  BRL: 'R$',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF',
};

const currencyNames = {
  BRL: 'Real Brasileiro',
  USD: 'Dólar Americano',
  EUR: 'Euro',
  GBP: 'Libra Esterlina',
  JPY: 'Iene Japonês',
  CAD: 'Dólar Canadense',
  AUD: 'Dólar Australiano',
  CHF: 'Franco Suíço',
};

export function HomeTab() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [selectedCurrency, setSelectedCurrency] = useState('BRL');
  const [modalVisible, setModalVisible] = useState(false);

  // Dados de exemplo - valores em cada moeda
  const walletData = [
    { currency: 'BRL', amount: 5000 },
    { currency: 'USD', amount: 1000 },
    { currency: 'EUR', amount: 500 },
    { currency: 'GBP', amount: 300 },
    { currency: 'JPY', amount: 50000 },
  ];

  // Converter todas as moedas para a moeda selecionada
  const convertToSelectedCurrency = (amount, fromCurrency) => {
    const amountInUSD = amount / exchangeRates[fromCurrency];
    return amountInUSD * exchangeRates[selectedCurrency];
  };

  // Calcular total
  const calculateTotal = () => {
    return walletData.reduce((total, item) => {
      return total + convertToSelectedCurrency(item.amount, item.currency);
    }, 0);
  };

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const CurrencyCard = ({ currency, amount, isTotal = false }) => {
    const convertedAmount = isTotal
      ? amount
      : convertToSelectedCurrency(amount, currency);
    const displayCurrency = isTotal ? selectedCurrency : currency;

    return (
      <View style={[styles.card, isTotal && styles.totalCard]}>
        {isTotal ? (
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientCard}
          >
            <TouchableOpacity
              style={styles.currencySelector}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.selectedCurrencyText}>
                {currencyNames[selectedCurrency]}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
            <Text style={styles.totalAmount}>
              {currencySymbols[displayCurrency]}{' '}
              {formatCurrency(convertedAmount, displayCurrency)}
            </Text>
          </LinearGradient>
        ) : (
          <View style={styles.currencyRow}>
            <View style={styles.currencyInfo}>
              <View style={styles.currencyIcon}>
                <Text style={styles.currencyIconText}>
                  {currencySymbols[currency]}
                </Text>
              </View>
              <View>
                <Text style={styles.currencyName}>{currencyNames[currency]}</Text>
                <Text style={styles.originalAmount}>
                  {currencySymbols[currency]} {formatCurrency(amount, currency)}
                </Text>
              </View>
            </View>
            <View style={styles.convertedAmountContainer}>
              <Text style={styles.convertedAmount}>
                {currencySymbols[selectedCurrency]}{' '}
                {formatCurrency(convertedAmount, selectedCurrency)}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Minhas Finanças</Text>

        {/* Card Total */}
        <CurrencyCard isTotal amount={calculateTotal()} />

        {/* Lista de Moedas */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Suas Moedas</Text>
          {walletData.map((item, index) => (
            <View key={item.currency} style={styles.currencyItem}>
              <Text style={styles.itemNumber}>{index + 1}°</Text>
              <View style={styles.itemContent}>
                <CurrencyCard currency={item.currency} amount={item.amount} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal de Seleção de Moeda */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione a Moeda</Text>
            <FlatList
              data={Object.keys(currencyNames)}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    selectedCurrency === item && styles.modalItemSelected,
                  ]}
                  onPress={() => {
                    setSelectedCurrency(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemSymbol}>
                    {currencySymbols[item]}
                  </Text>
                  <Text style={styles.modalItemText}>{currencyNames[item]}</Text>
                  {selectedCurrency === item && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

function createStyles(theme: TypeTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 20,
    },
    header: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
      marginTop: 60,
      marginBottom: 20,
    },
    card: {
      borderRadius: 16,
      marginBottom: 12,
      backgroundColor: theme.colors.surface,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    totalCard: {
      marginBottom: 30,
      overflow: 'hidden',
    },
    gradientCard: {
      padding: 24,
      borderRadius: 16,
    },
    totalLabel: {
      fontSize: 16,
      color: '#fff',
      opacity: 0.9,
      marginBottom: 8,
    },
    currencySelector: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 12,
      marginBottom: 16,
    },
    selectedCurrencyText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    dropdownIcon: {
      fontSize: 12,
      color: '#fff',
    },
    totalAmount: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#fff',
    },
    listContainer: {
      marginBottom: 30,
    },
    listTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: 16,
    },
    currencyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    itemNumber: {
      fontSize: 16,
      fontWeight: '600',
      color: '#718096',
      width: 30,
    },
    itemContent: {
      flex: 1,
    },
    currencyRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    currencyInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    currencyIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#edf2f7',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    currencyIconText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#667eea',
    },
    currencyName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: 4,
    },
    originalAmount: {
      fontSize: 14,
      color: '#718096',
    },
    convertedAmountContainer: {
      alignItems: 'flex-end',
    },
    convertedAmount: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2d3748',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: '#fff',
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
      color: '#2d3748',
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
      backgroundColor: '#f7fafc',
    },
    modalItemSelected: {
      backgroundColor: '#e6f0ff',
    },
    modalItemSymbol: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#667eea',
      width: 40,
    },
    modalItemText: {
      fontSize: 16,
      color: '#2d3748',
      flex: 1,
    },
    checkmark: {
      fontSize: 20,
      color: '#667eea',
      fontWeight: 'bold',
    },
    closeButton: {
      backgroundColor: '#667eea',
      paddingVertical: 16,
      borderRadius: 12,
      marginTop: 16,
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
}
