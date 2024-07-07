<script setup lang="ts">
const basketStore = useBasket()

const basketQuantity = computed(() => basketStore.count)
</script>

<template>
  <header class="flex w-full items-center justify-between px-2 py-4 md:px-6">
    <XLink to="/" class="w-full uppercase">Shop</XLink>
    <XLink to="/" class="flex w-full justify-center !no-underline">
      <h1 class="font-serif text-xl font-semibold md:text-4xl">T-Shirt Shop</h1>
    </XLink>
    <XLink to="/basket" class="flex w-full cursor-pointer items-center justify-end gap-2">
      <span class="uppercase text-black hover:underline">Basket</span>
      <div
        data-testid="basket-count"
        class="flex h-6 w-6 items-center justify-center rounded-full text-white"
        :class="basketQuantity > 0 ? 'bg-emerald-900' : 'bg-black'"
      >
        {{ basketQuantity }}
      </div>
    </XLink>
  </header>
</template>
