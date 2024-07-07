import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { AppFooter } from '#components'

describe('AppFooter component', () => {
  it('should render correctly', () => {
    const wrapper = mount(AppFooter)

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render the logo', () => {
    const wrapper = mount(AppFooter)

    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toEqual('© 2024 TSHIRT SHOP')
  })
})
