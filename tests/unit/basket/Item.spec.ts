import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

import { createTestingPinia } from '@pinia/testing'

import { BasketItem } from '#components'

mockNuxtImport('useFetch', () => {
  return () => ({ data: {}, refresh: () => {} })
})

describe('BasketItem component', () => {
  it('should render correctly', () => {
    const wrapper = mount(BasketItem, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: {
        id: 'id-1',
        name: 'Product 1',
        image: 'https://via.placeholder.com/150',
        quantity: 1,
        price: 100,
        stock: 10,
      },
    })

    expect(wrapper.text()).toContain('Product 1')
    expect(wrapper.text()).toContain('€100')
    expect(wrapper.find('img').attributes('src')).toBe('https://via.placeholder.com/150')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should call removeFromBasket store event', async () => {
    const wrapper = mount(BasketItem, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
      props: {
        id: 'id-1',
        name: 'Product 1',
        image: 'https://via.placeholder.com/150',
        quantity: 1,
        price: 100,
        stock: 10,
      },
    })

    const basketStore = useBasket()

    await wrapper.find('button').trigger('click')

    expect(basketStore.removeFromBasket).toHaveBeenCalled()
  })
})
