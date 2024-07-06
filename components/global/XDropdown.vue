<script lang="ts">
export type DropdownItem = {
  label: string
  value: string | number
}
</script>

<script setup lang="ts">
defineProps({
  items: {
    type: Array as PropType<DropdownItem[]>,
    required: true,
  },
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const show = ref(false)

const handleUpdateModelValue = (value: string | number) => {
  emit('update:modelValue', value)
  show.value = false
}
</script>

<template>
  <div class="dropdown relative">
    <div
      class="flex h-10 min-w-24 cursor-pointer items-center rounded border border-gray-200 bg-white p-3"
      @click="show = !show"
    >
      <span>{{ modelValue }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ml-auto h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
    <div
      v-if="show"
      class="absolute z-10 mt-1 max-h-64 w-full flex-col overflow-auto rounded border border-gray-200 bg-white shadow peer-checked:flex"
    >
      <button
        v-for="item in items"
        :key="item.value"
        class="block w-full border-l-4 border-transparent p-2 text-left hover:border-gray-600 hover:bg-gray-100 group-hover:border-blue-600 group-hover:bg-gray-100"
        @click="() => handleUpdateModelValue(item.value)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>
