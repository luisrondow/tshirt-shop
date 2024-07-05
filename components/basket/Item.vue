<script setup lang="tsx">
import { formatCurrency } from '~/utils/currency'

const props = defineProps({
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
  quantity: {
    type: Number,
    required: true,
  },
})

const formattedPrice = computed(() => {
  return formatCurrency(props.price)
})
</script>

<template>
  <div class="flex w-full gap-4">
    <img class="h-48 w-32" :src="image" :alt="`${name} photo`" />
    <div class="flex w-full items-center justify-between">
      <div class="flex flex-col justify-between gap-24">
        <h2 class="font-serif text-3xl">{{ name }}</h2>
        <span class="text-xl">{{ formattedPrice }}</span>
      </div>
      <p>Quantity: {{ quantity }}</p>
    </div>
  </div>
</template>
