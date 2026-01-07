import { HttpService } from 'services/HttpService';
import type { LoginForm, LoginResponse } from './Models';


export const authLogin = async (form: LoginForm) => {
  const { data } = await HttpService.post<LoginResponse>('auth/login', form);
  return data;
};
