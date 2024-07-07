import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { XRadio } from '#components'

describe('XRadio component', () => {
  it('should render correctly', () => {
    const wrapper = mount(XRadio)

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render correctly with props', () => {
    const wrapper = mount(XRadio, {
      props: {
        value: 'test',
        label: 'Test',
        name: 'test',
        id: 'test-1',
        checked: true,
      },
    })

    expect(wrapper.find('input').element.value).toBe('test')
    expect(wrapper.find('label').text()).toBe('Test')
    expect(wrapper.find('input').attributes('name')).toBe('test')
    expect(wrapper.find('input').attributes('id')).toBe('test-1')
    expect(wrapper.find('input').element.checked).toBeTruthy()
  })

  it('should check radio works correctly', async () => {
    const wrapper = mount(XRadio, {
      props: {
        value: 'test',
        label: 'Test',
        name: 'test',
        id: 'test-1',
        checked: false,
      },
    })

    const input = wrapper.find('input')

    input.trigger('click')
    input.trigger('change')

    expect(wrapper.find('input').element.checked).toBeTruthy()
    expect(wrapper.emitted('update:value')).toBeTruthy()
    expect(wrapper.emitted('update:value')?.[0]).toEqual(['test'])
  })
})
