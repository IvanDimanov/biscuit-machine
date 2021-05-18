import { Story, Meta } from '@storybook/react/types-6-0'
import { useState, useCallback } from 'react'

import { Explosion } from '@src/components'

export default {
  component: Explosion,
  title: 'Components/Explosion',
  parameters: {
    docs: {
      description: {
        component: 'Explosion is used whenever you want smoke and sound out of thin air.',
      },
    },
  },
  argTypes: {
    testIdPrefix: {
      description: 'Text used in `data-testid="{testIdPrefix}.Explosion"`',
    },

    className: {
      description: 'CSS classes to be applied to the component',
    },

    shouldExplode: {
      description: 'Smash the existing item',
    },

    onExplosionEnd: {
      description: 'Called when the Explosion is pulled off',
      action: 'onExplosionEnd',
    },
  },
} as Meta

const Template: Story = (args) => (
  <div>
    <br />
    <br />
    <i>(Check the props below for more info on how to trigger an explosion)</i>
    <br />
    <br />
    <br />

    <Explosion {...args} />
  </div>
)

export const Default = Template.bind({})


export const TriggerExplosion = ({ shouldExplode: default1, onExplosionEnd: default2, ...args }) => {
  const [shouldExplode, setShouldExplode] = useState(false)
  const onExplode = useCallback(() => setShouldExplode(true), [])
  const onExplosionEnd = useCallback(() => setShouldExplode(false), [])

  return (
    <div className="flex space-x-8">
      <div>
        <Explosion
          shouldExplode={shouldExplode}
          onExplosionEnd={onExplosionEnd}
          {...args}
        />
      </div>

      <div className="flex flex-col space-y-4">
        <button
          onClick={onExplode}
          disabled={shouldExplode}
        >
          Explode
        </button>
      </div>
    </div>
  )
}
TriggerExplosion.storyName = 'Trigger explosion'


export const TriggerWiderExplosion = ({ shouldExplode: default1, width: default2, onExplosionEnd: default3, ...args }) => {
  const [shouldExplode, setShouldExplode] = useState(false)
  const onExplode = useCallback(() => setShouldExplode(true), [])
  const onExplosionEnd = useCallback(() => setShouldExplode(false), [])

  const [width, setWidth] = useState(10)
  const setWidthSmall = useCallback(() => setWidth(10), [])
  const setWidthMedium = useCallback(() => setWidth(200), [])
  const setWidthLarge = useCallback(() => setWidth(500), [])

  return (
    <div className="flex space-x-8">
      <div>
        <Explosion
          shouldExplode={shouldExplode}
          width={width}
          onExplosionEnd={onExplosionEnd}
          {...args}
        />
      </div>

      <div className="flex flex-col space-y-4">
        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={setWidthSmall}
            checked={width === 10}
          />
          <span>
            Small
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={setWidthMedium}
            checked={width === 200}
          />
          <span>
            Medium
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={setWidthLarge}
            checked={width === 500}
          />
          <span>
            Large
          </span>
        </label>

        <button
          onClick={onExplode}
          disabled={shouldExplode}
        >
          Explode &#x1F4A5;
        </button>
      </div>
    </div>
  )
}
TriggerWiderExplosion.storyName = 'Trigger wider explosion'


export const TriggerDenserExplosion = ({ shouldExplode: default1, density: default2, onExplosionEnd: default3, ...args }) => {
  const [shouldExplode, setShouldExplode] = useState(false)
  const onExplode = useCallback(() => setShouldExplode(true), [])
  const onExplosionEnd = useCallback(() => setShouldExplode(false), [])

  const [density, setDensity] = useState(10)
  const setDensitySmall = useCallback(() => setDensity(10), [])
  const setDensityMedium = useCallback(() => setDensity(50), [])
  const setDensityLarge = useCallback(() => setDensity(100), [])

  return (
    <div className="flex space-x-8">
      <div>
        <Explosion
          shouldExplode={shouldExplode}
          density={density}
          onExplosionEnd={onExplosionEnd}
          {...args}
        />
      </div>

      <div className="flex flex-col space-y-4">
        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={setDensitySmall}
            checked={density === 10}
          />
          <span>
            Small
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={setDensityMedium}
            checked={density === 50}
          />
          <span>
            Medium
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={setDensityLarge}
            checked={density === 100}
          />
          <span>
            Large
          </span>
        </label>

        <button
          onClick={onExplode}
          disabled={shouldExplode}
        >
          Explode &#x1F4A5;
        </button>
      </div>
    </div>
  )
}
TriggerDenserExplosion.storyName = 'Trigger denser explosion'


export const TriggerColorfulExplosion = ({ shouldExplode: default1, color: default2, onExplosionEnd: default3, ...args }) => {
  const [shouldExplode, setShouldExplode] = useState(false)
  const onExplode = useCallback(() => setShouldExplode(true), [])
  const onExplosionEnd = useCallback(() => setShouldExplode(false), [])

  const [color, setDensity] = useState('black')
  const setColorBlack = useCallback(() => setDensity('black'), [])
  const setColorRed = useCallback(() => setDensity('red'), [])
  const setColorBlue = useCallback(() => setDensity('blue'), [])

  return (
    <div className="flex space-x-8">
      <div>
        <Explosion
          shouldExplode={shouldExplode}
          color={color}
          onExplosionEnd={onExplosionEnd}
          {...args}
        />
      </div>

      <div className="flex flex-col space-y-4">
        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={setColorBlack}
            checked={color === 'black'}
          />
          <span>
            Black
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={setColorRed}
            checked={color === 'red'}
          />
          <span>
            Red
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={setColorBlue}
            checked={color === 'blue'}
          />
          <span>
            Blue
          </span>
        </label>

        <button
          onClick={onExplode}
          disabled={shouldExplode}
        >
          Explode &#x1F4A5;
        </button>
      </div>
    </div>
  )
}
TriggerColorfulExplosion.storyName = 'Trigger colorful explosion'
