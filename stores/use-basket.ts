export const useBasket = defineStore('basket', () => {
  const items = ref<number[]>([])

  const count = computed(() => items.value.length)

  const addToBasket = (product: Product) => {
    items.value.push(product.id)
  }

  return {
    // state
    items,
    // getters
    count,
    // actions
    addToBasket,
  }
})
