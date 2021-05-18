import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import useMachine, {
  selectBiscuits,
  selectSetBiscuits,
  selectStage,
  selectSetStage,
  MachineBiscuit,
} from '@src/globalState/useMachine'
import useSwitchPart, { selectValue } from '@src/globalState/useSwitchPart'
import useMotorPart, { selectOnChange } from '@src/globalState/useMotorPart'
import useExtruderPart, { selectShouldExtrude, selectOnExtrudeStart } from '@src/globalState/useExtruderPart'
import useStamperPart, { selectShouldStamp, selectOnStampStart } from '@src/globalState/useStamperPart'
import useConveyorBeltPart, { selectSetCenterUnitsPerSecond } from '@src/globalState/useConveyorBeltPart'

import MotorPart from './Parts/MotorPart'
import ConveyorBeltPart from './Parts/ConveyorBeltPart'
import CollectionBoxPart from './Parts/CollectionBoxPart'
import SwitchPart from './Parts/SwitchPart'


export const EXTRUDER_CENTER_UNIT_INDEX = 0
export const STAMPER_CENTER_UNIT_INDEX = 3
export const OVEN_CENTER_UNIT_INDEX = 6

const STAGE_MOVE_TIME_IN_SECONDS = 1


type MachineProps = {
  testIdPrefix?: string
  className?: string
}

const Machine = ({
  testIdPrefix,
  className,
}: MachineProps) => {
  const biscuits = useMachine(selectBiscuits)
  const setBiscuits = useMachine(selectSetBiscuits)
  const stage = useMachine(selectStage)
  const setStage = useMachine(selectSetStage)

  const switchValue = useSwitchPart(selectValue)
  const onChangeMotorPart = useMotorPart(selectOnChange)

  const shouldExtrude = useExtruderPart(selectShouldExtrude)
  const onExtrudeStart = useExtruderPart(selectOnExtrudeStart)

  const shouldStamp = useStamperPart(selectShouldStamp)
  const onStampStart = useStamperPart(selectOnStampStart)

  const setCenterUnitsPerSecond = useConveyorBeltPart(selectSetCenterUnitsPerSecond)


  const [isOvenReady, setIsOvenReady] = useState(false)
  const [isExtruderDone, setIsExtruderDone] = useState(false)
  const [isStamperDone, setIsStamperDone] = useState(false)

  const biscuitOnUnitZero = useMemo<MachineBiscuit | undefined>(() => biscuits
    .find(({ centerUnitIndex }) => centerUnitIndex === 0), [biscuits])


  const stageMove = useCallback(() => {
    setCenterUnitsPerSecond(STAGE_MOVE_TIME_IN_SECONDS)
    onChangeMotorPart('on')

    setTimeout(() => {
      setCenterUnitsPerSecond(0)
      onChangeMotorPart('off')
      setBiscuits(biscuits.map((biscuit) => ({
        ...biscuit,
        centerUnitIndex: biscuit.centerUnitIndex + 1,
      })))
    }, STAGE_MOVE_TIME_IN_SECONDS * 1000)
  }, [setCenterUnitsPerSecond, onChangeMotorPart, biscuits, setBiscuits])


  const stageCraft = useCallback(() => {
    setIsExtruderDone(false)
    setIsStamperDone(false)

    setCenterUnitsPerSecond(0)
    onExtrudeStart()

    if (biscuits.find(({ centerUnitIndex }) => centerUnitIndex === STAMPER_CENTER_UNIT_INDEX)) {
      onStampStart()
    } else {
      setIsStamperDone(true)
    }
  }, [biscuits, setCenterUnitsPerSecond, onExtrudeStart, onStampStart])


  useEffect(() => {
    if (!shouldExtrude) {
      setIsExtruderDone(true)
    }
  }, [shouldExtrude])

  useEffect(() => {
    if (!shouldStamp) {
      setIsStamperDone(true)
    }
  }, [shouldStamp])

  useEffect(() => {
    if (switchValue !== 'on') {
      return
    }

    if (!isExtruderDone || !isStamperDone || !isOvenReady) {
      return
    }

    if (biscuitOnUnitZero) {
      stageMove()
    } else {
      stageCraft()
    }
  }, [switchValue, isExtruderDone, isStamperDone, isOvenReady, biscuitOnUnitZero, stageMove, stageCraft])


  const timer = useRef<NodeJS.Timeout>()
  useEffect(() => {
    if (switchValue === 'on') {
      timer.current = setTimeout(() => setIsOvenReady(true), 3 * 1000)

      // if (stage === 'craft' && !timer.current) {
      //   timer.current = setTimeout(() => setIsOvenReady(true), 3 * 1000)
      // }
      // if (stage === 'move') {
      //   stageMove()
      // }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => timer.current && clearTimeout(timer.current)
  }, [switchValue, timer, stageMove])


  return (
    <div
      data-testid={`${testIdPrefix}.Machine`}
      className={className}
    >
      <div className="flex select-none">
        <MotorPart
          testIdPrefix={`${testIdPrefix}.Machine`}
          className="-mt-2 mr-2"
        />

        <ConveyorBeltPart
          testIdPrefix={`${testIdPrefix}.Machine`}
        />

        <CollectionBoxPart
          testIdPrefix={`${testIdPrefix}.Machine`}
        />
      </div>

      <SwitchPart
        testIdPrefix={`${testIdPrefix}.Machine`}
        className="flex justify-center mt-20 -ml-36"
      />
    </div>
  )
}


Machine.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
}

Machine.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
}

Machine.displayName = 'Machine'


export default Machine
