<script setup lang="ts">
import { Form } from 'vee-validate';
import { CustomButton, CustomText } from '@common/components/ui';
import InputField from '@common/components/form/InputField.vue';

interface Props {
  initialValues: object;
  title: string;
  buttonText: string;
}

defineProps<Props>();

const emit = defineEmits(['submit']);

const handleSubmit = (values: any) => {
  emit('submit', values);
};
</script>

<template>
  <div class="flex justify-center items-center min-h-full">
    <div class="w-full max-w-md p-8 space-y-8 bg-surface rounded-xl shadow-lg">
      <CustomText tag="h1" size="title" color="primary" class="text-center">{{ title }}</CustomText>
      <Form @submit="handleSubmit" :initial-values="initialValues" v-slot="{ isSubmitting }">
        <div class="space-y-6">
          <slot></slot>
          <InputField
            name="email"
            type="email"
            label="Email"
            placeholder="your.email@example.com"
            rules="required|email"
          />
          <InputField
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            rules="required|min_value:8"
          />
          <CustomButton type="submit" :disabled="isSubmitting" class="w-full">
            {{ buttonText }}
          </CustomButton>
        </div>
      </Form>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
