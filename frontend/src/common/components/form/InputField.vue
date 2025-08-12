<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate';
import { CustomInput } from '../ui';
import { twM } from '@common/utils/style.ts';

defineOptions({
  inheritAttrs: false,
});

withDefaults(
  defineProps<{
    name: string;
    label: string;
    type?: string;
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
  <div class="flex flex-col mb-4 w-full relative">
    <label :for="name" class="text-text-secondary mb-1.5 font-semibold text-sm">{{ label }}</label>
    <Field :name="name" :rules="rules" v-slot="{ field, meta }">
      <CustomInput
        :placeholder="placeholder"
        v-bind="{ ...field, ...$attrs }"
        :id="name"
        :type="type"
        :additional-class="
          twM({
            '!border-error focus:!ring-error': !meta.valid && meta.touched,
          })
        "
      />
    </Field>
    <ErrorMessage
      :name="name"
      :class="twM('text-error text-sm mt-1.5 font-medium', classForError)"
    />
  </div>
</template>
