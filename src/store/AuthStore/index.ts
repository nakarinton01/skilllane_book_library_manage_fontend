import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Auth = {
  accessToken: string;
};

export type AuthStore = {
  auth: Auth;
  setAuth: (data: Auth) => void;
  logout: () => void;
};

export const initialAuthStore: Auth = {
  accessToken: '',
};

const useAuthorization = create<AuthStore>()(
  persist(
    (set) => ({
      auth: initialAuthStore,
      setAuth: (auth) => set(() => ({ auth })),
      logout: () => set(() => ({ auth: initialAuthStore })),
    }),
    {
      name: 'auth-store',
    },
  ),
);

export default useAuthorization;
