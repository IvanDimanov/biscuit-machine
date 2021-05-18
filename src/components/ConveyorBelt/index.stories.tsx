import { Story, Meta } from '@storybook/react/types-6-0'
import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { ConveyorBelt } from '@src/components'
import { ConveyorBeltProps } from '@src/components/ConveyorBelt'

export default {
  component: ConveyorBelt,
  title: 'Components/ConveyorBelt',
  parameters: {
    docs: {
      description: {
        component: 'Conveyor Belt is used to move objects around.',
      },
    },
  },
  argTypes: {
    testIdPrefix: {
      description: 'Text used in `data-testid="{testIdPrefix}.ConveyorBelt"`',
    },

    className: {
      description: 'CSS classes to be applied to the component',
    },

    totalCenterUnits: {
      description: 'Determines how long the Conveyor Belt can be by setting the number of center segments',
    },

    centerUnitsPerSecond: {
      description: 'If an object is on the Conveyor Belt, this var will say how much time it`ll take ' +
                   'for that object to cross one center segment',
    },

    size: {
      description: 'How tall the Conveyor Belt should be',
    },

    direction: {
      description: 'When an object is on the Conveyor Belt, and the belt is on, this var will say ' +
                   'which direction the object will move to',
    },

    itemsOnBelt: {
      description: 'An array of objects that can be moved by the Conveyor Belt. ' +
                   'Please note that every object can specify over which center segment we need to put it.',
    },

    staticItems: {
      description: 'An array of objects we can put over the Conveyor Belt but stay static when the belt is moving. ' +
                   'Please note that every object can specify over which center segment we need to put it.',
    },

    onItemOutOfBelt: {
      description: 'When an object is moved out side the Conveyor Belt, we`ll call this function with the object in question.',
      action: 'onItemOutOfBelt',
    },
  },
} as unknown as Meta

const Template: Story = (args) => (
  <ConveyorBelt {...args} />
)

export const Default = Template.bind({})


export const ChangeConveyorBeltSize = ({ size: defaultValue, ...args }) => {
  const [size, setSize] = useState<ConveyorBeltProps['size']>('small')
  const onChangeSizeSmall = useCallback(() => setSize('small'), [])
  const onChangeSizeMedium = useCallback(() => setSize('medium'), [])
  const onChangeSizeLarge = useCallback(() => setSize('large'), [])

  return (
    <div className="flex space-x-8">
      <div className="flex flex-col space-y-4">
        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeSizeSmall}
            checked={size === 'small'}
          />
          <span>
            Small
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeSizeMedium}
            checked={size === 'medium'}
          />
          <span>
            Medium
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeSizeLarge}
            checked={size === 'large'}
          />
          <span>
            Large
          </span>
        </label>
      </div>

      <div>
        <ConveyorBelt size={size} {...args} />
      </div>
    </div>
  )
}
ChangeConveyorBeltSize.storyName = 'Change Conveyor Belt size'


export const ChangeConveyorBeltLength = ({ totalCenterUnits: defaultValue, ...args }) => {
  const [totalCenterUnits, setTotalCenterUnits] = useState<ConveyorBeltProps['totalCenterUnits']>(1)
  const onChangeLengthShort = useCallback(() => setTotalCenterUnits(1), [])
  const onChangeLengthMedium = useCallback(() => setTotalCenterUnits(3), [])
  const onChangeLengthLong = useCallback(() => setTotalCenterUnits(5), [])

  return (
    <div className="flex space-x-8">
      <div className="flex flex-col space-y-4">
        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeLengthShort}
            checked={totalCenterUnits === 1}
          />
          <span>
            Short
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeLengthMedium}
            checked={totalCenterUnits === 3}
          />
          <span>
            Medium
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeLengthLong}
            checked={totalCenterUnits === 5}
          />
          <span>
            Long
          </span>
        </label>
      </div>

      <div>
        <ConveyorBelt totalCenterUnits={totalCenterUnits} {...args} />
      </div>
    </div>
  )
}
ChangeConveyorBeltLength.storyName = 'Change Conveyor Belt length'


