type ItemsInBasket = { [productId: string]: number }

export const useBasket = defineStore('basket', () => {
  const itemsInBasket = ref<ItemsInBasket>({})

  const count = computed(() => Object.values(itemsInBasket.value).reduce((acc, curr) => acc + curr, 0))

  const addToBasket = (product: Product) => {
    if (Object.hasOwnProperty.call(itemsInBasket.value, product.id)) {
      itemsInBasket.value[product.id]++

      return
    }

    itemsInBasket.value = { ...itemsInBasket.value, [product.id]: 1 }
  }

  return {
    // state
    itemsInBasket,
    // getters
    count,
    // actions
    addToBasket,
  }
})
