import { Button } from "@/shared/components/buttons/Button";
import { InputText } from "@/shared/components/inputs/InputText";
import { useTheme } from "@/theme/ThemeContext";
import { TypeTheme } from "@/theme/typeTheme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { useRegister } from "../hooks/UserRegister";

type Props = NativeStackScreenProps<any>;

export default function RegisterScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { state, setState, submit } = useRegister();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <InputText
          label="E-mail"
          value={state.email}
          onChangeText={email => setState(prev => ({ ...prev, email }))}
          placeholder="email@gmail.com"
        />

        <InputText
          label="Nome"
          value={state.nome}
          onChangeText={nome => setState(prev => ({ ...prev, nome }))}
          placeholder="Seu nome"
        />

        <InputText
          label="Senha"
          secureTextEntry
          value={state.senha}
          onChangeText={senha => setState(prev => ({ ...prev, senha }))}
          placeholder="******"
        />

        <InputText
          label="Confirme a senha"
          secureTextEntry
          value={state.confirmeSenha}
          onChangeText={confirmeSenha => setState(prev => ({ ...prev, confirmeSenha }))}
          placeholder="******"
        />

        <Button
          title="Registrar"
          loading={state.loading}
          onPress={() => submit(() => navigation.replace('Login'))}
        />

        {state.error && (
          <Text style={styles.mensageError}>{state.error}</Text>
        )}
        <Text style={styles.label} onPress={() => navigation.navigate('Login')} >Voltar para o Login</Text>
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
    card: {
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
  });
}
