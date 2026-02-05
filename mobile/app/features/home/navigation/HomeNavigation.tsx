import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TransferenciaTab from "../screens/TransferenciaTab";
import {HomeTab} from "../screens/HomeTab";
import CarteiraTab from "../screens/CarteiraTab";
import { useTheme } from "@/theme/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

const Tab = createBottomTabNavigator();

export function HomeNavigation() {
    const { theme } = useTheme();
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
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
            }}
        >
            <Tab.Screen
                name="Transferencia"
                component={TransferenciaTab}
            />
            <Tab.Screen
                name="Home"
                component={HomeTab}
            />
            <Tab.Screen
                name="Carteira"
                component={CarteiraTab}
            />
        </Tab.Navigator >
    )
}