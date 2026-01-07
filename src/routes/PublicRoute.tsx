import { Navigate, Outlet } from 'react-router-dom';

import useAuthorization from 'store/AuthStore';

export function PublicRoute() {
  const { accessToken } = useAuthorization((state) => state.auth);

  return !accessToken ? <Outlet /> : <Navigate to="/" />;
}
