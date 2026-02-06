import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TransferenciaTab from "../screens/TransferenciaTab";
import { HomeTab } from "../screens/HomeTab";
import CarteiraTab from "../screens/CarteiraTab";
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
                    let iconName = "";

                    if (route.name === 'Carteiras') {
                        iconName = 'home';
                    } else if (route.name === 'Transferencia') {
                        iconName = 'person';
                    } else if (route.name === 'Metas') {
                        iconName = 'flag';
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
                component={HomeTab}
            />
            <Tab.Screen
                name="Metas"
                component={CarteiraTab}
            />
        </Tab.Navigator >
    )
}