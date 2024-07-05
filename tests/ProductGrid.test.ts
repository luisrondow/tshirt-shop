import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { ProductGrid } from '#build/components'

describe('ProductGrid component', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(ProductGrid)
    expect(wrapper.vm).toBeTruthy()
  })
})
