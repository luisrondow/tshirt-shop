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
  <div class="font-sans leading-tight text-black antialiased">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
