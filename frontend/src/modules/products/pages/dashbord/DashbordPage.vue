<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductsStore } from '@modules/products/productsStore';
import { storeToRefs } from 'pinia';
import { CustomText, Loader, ErrorMessage } from '@common/components/ui';
import ProductCard from '@modules/products/components/ProductCard.vue';
import { ROUTES } from '@common/constants';

const productsStore = useProductsStore();
const { latestProducts, isLoading, error } = storeToRefs(productsStore);
const { fetchProducts } = productsStore;

onMounted(() => {
  if (productsStore.products.length === 0) {
    fetchProducts();
  }
});
</script>

<template>
  <div class="container mx-auto p-4 md:p-8">
    <CustomText variant="title" tag="h1" class="mb-8 text-center"> Dashboard </CustomText>
    <CustomText variant="subtitle" tag="h2" class="mb-4 text-center">
      <RouterLink :to="ROUTES.PRODUCTS">Products</RouterLink>
    </CustomText>

    <Loader :is-loading="isLoading && latestProducts.length === 0" />
    <ErrorMessage :error="error" />

    <div v-if="!isLoading && latestProducts.length > 0">
      <CustomText variant="subtitle" tag="h2" class="mb-4"> Latest Products </CustomText>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard v-for="product in latestProducts" :key="product.id" :product="product" />
      </div>
    </div>

    <div
      v-if="!isLoading && latestProducts.length === 0 && !error"
      class="text-center text-gray-500"
    >
      <CustomText>No products found. Add new products on the Products page.</CustomText>
    </div>
  </div>
</template>
