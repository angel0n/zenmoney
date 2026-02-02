import { api } from '@/services/api/Api';
import { UserEntity } from '@/shared/entity/UserEntity';

type RegisterPayload = {
  email: string;
  nome: string;
  senha: string;
};

export async function registerUser(payload: RegisterPayload) {
  await api.post('/auth/register', payload);
}

export async function loginUser(email: string, senha: string): Promise<UserEntity> {
    const response = await api.post('/auth/login', { email, senha });
    return response.data;
}