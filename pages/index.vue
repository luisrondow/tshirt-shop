<script setup lang="ts">
const store = useProducts()

const products = computed(() => store.products)
</script>

<template>
  <div class="min-h-[calc(100vh-7.5rem)] max-w-[1920px] border border-t-gray-300 px-8 py-4">
    <ProductGrid :products="products" />
  </div>
</template>
