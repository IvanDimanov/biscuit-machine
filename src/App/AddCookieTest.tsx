import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { ConveyorBelt } from '@src/components'
import { ConveyorBeltProps } from '@src/components/ConveyorBelt'


// import ImageCookie1 from './images/cookie1.png'
import ImageCookie2 from './images/cookie2.png'
// import ImageCookie3 from './images/cookie3.png'
// import ImageCookie4 from './images/cookie4.png'


const AddCookieTest = () => {
  const [itemsOnBelt, setItemsOnBelt] = useState([
    {
      key: uuidv4(),
      centerUnitIndex: 0,
      node: (
        <img
          className="h-6"
          src={ImageCookie2}
          alt="Cookie"
        />
      ),
    },
    {
      key: uuidv4(),
      centerUnitIndex: 2,
      node: (
        <img
          className="h-6"
          src={ImageCookie2}
          alt="Cookie"
        />
      ),
    },
  ])

  const onItemOutOfBelt = useCallback((itemOutOfBelt) => {
    setItemsOnBelt((state) => state.filter(({ key }) => key !== itemOutOfBelt.key))
  }, [])

  const [centerUnitsPerSecond, setCenterUnitsPerSecond] = useState(0)
  const startConveyorBelt = useCallback(() => setCenterUnitsPerSecond(1), [])
  const stopConveyorBelt = useCallback(() => setCenterUnitsPerSecond(0), [])


  const addCookie = useCallback(() => setItemsOnBelt((state) => [
    ...state,
    {
      key: uuidv4(),
      centerUnitIndex: 1,
      node: (
        <img
          className="h-6"
          src={ImageCookie2}
          alt="Cookie"
        />
      ),
    },
  ]), [])


  const [size, setSize] = useState<ConveyorBeltProps['size']>('medium')
  const setSizeSmall = useCallback(() => setSize('small'), [])
  const setSizeMedium = useCallback(() => setSize('medium'), [])
  const setSizeLarge = useCallback(() => setSize('large'), [])


  return (
    <div className="flex space-x-10">
      <div className="relative">
        <ConveyorBelt
          totalCenterUnits={8}
          centerUnitsPerSecond={centerUnitsPerSecond}
          size={size}
          itemsOnBelt={itemsOnBelt}
          onItemOutOfBelt={onItemOutOfBelt}
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

        <button onClick={addCookie}>
          Add Cookie
        </button>
      </div>

      <div className="flex flex-col space-y-4">
        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={setSizeSmall}
            checked={size === 'small'}
          />
          <span>
            Small
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={setSizeMedium}
            checked={size === 'medium'}
          />
          <span>
            Medium
          </span>
        </label>

        <label className="cursor-pointer space-x-2">
          <input
            type="radio"
            onChange={setSizeLarge}
            checked={size === 'large'}
          />
          <span>
            Large
          </span>
        </label>
      </div>

    </div>
  )
}


export default AddCookieTest
