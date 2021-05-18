import { ReactNode, CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import ImageLeftEdge1 from './images/animationFrames/leftEdge1.png'
import ImageLeftEdge2 from './images/animationFrames/leftEdge2.png'
import ImageLeftEdge3 from './images/animationFrames/leftEdge3.png'

import ImageCenter1 from './images/animationFrames/center1.png'
import ImageCenter2 from './images/animationFrames/center2.png'
import ImageCenter3 from './images/animationFrames/center3.png'

import ImageRightEdge1 from './images/animationFrames/rightEdge1.png'
import ImageRightEdge2 from './images/animationFrames/rightEdge2.png'
import ImageRightEdge3 from './images/animationFrames/rightEdge3.png'

import BeltSound from './BeltSound'

/**
 * Our animation consists of 3 frames in a loop
 */
const totalNumberOfFrames = 3

/**
 * With the current belt image width
 * it takes 15 frames to move from once center image to the other
 */
const totalLoopFrames = 15

export const CENTER_UNITS_PER_SECOND_MIN = 0
export const CENTER_UNITS_PER_SECOND_MAX = 10

const framePerSrc = {
  0: {
    leftEdge: ImageLeftEdge1,
    center: ImageCenter1,
    rightEdge: ImageRightEdge1,
  },

  1: {
    leftEdge: ImageLeftEdge2,
    center: ImageCenter2,
    rightEdge: ImageRightEdge2,
  },

  2: {
    leftEdge: ImageLeftEdge3,
    center: ImageCenter3,
    rightEdge: ImageRightEdge3,
  },
}

type BeltItem = {
  key: string
  centerUnitIndex: number
  node: ReactNode
  style?: CSSProperties
}

export type ItemOnBelt = BeltItem
export type StaticItem = BeltItem

export type ConveyorBeltProps = {
  testIdPrefix?: string
  className?: string
  totalCenterUnits: number
  centerUnitsPerSecond: number
  size: 'small' | 'medium' | 'large'
  direction: 'left' | 'right'
  itemsOnBelt: ItemOnBelt[]
  staticItems: StaticItem[]
  onItemOutOfBelt: (itemOutOfBelt: ItemOnBelt) => void
}

const getFrameSrc = (frame, direction: ConveyorBeltProps['direction'], position: 'leftEdge' | 'center' | 'rightEdge'): string => {
  if (direction === 'left') {
    return framePerSrc[frame][position]
  }

  return framePerSrc[2 - frame][position]
}


const getItemOnBelt = (
  leftEdgeImageRect: DOMRect,
  firstCenterImageRect: DOMRect,
  rightEdgeImageRect: DOMRect,
  direction: ConveyorBeltProps['direction'],
  totalCenterUnits: number,
  shouldIncrement: boolean = false,
) => (itemOnBelt: ItemOnBelt): ItemOnBelt => {
  const initialShift = 1/3 * leftEdgeImageRect.width
  const centerShift = (itemOnBelt.centerUnitIndex + 0.5) * firstCenterImageRect.width
  console.log(itemOnBelt.centerUnitIndex, itemOnBelt)
  // const centerShift = (0 + 0.5) * firstCenterImageRect.width

  let positionValue = initialShift + centerShift
  if (direction === 'left') {
    const initialShift = leftEdgeImageRect.width + totalCenterUnits * firstCenterImageRect.width
    const centerShift = itemOnBelt.centerUnitIndex * firstCenterImageRect.width
    // const centerShift = 0 * firstCenterImageRect.width

    positionValue = initialShift - centerShift
  }


  const positionKey = 'left'
  if (shouldIncrement && itemOnBelt.style?.[positionKey]) {
    const originalValue = Number.parseFloat(itemOnBelt.style[positionKey] as string)
    const increment = firstCenterImageRect.width / totalLoopFrames

    positionValue = direction === 'left' ? originalValue - increment : originalValue + increment
  }

  return {
    ...itemOnBelt,
    style: {
      ...itemOnBelt.style,

      width: 'max-content',
      position: 'absolute',
      [positionKey]: `${positionValue}px`,
    },
  }
}


const ConveyorBelt = ({
  testIdPrefix,
  className,
  totalCenterUnits,
  centerUnitsPerSecond,
  size,
  direction,
  itemsOnBelt: initialItemsOnBelt,
  staticItems,
  onItemOutOfBelt,
}: ConveyorBeltProps) => {
  const frameRate = useMemo(() => Math.max(0, centerUnitsPerSecond) * totalLoopFrames, [centerUnitsPerSecond])

  const [frame, setFrame] = useState(0)
  const increaseFrame = useCallback(() => setFrame((state) => (state + 1) % totalNumberOfFrames), [])

  const imageClassName = useMemo(() => {
    if (size === 'small') {
      return 'relative h-20 z-2'
    }
    if (size === 'medium') {
      return 'relative h-32 z-2'
    }
    return 'relative h-40 z-2'
  }, [size])

  const itemsWrapClassName = useMemo(() => {
    if (size === 'small') {
      return 'absolute top-0 -mt-1'
    }
    if (size === 'medium') {
      return 'absolute top-0'
    }
    return 'absolute top-2'
  }, [size])


  const [leftEdgeImageRect, setLeftEdgeImageRect] = useState<DOMRect>()
  const trackLeftEdgeImageRectRef = useCallback((node: HTMLImageElement | null) => {
    if (!node) {
      return
    }
    node.addEventListener('load', () => setLeftEdgeImageRect(node.getBoundingClientRect()), { once: true })
  }, [])


  const [firstCenterImageRect, setFirstCenterImageRect] = useState<DOMRect>()
  const trackFirstCenterImageRectRef = useCallback((node: HTMLImageElement | null) => {
    if (!node) {
      return
    }
    node.addEventListener('load', () => setFirstCenterImageRect(node.getBoundingClientRect()), { once: true })
  }, [])


  const [rightEdgeImageRect, setRightEdgeImageRect] = useState<DOMRect>()
  const trackRightEdgeImageRectRef = useCallback((node: HTMLImageElement | null) => {
    if (!node) {
      return
    }
    node.addEventListener('load', () => setRightEdgeImageRect(node.getBoundingClientRect()), { once: true })
  }, [])


  const [itemsOnBelt, setItemsOnBelt] = useState<ItemOnBelt[]>([])
  const initialItemsOnBeltRef = useRef<ItemOnBelt[]>(initialItemsOnBelt)

  useEffect(() => {
    if (!leftEdgeImageRect || !firstCenterImageRect || !rightEdgeImageRect) {
      return
    }

    const getItemOnBeltStyle = getItemOnBelt(
      leftEdgeImageRect, firstCenterImageRect, rightEdgeImageRect, direction, totalCenterUnits,
    )
    setItemsOnBelt((state) => initialItemsOnBelt.map((itemOnBelt) => {
      const existingItemOnBelt = state.find(({ key }) => key === itemOnBelt.key)
      return existingItemOnBelt || getItemOnBeltStyle(itemOnBelt)
    }))

    initialItemsOnBeltRef.current = initialItemsOnBelt
  }, [initialItemsOnBelt, leftEdgeImageRect, firstCenterImageRect, rightEdgeImageRect, direction, totalCenterUnits])


  const moveItemsOnBelt = useCallback(() => {
    if (!leftEdgeImageRect || !firstCenterImageRect || !rightEdgeImageRect) {
      return
    }

    const getItemOnBeltStyle = getItemOnBelt(
      leftEdgeImageRect, firstCenterImageRect, rightEdgeImageRect, direction, totalCenterUnits, true,
    )
    setItemsOnBelt((state) => state.map(getItemOnBeltStyle))
  }, [leftEdgeImageRect, firstCenterImageRect, rightEdgeImageRect, direction, totalCenterUnits])


  const beltRef = useRef<HTMLDivElement>(null)
  const itemsWrapRef = useRef<HTMLDivElement>(null)

  const checkItemsOutOfBelt = useCallback(() => {
    if (!beltRef.current || !itemsWrapRef.current) {
      return
    }

    const beltRect = beltRef.current.getBoundingClientRect()

    Array.from(itemsWrapRef.current.children).forEach((itemDom, index) => {
      if (!initialItemsOnBeltRef.current[index]) {
        return
      }

      const rect = itemDom.getBoundingClientRect()
      const itemCenterLine = rect.left + rect.width / 2

      if (itemCenterLine < beltRect.left || itemCenterLine > beltRect.right) {
        onItemOutOfBelt(initialItemsOnBeltRef.current[index])
        setItemsOnBelt((state) => state.filter((_, stateIndex) => stateIndex !== index))
      }
    })
  }, [onItemOutOfBelt])


  const timer = useRef<NodeJS.Timeout>()
  const animate = useCallback(() => {
    increaseFrame()
    moveItemsOnBelt()
    checkItemsOutOfBelt()

    timer.current = setTimeout(animate, 1000 / frameRate)
  }, [increaseFrame, moveItemsOnBelt, checkItemsOutOfBelt, timer, frameRate])


  useEffect(() => {
    if (frameRate) {
      animate()
    }
    return () => timer.current && clearTimeout(timer.current)
  }, [frameRate, animate])


  return (
    <div
      data-testid={`${testIdPrefix}.ConveyorBelt`}
      className={className}
    >
      <div className="relative">

        <div
          ref={beltRef}
          data-testid={`${testIdPrefix}.ConveyorBelt.Belt`}
          className="flex"
        >
          <div>
            <img
              ref={trackLeftEdgeImageRectRef}
              className={imageClassName}
              src={getFrameSrc(frame, direction, 'leftEdge')}
              alt="Left edge"
            />
          </div>

          {Array.from({ length: totalCenterUnits }).map((_, key) => (
            <div key={key}>
              {staticItems
                .filter((item) => item.centerUnitIndex === key)
                .map(({ key, node }) => (
                  <div
                    key={key}
                    className="absolute"
                  >
                    {node}
                  </div>
                ))}

              <img
                ref={key ? null : trackFirstCenterImageRectRef}
                className={imageClassName}
                src={getFrameSrc(frame, direction, 'center')}
                alt="Center"
              />
            </div>
          ))}

          <div>
            <img
              ref={trackRightEdgeImageRectRef}
              className={imageClassName}
              src={getFrameSrc(frame, direction, 'rightEdge')}
              alt="Right edge"
            />
          </div>
        </div>

        <div
          data-testid={`${testIdPrefix}.ConveyorBelt.ItemsOnBeltWrap`}
          className={itemsWrapClassName}
        >
          <div
            ref={itemsWrapRef}
            className="relative z-10"
          >
            {itemsOnBelt.map(({ key, node, style }) => (
              <div
                key={key}
                data-testid={`${testIdPrefix}.ConveyorBelt.ItemsOnBelt.${key}`}
                style={style}
              >
                {node}
              </div>
            ))}
          </div>
        </div>

      </div>


      <BeltSound centerUnitsPerSecond={centerUnitsPerSecond} />
    </div>
  )
}


ConveyorBelt.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,

  totalCenterUnits: ({ totalCenterUnits }, _, componentName) => {
    if (Number.isNaN( Number(totalCenterUnits) )) {
      return new TypeError(
        `Invalid prop \`totalCenterUnits\` of type \`${typeof totalCenterUnits}\` ` +
        `supplied to \`${componentName}\`, expected \`number\``)
    }

    if (totalCenterUnits < 1 || totalCenterUnits > 10) {
      return new RangeError(
        `Invalid prop \`totalCenterUnits\` of value \`${totalCenterUnits}\` ` +
        `supplied to \`${componentName}\`, value to be between [1, 10]`)
    }
  },

  centerUnitsPerSecond: ({ centerUnitsPerSecond }, _, componentName) => {
    if (Number.isNaN( Number(centerUnitsPerSecond) )) {
      return new TypeError(
        `Invalid prop \`centerUnitsPerSecond\` of type \`${typeof centerUnitsPerSecond}\` ` +
        `supplied to \`${componentName}\`, expected \`number\``)
    }

    if (centerUnitsPerSecond < CENTER_UNITS_PER_SECOND_MIN || centerUnitsPerSecond > CENTER_UNITS_PER_SECOND_MAX) {
      return new RangeError(
        `Invalid prop \`centerUnitsPerSecond\` of value \`${centerUnitsPerSecond}\` ` +
        `supplied to \`${componentName}\`, value to be between [${CENTER_UNITS_PER_SECOND_MIN}, ${CENTER_UNITS_PER_SECOND_MAX}]`)
    }
  },

  size: PropTypes.oneOf(['small', 'medium', 'large']),
  direction: PropTypes.oneOf(['left', 'right']),

  itemsOnBelt: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    centerUnitIndex: PropTypes.number.isRequired,
    node: PropTypes.node.isRequired,
  })),

  staticItems: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    centerUnitIndex: PropTypes.number.isRequired,
    node: PropTypes.node.isRequired,
  })),

  onItemOutOfBelt: PropTypes.func,
}

ConveyorBelt.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
  totalCenterUnits: 1,
  centerUnitsPerSecond: 0,
  size: 'medium',
  direction: 'right',
  itemsOnBelt: [],
  staticItems: [],
  onItemOutOfBelt: () => {},
}

ConveyorBelt.displayName = 'ConveyorBelt'


export default ConveyorBelt
