<script setup lang="ts">
import { formatCurrency } from '~/utils/currency'

const { itemsInBasket } = useBasket()
const { products } = useProducts()

const basketProducts = computed(() => {
  return Object.keys(itemsInBasket).map((id) => {
    const product = products.find((product) => product.id === id)

    return {
      ...product,
      quantity: itemsInBasket[id],
    }
  })
})

const totalPrice = computed(() => {
  return formatCurrency(
    basketProducts.value.reduce((acc, product) => {
      return acc + (product.price || 0) * product.quantity
    }, 0),
  )
})
</script>

<template>
  <div class="min-h-[calc(100vh-7.5rem)] border border-t-gray-300 px-6 py-12">
    <div class="flex w-full flex-col items-center justify-center gap-8">
      <span v-if="basketProducts.length === 0" class="text-center">Your basket is empty</span>
      <template v-else>
        <BasketItem
          v-for="product in basketProducts"
          :key="product.id"
          :name="product.name || ''"
          :image="product.image || ''"
          :price="product.price || 0"
          :quantity="product.quantity || 0"
        />
        <span class="mt-8 text-xl font-bold">Total: {{ totalPrice }}</span>
      </template>
    </div>
  </div>
</template>
