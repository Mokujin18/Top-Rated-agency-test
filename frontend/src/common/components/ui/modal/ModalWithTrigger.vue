<script setup lang="ts">
import ClearModal from './ClearModal.vue';
import { CustomButton, CustomText } from '@common/components/ui';
import { useOverlayComponentController } from '@common/composables/useOverlayComponentController.ts';

const props = withDefaults(
  defineProps<{
    onCloseModal?: () => void;
    onOpenModal?: () => void;
    onSaveModal?: () => void;
    saveButtonText?: string;
    cancelButtonText?: string;
    shouldRenderButtons?: boolean;
    modalTitle?: string;
    subtitle?: string;
  }>(),
  {
    saveButtonText: 'Зберегти',
    cancelButtonText: 'Закрити',
    shouldRenderButtons: true,
    modalTitle: 'Modal',
  },
);

const {
  isOpen: isModalOpen,
  open: openModal,
  close: closeModal,
  save: onSave,
} = useOverlayComponentController({
  nameOfTriggerSlot: 'Modal',
  onOpen: props.onOpenModal,
  onClose: props.onCloseModal,
  shouldThrowOnMissingTrigger: true,
  onSave: props.onSaveModal,
});
</script>

<template>
  <slot name="trigger" :openModal="openModal" :closeModal="closeModal" />

  <ClearModal :model-value="isModalOpen" @update:modelValue="closeModal">
    <CustomText>{{ modalTitle }}</CustomText>
    <CustomText>{{ subtitle }}</CustomText>
    <slot name="content" :closeModal="closeModal" :onSave="onSave"></slot>

    <div v-if="shouldRenderButtons">
      <CustomButton @click="closeModal">{{ cancelButtonText || 'Закрити' }}</CustomButton>
      <CustomButton @click="onSave">{{ saveButtonText || 'Зберегти' }}</CustomButton>
    </div>
  </ClearModal>
</template>
