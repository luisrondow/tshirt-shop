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
  disabled: {
    type: Boolean,
    default: false,
  },
})

const classes = {
  primary: 'border border-black bg-black px-4 py-2 text-white ',
  secondary: 'border border-black bg-white px-4 py-2 text-black',
}

const theme = classes[props.variant]
</script>

<template>
  <button
    class="w-100 uppercase"
    :class="{
      [theme]: true,
      'hover:bg-white hover:text-black': props.variant === 'primary' && !props.disabled,
      'hover:bg-black hover:text-white': props.variant === 'secondary' && !props.disabled,
      'cursor-not-allowed opacity-70': props.disabled,
    }"
    @click="() => onClick()"
  >
    <slot />
  </button>
</template>
