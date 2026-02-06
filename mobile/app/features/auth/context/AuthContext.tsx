import { api } from '@/shared/services/api/Api';
import { getUser, removeUser, saveUser } from '@/shared/services/storage/AuthStorage';
import { UserEntity } from '@/shared/entity/UserEntity';
import { createContext, useContext, useState } from 'react';

type AuthContextData = {
  user: any;
  loading: boolean;
  signIn: (user: any) => Promise<void>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    setLoading(true);
    const storedUser = await getUser();

    if (!storedUser?.token) {
      setUser(null);
      setLoading(false);
      return;
    }
    
    try {
      const validatedUser = await validateToken(storedUser.token);
      setUser(validatedUser);
      await saveUser(validatedUser);
    } catch(e) {
      setUser(null);
      await removeUser();      
    }

    setLoading(false);
  }

  async function signIn(userData: UserEntity) {
    setLoading(true);
    setUser(userData);
    await saveUser(userData);
    setLoading(false);
  }

  async function signOut() {
    setUser(null);

  }

  async function validateToken(token: string) {
    const response = await api.post('/auth/validate', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signOut, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
