<script setup lang="ts">
defineProps<{
  isLoading: boolean;
}>();
</script>

<template>
  <div v-if="isLoading" class=""></div>
</template>
