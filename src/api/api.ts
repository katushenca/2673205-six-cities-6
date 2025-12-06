import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {getToken} from './token.ts';
import {XTokenHeader, BACKEND_URL} from '../const.ts';

const TIMEOUT = 3_000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: TIMEOUT,
  });
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const currentToken = getToken();

      if (currentToken && config.headers) {
        config.headers[XTokenHeader] = currentToken;
      }
      return config;
    }
  );
  return api;
};
