<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const modalContent = ref<HTMLElement | null>(null);

const closeModal = () => {
  emit('update:modelValue', false);
};

const ignore = [modalContent];
onClickOutside(modalContent, closeModal, { ignore, capture: false });
</script>

<template>
  <teleport to="body" v-if="modelValue">
    <div class="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
      <div
        ref="modalContent"
        class="bg-black p-8 relative min-w-[300px] max-w-[90%] rounded-[8px] shadow-[0_5px_15px_rgba(0,0,0,0.3)] popup-ignore-close"
      >
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>
