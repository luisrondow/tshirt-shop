import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { ProductCard } from '#build/components'

describe('ProductCard component', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(ProductCard)
    expect(wrapper.vm).toBeTruthy()
  })
})
