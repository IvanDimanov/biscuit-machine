import { Story, Meta } from '@storybook/react/types-6-0'
import { useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

import '@src/App/i18n'

import { CollectionBox } from '@src/components'
import { CollectionBoxProps } from '@src/components/CollectionBox'

import getRandomNumber from '@src/utils/getRandomNumber'

export default {
  component: CollectionBox,
  title: 'Components/CollectionBox',
  parameters: {
    docs: {
      description: {
        component: 'Box for collecting various artefact.',
      },
    },
  },
  argTypes: {
    testIdPrefix: {
      description: 'Text used in `data-testid="{testIdPrefix}.CollectionBox"`',
    },

    className: {
      description: 'CSS classes to be applied to the component',
    },

    item: {
      description: 'What is the artefact we put in the box',
    },
  },
} as Meta

const Template: Story = (args) => (
  <CollectionBox {...args} />
)

export const Default = Template.bind({})


const htmlCodes = {
  0: <span>&#x1f36a;</span>,
  1: <span>&#127849;</span>,
  2: <span>&#127852;</span>,
  3: <span>&#127856;</span>,
}
export const AddItem = ({ item: default1, ...args }) => {
  const [item, setItem] = useState<CollectionBoxProps['item']>()

  const addItem = useCallback(() => setItem({
    key: uuidv4(),
    node: (
      <div className="text-yellow-300 font-bold whitespace-nowrap">
        +{getRandomNumber(1, 27)} {htmlCodes[getRandomNumber(0, 3)]}
      </div>
    ),
  }), [])


  return (
    <div className="flex space-x-4 mt-16">
      <CollectionBox
        item={item}
        {...args}
      />

      <button onClick={addItem}>
        Add Item
      </button>
    </div>
  )
}
AddItem.storyName = 'Add item'
