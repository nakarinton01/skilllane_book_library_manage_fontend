import { AxiosError, HttpStatusCode } from 'axios';

import type { ErrorResponse } from 'services/HttpService';
import useAuthorization from 'store/AuthStore';
import { errorAlert } from 'utils/dialogs';

export default function useHttpExceptions() {
  const logout = useAuthorization((state) => state.logout);

  const handleHttpException = async (error: AxiosError<ErrorResponse>) => {
    const statusCode = error.response?.status;
    const message = error.response?.data?.message || 'Something went wrong, Try again later.';
    switch (statusCode) {
      case HttpStatusCode.Unauthorized:
        await errorAlert({
          title: 'Token is expired',
          text: 'Token is expired, Please re-login',
        }).then(() => {
          localStorage.clear();
          logout();
        });
        break;
      default:
        await errorAlert({ title: 'Oop!', text: message });
        break;
    }
  };
  return {
    handleHttpException,
  };
}
