import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TransferenciaTab from "../screens/TransferenciaTab";
import { WalletTab } from "../screens/WalletTab";
import CarteiraTab from "../screens/GoalTab";
import { useTheme } from "@/theme/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function HomeNavigation() {
    const { theme } = useTheme();
    return (
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
                    let iconName:any = "";

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
    )
}