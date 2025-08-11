<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

export type PopupProps = {
  modelValue: boolean;
  triggerRef?: Ref<HTMLElement | null>;
  ignoreClickOutside?: string[];
};

const props = defineProps<PopupProps>();

const emit = defineEmits(['update:modelValue']);

const popupContent = ref<HTMLElement | null>(null);

const closePopup = () => {
  emit('update:modelValue', false);
};

const ignore = props.triggerRef ? [props.triggerRef] : [];
if (props.ignoreClickOutside) {
  ignore.push(...(props.ignoreClickOutside as any));
}

onClickOutside(popupContent, closePopup, { ignore, capture: false });
</script>

<template>
  <transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <div
      v-if="modelValue"
      ref="popupContent"
      class="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
