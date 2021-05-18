import { Story, Meta } from '@storybook/react/types-6-0'
import { useState, useCallback } from 'react'

import { Extruder } from '@src/components'

export default {
  component: Extruder,
  title: 'Components/Extruder',
  parameters: {
    docs: {
      description: {
        component: 'Extruder is used to create new items.',
      },
    },
  },
  argTypes: {
    testIdPrefix: {
      description: 'Text used in `data-testid="{testIdPrefix}.Extruder"`',
    },

    className: {
      description: 'CSS classes to be applied to the component',
    },

    shouldExtrude: {
      description: 'Show the Extruder create new item',
    },

    onExtrudeEnd: {
      description: 'Called when the new items is created',
      action: 'onExtrudeEnd',
    },
  },
} as Meta

const Template: Story = (args) => (
  <Extruder {...args} />
)

export const Default = Template.bind({})


export const TriggerExtrude = ({ shouldExtrude: default1, onExtrudeEnd: default2, ...args }) => {
  const [shouldExtrude, setShouldExtrude] = useState(false)
  const onExtrude = useCallback(() => setShouldExtrude(true), [])
  const onExtrudeEnd = useCallback(() => setShouldExtrude(false), [])

  return (
    <div className="flex space-x-8">
      <div>
        <Extruder
          shouldExtrude={shouldExtrude}
          onExtrudeEnd={onExtrudeEnd}
          {...args}
        />
      </div>

      <div className="flex flex-col space-y-4">
        <button
          onClick={onExtrude}
          disabled={shouldExtrude}
        >
          Extrude
        </button>
      </div>
    </div>
  )
}
TriggerExtrude.storyName = 'Trigger extrude'
