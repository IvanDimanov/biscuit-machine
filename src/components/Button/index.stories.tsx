import { Story, Meta } from '@storybook/react/types-6-0'
import { useCallback, useState } from 'react'

import { Button } from '@src/components'
import { ButtonProps } from '@src/components/Button'

export default {
  component: Button,
  title: 'Components/Button',
  parameters: {
    docs: {
      description: {
        component: 'Common UI Button used for user click actions.',
      },
    },
  },
  argTypes: {
    testIdPrefix: {
      description: 'Text used in `data-testid="{testIdPrefix}.Button"`',
    },

    className: {
      description: 'CSS classes to be applied to the component',
    },

    variant: {
      description: 'Different color palettes',
    },

    size: {
      description: 'How big we want to have the button',
    },

    children: {
      description: 'What we should put inside \\<Button>...</Button>',
      control: { type: 'text' },
      defaultValue: Button.defaultProps.children,
    },

    onClick: {
      description: 'Tracks click events',
      action: 'onClick',
    },

    disabled: {
      description: 'Is the component accessible',
    },
  },
} as Meta

const Template: Story = (args) => (
  <Button {...args} />
)

export const Default = Template.bind({})


export const Variant = ({ variant: defaultVariant, ...args }) => {
  const [variant, setVariant] = useState<ButtonProps['variant']>('default')
  const onChangeSetVariantDefault = useCallback(() => setVariant('default'), [])
  const onChangeSetVariantPrimary = useCallback(() => setVariant('primary'), [])

  return (
    <div>
      <Button variant={variant} {...args} />

      <div className="flex flex-col space-y-4 m-10">
        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeSetVariantDefault}
            checked={variant === 'default'}
          />
          <span>
            Default
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={onChangeSetVariantPrimary}
            checked={variant === 'primary'}
          />
          <span>
            Primary
          </span>
        </label>
      </div>
    </div>
  )
}
Variant.storyName = 'Change variant'


export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}
