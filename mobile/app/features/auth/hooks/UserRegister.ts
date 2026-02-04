import { useState } from 'react';
import { RegisterState } from '../types/TypeState';
import { registerUser } from '../services/AuthServices';

export function useRegister() {
  const [state, setState] = useState<RegisterState>({
    email: '',
    nome: '',
    senha: '',
    confirmeSenha: '',
    loading: false,
    error: null,
  });

  function validate(): string | null {
    if (!state.email.trim()) return 'E-mail é obrigatório';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) return 'E-mail inválido';

    if (!state.nome.trim()) return 'Nome é obrigatório';
    if (state.nome.length < 3) return 'Nome deve ter pelo menos 3 caracteres';

    if (!state.senha) return 'Senha é obrigatória';
    if (state.senha.length < 6) return 'Senha deve ter no mínimo 6 caracteres';

    if (state.senha !== state.confirmeSenha) return 'As senhas não conferem';

    return null;
  }

  async function submit(onSuccess: () => void) {
    const error = validate();
    if (error) {
      setState(prev => ({ ...prev, error }));
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      await registerUser({
        email: state.email,
        nome: state.nome,
        senha: state.senha,
      });

      onSuccess();
    } catch(error: any) {      
      setState(prev => ({
        ...prev,
        error: error.response.data.message,
      }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }

  return {
    state,
    setState,
    submit,
  };
}
