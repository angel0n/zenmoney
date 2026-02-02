import { useTheme } from "@/theme/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { navigationRef } from "@/navigation/NavigationRef";
import LoadingScreen from "@/features/auth/screens/LoadingScreen";
import LoginScreen from "@/features/auth/screens/LoginScreen";
import HomeScreen from "@/features/home/screens/HomeScreen";
import RegisterScreen from "@/features/auth/screens/RegisterScreen";


const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    const { theme } = useTheme()
    return (
        <NavigationContainer ref={navigationRef}>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Loading" component={LoadingScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    )
}