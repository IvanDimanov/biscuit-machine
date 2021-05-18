import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { ConveyorBelt, Extruder, Stamper } from '@src/components'
import { ConveyorBeltProps } from '@src/components/ConveyorBelt'


const StaticObjectsOnConveyorBelt = () => {
  const [staticItems] = useState<ConveyorBeltProps['staticItems']>([
    {
      key: uuidv4(),
      centerUnitIndex: 0,
      node: (
        <Extruder
          className="-mt-40 ml-8"
        />
      ),
    },
    {
      key: uuidv4(),
      centerUnitIndex: 3,
      node: (
        <Stamper
          className="-mt-40 ml-8"
        />
      ),
    },
  ])

  const [centerUnitsPerSecond, setCenterUnitsPerSecond] = useState(0)
  const startConveyorBelt = useCallback(() => setCenterUnitsPerSecond(1), [])
  const stopConveyorBelt = useCallback(() => setCenterUnitsPerSecond(0), [])


  return (
    <div className="flex space-x-10">
      <div className="relative">
        <ConveyorBelt
          totalCenterUnits={8}
          centerUnitsPerSecond={centerUnitsPerSecond}
          staticItems={staticItems}
        />
      </div>

      <div className="flex flex-col space-y-4">
        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={startConveyorBelt}
            checked={Boolean(centerUnitsPerSecond)}
          />
          <span>
            &#x23F5;
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={stopConveyorBelt}
            checked={!centerUnitsPerSecond}
          />
          <span>
            &#x23F9;
          </span>
        </label>
      </div>

    </div>
  )
}


export default StaticObjectsOnConveyorBelt
