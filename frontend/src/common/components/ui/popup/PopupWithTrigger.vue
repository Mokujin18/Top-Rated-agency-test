<script setup lang="ts">
import { ref } from 'vue';
import Popup, { type PopupProps } from './Popup.vue';
import { useOverlayComponentController } from '@common/composables/useOverlayComponentController.ts';

type Props = Omit<PopupProps, 'triggerRef' | 'modelValue'>;

const props = defineProps<Props>();

const { isOpen: isPopupOpen, toggle: togglePopup } = useOverlayComponentController({
  nameOfTriggerSlot: 'Popup',
  shouldThrowOnMissingTrigger: true,
});

const triggerRef: any = ref<HTMLElement | null>(null);
</script>

<template>
  <div class="relative inline-block text-left" ref="triggerRef">
    <slot name="trigger" :togglePopup="togglePopup"></slot>

    <Popup v-model="isPopupOpen" :trigger-ref="triggerRef" v-bind="props">
      <slot name="content" :closePopup="() => (isPopupOpen = false)"></slot>
    </Popup>
  </div>
</template>
