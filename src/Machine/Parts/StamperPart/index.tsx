import { useCallback } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

import useMachine, { selectBiscuits, selectSetBiscuits } from '@src/globalState/useMachine'
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
  const biscuits = useMachine(selectBiscuits)
  const setBiscuits = useMachine(selectSetBiscuits)
  const statusValue = useStamperPart(selectStatusValue)
  const shouldStamp = useStamperPart(selectShouldStamp)
  const onStampEnd = useStamperPart(selectOnStampEnd)

  const onStamp = useCallback(() => {
    setBiscuits(biscuits.map((biscuit) => {
      if (biscuit.centerUnitIndex !== STAMPER_CENTER_UNIT_INDEX) {
        return biscuit
      }

      return {
        ...biscuit,
        form: 'unbacked',
      }
    }))
  }, [biscuits, setBiscuits])


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
        // onStamp={onStamp}
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
