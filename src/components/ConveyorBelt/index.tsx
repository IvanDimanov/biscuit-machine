import { ReactNode, CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

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
  shouldMove: boolean
  onMoveEnd: () => void
}

type ImageSize = {
  width: number
  height: number
}


const getFrameSrc = (frame, direction: ConveyorBeltProps['direction'], position: 'leftEdge' | 'center' | 'rightEdge'): string => {
  if (direction === 'left') {
    return framePerSrc[frame][position]
  }

  return framePerSrc[2 - frame][position]
}

type WrapItemsOnBeltProps = {
  duration: number
  value: number
}

const WrapItemsOnBelt = styled.div<WrapItemsOnBeltProps>`
  position: absolute;
  transition: left ${({ duration }) => duration}s linear;
  left: ${({ value }) => value}px;
`

const ConveyorBelt = ({
  testIdPrefix,
  className,
  totalCenterUnits,
  centerUnitsPerSecond,
  size,
  direction,
  itemsOnBelt,
  staticItems,
  shouldMove,
  onMoveEnd,
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

  const leftEdgeImageSize = useMemo<ImageSize>(() => {
    if (size === 'small') {
      return {
        width: 65.95,
        height: 70,
      }
    }
    if (size === 'medium') {
      return {
        width: 105.52,
        height: 112,
      }
    }
    return {
      width: 131.9,
      height: 140,
    }
  }, [size])

  const centerImageSize = useMemo<ImageSize>(() => {
    if (size === 'small') {
      return {
        width: 61.17,
        height: 70,
      }
    }
    if (size === 'medium') {
      return {
        width: 97.88,
        height: 112,
      }
    }
    return {
      width: 122.35,
      height: 140,
    }
  }, [size])

  const rightEdgeImageSize = useMemo<ImageSize>(() => {
    if (size === 'small') {
      return {
        width: 65.95,
        height: 70,
      }
    }
    if (size === 'medium') {
      return {
        width: 105.52,
        height: 112,
      }
    }
    return {
      width: 131.9,
      height: 140,
    }
  }, [size])


  const moveTimer = useRef<NodeJS.Timeout>()
  useEffect(() => {
    if (shouldMove) {
      moveTimer.current = setInterval(onMoveEnd, 1000 / centerUnitsPerSecond)
    }
    return () => moveTimer.current && clearInterval(moveTimer.current)
  }, [shouldMove, onMoveEnd, centerUnitsPerSecond])


  const shouldAnimateRef = useRef(false)
  const shouldMoveRef = useRef(shouldMove)
  useEffect(() => {
    shouldMoveRef.current = shouldMove
  }, [shouldMove])


  const animateTimer = useRef<NodeJS.Timeout>()
  const animate = useCallback(() => {
    increaseFrame()
    if (shouldAnimateRef.current) {
      animateTimer.current = setTimeout(animate, 1000 / frameRate)
    }
  }, [increaseFrame, animateTimer, frameRate])


  const checkShouldAnimate = useCallback(() => {
    shouldAnimateRef.current = shouldMoveRef.current
    if (shouldMoveRef.current) {
      setTimeout(checkShouldAnimate, 1000 / centerUnitsPerSecond)
    }
  }, [centerUnitsPerSecond])


  useEffect(() => {
    if (shouldMove) {
      checkShouldAnimate()
      animate()
    }
  }, [shouldMove, animate, checkShouldAnimate])


  const itemsWrapStyle = useMemo<CSSProperties>(() => {
    if (direction === 'left') {
      return {
        marginRight: rightEdgeImageSize.width,
      }
    }

    return {
      marginLeft: leftEdgeImageSize.width,
    }
  }, [direction, leftEdgeImageSize.width, rightEdgeImageSize.width])


  const getItemsOnBeltLeft = useCallback((centerUnitIndex: number) => {
    if (direction === 'left') {
      return (totalCenterUnits - centerUnitIndex + Number(shouldMove)) * centerImageSize.width
    }

    return (centerUnitIndex + Number(shouldMove)) * centerImageSize.width
  }, [direction, totalCenterUnits, shouldMove, centerImageSize.width])


  return (
    <div
      data-testid={`${testIdPrefix}.ConveyorBelt`}
      className={className}
    >
      <div className="relative">

        <div
          data-testid={`${testIdPrefix}.ConveyorBelt.Belt`}
          className="flex"
        >
          <div>
            <img
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
                className={imageClassName}
                src={getFrameSrc(frame, direction, 'center')}
                alt="Center"
              />
            </div>
          ))}

          <div>
            <img
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
            className="relative z-10"
            style={itemsWrapStyle}
          >
            {itemsOnBelt.map(({ key, centerUnitIndex, node }) => (
              <WrapItemsOnBelt
                key={key}
                data-testid={`${testIdPrefix}.ConveyorBelt.ItemsOnBelt.${key}`}
                duration={1 / centerUnitsPerSecond}
                value={getItemsOnBeltLeft(centerUnitIndex)}
              >
                {node}
              </WrapItemsOnBelt>
            ))}
          </div>
        </div>

      </div>

      {shouldAnimateRef.current ? (
        <BeltSound centerUnitsPerSecond={centerUnitsPerSecond} />
      ) : null}
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

  shouldMove: PropTypes.bool,
  onMoveEnd: PropTypes.func,
}

ConveyorBelt.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
  totalCenterUnits: 1,
  centerUnitsPerSecond: 1,
  size: 'medium',
  direction: 'right',
  itemsOnBelt: [],
  staticItems: [],
  shouldMove: false,
  onMoveEnd: () => {},
}

ConveyorBelt.displayName = 'ConveyorBelt'


export default ConveyorBelt
