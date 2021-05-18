import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import rescaleInput from '@src/utils/rescaleInput'


const RED_BAR_MIN_HEIGHT = 27
const RED_BAR_MAX_HEIGHT = 175

const INDICATOR_MIN_MARGIN_TOP = 8
const INDICATOR_MAX_MARGIN_TOP = 153


type IndicatorProps = {
  marginTop: number
}

const Indicator = styled.div<IndicatorProps>`
  transition: margin-top 0.25s ease-in;
  ${({ marginTop }) => `margin-top: ${marginTop}px;`}
`

type PinnedTemperatureProps = {
  marginTop: number
}

const PinnedTemperature = styled.div<PinnedTemperatureProps>`
  transition: margin-top 0.25s ease-in;
  ${({ marginTop }) => `margin-top: ${marginTop}px;`}
`

const GrayTrack = styled.div`
  box-shadow: inset -0px 0px 3px 0px #000
`

type RedBarProps = {
  height: number
}

const RedBar = styled.div<RedBarProps>`
  box-shadow: inset 0 -7px 6px 0 #000;
  transition: height 0.25s ease-in;
  ${({ height }) => `height: ${height}px;`}
`

const RedCircle = styled.div`
  box-shadow: inset 0 -4px 10px 0 #000;
`


type ThermometerProps = {
  testIdPrefix?: string
  className?: string
  labelSuffix: string
  shouldShowIndicator: boolean
  temperature: number
  minTemperature: number
  maxTemperature: number
  pinnedTemperatures: number[]
}

const Thermometer = ({
  testIdPrefix,
  className,
  labelSuffix,
  shouldShowIndicator,
  temperature,
  minTemperature,
  maxTemperature,
  pinnedTemperatures,
}: ThermometerProps) => {
  const cappedTemperature = useMemo(() => Math.max(minTemperature, Math.min(maxTemperature, temperature)),
    [temperature, minTemperature, maxTemperature])


  const indicatorMarginTop = useMemo(() => rescaleInput(
    cappedTemperature,
    [minTemperature, maxTemperature],
    [INDICATOR_MAX_MARGIN_TOP, INDICATOR_MIN_MARGIN_TOP],
  ), [cappedTemperature, minTemperature, maxTemperature])


  const getPinnedTemperatureMarginTop = useCallback((pinnedTemperature) => {
    const cappedPinnedTemperature = Math.max(minTemperature, Math.min(maxTemperature, pinnedTemperature))
    return rescaleInput(
      cappedPinnedTemperature,
      [minTemperature, maxTemperature],
      [INDICATOR_MAX_MARGIN_TOP, INDICATOR_MIN_MARGIN_TOP],
    )
  }, [minTemperature, maxTemperature])


  const redBarHeight = useMemo(() => rescaleInput(
    cappedTemperature,
    [minTemperature, maxTemperature],
    [RED_BAR_MIN_HEIGHT, RED_BAR_MAX_HEIGHT],
  ), [cappedTemperature, minTemperature, maxTemperature])


  const isTemperatureOutOfRange = useMemo(() => temperature < minTemperature || temperature > maxTemperature,
    [temperature, minTemperature, maxTemperature])


  return (
    <div
      data-testid={`${testIdPrefix}.Thermometer`}
      className={className}
    >
      <div className="ml-16 mr-24">
        {shouldShowIndicator ? (
          <Indicator
            data-testid={`${testIdPrefix}.Thermometer.Indicator`}
            className="absolute text-gray-700 text-2xl leading-5 ml-10"
            marginTop={indicatorMarginTop}
          >
            &#x25C4; {temperature} {labelSuffix}
          </Indicator>
        ) : null}


        <div className="relative text-gray-700">
          {pinnedTemperatures.map((pinnedTemperature) => (
            <PinnedTemperature
              data-testid={`${testIdPrefix}.PinnedTemperature.${pinnedTemperature}`}
              key={pinnedTemperature}
              className="absolute text-right leading-5 -ml-16 w-18"
              marginTop={getPinnedTemperatureMarginTop(pinnedTemperature)}
            >
              {pinnedTemperature} {labelSuffix} -
            </PinnedTemperature>
          ))}
        </div>


        <div className="flex flex-col-reverse items-center w-12">
          {/* Dark gray background */}
          <div className="bg-gray-400 rounded-full w-14 h-14" />
          <div className="bg-gray-400 rounded-full w-10 h-52 -mb-8" />

          {/* Light gray track */}
          <GrayTrack
            data-testid={`${testIdPrefix}.Thermometer.Track`}
            className="bg-gray-300 rounded-full w-4 h-44 absolute mb-10"
          />

          {/* Red "mercury" fluid */}
          <RedBar
            data-testid={`${testIdPrefix}.Thermometer.Bar`}
            className={`
              bg-red-700
              rounded-full
              w-4
              absolute
              mb-4
              ${isTemperatureOutOfRange ? 'animate-pulse' : ''}
            `}
            height={redBarHeight}
          />
          <RedCircle className="bg-red-700 rounded-full w-8 h-8 absolute mb-3" />
        </div>
      </div>
    </div>
  )
}


Thermometer.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
  labelSuffix: PropTypes.string,
  shouldShowIndicator: PropTypes.bool,
  temperature: PropTypes.number,
  minTemperature: PropTypes.number,
  maxTemperature: PropTypes.number,
  pinnedTemperatures: PropTypes.arrayOf(PropTypes.number),
}

Thermometer.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
  labelSuffix: '℃',
  shouldShowIndicator: true,
  temperature: 50,
  minTemperature: 0,
  maxTemperature: 100,
  pinnedTemperatures: [],
}

Thermometer.displayName = 'Thermometer'


export default Thermometer
