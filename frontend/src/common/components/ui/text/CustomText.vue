<script setup lang="ts">
import { computed, h } from 'vue';
import { useSlots } from 'vue';
import { twM } from '@common/utils/style.ts';

interface Props {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: 'title' | 'subtitle' | 'body' | 'text';
  color?: 'primary' | 'secondary' | 'default';
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'p',
  size: 'text',
  color: 'default',
});

const textClasses = computed(() =>
  twM(
    'transition-colors duration-300',
    {
      'text-4xl font-bold': props.size === 'title',
      'text-2xl font-semibold': props.size === 'subtitle',
      'text-lg': props.size === 'body',
      'text-base': props.size === 'text',
    },
    {
      'text-primary': props.color === 'primary',
      'text-secondary': props.color === 'secondary',
      'text-text-primary': props.color === 'default',
    },
  ),
);

const render = () => {
  return h(props.tag, { class: textClasses.value }, slots.default ? slots.default() : '');
};

const slots = useSlots();
</script>

<template>
  <render />
</template>
