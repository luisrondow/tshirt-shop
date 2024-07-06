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

  const removeFromBasket = (productId: string) => {
    if (!Object.hasOwnProperty.call(itemsInBasket.value, productId)) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [productId]: _, ...newItemsInBasket } = itemsInBasket.value

    itemsInBasket.value = newItemsInBasket
  }

  const updateProductQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromBasket(productId)

      return
    }

    itemsInBasket.value = { ...itemsInBasket.value, [productId]: newQuantity }
  }

  const clearBasket = () => {
    itemsInBasket.value = {}
  }

  return {
    // state
    itemsInBasket,
    // getters
    count,
    // actions
    addToBasket,
    removeFromBasket,
    updateProductQuantity,
    clearBasket,
  }
})
