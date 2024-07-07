import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { XInput } from '#components'

describe('XInput component', () => {
  it('should render correctly', () => {
    const wrapper = mount(XInput)

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render correctly with "value"', () => {
    const wrapper = mount(XInput, {
      props: {
        modelValue: 'test',
      },
    })

    expect(wrapper.find('input').element.value).toBe('test')
  })

  it('should render correctly with "placeholder" props', () => {
    const wrapper = mount(XInput, {
      props: {
        placeholder: 'test',
      },
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('test')
  })

  it('should emit "update:modelValue" event', async () => {
    const wrapper = mount(XInput)

    await wrapper.find('input').setValue('test')

    expect(wrapper.find('input').element.value).toBe('test')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test'])
  })
})
