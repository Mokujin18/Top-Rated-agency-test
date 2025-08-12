<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useForm } from 'vee-validate';
import { useProductsStore } from '@modules/products/productsStore';
import type { Product, ProductFormData } from '@modules/products/types';
import { CustomButton, CustomText, ErrorMessage } from '@common/components/ui';
import InputField from '@common/components/form/InputField.vue';

const props = defineProps<{
  isOpen: boolean;
  product: Product | null;
}>();

const emit = defineEmits(['close']);

const productsStore = useProductsStore();
const { addProduct, updateProduct } = productsStore;
const serverError = ref<Error | null>(null);

const isEditMode = computed(() => !!props.product);

const { handleSubmit, resetForm, isSubmitting } = useForm<ProductFormData>();

watch(
  () => props.isOpen,
  newValue => {
    serverError.value = null;
    if (newValue) {
      if (props.product) {
        resetForm({ values: props.product });
      } else {
        resetForm();
      }
    }
  },
);

const onSubmit = handleSubmit(async values => {
  serverError.value = null;
  try {
    if (isEditMode.value && props.product) {
      await updateProduct(props.product.id, values);
    } else {
      await addProduct(values);
    }
    emit('close');
  } catch (e) {
    serverError.value = e as Error;
  }
});
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="w-full max-w-lg rounded-lg bg-gray-600 p-8 shadow-2xl relative">
      <CustomButton size="icon" class="absolute top-4 right-4" @click="emit('close')"
        >X</CustomButton
      >
      <CustomText variant="title" tag="h2" class="mb-6 text-center"
        >{{ isEditMode ? 'Edit Product' : 'Add New Product' }}
      </CustomText>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <InputField
          name="name"
          label="Product Name"
          placeholder="Enter product name"
          rules="required"
        />
        <InputField
          name="image"
          label="Image URL"
          placeholder="https://example.com/image.png"
          rules="required"
        />
        <InputField name="sku" label="SKU" placeholder="Enter product SKU" rules="required" />
        <InputField name="price" label="Price" type="number" placeholder="0.00" rules="required" />
        <InputField
          name="quantity"
          label="Quantity"
          type="number"
          placeholder="0"
          rules="required"
        />

        <ErrorMessage :error="serverError" class="text-center" />

        <div class="pt-4">
          <CustomButton type="submit" class="w-full" :disabled="isSubmitting">
            {{ isSubmitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add Product' }}
          </CustomButton>
        </div>
      </form>
    </div>
  </div>
</template>
