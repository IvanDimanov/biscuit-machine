import { Story, Meta } from '@storybook/react/types-6-0'
import { useState } from 'react'

import '@src/App/i18n'

import { Switch } from '@src/components'
import { SwitchProps } from '@src/components/Switch'

export default {
  component: Switch,
  title: 'Components/Switch',
  parameters: {
    docs: {
      description: {
        component: 'UI Switch to track user choice.',
      },
    },
  },
  argTypes: {
    testIdPrefix: {
      description: 'Text used in `data-testid="{testIdPrefix}.Switch"`',
    },

    className: {
      description: 'CSS classes to be applied to the component',
    },

    value: {
      description: 'Which is the selected value',
    },

    onChange: {
      description: 'Tracks click events',
      action: 'onChange',
    },

    disabled: {
      description: 'Is the component accessible',
    },
  },
} as Meta

const Template: Story = (args) => (
  <Switch {...args} />
)

export const Default = Template.bind({})


export const ChangeValue = ({ value: default1, onChange: default2, ...args }) => {
  const [value, onChange] = useState<SwitchProps['value']>('off')

  return (
    <Switch
      value={value}
      onChange={onChange}
      {...args}
    />
  )
}
ChangeValue.storyName = 'Change value'


export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}
