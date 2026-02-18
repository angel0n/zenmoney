// src/components/FloatingActionButton.tsx
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  Text,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeContext';
import { TypeTheme } from '@/theme/typeTheme';

interface MenuItem {
  icon: any;
  label: string;
  onPress: () => void;
  color?: string;
}

interface FloatingActionButtonProps {
  menuItems: MenuItem[];
}

export function FloatingActionButton({ menuItems }: FloatingActionButtonProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [menuVisible, setMenuVisible] = useState(false);
  const [rotateAnimation] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    const toValue = menuVisible ? 0 : 1;

    Animated.spring(rotateAnimation, {
      toValue,
      useNativeDriver: true,
      friction: 5,
    }).start();

    setMenuVisible(!menuVisible);
  };

  const handleMenuItemPress = (onPress: () => void) => {
    setMenuVisible(false);
    Animated.spring(rotateAnimation, {
      toValue: 0,
      useNativeDriver: true,
      friction: 5,
    }).start();
    onPress();
  };

  const rotation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <>
      {/* Modal com overlay */}
      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <Pressable
          style={styles.overlay}
          onPress={toggleMenu}
        >
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(item.onPress)}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemContent}>
                  <View
                    style={[
                      styles.menuIconContainer,
                      item.color && { backgroundColor: item.color },
                    ]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={24}
                      color="#fff"
                    />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Botão Principal */}
      <TouchableOpacity
        style={styles.fab}
        onPress={toggleMenu}
        activeOpacity={0.8}
      >
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <Ionicons name="add" size={32} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    </>
  );
}

function createStyles(theme: TypeTheme) {
  return StyleSheet.create({
    fab: {
      position: 'absolute',
      bottom: 80,
      right: 20,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      zIndex: 1000,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    menuContainer: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingTop: 24,
      paddingBottom: 40,
      paddingHorizontal: 20,
      maxHeight: '50%',
    },
    menuItem: {
      marginBottom: 16,
    },
    menuItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: 16,
      borderRadius: 12,
    },
    menuIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    menuLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      flex: 1,
    },
  });
}