import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Product, ProductFormData } from './types';
import { productsApi } from './api';

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const latestProducts = computed(() => {
    return [...products.value]
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, 3);
  });

  const fetchProducts = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await productsApi.getProducts();
      products.value = data;
    } catch (e) {
      error.value = e as Error;
    } finally {
      isLoading.value = false;
    }
  };

  const addProduct = async (productData: ProductFormData) => {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await productsApi.createProduct(productData);
      products.value.push(data);
    } catch (e) {
      error.value = e as Error;
    }
  };

  const updateProduct = async (id: string, productData: Partial<ProductFormData>) => {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await productsApi.updateProduct(id, productData);
      const index = products.value.findIndex(p => p.id === id);
      if (index !== -1) {
        products.value[index] = data;
      }
    } catch (e) {
      error.value = e as Error;
    }
  };

  const deleteProduct = async (id: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      await productsApi.deleteProduct(id);
      products.value = products.value.filter(p => p.id !== id);
    } catch (e) {
      error.value = e as Error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    products,
    isLoading,
    error,
    latestProducts,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
});
