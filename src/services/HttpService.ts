import axios, { HttpStatusCode } from 'axios';
import { unstable_batchedUpdates } from 'react-dom';

import useAuthorization from 'store/AuthStore';

export type Meta = {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

const apiUrl = 'http://localhost:3000';

export const HttpService = axios.create({
  baseURL: apiUrl,
});

export const getAccessToken = () => {
  return unstable_batchedUpdates(() => useAuthorization.getState().auth.accessToken);
};

HttpService.interceptors.request.use((config: any) => {
  config.headers['authorization'] = `Bearer ${getAccessToken()}`;
  return config;
});

HttpService.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  },
);

export type ErrorResponse = {
  error?: string;
  message?: string;
  statusCode?: HttpStatusCode;
};