<script setup lang="ts">
import { useUserStore } from '@common/stores/useUserStore.ts';
import { RouterLink } from 'vue-router';
import { CustomText, ErrorMessage, Loader } from '@common/components/ui';
import AuthForm from '@modules/auth/components/AuthForm.vue';
import { ROUTES } from '@common/constants';
import { initialValues } from '@modules/auth/pages/login/constants.ts';
import type { LoginForm } from '@modules/auth/pages/login/types.ts';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isLoading, error } = storeToRefs(userStore);

const handleLogin = async (values: LoginForm) => {
  await userStore.login(values);
};
</script>

<template>
  <Loader :is-loading="isLoading" />
  <AuthForm
    :initial-values="initialValues"
    title="Welcome Back!"
    button-text="Log In"
    @submit="handleLogin"
  >
    <template #footer>
      <CustomText class="text-center">
        Don't have an account?
        <RouterLink
          :to="ROUTES.REGISTERATION"
          class="font-semibold text-primary hover:text-primary-light"
        >
          Sign up
        </RouterLink>
      </CustomText>
      <ErrorMessage class="text-center" :error="error" />
    </template>
  </AuthForm>
</template>
