import { env } from '../constants/env.ts';
import axios, { type AxiosRequestConfig } from 'axios';
import { LOCAL_STORAGE_KEYS } from '@common/constants';
import { useUserStore } from '@common/stores/useUserStore.ts';
import type { Tokens } from "@common/types/auth.ts";

export const apiClient = axios.create({
  baseURL: `${env.API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async config => {
  const authHeader = HttpService.getAuthBearerToken();
  if (!authHeader) {
    return config;
  }

  config.headers.Authorization = authHeader;

  return config;
});

apiClient.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    const originalRequest = error?.config;
    const errorMessage = error?.response?.data?.message || 'Unknown error';
    if (errorMessage === 'jwt expired' && !originalRequest._retry) {
      await HttpService.refreshToken();
      return apiClient(originalRequest);
    }
    throw new Error(errorMessage);
  },
);

export class HttpService {
  get<D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return apiClient.get(url, config);
  }

  post<D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return apiClient.post(url, data, config);
  }

  put<D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return apiClient.put(url, data, config);
  }

  delete<D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return apiClient.delete(url, config);
  }

  static getAuthBearerToken() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    const parsedData = JSON.parse(data || '{}');
    if (!parsedData?.tokens?.accessToken) {
      return null;
    }

    const { accessToken: token } = parsedData.tokens;

    return token ? `Bearer ${token}` : null;
  }

  static setAuthBearerToken({ accessToken, refreshToken }: Tokens) {
    const { setTokens } = useUserStore();
    setTokens({ accessToken, refreshToken });

    apiClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }

  static async refreshToken() {
    const authHeader = HttpService.getAuthBearerToken();
    const refreshToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USER) || '{}')?.tokens
      ?.refreshToken;
    const { logout } = useUserStore();

    const res = await fetch(`${env.API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        authorization: authHeader ?? '',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      await logout();
    }

    const data = await res.json();

    const newAccessToken = data?.data?.tokens?.accessToken;
    const newRefreshToken = data?.data?.tokens?.refreshToken;
    if (!newAccessToken && !newRefreshToken) {
      await logout();
      throw new Error('Помилка рефрешу токену');
    }

    HttpService.setAuthBearerToken({ accessToken: newAccessToken, refreshToken: newRefreshToken });

    return data;
  }
}

export const httpService = new HttpService();
