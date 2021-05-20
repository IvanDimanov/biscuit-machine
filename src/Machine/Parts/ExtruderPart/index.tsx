import { useCallback } from 'react'
import PropTypes from 'prop-types'

import useMachine, { selectAddBiscuits } from '@src/globalState/useMachine'
import useExtruderPart, { selectStatusValue, selectShouldExtrude, selectOnExtrudeEnd } from '@src/globalState/useExtruderPart'
import { Extruder, Status } from '@src/components'


type ExtruderPartProps = {
  testIdPrefix?: string
  className?: string
}

const ExtruderPart = ({
  testIdPrefix,
  className,
}: ExtruderPartProps) => {
  const addBiscuit = useMachine(selectAddBiscuits)
  const statusValue = useExtruderPart(selectStatusValue)
  const shouldExtrude = useExtruderPart(selectShouldExtrude)
  const onExtrudeEnd = useExtruderPart(selectOnExtrudeEnd)

  const extruderOnExtrudeEnd = useCallback(() => {
    if (statusValue !== 'off') {
      addBiscuit()
    }

    /**
     * We announce the extruder completion with a delay
     * just to make the new biscuit visually clear when added
     */
    setTimeout(onExtrudeEnd, 100)
  }, [statusValue, addBiscuit, onExtrudeEnd])


  return (
    <div
      data-testid={`${testIdPrefix}.ExtruderPart`}
      className={className}
    >
      <div className="relative z-1">
        <Status
          testIdPrefix={`${testIdPrefix}.ExtruderPart`}
          className="absolute -top-24 -left-14"
          value={statusValue}
          bar="bottomRight"
        />
      </div>

      <Extruder
        testIdPrefix={`${testIdPrefix}.ExtruderPart`}
        className="relative z-3"
        shouldExtrude={shouldExtrude}
        onExtrudeEnd={extruderOnExtrudeEnd}
      />
    </div>
  )
}


ExtruderPart.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
}

ExtruderPart.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
}

ExtruderPart.displayName = 'ExtruderPart'


export default ExtruderPart
