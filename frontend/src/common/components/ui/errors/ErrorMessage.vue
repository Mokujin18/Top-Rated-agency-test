<script setup lang="ts">
import { getErrorMessage } from '../../../utils/errors.ts';

defineProps<{
  error: Error | unknown;
}>();
</script>

<template>
  <span v-if="getErrorMessage(error)" class="text-red-500">{{ getErrorMessage(error) }}</span>
</template>
