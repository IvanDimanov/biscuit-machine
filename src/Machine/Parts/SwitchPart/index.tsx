import PropTypes from 'prop-types'

import useSwitchPart, { selectValue, selectDisabled, selectOnChangeValue } from '@src/globalState/useSwitchPart'
import { Switch } from '@src/components'


type SwitchPartProps = {
  testIdPrefix?: string
  className?: string
}

const SwitchPart = ({
  testIdPrefix,
  className,
}: SwitchPartProps) => {
  const value = useSwitchPart(selectValue)
  const disabled = useSwitchPart(selectDisabled)
  const onChangeValue = useSwitchPart(selectOnChangeValue)

  return (
    <div
      data-testid={`${testIdPrefix}.SwitchPart`}
      className={className}
    >
      <Switch
        testIdPrefix={`${testIdPrefix}.SwitchPart`}
        value={value}
        onChange={onChangeValue}
        disabled={disabled}
      />
    </div>
  )
}


SwitchPart.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
}

SwitchPart.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
}

SwitchPart.displayName = 'SwitchPart'


export default SwitchPart
