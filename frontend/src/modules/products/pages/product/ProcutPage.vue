<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProductsStore } from '@modules/products/productsStore';
import { storeToRefs } from 'pinia';
import { CustomText, CustomButton, Loader, ErrorMessage } from '@common/components/ui';
import ProductsTable from '@modules/products/components/ProductsTable.vue';
import ProductFormModal from '@modules/products/components/ProductFormModal.vue';
import type { Product } from '@modules/products/types';
import { ROUTES } from '@common/constants';

const productsStore = useProductsStore();
const { products, isLoading, error } = storeToRefs(productsStore);
const { fetchProducts, deleteProduct } = productsStore;

const isModalOpen = ref(false);
const currentProduct = ref<Product | null>(null);

const openModal = (product: Product | null = null) => {
  currentProduct.value = product;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  currentProduct.value = null;
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="container mx-auto p-4 md:p-8">
    <div class="flex items-center justify-between mb-8">
      <CustomText variant="title" tag="h1"> Products </CustomText>
      <CustomText><RouterLink :to="ROUTES.HOME">Go back to Home</RouterLink></CustomText>
      <CustomButton @click="openModal()">Add Product</CustomButton>
    </div>

    <Loader :is-loading="isLoading && products.length === 0" />
    <ErrorMessage :error="error" />

    <div v-if="!isLoading || products.length > 0">
      <ProductsTable :products="products" @edit="openModal" @delete="deleteProduct" />
    </div>

    <ProductFormModal :is-open="isModalOpen" :product="currentProduct" @close="closeModal" />
  </div>
</template>
