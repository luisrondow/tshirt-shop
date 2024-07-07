import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { XLoading } from '#components'

describe('XLoading component', () => {
  it('should render correctly', () => {
    const wrapper = mount(XLoading)

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })
})
