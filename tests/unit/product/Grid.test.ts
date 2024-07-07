import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import ProductGrid from '~/components/product/Grid.vue'

describe('ProductGrid component', () => {
  it('renders the product grid correctly', () => {
    const wrapper = mount(ProductGrid, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              products: {
                products: [
                  { id: '1', name: 'Product 1', price: 100, stock: 10, image: 'mock' },
                  { id: '2', name: 'Product 2', price: 200, stock: 20, image: 'mock' },
                ],
              },
            },
          }),
        ],
      },
    })

    expect(wrapper.text()).toContain('Product 1')
    expect(wrapper.text()).toContain('Product 2')

    expect(wrapper.text()).toContain('€100')
    expect(wrapper.text()).toContain('€200')

    expect(wrapper.element).toMatchSnapshot()
  })
})
