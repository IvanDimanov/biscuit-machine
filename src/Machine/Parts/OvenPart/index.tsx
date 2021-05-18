import PropTypes from 'prop-types'

import { Oven, Status, WarningSign, Thermometer, Explosion } from '@src/components'


const REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN = Number(process.env.REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN)
const REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX = Number(process.env.REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX)

const THERMOMETER_PINNED_TEMPERATURES = [REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN, REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX]
const THERMOMETER_MIN_TEMPERATURE = REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN - 0.1 * REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN
const THERMOMETER_MAX_TEMPERATURE = REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX + 0.1 * REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX


type OvenPartProps = {
  testIdPrefix?: string
  className?: string
}

const OvenPart = ({
  testIdPrefix,
  className,
}: OvenPartProps) => {
  const temperature = 230

  return (
    <div
      data-testid={`${testIdPrefix}.OvenPart`}
      className={className}
    >
      <div className="relative z-1">
        <Status
          testIdPrefix={`${testIdPrefix}.OvenPart`}
          className="absolute -top-12 -left-12"
          bar="bottomRight"
        />
      </div>

      {temperature > REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX ? (
        <WarningSign
          testIdPrefix={`${testIdPrefix}.OvenPart`}
          className="absolute -top-64 left-5"
        />
      ) : null}

      <Thermometer
        testIdPrefix={`${testIdPrefix}.OvenPart`}
        className="absolute -top-96 left-48"
        temperature={temperature}
        pinnedTemperatures={THERMOMETER_PINNED_TEMPERATURES}
        minTemperature={THERMOMETER_MIN_TEMPERATURE}
        maxTemperature={THERMOMETER_MAX_TEMPERATURE}
      />

      <Oven
        testIdPrefix={`${testIdPrefix}.OvenPart`}
        status="on"
      />

      {/* <Explosion
        testIdPrefix={`${testIdPrefix}.OvenPart`}
        className="absolute -top-36 -left-8 z-10"
        shouldExplode
        width={150}
        height={20}
        density={80}
      /> */}
    </div>
  )
}


OvenPart.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
}

OvenPart.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
}

OvenPart.displayName = 'OvenPart'


export default OvenPart