export const ChangeConveyorBeltSpeed = ({ centerUnitsPerSecond: defaultValue, ...args }) => {
  const [centerUnitsPerSecond, setCenterUnitsPerSecond] = useState<ConveyorBeltProps['centerUnitsPerSecond']>(0)
  const onChangeStop = useCallback(() => setCenterUnitsPerSecond(0), [])
  const onChangeSlow = useCallback(() => setCenterUnitsPerSecond(1), [])
  const onChangeQuick = useCallback(() => setCenterUnitsPerSecond(4), [])

  return (
    <div className="flex space-x-8">
      <div className="flex flex-col space-y-4">
        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeStop}
            checked={centerUnitsPerSecond === 0}
          />
          <span>
            Stop
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeSlow}
            checked={centerUnitsPerSecond === 1}
          />
          <span>
            Slow
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeQuick}
            checked={centerUnitsPerSecond === 4}
          />
          <span>
            Quick
          </span>
        </label>
      </div>

      <div>
        <ConveyorBelt centerUnitsPerSecond={centerUnitsPerSecond} {...args} />
      </div>
    </div>
  )
}
ChangeConveyorBeltSpeed.storyName = 'Change Conveyor Belt speed'


export const ChangeConveyorBeltDirection = ({ direction: defaultValue, centerUnitsPerSecond: defaultValue2, ...args }) => {
  const [centerUnitsPerSecond, setCenterUnitsPerSecond] = useState<ConveyorBeltProps['centerUnitsPerSecond']>(0)

  const [direction, setDirection] = useState<ConveyorBeltProps['direction']>()

  const onChangeStop = useCallback(() => {
    setDirection(undefined)
    setCenterUnitsPerSecond(0)
  }, [])

  const onChangeLeft = useCallback(() => {
    setDirection('left')
    setCenterUnitsPerSecond(1)
  }, [])

  const onChangeRight = useCallback(() => {
    setDirection('right')
    setCenterUnitsPerSecond(1)
  }, [])

  return (
    <div className="flex space-x-8">
      <div className="flex flex-col space-y-4">
        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeStop}
            checked={!direction}
          />
          <span>
            Stop
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeLeft}
            checked={direction === 'left'}
          />
          <span>
            Move left &#8592;
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeRight}
            checked={direction === 'right'}
          />
          <span>
            Move right &#8594;
          </span>
        </label>
      </div>

      <div>
        <ConveyorBelt
          direction={direction}
          centerUnitsPerSecond={centerUnitsPerSecond}
          {...args}
        />
      </div>
    </div>
  )
}
ChangeConveyorBeltDirection.storyName = 'Change Conveyor Belt move direction'


export const ObjectOnBelt = ({
  direction: defaultValue,
  centerUnitsPerSecond: defaultValue2,
  size: defaultValue3,
  totalCenterUnits: defaultValue4,
  itemsOnBelt: defaultValue5,
  ...args
}) => {
  const [centerUnitsPerSecond, setCenterUnitsPerSecond] = useState<ConveyorBeltProps['centerUnitsPerSecond']>(0)

  const [direction, setDirection] = useState<ConveyorBeltProps['direction']>()

  const onChangeStop = useCallback(() => {
    setDirection(undefined)
    setCenterUnitsPerSecond(0)
  }, [])

  const onChangeLeft = useCallback(() => {
    setDirection('left')
    setCenterUnitsPerSecond(1)
  }, [])

  const onChangeRight = useCallback(() => {
    setDirection('right')
    setCenterUnitsPerSecond(1)
  }, [])

  return (
    <div className="flex space-x-8">
      <div className="flex flex-col space-y-4">
        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeStop}
            checked={!direction}
          />
          <span>
            Stop
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeLeft}
            checked={direction === 'left'}
          />
          <span>
            Move left &#8592;
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeRight}
            checked={direction === 'right'}
          />
          <span>
            Move right &#8594;
          </span>
        </label>
      </div>

      <div>
        <ConveyorBelt
          direction={direction}
          totalCenterUnits={3}
          size="small"
          centerUnitsPerSecond={centerUnitsPerSecond}
          itemsOnBelt={[{
            key: uuidv4(),
            centerUnitIndex: 0,
            node: (
              <div>
                &#x1F36A;
              </div>
            ),
          }]}
          {...args}
        />
      </div>
    </div>
  )
}
ObjectOnBelt.storyName = 'Move object'


export const StaticObject = Template.bind({})
StaticObject.args = {
  staticItems: [{
    key: 0,
    centerUnitIndex: 0,
    node: (
      <div className="-mt-10 ml-10 text-4xl">
        &darr;
      </div>
    ),
  }],
}
StaticObject.storyName = 'Static object on the belt'
