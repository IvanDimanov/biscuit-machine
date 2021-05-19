import PropTypes from 'prop-types'

import useOvenPart, {
  selectStatusValue,
  selectOvenStatus,
  selectTemperature,
  selectIsOvenOverheating,
} from '@src/globalState/useOvenPart'

import useMachine from '@src/globalState/useMachine'

import { Oven, Status, WarningSign, Thermometer, Explosion } from '@src/components'


const REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN = Number(process.env.REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN)
const REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX = Number(process.env.REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX)

const THERMOMETER_PINNED_TEMPERATURES = [REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN, REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX]
const THERMOMETER_MIN_TEMPERATURE = REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN - 0.1 * REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN
const THERMOMETER_MAX_TEMPERATURE = REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX + 0.03 * REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX


/**
 * Even if system is on `pause` or `off`
 * biscuits may still be in the oven.
 * In order to make consistent backing measurements
 * we`ll make an external interval to track backing
 */
;(() => {
  /* Sync with updates on Oven temperature */
  let { temperature } = useOvenPart.getState()
  useOvenPart.subscribe((newTemperature) => {
    temperature = newTemperature
  }, selectTemperature)

  /* Function `setBiscuits()` does not change over time */
  const { bakeBiscuits } = useMachine.getState()

  /* Bake every biscuit in a regular time intervals */
  setInterval(() => {
    bakeBiscuits(temperature)
  }, 500)
})()


type OvenPartProps = {
  testIdPrefix?: string
  className?: string
}

const OvenPart = ({
  testIdPrefix,
  className,
}: OvenPartProps) => {
  const statusValue = useOvenPart(selectStatusValue)
  const ovenStatus = useOvenPart(selectOvenStatus)
  const temperature = useOvenPart(selectTemperature)
  const IsOvenOverheating = useOvenPart(selectIsOvenOverheating)

  return (
    <div
      data-testid={`${testIdPrefix}.OvenPart`}
      className={className}
    >
      <div className="relative z-1">
        <Status
          testIdPrefix={`${testIdPrefix}.OvenPart`}
          className="absolute -top-12 -left-12"
          value={statusValue}
          bar="bottomRight"
        />
      </div>

      {IsOvenOverheating ? (
        <WarningSign
          testIdPrefix={`${testIdPrefix}.OvenPart`}
          className="absolute -top-64 left-14"
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
        status={ovenStatus}
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
