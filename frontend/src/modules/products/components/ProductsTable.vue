<script setup lang="ts">
import type { Product } from '@modules/products/types';
import { CustomButton, CustomText } from '@common/components/ui';

defineProps<{ products: Product[] }>();
const emit = defineEmits(['edit', 'delete']);

const handleEdit = (product: Product) => {
  emit('edit', product);
};

const handleDelete = (id: string) => {
  if (confirm('Are you sure you want to delete this product?')) {
    emit('delete', id);
  }
};
</script>

<template>
  <div class="overflow-x-auto rounded-lg bg-white shadow-md">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            Image
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            Name
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            SKU
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            Price
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            Quantity
          </th>
          <th
            class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-if="products.length === 0">
          <td colspan="6" class="py-4 text-center text-gray-500">
            <CustomText>No products found.</CustomText>
          </td>
        </tr>
        <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap">
            <img
              :src="product.image"
              :alt="product.name"
              class="h-10 w-10 rounded-full object-cover"
            />
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <CustomText class="font-medium">{{ product.name }}</CustomText>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <CustomText class="text-gray-500">{{ product.sku }}</CustomText>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <CustomText class="font-semibold">${{ product.price.toFixed(2) }}</CustomText>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <CustomText>{{ product.quantity }}</CustomText>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <CustomButton size="sm" @click="handleEdit(product)" class="mr-2">Edit</CustomButton>
            <CustomButton size="sm" @click="handleDelete(product.id)">Delete</CustomButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
