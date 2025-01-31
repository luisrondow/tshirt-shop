<script setup lang="ts">
import { useStepper } from '@vueuse/core'

import type { ShippingMethods } from '~/utils/types'

const props = defineProps({
  subTotal: {
    type: Number,
    required: true,
  },
  shippingMethods: {
    type: Array as PropType<ShippingMethods[]>,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const { clearBasket } = useBasket()

const router = useRouter()

const checkoutInformation = reactive({
  shippingMethod: props.shippingMethods[0].id,
  email: '',
})

const stepper = useStepper({
  'shipping-methods': {
    title: 'Shipping Methods',
    isValid: () => !!checkoutInformation.shippingMethod,
  },
  'user-information': {
    title: 'Enter your email',
    isValid: () => !!checkoutInformation.email && validateEmail(checkoutInformation.email),
  },
})

const isCurrentShippingMethodValid = computed(() => stepper.current.value.isValid())

const selectedShippingMethod = computed(() => {
  return props.shippingMethods.find((method) => method.id === checkoutInformation.shippingMethod)
})

const finalBasketPrice = computed(() => {
  return props.subTotal + (selectedShippingMethod.value?.price || 0)
})

const formatLabel = (name: string, price: number) => {
  return `${name} - ${formatCurrency(price)}`
}

const handleUpdateShippingMethod = (id: string) => {
  checkoutInformation.shippingMethod = id
}

const handleSubmit = () => {
  if (stepper.isLast.value) {
    alert('Payment successful')
    clearBasket()
    router.push('/')

    return
  }

  stepper.goToNext()
}

const emit = defineEmits(['close-sidebar'])
</script>

<template>
  <div class="flex min-h-[calc(100vh-6.5rem)] w-full flex-col gap-16 bg-gray-300 p-4 md:min-h-0 md:w-3/5">
    <h3 class="font-serif text-3xl font-semibold">Checkout</h3>
    <div class="flex h-full flex-col gap-16">
      <div v-if="stepper.isCurrent('shipping-methods')" class="flex flex-col gap-8">
        <div v-if="props.isLoading" class="flex w-full items-center justify-center">
          <XLoading />
        </div>
        <template v-else>
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
              <span data-testid="sub-total" class="justify-self-end">{{ formatCurrency(subTotal) }}</span>
              <span>Shipping: </span>
              <span data-testid="shipping-price" class="justify-self-end">{{
                formatCurrency(selectedShippingMethod?.price || 0)
              }}</span>
            </div>
            <div class="flex justify-between pt-4 text-xl">
              <span>Total Price:</span>
              <span data-testid="total-price">{{ formatCurrency(finalBasketPrice) }}</span>
            </div>
          </div>
        </template>
      </div>
      <div v-if="stepper.isCurrent('user-information')" class="flex flex-col gap-8">
        <h4 class="text-2xl font-semibold">{{ stepper.current.value.title }}</h4>
        <div>
          <XInput
            v-model="checkoutInformation.email"
            type="email"
            placeholder="Enter your email"
            :class="{
              'border-red-500': !isCurrentShippingMethodValid,
            }"
          />
          <p v-if="!isCurrentShippingMethodValid" class="mt-2 text-red-500">Please enter a valid email</p>
        </div>
      </div>
      <XButton variant="primary" :on-click="handleSubmit" :disabled="!isCurrentShippingMethodValid">{{
        stepper.isLast.value ? 'Pay' : 'Next'
      }}</XButton>
    </div>
    <div class="w-full bg-transparent text-center text-black underline md:hidden" @click="() => emit('close-sidebar')">
      Back to basket
    </div>
  </div>
</template>
