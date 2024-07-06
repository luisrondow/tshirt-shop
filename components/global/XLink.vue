<script setup lang="ts">
defineProps({
  to: {
    type: String,
    default: '',
  },
  href: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <NuxtLink v-if="to" :href="to" class="text-black hover:underline">
    <slot />
  </NuxtLink>
  <a v-else-if="href" :href="href" class="text-black hover:underline">
    <slot />
  </a>
  <span v-else>
    <slot />
  </span>
</template>
