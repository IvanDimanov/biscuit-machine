import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

import useMachine, { selectBiscuits, selectRemoveBiscuit, selectAddScore } from '@src/globalState/useMachine'
import useConveyorBeltPart, { selectCenterUnitsPerSecond } from '@src/globalState/useConveyorBeltPart'
import useCollectionBoxPart, { selectSetItem } from '@src/globalState/useCollectionBoxPart'

import { ConveyorBelt, Biscuit } from '@src/components'
import { ConveyorBeltProps, ItemOnBelt } from '@src/components/ConveyorBelt'

import {
  EXTRUDER_CENTER_UNIT_INDEX,
  STAMPER_CENTER_UNIT_INDEX,
  OVEN_CENTER_UNIT_INDEX,
} from '../../index'

import ExtruderPart from '../ExtruderPart'
import StamperPart from '../StamperPart'
import OvenPart from '../OvenPart'


const CONVEYOR_BELT_TOTAL_CENTER_UNITS = 9

type ConveyorBeltPartProps = {
  testIdPrefix?: string
  className?: string
}

const ConveyorBeltPart = ({
  testIdPrefix,
  className,
}: ConveyorBeltPartProps) => {
  const biscuits = useMachine(selectBiscuits)
  const removeBiscuit = useMachine(selectRemoveBiscuit)
  const addScore = useMachine(selectAddScore)
  const centerUnitsPerSecond = useConveyorBeltPart(selectCenterUnitsPerSecond)
  const setItem = useCollectionBoxPart(selectSetItem)


  const staticItems: ConveyorBeltProps['staticItems'] = useMemo(() => [
    {
      key: uuidv4(),
      centerUnitIndex: EXTRUDER_CENTER_UNIT_INDEX,
      node: (
        <ExtruderPart
          testIdPrefix={`${testIdPrefix}.ConveyorBeltPart`}
          className="relative z-20 -mt-44 -ml-10"
        />
      ),
    }, {
      key: uuidv4(),
      centerUnitIndex: STAMPER_CENTER_UNIT_INDEX,
      node: (
        <StamperPart
          testIdPrefix={`${testIdPrefix}.ConveyorBeltPart`}
          className="relative z-20 -mt-40 -ml-14"
        />
      ),
    }, {
      key: uuidv4(),
      centerUnitIndex: OVEN_CENTER_UNIT_INDEX,
      node: (
        <OvenPart
          testIdPrefix={`${testIdPrefix}.ConveyorBeltPart`}
          className="-mt-52 -ml-36"
        />
      ),
    },
  ], [testIdPrefix])


  const itemsOnBelt = useMemo<ConveyorBeltProps['itemsOnBelt']>(() => biscuits.map((biscuit) => ({
    key: `${biscuit.key}-${biscuit.form}-${String(biscuit.isBacking)}`,
    centerUnitIndex: 0,
    node: (
      <Biscuit
        // key={`${biscuit.key}-${biscuit.form}-${String(biscuit.isBacking)}`}
        form={biscuit.form}
        isBacking={biscuit.isBacking}
      />
    ),
  })), [biscuits])


  const onItemOutOfBelt = useCallback((itemOutOfBelt: ItemOnBelt) => {
    removeBiscuit(itemOutOfBelt.key)

    const removedBiscuit = biscuits.find(({ key }) => key === itemOutOfBelt.key)
    if (removedBiscuit) {
      addScore(removedBiscuit.score)
      setItem({
        key: removedBiscuit.key,
        node: (
          <div className="text-yellow-300 font-bold whitespace-nowrap">
            +{removedBiscuit.score} &#x1f36a;
          </div>
        ),
      })
    }
  }, [removeBiscuit, biscuits, setItem, addScore])


  return (
    <div
      data-testid={`${testIdPrefix}.ConveyorBeltPart`}
      className={className}
    >
      <ConveyorBelt
        testIdPrefix={`${testIdPrefix}.ConveyorBeltPart`}
        totalCenterUnits={CONVEYOR_BELT_TOTAL_CENTER_UNITS}
        centerUnitsPerSecond={centerUnitsPerSecond}
        staticItems={staticItems}
        itemsOnBelt={itemsOnBelt}
        onItemOutOfBelt={onItemOutOfBelt}
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
