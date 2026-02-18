import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TransferenciaTab from "../screens/TransferenciaTab";
import { WalletTab } from "../screens/WalletTab";
import CarteiraTab from "../screens/GoalTab";
import { useTheme } from "@/theme/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { View } from "react-native";
import { FloatingActionButton } from "@/shared/components/buttons/FloatingActionButton";

const Tab = createBottomTabNavigator();

export function HomeNavigation() {
    const { theme } = useTheme();

    const menuItems = [
        {
            icon: 'wallet',
            label: 'Nova Carteira',
            onPress: () => {},
            color: '#48bb78',
        },
        {
            icon: 'cash',
            label: 'Nova Moeda',
            onPress: () => {},
            color: '#38b2ac',
        },
        {
            icon: 'pricetag',
            label: 'Nova Categoria',
            onPress: () => {},
            color: '#ed8936',
        },
        {
            icon: 'trophy',
            label: 'Nova Meta',
            onPress: () => {},
            color: '#f6ad55',
        },
    ];
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName="Carteiras"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        borderTopWidth: 0
                    },
                    tabBarBackground: () => (
                        <LinearGradient
                            colors={[
                                theme.colors.surface,
                                theme.colors.background,
                            ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={{ flex: 1 }}
                        />
                    ),
                    tabBarIcon: ({ color, size }) => {
                        let iconName: any = "";

                        if (route.name === 'Carteiras') {
                            iconName = 'wallet';
                        } else if (route.name === 'Transferencia') {
                            iconName = 'swap-horizontal';
                        } else if (route.name === 'Metas') {
                            iconName = 'trophy-outline';
                        }

                        return (
                            <Ionicons name={iconName} size={size} color={color} />
                        );
                    }
                })}
            >
                <Tab.Screen
                    name="Transferencia"
                    component={TransferenciaTab}
                />
                <Tab.Screen
                    name="Carteiras"
                    component={WalletTab}
                />
                <Tab.Screen
                    name="Metas"
                    component={CarteiraTab}
                />
            </Tab.Navigator >
            <FloatingActionButton menuItems={menuItems} />
        </View>
    )
}