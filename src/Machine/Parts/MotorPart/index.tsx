import PropTypes from 'prop-types'

import useMotorPart, { selectStatusValue, selectMotorStatus } from '@src/globalState/useMotorPart'
import { Motor, Status } from '@src/components'


type MotorPartProps = {
  testIdPrefix?: string
  className?: string
}

const MotorPart = ({
  testIdPrefix,
  className,
}: MotorPartProps) => {
  const statusValue = useMotorPart(selectStatusValue)
  const motorStatus = useMotorPart(selectMotorStatus)

  return (
    <div
      data-testid={`${testIdPrefix}.MotorPart`}
      className={className}
    >
      <div className="relative z-1">
        <Status
          testIdPrefix={`${testIdPrefix}.MotorPart`}
          className="absolute -top-24 -left-8"
          value={statusValue}
          bar="bottomRight"
        />
      </div>

      <Motor
        testIdPrefix={`${testIdPrefix}.MotorPart`}
        className="relative z-2 -mt-2"
        status={motorStatus}
      />
    </div>
  )
}


MotorPart.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
}

MotorPart.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
}

MotorPart.displayName = 'MotorPart'


export default MotorPart
