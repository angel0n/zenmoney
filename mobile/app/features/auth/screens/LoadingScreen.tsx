import { useTheme } from "@/theme/ThemeContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuth } from "@/features/auth/context/AuthContext";
import { TypeTheme } from "@/theme/typeTheme";


type Props = NativeStackScreenProps<any>;

export default function LoadingScreen({ navigation }: Props) {
    const { loadUser, loading, user } = useAuth();
    const { theme } = useTheme()
    const styles = createStyles(theme);

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        if (!loading) {
            if (user) {
                navigation.replace('Home');
            } else {
                navigation.replace('Login');
            }
        }
    }, [loading]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={theme.colors.primary}/>
        </View>
    );
}

function createStyles(theme: TypeTheme) {
    return StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center' 
        },
    })
}


