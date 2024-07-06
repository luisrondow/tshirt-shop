<script setup lang="ts">
defineProps({
  type: {
    type: String as PropType<'text' | 'email'>,
    default: 'text',
  },
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    class="h-12 w-full border border-gray-400 bg-white px-4 text-black outline-none placeholder:text-gray-300 focus:border-black"
    :value="modelValue"
    @input="handleInput"
  />
</template>
