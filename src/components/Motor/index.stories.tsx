import { Story, Meta } from '@storybook/react/types-6-0'
import { useState, useCallback } from 'react'

import { Motor } from '@src/components'
import { MotorProps } from '@src/components/Motor'

export default {
  component: Motor,
  title: 'Components/Motor',
  parameters: {
    docs: {
      description: {
        component: 'Motor component initiates movement.',
      },
    },
  },
  argTypes: {
    testIdPrefix: {
      description: 'Text used in `data-testid="{testIdPrefix}.Motor"`',
    },

    className: {
      description: 'CSS classes to be applied to the component',
    },

    status: {
      description: 'Indicates whether the motor is active',
    },
  },
} as Meta

const Template: Story = (args) => (
  <Motor {...args} />
)

export const Default = Template.bind({})


export const ChangeStatus = ({ status: default1, ...args }) => {
  const [status, setStatus] = useState<MotorProps['status']>('off')
  const onChangeStatusOn = useCallback(() => setStatus('on'), [])
  const onChangeStatusOff = useCallback(() => setStatus('off'), [])

  return (
    <div className="flex space-x-8">
      <div>
        <Motor
          status={status}
          {...args}
        />
      </div>

      <div className="flex flex-col space-y-4">
        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeStatusOn}
            checked={status === 'on'}
          />
          <span>
            On
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeStatusOff}
            checked={status === 'off'}
          />
          <span>
            Off
          </span>
        </label>
      </div>
    </div>
  )
}
ChangeStatus.storyName = 'Change status'
