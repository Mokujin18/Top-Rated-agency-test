<script setup lang="ts">
import { twM } from '@common/utils/style.ts';

withDefaults(
  defineProps<{
    variant?: string;
    additionalClass?: string;
  }>(),
  {
    variant: 'default',
  },
);
</script>

<template>
  <input
    :class="
      twM(
        '[-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
        'bg-surface border-2 border-transparent rounded-lg p-2.5 w-full text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300',
        additionalClass,
      )
    "
  />
</template>
