<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col">
    <img :src="image" alt="product" class="h-auto w-full object-cover" />
    <div class="flex items-center justify-between py-4">
      <h1 class="font-serif text-2xl font-semibold">{{ name }}</h1>
      <p class="font-mono text-xl font-semibold">${{ price }}</p>
    </div>
    <XButton variant="primary" :on-click="() => console.log('clicked')"> Add to basket </XButton>
  </div>
</template>
