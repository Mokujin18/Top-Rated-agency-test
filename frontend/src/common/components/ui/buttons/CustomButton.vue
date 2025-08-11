<script setup lang="ts">
import { computed } from 'vue';
import { twM } from '@common/utils/style.ts';

interface Props {
  variant?: 'primary' | 'secondary';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
});

const buttonClasses = computed(() =>
  twM(
    'py-2 px-6 rounded-lg font-semibold shadow-lg focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out transform hover:scale-105',
    {
      'bg-primary text-text-primary hover:bg-primary-light focus:ring-primary-light/50':
        props.variant === 'primary',
      'bg-secondary text-text-primary hover:bg-green-500 focus:ring-green-500/50':
        props.variant === 'secondary',
    },
  ),
);
</script>

<template>
  <button :class="buttonClasses">
    <slot></slot>
  </button>
</template>
