<script setup lang="tsx">
import { formatCurrency } from '~/utils/currency'

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
  stock: {
    type: Number,
    required: true,
  },
})

const { updateStock } = useProducts()
const basketStore = useBasket()

const { itemsInBasket } = storeToRefs(basketStore)

const { data, refresh } = useFetch<{ stock: number }>(`/api/stock/${props.id}`, {
  immediate: false,
})

const quantity = computed(() => itemsInBasket.value[props.id] || 1)

const formattedPrice = computed(() => {
  return formatCurrency(props.price)
})

const quantityOptions = computed(() => {
  return Array.from({ length: props.stock }, (_, i) => ({
    label: String(i + 1),
    value: i + 1,
  }))
})

const handleUpdateQuantity = async (value: number) => {
  if (value === quantity.value) return

  await refresh()

  if (data.value?.stock !== undefined && data.value.stock !== null) {
    if (value > data.value.stock) {
      alert(
        'Sorry, the quantity you selected is no longer available. The stock has been updated. Please select a new quantity.',
      )
      basketStore.updateProductQuantity(props.id, data.value.stock)

      return
    }

    updateStock(props.id, data.value.stock)
    basketStore.updateProductQuantity(props.id, value)
  }
}

const handleRemoveFromBasket = () => {
  basketStore.removeFromBasket(props.id)
}
</script>

<template>
  <div class="flex w-full gap-4">
    <img class="h-48 w-32" :src="image" :alt="`${name} photo`" loading="lazy" />
    <div class="flex w-full items-center justify-between">
      <div class="flex flex-col justify-between gap-24">
        <h2 class="font-serif text-3xl">{{ name }}</h2>
        <span class="text-xl">{{ formattedPrice }}</span>
      </div>
      <div class="flex flex-col items-end gap-6 md:flex-row">
        <div>
          <p class="mb-4">Quantity:</p>
          <XDropdown v-model="quantity" :items="quantityOptions" @update:model-value="handleUpdateQuantity" />
        </div>
        <XButton class="h-auto" variant="secondary" @click="handleRemoveFromBasket">Remove</XButton>
      </div>
    </div>
  </div>
</template>
