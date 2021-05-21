import { Story, Meta } from '@storybook/react/types-6-0'
import { useState, useCallback } from 'react'

import '@src/App/i18n'

import { Stamper } from '@src/components'

export default {
  component: Stamper,
  title: 'Components/Stamper',
  parameters: {
    docs: {
      description: {
        component: 'Stamper is used to smash existing items.',
      },
    },
  },
  argTypes: {
    testIdPrefix: {
      description: 'Text used in `data-testid="{testIdPrefix}.Stamper"`',
    },

    className: {
      description: 'CSS classes to be applied to the component',
    },

    shouldStamp: {
      description: 'Smash the existing item',
    },

    onStamp: {
      description: 'Called when the Stamper is on it`s lowest point',
      action: 'onStamp',
    },

    onStampEnd: {
      description: 'Called when the Stamper is pulled off',
      action: 'onStampEnd',
    },
  },
} as Meta

const Template: Story = (args) => (
  <Stamper {...args} />
)

export const Default = Template.bind({})


export const TriggerStamp = ({ shouldStamp: default1, onStampEnd: default2, ...args }) => {
  const [shouldStamp, setShouldStamp] = useState(false)
  const onStamp = useCallback(() => setShouldStamp(true), [])
  const onStampEnd = useCallback(() => setShouldStamp(false), [])

  return (
    <div className="flex space-x-8">
      <div>
        <Stamper
          shouldStamp={shouldStamp}
          onStampEnd={onStampEnd}
          {...args}
        />
      </div>

      <div className="flex flex-col space-y-4">
        <button
          onClick={onStamp}
          disabled={shouldStamp}
        >
          Stamp
        </button>
      </div>
    </div>
  )
}
TriggerStamp.storyName = 'Trigger stamp'
