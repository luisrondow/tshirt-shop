<script setup lang="ts">
const name = ref('nuxt')
</script>

<template>
  <div>
    <h1 class="p-12">Hi {{ name }}</h1>
    <XButton variant="text" text="Click me" :on-click="() => console.log('clicked')" />
  </div>
</template>
