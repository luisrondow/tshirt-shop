import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import AppFooter from '#build/components'

describe('AppFooter component', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.vm).toBeTruthy()
  })
})
