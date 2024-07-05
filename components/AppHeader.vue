<script setup lang="ts">
const basketStore = useBasket()

const basketQuantity = computed(() => basketStore.count)
</script>

<template>
  <header class="flex w-full items-center justify-between px-6 py-4">
    <XLink to="/" class="w-full uppercase">Shop</XLink>
    <XLink to="/" class="flex w-full justify-center !no-underline">
      <h1 class="font-serif text-4xl font-semibold">T-Shirt Shop</h1>
    </XLink>
    <XLink to="/basket" class="flex w-full cursor-pointer items-center justify-end gap-2">
      <span class="uppercase text-black hover:underline">Basket</span>
      <div
        class="flex h-6 w-6 items-center justify-center rounded-full text-white"
        :class="basketQuantity > 0 ? 'bg-emerald-900' : 'bg-black'"
      >
        {{ basketQuantity }}
      </div>
    </XLink>
  </header>
</template>
