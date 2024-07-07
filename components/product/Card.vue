<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
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

const emit = defineEmits(['add-to-basket'])

const store = useBasket()

const { itemsInBasket } = storeToRefs(store)

const isInBasket = computed(() => itemsInBasket.value[props.id] !== undefined)
</script>

<template>
  <div class="flex flex-col">
    <img :src="image" alt="product" class="h-auto w-full object-cover" />
    <div class="flex items-center justify-between py-4">
      <h1 class="font-serif text-2xl font-semibold">{{ name }}</h1>
      <p class="font-mono text-xl font-semibold">€{{ price }}</p>
    </div>
    <XButton v-if="!isInBasket" variant="primary" :on-click="() => emit('add-to-basket')"> Add to basket </XButton>
    <XLink v-else to="/basket">
      <XButton variant="secondary"> View in Basket ></XButton>
    </XLink>
  </div>
</template>
