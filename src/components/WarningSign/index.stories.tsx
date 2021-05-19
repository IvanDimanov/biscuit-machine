import { Story, Meta } from '@storybook/react/types-6-0'
import { useState, useCallback } from 'react'

import { WarningSign } from '@src/components'

export default {
  component: WarningSign,
  title: 'Components/WarningSign',
  parameters: {
    docs: {
      description: {
        component: 'Warning sign is used to bring user attention to a possible problem.',
      },
    },
  },
  argTypes: {
    testIdPrefix: {
      description: 'Text used in `data-testid="{testIdPrefix}.WarningSign"`',
    },

    className: {
      description: 'CSS classes to be applied to the component',
    },
  },
} as Meta

const Template: Story = (args) => (
  <WarningSign {...args} />
)

export const Default = Template.bind({})


export const TriggerWarning = ({ shouldStamp: default1, ...args }) => {
  const [toggle, setToggle] = useState(false)
  const onToggle = useCallback(() => setToggle((state) => !state), [])

  return (
    <div className="flex space-x-8">
      <div className="flex flex-col space-y-4">
        <button onClick={onToggle}>
          Trigger
        </button>
      </div>

      <div>
        {toggle && <WarningSign {...args} />}
      </div>
    </div>
  )
}
TriggerWarning.storyName = 'Trigger warning'
