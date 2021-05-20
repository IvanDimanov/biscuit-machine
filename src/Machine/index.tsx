import { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import useMachine, {
  selectBiscuits,
  selectSetBiscuits,
  MachineBiscuit,
} from '@src/globalState/useMachine'
import useSwitchPart, {
  selectValue as selectSwitchValue,
  selectOnChangeValue as selectSwitchOnChangeValue,
  selectOnChangeDisabled as selectSwitchOnChangeDisabled,
} from '@src/globalState/useSwitchPart'
import useMotorPart, { selectOnChange as selectMotorOnChange } from '@src/globalState/useMotorPart'

import useExtruderPart, {
  selectShouldExtrude,
  selectOnExtrudeStart,
  selectOnPause as selectOnExtrudePause,
} from '@src/globalState/useExtruderPart'

import useStamperPart, {
  selectShouldStamp,
  selectOnStampStart,
  selectOnPause as selectOnStampPause,
} from '@src/globalState/useStamperPart'

import useConveyorBeltPart, {
  selectShouldMove,
  selectSetShouldMove,
} from '@src/globalState/useConveyorBeltPart'

import useOvenPart, {
  selectIsOvenReady,
  selectIsOvenALive,
  selectOnChange as selectOvenOnChange,
} from '@src/globalState/useOvenPart'

import MotorPart from './Parts/MotorPart'
import ConveyorBeltPart from './Parts/ConveyorBeltPart'
import CollectionBoxPart from './Parts/CollectionBoxPart'
import SwitchPart from './Parts/SwitchPart'


export const EXTRUDER_CENTER_UNIT_INDEX = 0
export const STAMPER_CENTER_UNIT_INDEX = 2
export const OVEN_CENTER_UNIT_INDEX = 4


const Wrap = styled.div`
  width: 1200px;
`

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

  const switchValue = useSwitchPart(selectSwitchValue)
  const onChangeSwitchValue = useSwitchPart(selectSwitchOnChangeValue)
  const onChangeSwitchDisabled = useSwitchPart(selectSwitchOnChangeDisabled)
  const onChangeMotor = useMotorPart(selectMotorOnChange)

  const shouldExtrude = useExtruderPart(selectShouldExtrude)
  const onExtrudeStart = useExtruderPart(selectOnExtrudeStart)
  const onExtrudePause = useExtruderPart(selectOnExtrudePause)

  const shouldStamp = useStamperPart(selectShouldStamp)
  const onStampStart = useStamperPart(selectOnStampStart)
  const onStampPause = useStamperPart(selectOnStampPause)

  const shouldMove = useConveyorBeltPart(selectShouldMove)
  const setShouldMove = useConveyorBeltPart(selectSetShouldMove)

  const isOvenReady = useOvenPart(selectIsOvenReady)
  const IsOvenALive = useOvenPart(selectIsOvenALive)
  const onChangeOvenPart = useOvenPart(selectOvenOnChange)


  const [isExtruderDone, setIsExtruderDone] = useState(true)
  const [isStamperDone, setIsStamperDone] = useState(true)

  const biscuitUnderExtruder = useMemo<MachineBiscuit | undefined>(() => biscuits
    .find(({ centerUnitIndex }) => centerUnitIndex === EXTRUDER_CENTER_UNIT_INDEX), [biscuits])

  const biscuitUnderStamper = useMemo<MachineBiscuit | undefined>(() => biscuits
    .find(({ centerUnitIndex }) => centerUnitIndex === STAMPER_CENTER_UNIT_INDEX), [biscuits])


  const machineMove = useCallback(() => {
    setShouldMove(true)
    onChangeMotor('on')
  }, [setShouldMove, onChangeMotor])


  useEffect(() => {
    if (!shouldMove) {
      onChangeMotor('pause')
    }
  }, [shouldMove, onChangeMotor])


  const machineCraft = useCallback(() => {
    setIsExtruderDone(false)
    onExtrudeStart()

    if (biscuitUnderStamper) {
      setIsStamperDone(false)
      onStampStart()
    }

    setBiscuits((biscuits) => biscuits.map((biscuit) => {
      const isBacking = isOvenReady &&
                        biscuit.centerUnitIndex >= OVEN_CENTER_UNIT_INDEX &&
                        biscuit.centerUnitIndex <= OVEN_CENTER_UNIT_INDEX + 1
      return {
        ...biscuit,
        isBacking,
      }
    }))
  }, [biscuitUnderStamper, onExtrudeStart, onStampStart, isOvenReady, setBiscuits])


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
    if (switchValue === 'on') {
      onChangeMotor('pause')
      onExtrudePause()
      onStampPause()
      onChangeOvenPart('on')
    }
  }, [switchValue, onChangeMotor, onExtrudePause, onChangeOvenPart, onStampPause])


  useEffect(() => {
    if (switchValue === 'pause') {
      onChangeOvenPart('pause')
    }
  }, [switchValue, onChangeOvenPart])


  useEffect(() => {
    if (switchValue === 'off') {
      onChangeMotor('off')
      onChangeOvenPart('off')
    }
  }, [switchValue, onChangeMotor, onChangeOvenPart])


  useEffect(() => {
    if (!IsOvenALive) {
      onChangeSwitchValue('pause')
      onChangeSwitchDisabled(true)
    }
  }, [IsOvenALive, onChangeSwitchValue, onChangeSwitchDisabled])


  return (
    <div
      data-testid={`${testIdPrefix}.Machine`}
      className={className}
    >
      <Wrap className="flex select-none mt-96 mx-auto">
        <MotorPart
          testIdPrefix={`${testIdPrefix}.Machine`}
          className="-mt-2 ml-8 mr-2"
        />

        <ConveyorBeltPart
          testIdPrefix={`${testIdPrefix}.Machine`}
        />

        <CollectionBoxPart
          testIdPrefix={`${testIdPrefix}.Machine`}
        />
      </Wrap>

      <SwitchPart
        testIdPrefix={`${testIdPrefix}.Machine`}
        className="flex justify-center mt-20"
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
