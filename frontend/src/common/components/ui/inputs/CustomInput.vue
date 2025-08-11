<script setup lang="ts">
import { twM } from '@common/utils/style.ts';

withDefaults(
  defineProps<{
    variant?: string;
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
      )
    "
  />
</template>
