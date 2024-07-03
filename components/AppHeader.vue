<script setup lang="ts">
const basketCount = ref(0)
</script>

<template>
  <header class="flex w-full items-center justify-between px-6 py-4">
    <NuxtLink to="/" class="uppercase">Shop</NuxtLink>
    <h1 class="font-serif text-4xl font-semibold">T-Shirt Shop</h1>
    <NuxtLink to="/basket" class="flex cursor-pointer gap-2">
      <XButton variant="text" :on-click="() => console.log('clicked')">Basket</XButton>
      <div class="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
        {{ basketCount }}
      </div>
    </NuxtLink>
  </header>
</template>
