export const useProducts = defineStore('products', () => {
  const products = ref<Product[]>([])

  const setProducts = (newProducts: Product[]) => {
    products.value = newProducts
  }

  const updateStock = (productId: string, newStock: number) => {
    const product = products.value.find((product) => product.id === productId)

    if (!product) {
      return
    }

    product.stock = newStock
  }

  return {
    // state
    products,
    // actions
    setProducts,
    updateStock,
  }
})
