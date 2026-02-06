import { UserEntity } from '@/shared/entity/UserEntity';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@user';

export async function saveUser(user: UserEntity) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getUser(): Promise<UserEntity | null> {
  const data = await AsyncStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export async function removeUser() {
  await AsyncStorage.removeItem(USER_KEY);
}
