import { onMounted, ref, useSlots } from 'vue';

type UseOverlayComponentControllerOptions = {
  onOpen?: () => void;
  onClose?: () => void;
  onSave?: () => void;
  shouldThrowOnMissingTrigger?: boolean;
  nameOfTriggerSlot?: string;
};

export const useOverlayComponentController = (
  options: UseOverlayComponentControllerOptions = {},
) => {
  const {
    onOpen,
    onClose,
    onSave,
    shouldThrowOnMissingTrigger = false,
    nameOfTriggerSlot,
  } = options;

  const isOpen = ref(false);
  const slots = useSlots?.();

  onMounted(() => {
    if (shouldThrowOnMissingTrigger && slots && !slots.trigger) {
      throw new Error(`${nameOfTriggerSlot} component requires a trigger slot`);
    }
  });

  const open = () => {
    isOpen.value = true;
    if (typeof onOpen === 'function') {
      onOpen();
    }
  };

  const close = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
    isOpen.value = false;
  };

  const save = () => {
    if (typeof onSave === 'function') {
      onSave();
    }
    isOpen.value = false;
  };

  const toggle = () => {
    const functionToCall = isOpen.value ? close : open;
    functionToCall();
  };

  return {
    isOpen,
    open,
    close,
    save,
    toggle,
  };
};
