import { View, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@/theme/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { InputText } from '@/shared/components/inputs/InputText';
import { TypeTheme } from '@/theme/typeTheme';
import { Button } from '@/shared/components/buttons/Button';
import { useState } from 'react';
import { LoginState } from '../types/TypeState';
import { loginUser } from '../services/AuthServices';

type Props = NativeStackScreenProps<any>;


export default function LoginScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const { signIn } = useAuth();

  const [state, setState] = useState<LoginState>({
    email: '',
    password: '',
    loading: false,
    error: null,
  });

  const styles = createStyles(theme);

  async function handleLogin() {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const newUser = await loginUser(state.email, state.password);
      if (!newUser?.token) {
        console.log("Falha");
        setState(prev => ({ ...prev, loading: false, error: 'Não foi possível realizar o login. Verifique suas credenciais.' }));
        return;
      }
      await signIn(newUser);
      setState(prev => ({ ...prev, loading: false }));
      navigation.replace('Home');
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: 'Não foi possível realizar o login' }));
    }
  }

  return (
    <View style={styles.container} >
      <View style={styles.cardLogin} >
        <InputText onChangeText={(value) => setState({ ...state, email: value })} value={state.email} label='Login' placeholder='Login' />
        <InputText onChangeText={(value) => setState({ ...state, password: value })} value={state.password} label='Senha' placeholder='Senha' secureTextEntry={true} />
        <Button title="Entrar" onPress={handleLogin} loading={state.loading} />
        {state.error && <Text style={styles.mensageError} >{state.error}</Text>}
        <Text style={styles.label} onPress={() => navigation.navigate('Register')} >Não possui conta? Cadastre-se</Text>
      </View>

    </View>
  );
}

function createStyles(theme: TypeTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    cardLogin: {
      width: '80%',
      padding: 20,
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      gap: 10,
    },
    mensageError: {
      color: theme.colors.error,
      textAlign: 'center',
    },
    label: {
      color: theme.colors.textSecondary,
      textAlign: 'center',
    }
  })
}
