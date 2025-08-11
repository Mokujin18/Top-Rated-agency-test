import { defineStore } from 'pinia';
import { ref } from 'vue';
import { LOCAL_STORAGE_KEYS, ROUTES } from '@common/constants';
import { useRouter } from 'vue-router';
import { HttpService } from '@common/services/httpService.ts';

export const useUserStore = defineStore(
	'user',
	() => {
		const router = useRouter();
		const user = ref<any | null>(null);
		const tokens = ref<any | null>(null);

		const setUser = (payload: any) => {
			user.value = payload;
		};

		const setTokens = (payload: any) => {
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


		return {
			user,
			tokens,
			setUser,
			setTokens,
			logout,
			isAuthenticated,
			refreshTokens,
		};
	},
	{
		persist: {
			storage: localStorage,
			key: LOCAL_STORAGE_KEYS.USER,
		},
	},
);
