import { Story, Meta } from '@storybook/react/types-6-0'
import { useCallback, useState } from 'react'

import '@src/App/i18n'

import { Thermometer } from '@src/components'

export default {
  component: Thermometer,
  title: 'Components/Thermometer',
  parameters: {
    docs: {
      description: {
        component: 'Thermometer indicates temperature.',
      },
    },
  },
  argTypes: {
    testIdPrefix: {
      description: 'Text used in `data-testid="{testIdPrefix}.Thermometer"`',
    },

    className: {
      description: 'CSS classes to be applied to the component',
    },

    labelSuffix: {
      description: 'What we should pu after the temperature value, maybe ℃ or ℉',
    },

    shouldShowIndicator: {
      description: 'Should there be a tracking for the current temperature',
    },

    temperature: {
      description: 'What is the current temperature',
    },

    minTemperature: {
      description: 'Lowest point we can show on the thermometer',
    },

    maxTemperature: {
      description: 'Hightest point we can show on the thermometer',
    },

    pinnedTemperatures: {
      description: 'A list of temperature values we want printed on the side',
    },
  },
} as Meta

const Template: Story = (args) => (
  <Thermometer {...args} />
)

export const Default = Template.bind({})


export const ChangeThermometer = ({
  temperature: defaultValue1,
  pinnedTemperatures: default2,
  minTemperature: default3,
  maxTemperature: default4,
  ...args
}) => {
  const [temperature, setTemperature] = useState(20)
  const addTemperature = useCallback(() => setTemperature((state) => state + 5), [])
  const subTemperature = useCallback(() => setTemperature((state) => state - 5), [])

  return (
    <div className="flex space-x-4">
      <div>
        <Thermometer
          temperature={temperature}
          pinnedTemperatures={[35, 70]}
          minTemperature={10}
          maxTemperature={80}
          {...args}
        />
      </div>

      <div className="flex flex-col space-y-4">
        <button onClick={addTemperature}>
          +5℃
        </button>

        <button onClick={subTemperature}>
          -5℃
        </button>
      </div>
    </div>
  )
}
ChangeThermometer.storyName = 'Change temperature'
