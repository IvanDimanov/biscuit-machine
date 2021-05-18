import { Story, Meta } from '@storybook/react/types-6-0'
import { useCallback, useState } from 'react'

import { Biscuit } from '@src/components'
import { BiscuitProps } from '@src/components/Biscuit'

export default {
  component: Biscuit,
  title: 'Components/Biscuit',
  parameters: {
    docs: {
      description: {
        component: 'Biscuit is the single unit a Machine is producing.',
      },
    },
  },
  argTypes: {
    testIdPrefix: {
      description: 'Text used in `data-testid="{testIdPrefix}.Biscuit"`',
    },

    className: {
      description: 'CSS classes to be applied to the component',
    },

    form: {
      description: 'A biscuit changes form when extruded, stamped, or backed',
    },

    isBacking: {
      description: 'Should we show a baking vapor',
    },
  },
} as Meta

const Template: Story = (args) => (
  <Biscuit {...args} />
)

export const Default = Template.bind({})


export const ChangeBiscuitForm = ({
  form: defaultValue1,
  ...args
}) => {
  const [form, setForm] = useState<BiscuitProps['form']>('blob')
  const changeForm = useCallback(() => setForm((state) => {
    switch (state) {
      case 'blob':
        return 'unbacked'
      case 'unbacked':
        return 'backed'
      case 'backed':
          return 'overBacked'
      default:
        return 'blob'
    }
  }), [])

  return (
    <div className="flex space-x-4">
      <Biscuit
        form={form}
        {...args}
      />

      <button onClick={changeForm}>
        Change form
      </button>
    </div>
  )
}
ChangeBiscuitForm.storyName = 'Change form'
