<script lang="ts">
type Variant = 'primary' | 'secondary'
</script>

<script setup lang="ts">
import { type PropType } from 'vue'

const props = defineProps({
  onClick: {
    type: Function,
    required: true,
  },
  variant: {
    type: String as PropType<Variant>,
    default: 'primary',
  },
})

const classes = {
  primary: 'border border-black bg-black px-4 py-2 text-white hover:bg-white hover:text-black',
  secondary: 'border border-black bg-white px-4 py-2 text-black hover:bg-black hover:text-white',
}

const theme = classes[props.variant]
</script>

<template>
  <button class="w-100 uppercase" :class="theme" @click="() => onClick()">
    <slot />
  </button>
</template>
