import { useCallback } from 'react'
import PropTypes from 'prop-types'

import useMachine, { selectStampBiscuit } from '@src/globalState/useMachine'
import useStamperPart, { selectStatusValue, selectShouldStamp, selectOnStampEnd } from '@src/globalState/useStamperPart'
import { Stamper, Status } from '@src/components'

import { STAMPER_CENTER_UNIT_INDEX } from '../../index'


type StamperPartProps = {
  testIdPrefix?: string
  className?: string
}

const StamperPart = ({
  testIdPrefix,
  className,
}: StamperPartProps) => {
  const stampBiscuit = useMachine(selectStampBiscuit)
  const statusValue = useStamperPart(selectStatusValue)
  const shouldStamp = useStamperPart(selectShouldStamp)
  const onStampEnd = useStamperPart(selectOnStampEnd)


  const onStamp = useCallback(() => {
    stampBiscuit(STAMPER_CENTER_UNIT_INDEX)
  }, [stampBiscuit])


  return (
    <div
      data-testid={`${testIdPrefix}.StamperPart`}
      className={className}
    >
      <div className="relative z-1 -ml-2">
        <Status
          testIdPrefix={`${testIdPrefix}.StamperPart`}
          className="absolute -top-24 -left-16"
          value={statusValue}
          bar="bottomRight"
        />
      </div>


      <Stamper
        testIdPrefix={`${testIdPrefix}.StamperPart`}
        className="relative z-3"
        shouldStamp={shouldStamp}
        onStamp={onStamp}
        onStampEnd={onStampEnd}
      />
    </div>
  )
}


StamperPart.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
}

StamperPart.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
}

StamperPart.displayName = 'StamperPart'


export default StamperPart
