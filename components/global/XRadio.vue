<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Number, Boolean],
    default: '',
  },
  checked: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
})

defineEmits(['update:value'])
</script>

<template>
  <div class="mb-4 flex items-center">
    <input
      :id="id"
      type="radio"
      :value="value"
      :checked="checked"
      :name="name"
      class="h-4 w-4 border-gray-300 bg-gray-100 text-black"
      @change="$emit('update:value', value)"
    />
    <label :for="id" class="ms-2 text-lg font-medium text-gray-900"> {{ label }} </label>
  </div>
</template>
