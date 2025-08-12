import { defineStore } from 'pinia';
import { ref } from 'vue';
import { LOCAL_STORAGE_KEYS, ROUTES } from '@common/constants';
import { useRouter } from 'vue-router';
import { HttpService } from '@common/services/httpService.ts';
import type { LoginForm } from '@modules/auth/pages/login/types.ts';
import type { RegistrationForm } from '@modules/auth/pages/registration/types.ts';
import { authApi } from '@modules/auth/api.ts';
import type { Tokens, User } from '@common/types/auth.ts';

export const useUserStore = defineStore(
  'user',
  () => {
    const router = useRouter();
    const user = ref<User | null>(null);
    const tokens = ref<Tokens | null>(null);
    const isLoading = ref(false);
    const error = ref<Error | null>(null);

    const setUser = (payload: User) => {
      user.value = payload;
    };

    const setTokens = (payload: Tokens) => {
      tokens.value = payload;
    };

    const logout = async () => {
      user.value = null;
      tokens.value = null;
      await router.push(ROUTES.LOGIN);
    };

    const isAuthenticated = () => {
      return !!tokens.value?.accessToken;
    };

    const refreshTokens = async () => {
      return await HttpService.refreshToken();
    };

    const login = async (values: LoginForm) => {
      isLoading.value = true;

      try {
        const { data } = await authApi.login(values);
        setUser(data.user);
        setTokens(data.tokens);
        await router.push(ROUTES.HOME);
      } catch (e) {
        error.value = e as Error;
      }
    };

    const register = async (values: RegistrationForm) => {
      isLoading.value = true;

      try {
        const { data } = await authApi.registration(values);
        setUser(data.user);
        setTokens(data.tokens);
        await router.push(ROUTES.HOME);
      } catch (e) {
        error.value = e as Error;
      }
    };

    return {
      user,
      tokens,
      setUser,
      setTokens,
      logout,
      isAuthenticated,
      refreshTokens,
      login,
      register,
      isLoading,
      error,
    };
  },
  {
    persist: {
      storage: localStorage,
      key: LOCAL_STORAGE_KEYS.USER,
    },
  },
);
