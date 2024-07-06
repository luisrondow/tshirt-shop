<script setup lang="ts">
const { data, status, error } = await useFetch<Product[]>('/api/shirts')

const store = useProducts()

watch(
  data,
  (newData) => {
    if (!newData) return

    store.setProducts(newData)
  },
  { immediate: true },
)

const isLoading = computed(() => status.value === 'pending')
</script>

<template>
  <div class="min-h-[calc(100vh-7.5rem)] max-w-[1920px] border border-t-gray-300 px-4 py-4 md:px-8">
    <div v-if="isLoading" class="flex w-full items-center justify-center">
      <XLoading />
    </div>
    <div v-else-if="error" class="flex w-full items-center justify-center">
      <p>Error requesting the products: {{ error.message }}</p>
    </div>
    <ProductGrid v-else />
  </div>
</template>
