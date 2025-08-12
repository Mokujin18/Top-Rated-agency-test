<script setup lang="ts">
import { useUserStore } from '@common/stores/useUserStore.ts';
import { storeToRefs } from 'pinia';
import { CustomText, CustomButton } from '@common/components/ui';
import { useRouter } from 'vue-router';
import { ROUTES } from '@common/constants';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const router = useRouter();

const handleNavigate = () => {
  router.push(ROUTES.PRODUCTS);
};

const handleNavigateDashboard = () => {
  router.push(ROUTES.DASHBOARD);
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="w-full max-w-md rounded-lg bg-gray-600 p-8 shadow-lg">
      <div class="text-center">
        <CustomText variant="title" tag="h1" class="mb-4">
          Welcome Back, {{ user?.name }}!
        </CustomText>
        <CustomText variant="subtitle" class="mb-6 text-gray-500">
          We're glad to see you again.
        </CustomText>
      </div>

      <div class="mt-6 rounded-md border border-gray-200 bg-gray-400 p-4">
        <CustomText variant="subtitle" class="mb-2 font-semibold"> Your Profile </CustomText>
        <div class="space-y-2">
          <div class="flex justify-between">
            <CustomText class="text-gray-600">Name:</CustomText>
            <CustomText class="font-medium">{{ user?.name }}</CustomText>
          </div>
          <div class="flex justify-between">
            <CustomText class="text-gray-600">Email:</CustomText>
            <CustomText class="font-medium">{{ user?.email }}</CustomText>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div class="mb-4">
          <CustomButton class="w-full" @click="handleNavigateDashboard"> Dashboard </CustomButton>
        </div>
        <div class="mb-4">
          <CustomButton class="w-full" @click="handleNavigate"> Products </CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>
