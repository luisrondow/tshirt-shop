export const useProducts = defineStore('products', () => {
  const products = ref<Product[]>([])

  const setProducts = (newProducts: Product[]) => {
    products.value = newProducts
  }

  return {
    products,
    setProducts,
  }
})
