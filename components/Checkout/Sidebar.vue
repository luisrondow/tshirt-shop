<script setup lang="ts">
import { useStepper } from '@vueuse/core'

import { formatCurrency } from '~/utils/currency'

const props = defineProps({
  totalPrice: {
    type: Number,
    required: true,
  },
})

const stepper = useStepper({
  'shipping-methods': {
    title: 'Shipping Methods',
    isValid: () => true,
  },
  'user-information': {
    title: 'Enter your email',
    isValid: () => true,
  },
})

const shippingMethods = ref([
  {
    id: 1,
    name: 'Standard Shipping',
    price: 5,
  },
  {
    id: 2,
    name: 'Express Shipping',
    price: 10,
  },
])

const checkoutInformation = reactive({
  shippingMethod: 1,
  email: '',
})

const selectedShippingMethod = computed(() => {
  return shippingMethods.value.find((method) => method.id === checkoutInformation.shippingMethod)
})

const finalBasketPrice = computed(() => {
  return props.totalPrice + (selectedShippingMethod.value?.price || 0)
})

const formatLabel = (name: string, price: number) => {
  return `${name} - ${formatCurrency(price)}`
}

const handleUpdateShippingMethod = (id: number) => {
  checkoutInformation.shippingMethod = id
}

const handleSubmit = () => {
  if (stepper.isLast.value) {
    console.log('Payment successful', checkoutInformation.email)
    alert('Payment successful')

    return
  }

  stepper.goToNext()
}
</script>

<template>
  <div class="flex w-3/5 flex-col bg-gray-300 p-4">
    <h3 class="font-serif text-3xl font-semibold">Checkout</h3>
    <div class="mt-16 flex h-full flex-col gap-16">
      <div v-if="stepper.isCurrent('shipping-methods')" class="flex flex-col gap-8">
        <h4 class="text-2xl font-semibold">{{ stepper.current.value.title }}</h4>
        <div>
          <XRadio
            v-for="method in shippingMethods"
            :id="`shippingMethod-${method.id}`"
            :key="method.id"
            :label="formatLabel(method.name, method.price)"
            :value="method.id"
            :checked="checkoutInformation.shippingMethod === method.id"
            :name="'shippingMethod'"
            @update:value="handleUpdateShippingMethod"
          />
        </div>
        <div>
          <div class="text-md grid grid-cols-2">
            <span>Products: </span>
            <span class="justify-self-end">{{ formatCurrency(totalPrice) }}</span>
            <span>Shipping: </span>
            <span class="justify-self-end">{{ formatCurrency(selectedShippingMethod?.price || 0) }}</span>
          </div>
          <div class="flex justify-between pt-4 text-xl">
            <span>Total Price:</span>
            <span>{{ formatCurrency(finalBasketPrice) }}</span>
          </div>
        </div>
      </div>
      <div v-if="stepper.isCurrent('user-information')" class="flex flex-col gap-8">
        <h4 class="text-2xl font-semibold">{{ stepper.current.value.title }}</h4>
        <XInput v-model="checkoutInformation.email" type="email" placeholder="Enter your email" />
      </div>
      <XButton variant="primary" :on-click="handleSubmit">{{ stepper.isLast ? 'Pay' : 'Next' }}</XButton>
    </div>
  </div>
</template>
