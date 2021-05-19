import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import useMachine, { selectBiscuits, MachineBiscuit } from '@src/globalState/useMachine'
import useSwitchPart, { selectValue } from '@src/globalState/useSwitchPart'
import useMotorPart, { selectOnChange } from '@src/globalState/useMotorPart'
import useExtruderPart, { selectShouldExtrude, selectOnExtrudeStart } from '@src/globalState/useExtruderPart'
import useStamperPart, { selectShouldStamp, selectOnStampStart } from '@src/globalState/useStamperPart'
import useConveyorBeltPart, { selectShouldMove, selectSetShouldMove } from '@src/globalState/useConveyorBeltPart'

import MotorPart from './Parts/MotorPart'
import ConveyorBeltPart from './Parts/ConveyorBeltPart'
import CollectionBoxPart from './Parts/CollectionBoxPart'
import SwitchPart from './Parts/SwitchPart'


export const EXTRUDER_CENTER_UNIT_INDEX = 0
export const STAMPER_CENTER_UNIT_INDEX = 3
export const OVEN_CENTER_UNIT_INDEX = 6


type MachineProps = {
  testIdPrefix?: string
  className?: string
}

const Machine = ({
  testIdPrefix,
  className,
}: MachineProps) => {
  const biscuits = useMachine(selectBiscuits)

  const switchValue = useSwitchPart(selectValue)
  const onChangeMotorPart = useMotorPart(selectOnChange)

  const shouldExtrude = useExtruderPart(selectShouldExtrude)
  const onExtrudeStart = useExtruderPart(selectOnExtrudeStart)

  const shouldStamp = useStamperPart(selectShouldStamp)
  const onStampStart = useStamperPart(selectOnStampStart)

  const shouldMove = useConveyorBeltPart(selectShouldMove)
  const setShouldMove = useConveyorBeltPart(selectSetShouldMove)


  const [isOvenReady, setIsOvenReady] = useState(false)
  const [isExtruderDone, setIsExtruderDone] = useState(true)
  const [isStamperDone, setIsStamperDone] = useState(true)

  const biscuitUnderExtruder = useMemo<MachineBiscuit | undefined>(() => biscuits
    .find(({ centerUnitIndex }) => centerUnitIndex === EXTRUDER_CENTER_UNIT_INDEX), [biscuits])

  const biscuitUnderStamper = useMemo<MachineBiscuit | undefined>(() => biscuits
    .find(({ centerUnitIndex }) => centerUnitIndex === STAMPER_CENTER_UNIT_INDEX), [biscuits])


  const machineMove = useCallback(() => {
    setShouldMove(true)
    onChangeMotorPart('on')
  }, [setShouldMove, onChangeMotorPart])


  useEffect(() => {
    if (!shouldMove) {
      onChangeMotorPart('pause')
    }
  }, [shouldMove, onChangeMotorPart])


  const machineCraft = useCallback(() => {
    setIsExtruderDone(false)
    onExtrudeStart()

    if (biscuitUnderStamper) {
      setIsStamperDone(false)
      onStampStart()
    }
  }, [biscuitUnderStamper, onExtrudeStart, onStampStart])


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

    if (biscuitUnderExtruder) {
      machineMove()
    } else {
      machineCraft()
    }
  }, [switchValue, isExtruderDone, isStamperDone, isOvenReady, biscuitUnderExtruder, machineMove, machineCraft])


  useEffect(() => {
    if (switchValue === 'off') {
      onChangeMotorPart('off')
    }
  }, [switchValue, onChangeMotorPart])


  const timer = useRef<NodeJS.Timeout>()
  useEffect(() => {
    if (switchValue === 'on') {
      onChangeMotorPart('off')
      timer.current = setTimeout(() => setIsOvenReady(true), 2000)
    }
    return () => timer.current && clearTimeout(timer.current)
  }, [switchValue, onChangeMotorPart, timer])


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
