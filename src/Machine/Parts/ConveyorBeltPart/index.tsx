import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

import useMachine, {
  selectBiscuits,
  selectMoveBiscuits,
  selectAddScore,
} from '@src/globalState/useMachine'
import useConveyorBeltPart, { selectShouldMove, selectSetShouldMove } from '@src/globalState/useConveyorBeltPart'
import useCollectionBoxPart, { selectSetItem } from '@src/globalState/useCollectionBoxPart'

import { ConveyorBelt, Biscuit } from '@src/components'
import { ConveyorBeltProps } from '@src/components/ConveyorBelt'

import {
  EXTRUDER_CENTER_UNIT_INDEX,
  STAMPER_CENTER_UNIT_INDEX,
  OVEN_CENTER_UNIT_INDEX,
} from '../../index'

import ExtruderPart from '../ExtruderPart'
import StamperPart from '../StamperPart'
import OvenPart from '../OvenPart'


const CONVEYOR_BELT_TOTAL_CENTER_UNITS = 6

type ConveyorBeltPartProps = {
  testIdPrefix?: string
  className?: string
}

const ConveyorBeltPart = ({
  testIdPrefix,
  className,
}: ConveyorBeltPartProps) => {
  const biscuits = useMachine(selectBiscuits)
  const moveBiscuits = useMachine(selectMoveBiscuits)
  const addScore = useMachine(selectAddScore)

  const shouldMove = useConveyorBeltPart(selectShouldMove)
  const setShouldMove = useConveyorBeltPart(selectSetShouldMove)

  const setCollectionBoxItem = useCollectionBoxPart(selectSetItem)


  const staticItems: ConveyorBeltProps['staticItems'] = useMemo(() => [
    {
      key: uuidv4(),
      centerUnitIndex: EXTRUDER_CENTER_UNIT_INDEX,
      node: (
        <ExtruderPart
          testIdPrefix={`${testIdPrefix}.ConveyorBeltPart`}
          className="relative z-20 -mt-44 -ml-4"
        />
      ),
    }, {
      key: uuidv4(),
      centerUnitIndex: STAMPER_CENTER_UNIT_INDEX,
      node: (
        <StamperPart
          testIdPrefix={`${testIdPrefix}.ConveyorBeltPart`}
          className="relative z-20 -mt-40 -ml-1"
        />
      ),
    }, {
      key: uuidv4(),
      centerUnitIndex: OVEN_CENTER_UNIT_INDEX,
      node: (
        <OvenPart
          testIdPrefix={`${testIdPrefix}.ConveyorBeltPart`}
          className="-mt-52 -ml-14"
        />
      ),
    },
  ], [testIdPrefix])


  const itemsOnBelt = useMemo<ConveyorBeltProps['itemsOnBelt']>(() => biscuits.map((biscuit) => ({
    key: biscuit.key,
    centerUnitIndex: biscuit.centerUnitIndex,
    node: (
      <Biscuit
        form={biscuit.form}
        isBacking={biscuit.isBacking}
      />
    ),
  })), [biscuits])


  const onMoveEnd = useCallback(() => {
    setShouldMove(false)
    const { removedBiscuits, removedBiscuitScores } = moveBiscuits(CONVEYOR_BELT_TOTAL_CENTER_UNITS)

    removedBiscuits
      .forEach((biscuit) => {
        const biscuitScore = removedBiscuitScores.find(({ key }) => key === biscuit.key)
        if (!biscuitScore) {
          return
        }

        addScore(biscuitScore.score)
        setCollectionBoxItem({
          key: biscuitScore.key,
          node: (
            <div className="text-red-500 font-bold whitespace-nowrap">
              +{Math.round(biscuitScore.score * 10) / 10} &#x1f36a;
            </div>
          ),
        })
      })
  }, [setShouldMove, moveBiscuits, addScore, setCollectionBoxItem])


  return (
    <div
      data-testid={`${testIdPrefix}.ConveyorBeltPart`}
      className={className}
    >
      <ConveyorBelt
        testIdPrefix={`${testIdPrefix}.ConveyorBeltPart`}
        totalCenterUnits={CONVEYOR_BELT_TOTAL_CENTER_UNITS}
        shouldMove={shouldMove}
        staticItems={staticItems}
        itemsOnBelt={itemsOnBelt}
        onMoveEnd={onMoveEnd}
      />
    </div>
  )
}


ConveyorBeltPart.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
}

ConveyorBeltPart.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
}

ConveyorBeltPart.displayName = 'ConveyorBeltPart'


export default ConveyorBeltPart
