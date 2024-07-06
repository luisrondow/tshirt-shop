<script setup lang="ts">
import type { ShippingMethods } from '~/utils/types'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
const basketStore = useBasket()
const { products } = useProducts()

const { itemsInBasket, count } = storeToRefs(basketStore)

const isMobileSize = ref(width.value < 768)

const isSidebarOpen = ref(!isMobileSize.value)

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
  <div class="flex min-h-[calc(100vh-6.5rem)] border border-t-gray-300 md:min-h-[calc(100vh-7.5rem)]">
    <div class="mt-8 flex w-full flex-col items-center gap-8 px-4 md:mt-16 md:px-6">
      <span v-if="isBasketEmpty" class="text-center">Your basket is empty</span>
      <template v-else>
        <BasketItem v-for="product in basketProducts" :key="product.id" v-bind="product" />
        <div v-if="isMobileSize" class="bg-transparent text-black underline" @click="isSidebarOpen = true">
          Go to checkout
        </div>
      </template>
    </div>
    <CheckoutSidebar
      v-if="!isBasketEmpty"
      class="fixed z-20 transition-transform md:static"
      :class="{
        'translate-x-0 opacity-100': isSidebarOpen,
        '-translate-x-full opacity-0': !isSidebarOpen,
      }"
      :sub-total="totalPrice"
      :shipping-methods="shippingMethods"
      :is-loading="isShippingMethodsLoading"
      @close-sidebar="isSidebarOpen = false"
    />
  </div>
</template>
