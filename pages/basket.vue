<script setup lang="ts">
import type { ShippingMethods } from '~/utils/types'

const basketStore = useBasket()
const { products } = useProducts()

const { itemsInBasket, count } = storeToRefs(basketStore)

const basketProducts = computed(() => {
  return Object.keys(itemsInBasket.value).map((id) => {
    const product = products.find((product) => product.id === id) as Product

    return {
      ...product,
      quantity: itemsInBasket.value[id],
    }
  })
})

const isBasketEmpty = computed(() => {
  return basketProducts.value.length === 0
})

const totalPrice = computed(() => {
  return basketProducts.value.reduce((acc, product) => {
    return acc + (product.price || 0) * product.quantity
  }, 0)
})

const { data, status } = await useFetch<ShippingMethods[]>(`/api/shipping-methods?quantity=${count.value}`, {
  immediate: count.value > 0,
})

const shippingMethods = computed(() => data.value || [])
const isShippingMethodsLoading = computed(() => status.value === 'pending')
</script>

<template>
  <div class="flex min-h-[calc(100vh-7.5rem)] border border-t-gray-300">
    <div class="mt-16 flex w-full flex-col items-center gap-8 px-6">
      <span v-if="isBasketEmpty" class="text-center">Your basket is empty</span>
      <template v-else>
        <BasketItem v-for="product in basketProducts" :key="product.id" v-bind="product" />
      </template>
    </div>
    <CheckoutSidebar
      v-if="!isBasketEmpty"
      :sub-total="totalPrice"
      :shipping-methods="shippingMethods"
      :is-loading="isShippingMethodsLoading"
    />
  </div>
</template>
