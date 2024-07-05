<script setup lang="ts">
import type { Product } from '~/utils/types'

defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true,
  },
})

const basketStore = useBasket()
</script>

<template>
  <div class="grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-4 lg:gap-x-4 lg:gap-y-8">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :name="product.name"
      :image="product.image"
      :price="product.price"
      @add-to-basket="() => basketStore.addToBasket(product)"
    />
  </div>
</template>
