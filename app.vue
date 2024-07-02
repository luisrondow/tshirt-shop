<script setup lang="ts">
useHead({
  title: 'TShirt Shop',
  meta: [
    {
      name: 'description',
      content: 'TShirt Shop - Buy your favorite tshirts online',
    },
  ],
})
</script>

<template>
  <div class="leading-tight text-gray-900 antialiased">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
