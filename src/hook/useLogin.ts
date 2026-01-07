import { AxiosError } from "axios";
import { useMutation } from "react-query";

import { authLogin } from "services/AuthService";
import type { LoginForm } from "services/AuthService/Models";
import { errorAlert } from "utils/dialogs";

export const useAuth = () => {
  const {
    mutateAsync: create,
    isLoading,
    isSuccess,
  } = useMutation(({ form }: any) => authLogin(form), {
    onError: async (resp: AxiosError) => {
      await errorAlert({ title: "Login failed", text: "Username or Password is incorrect" });
    },
  });
  async function submitLogin(form: LoginForm) {
    const data = await create({ form });
    return data;
  }
  return {
    submitLogin,
    isLoading,
    isSuccess,
  };
};
