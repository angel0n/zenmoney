import axios from 'axios';
import { getUser, removeUser } from '../storage/AuthStorage';
import { replace } from '../../navigation/NavigationRef';


export const api = axios.create({
  baseURL: 'http://192.168.15.66:3000',
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const user = await getUser();

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);



api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error?.response?.status;    
    if (status === 401) {
      await removeUser();
      replace('Login');
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
