<script setup lang="ts">
import type { Product } from '@modules/products/types';
import { CustomText } from '@common/components/ui';

defineProps<{ product: Product }>();
</script>

<template>
  <div class="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
    <div class="h-48 w-full overflow-hidden">
      <img :src="product.image" :alt="product.name" class="h-full w-full object-cover" />
    </div>
    <div class="p-4">
      <CustomText variant="subtitle" tag="h3" class="mb-2 truncate">{{ product.name }}</CustomText>
      <CustomText class="mb-1 text-sm text-gray-500">SKU: {{ product.sku }}</CustomText>
      <div class="flex items-center justify-between">
        <CustomText class="text-lg font-bold text-blue-600">${{ product.price.toFixed(2) }}</CustomText>
        <CustomText class="text-sm text-gray-600">Qty: {{ product.quantity }}</CustomText>
      </div>
    </div>
  </div>
</template>
