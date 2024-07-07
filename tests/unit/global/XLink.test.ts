import { describe, it, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'

import { XLink } from '#components'

describe('XLink component', () => {
  it('should render correctly', () => {
    const wrapper = mount(XLink)

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render correctly with "to" props', () => {
    const wrapper = shallowMount(XLink, {
      props: {
        to: '/test',
      },
    })

    expect(wrapper.find('nuxt-link-stub').attributes('href')).toBe('/test')
  })

  it('should render correctly with "href" props', () => {
    const wrapper = shallowMount(XLink, {
      props: {
        href: '/test',
      },
    })

    expect(wrapper.find('a').attributes('href')).toBe('/test')
  })

  it('should render span without props', () => {
    const wrapper = shallowMount(XLink)

    expect(wrapper.find('nuxt-link-stub').exists()).toBeFalsy()
    expect(wrapper.find('a').exists()).toBeFalsy()
    expect(wrapper.find('span').exists()).toBeTruthy()
  })
})
