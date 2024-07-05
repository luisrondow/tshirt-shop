<script setup lang="ts">
const products = [
  {
    id: 1,
    name: 'TShirt 1',
    image:
      'https://img.sonofatailor.com/images/customizer/product/White_O_Crew_Regular_NoPocket-dd223275-e170-4705-afcd-56cb12b45351.jpg',
    price: 20,
    stock: 20,
  },
  {
    id: 2,
    name: 'TShirt 2',
    image:
      'https://img.sonofatailor.com/images/customizer/product/White_O_Crew_Regular_NoPocket-dd223275-e170-4705-afcd-56cb12b45351.jpg',
    price: 25,
    stock: 20,
  },
  {
    id: 3,
    name: 'TShirt 3',
    image:
      'https://img.sonofatailor.com/images/customizer/product/White_O_Crew_Regular_NoPocket-dd223275-e170-4705-afcd-56cb12b45351.jpg',
    price: 30,
    stock: 20,
  },
  {
    id: 4,
    name: 'TShirt 4',
    image:
      'https://img.sonofatailor.com/images/customizer/product/White_O_Crew_Regular_NoPocket-dd223275-e170-4705-afcd-56cb12b45351.jpg',
    price: 35,
    stock: 20,
  },
  {
    id: 5,
    name: 'TShirt 5',
    image:
      'https://img.sonofatailor.com/images/customizer/product/White_O_Crew_Regular_NoPocket-dd223275-e170-4705-afcd-56cb12b45351.jpg',
    price: 40,
    stock: 20,
  },
]
</script>

<template>
  <div class="max-w-[1920px] border border-t-gray-300 px-8 py-4">
    <ProductGrid :products="products" />
  </div>
</template>
