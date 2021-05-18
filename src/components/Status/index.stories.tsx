import { Story, Meta } from '@storybook/react/types-6-0'
import { useCallback, useState } from 'react'

import { Status } from '@src/components'
import { StatusProps } from '@src/components/Status'

export default {
  component: Status,
  title: 'Components/Status',
  parameters: {
    docs: {
      description: {
        component: 'Status box commonly used alongside a machine component.',
      },
    },
  },
  argTypes: {
    testIdPrefix: {
      description: 'Text used in `data-testid="{testIdPrefix}.Status"`',
    },

    className: {
      description: 'CSS classes to be applied to the component',
    },

    value: {
      description: 'What is the current status we show',
    },

    bar: {
      description: 'Should we show an extension from the Status box',
    },
  },
} as Meta

const Template: Story = (args) => (
  <Status {...args} />
)

export const Default = Template.bind({})


export const ChangeStatus = ({ value: defaultValue, ...args }) => {
  const [value, setValue] = useState<StatusProps['value']>('off')
  const onChangeValueOn = useCallback(() => setValue('on'), [])
  const onChangeValueOff = useCallback(() => setValue('off'), [])
  const onChangeValuePause = useCallback(() => setValue('pause'), [])

  return (
    <div className="flex space-x-8">
      <div>
        <Status value={value} {...args} />
      </div>

      <div className="flex flex-col space-y-4">
        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeValueOff}
            checked={value === 'off'}
          />
          <span>
            Off
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeValuePause}
            checked={value === 'pause'}
          />
          <span>
            Pause
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeValueOn}
            checked={value === 'on'}
          />
          <span>
            On
          </span>
        </label>
      </div>
    </div>
  )
}
ChangeStatus.storyName = 'Change status value'


export const ChangeBar = ({ value: defaultValue, ...args }) => {
  const [bar, setBar] = useState<StatusProps['bar']>()
  const onChangeBarBottomLeft = useCallback(() => setBar('bottomLeft'), [])
  const onChangeBarBottomRight = useCallback(() => setBar('bottomRight'), [])
  const onChangeBarNone = useCallback(() => setBar(undefined), [])

  return (
    <div className="flex space-x-8">
      <div className="h-52">
        <Status bar={bar} {...args} />
      </div>

      <div className="flex flex-col space-y-4">
        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeBarBottomLeft}
            checked={bar === 'bottomLeft'}
          />
          <span>
            &#8592;
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeBarBottomRight}
            checked={bar === 'bottomRight'}
          />
          <span>
            &#8594;
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeBarNone}
            checked={!bar}
          />
          <span>
            (none)
          </span>
        </label>
      </div>
    </div>
  )
}
ChangeBar.storyName = 'Change bottom bar'
