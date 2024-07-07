import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { XButton } from '#components'

describe('XButton component', () => {
  it('should render correctly', () => {
    const wrapper = mount(XButton)

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should call "onClick" event', () => {
    const onClick = vi.fn()
    const wrapper = mount(XButton, {
      props: {
        onClick,
      },
    })

    wrapper.trigger('click')

    expect(onClick).toHaveBeenCalled()
  })

  it('should not call "onClick" event if is disabled', () => {
    const onClick = vi.fn()
    const wrapper = mount(XButton, {
      props: {
        onClick,
        disabled: true,
      },
    })

    wrapper.trigger('click')

    expect(onClick).not.toHaveBeenCalled()
  })
})
