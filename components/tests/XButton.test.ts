import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import XButton from '../global/XButton.vue'

describe('XButton component', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(XButton)
    expect(wrapper.vm).toBeTruthy()
  })
})
