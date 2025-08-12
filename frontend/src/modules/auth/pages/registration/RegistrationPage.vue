<script setup lang="ts">
import { useUserStore } from '@common/stores/useUserStore.ts';
import { RouterLink } from 'vue-router';
import { CustomText, Loader } from '@common/components/ui';
import AuthForm from '@modules/auth/components/AuthForm.vue';
import InputField from '@common/components/form/InputField.vue';
import { ROUTES } from '@common/constants';
import { initialValues } from '@modules/auth/pages/registration/constants.ts';
import type { RegistrationForm } from '@modules/auth/pages/registration/types.ts';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isLoading, error } = storeToRefs(userStore);

const handleRegister = async (values: RegistrationForm) => {
  await userStore.register(values);
};
</script>

<template>
  <Loader :is-loading="isLoading" />
  <AuthForm
    :initial-values="initialValues"
    title="Create an Account"
    button-text="Register"
    @submit="handleRegister"
  >
    <InputField
      name="name"
      type="text"
      label="Name"
      placeholder="Your Name"
      rules="required|min:3"
    />
    <template #footer>
      <CustomText class="text-center">
        Already have an account?
        <RouterLink :to="ROUTES.LOGIN" class="font-semibold text-primary hover:text-primary-light">
          Log in
        </RouterLink>
      </CustomText>
      <ErrorMessage class="text-center" :error="error" />
    </template>
  </AuthForm>
</template>
