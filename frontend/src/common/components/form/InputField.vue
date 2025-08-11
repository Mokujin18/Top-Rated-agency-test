<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate';
import { twM } from '../../utils/style.ts';
import { CustomInput } from '../ui';

defineOptions({
  inheritAttrs: false,
});

withDefaults(
  defineProps<{
    name: string;
    label: string;
    type: string;
    rules?: string;
    placeholder?: string;
    classForError?: string;
  }>(),
  {
    type: 'text',
    rules: '',
    placeholder: '',
  },
);
</script>

<template>
  <div class="flex flex-col mb-4 w-full">
    <label :for="name" class="text-primary-900 mb-1.5 font-semibold text-sm">{{ label }}</label>
    <Field :name="name" :rules="rules" v-slot="{ field }">
      <CustomInput
        :placeholder="placeholder"
        v-bind="{ ...field, ...$attrs }"
        :id="name"
        :type="type"
        class="background-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 text-white"
      />
    </Field>
    <ErrorMessage
      :name="name"
      :class="twM('text-status-error text-sm mt-1.5 font-medium absolute', classForError)"
    />
  </div>
</template>
