import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { XDropdown } from '#components'

describe('XDropdown component', () => {
  it('should render correctly', () => {
    const wrapper = mount(XDropdown, {
      props: {
        items: [
          { value: 'test', label: 'Test' },
          { value: 'test-2', label: 'Test 2' },
        ],
        modelValue: 'test',
      },
    })

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should open dropdown', async () => {
    const wrapper = mount(XDropdown, {
      props: {
        items: [
          { value: 'test', label: 'Test' },
          { value: 'test-2', label: 'Test 2' },
        ],
        modelValue: 'test',
      },
    })

    await wrapper.find('[data-testid="dropdown-select"]').trigger('click')

    expect(wrapper.find('[data-testid="dropdown-options"]').isVisible()).toBeTruthy()
    expect(wrapper.find('[data-testid="dropdown-options"]').text()).toContain('Test')
    expect(wrapper.find('[data-testid="dropdown-options"]').text()).toContain('Test 2')
    expect(wrapper.findAll('button').length).toBe(2)
  })

  it('should select option', async () => {
    const wrapper = mount(XDropdown, {
      props: {
        items: [
          { value: 'test', label: 'Test' },
          { value: 'test-2', label: 'Test 2' },
        ],
        modelValue: 'test',
      },
    })

    await wrapper.find('[data-testid="dropdown-select"]').trigger('click')
    await wrapper.findAll('button')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test-2'])
  })
})
