import { Story, Meta } from '@storybook/react/types-6-0'
import { useCallback, useState } from 'react'

import '@src/App/i18n'

import { Oven } from '@src/components'
import { OvenProps } from '@src/components/Oven'

export default {
  component: Oven,
  title: 'Components/Oven',
  parameters: {
    docs: {
      description: {
        component: 'Oven bakes items.',
      },
    },
  },
  argTypes: {
    testIdPrefix: {
      description: 'Text used in `data-testid="{testIdPrefix}.Oven"`',
    },

    className: {
      description: 'CSS classes to be applied to the component',
    },

    status: {
      description: 'Is the Oven started',
    },
  },
} as Meta

const Template: Story = (args) => (
  <Oven {...args} />
)

export const Default = Template.bind({})


export const ChangeOvenStatus = ({ status: defaultValue, ...args }) => {
  const [status, setStatus] = useState<OvenProps['status']>('off')
  const toggleStatus = useCallback(() => setStatus((state) => state === 'on' ? 'off' : 'on'), [])

  return (
    <div className="flex space-x-8">
      <div>
        <Oven status={status} {...args} />
      </div>

      <button onClick={toggleStatus}>
        Toggle Oven
      </button>
    </div>
  )
}
ChangeOvenStatus.storyName = 'Change Oven status'
