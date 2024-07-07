import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import { ProductCard } from '#components'

describe('ProductCard component', () => {
  it('renders product correctly', () => {
    const wrapper = mount(ProductCard, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: {
        id: 'id-1',
        name: 'Product 1',
        price: 100,
        image: 'https://via.placeholder.com/150',
      },
    })

    expect(wrapper.text()).toContain('Product 1')
    expect(wrapper.text()).toContain('€100')
    expect(wrapper.find('img').attributes('src')).toBe('https://via.placeholder.com/150')
    expect(wrapper.find('button').text()).toBe('Add to basket')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should emit add-to-basket event', async () => {
    const wrapper = mount(ProductCard, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: {
        id: 'id-1',
        name: 'Product 1',
        price: 100,
        image: 'https://via.placeholder.com/150',
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('add-to-basket')).toBeTruthy()
    expect(wrapper.emitted('add-to-basket')?.length).toBe(1)
  })

  it('should should shows View in basket when product is in basket', async () => {
    const wrapper = mount(ProductCard, {
      global: {
        stubs: {
          XLink: {
            template: '<a><slot /></a>',
          },
        },
        plugins: [
          createTestingPinia({
            initialState: { basket: { itemsInBasket: { 'id-1': 1 } } },
          }),
        ],
      },
      props: {
        id: 'id-1',
        name: 'Product 1',
        price: 100,
        image: 'https://via.placeholder.com/150',
      },
    })

    expect(wrapper.find('button').text()).toContain('View in Basket >')
  })
})
