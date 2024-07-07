import { describe, it, expect, beforeAll } from 'vitest'
import { shallowMount, RouterLinkStub, config } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import { AppHeader } from '#components'

describe('AppHeader component', () => {
  beforeAll(() => {
    config.global.renderStubDefaultSlot = true
  })

  it('should render correctly', () => {
    const wrapper = shallowMount(AppHeader, {
      stubs: {
        XLink: RouterLinkStub,
      },
      global: {
        plugins: [createTestingPinia()],
      },
    })

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render logo, links and basket', () => {
    const wrapper = shallowMount(AppHeader, {
      stubs: {
        XLink: RouterLinkStub,
      },
      global: {
        plugins: [createTestingPinia()],
      },
    })

    const links = wrapper.findAll('x-link-stub')
    expect(links.length).toBe(3)
    expect(links[0].text()).toContain('Shop')
    expect(links[1].find('h1').text()).toBe('T-Shirt Shop')
    expect(links[2].text()).toContain('Basket')
  })
})
