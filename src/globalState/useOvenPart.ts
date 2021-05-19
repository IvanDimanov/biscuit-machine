import { SwitchProps } from '@src/components/Switch'
import { StatusProps } from '@src/components/Status'
import { OvenProps } from '@src/components/Oven'

import createStore from './createStore'

const REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN = Number(process.env.REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN)
const REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX = Number(process.env.REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX)

const OVEN_INITIAL_TEMPERATURE = 30
const OVEN_INITIAL_LIFE_POINTS = 50

/**
 * We gonna increase Oven `temperature`
 * once every second in respect to the Oven `status`
 */
let temperatureInterval


// Make sure that every time the Oven gets overheated
// we subtract relevant amount of the Oven`s life
const getOvenLifePoints = (state) => {
  const overHeatingTemperature = Math.max(0, state.temperature - REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX)
  return Math.max(0, state.lifePoints - overHeatingTemperature)
}

// Keeps track of how the temperature in the oven
// changes over time in respect to it`s status
const regulateTemperature = (newValue, set) => {
  clearInterval(temperatureInterval)

  /* Temperature heating increments */
  if (newValue === 'on') {
    temperatureInterval = setInterval(() => set((state) => {
      if (state.temperature < (0.5 * REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN)) {
        state.temperature += 30
        state.lifePoints = getOvenLifePoints(state)
        return
      }

      if (state.temperature < (0.9 * REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN)) {
        state.temperature += 20
        state.lifePoints = getOvenLifePoints(state)
        return
      }

      if (state.temperature < (0.99 * REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN)) {
        state.temperature += 2
        state.lifePoints = getOvenLifePoints(state)
        return
      }

      state.temperature += 0.5
      state.lifePoints = getOvenLifePoints(state)
    }), 1000)
  }


  /* Temperature cooling decrements */
  if (newValue === 'pause') {
    temperatureInterval = setInterval(() => set((state) => {
      state.temperature = Math.max(OVEN_INITIAL_TEMPERATURE, state.temperature - 1)
      state.lifePoints = getOvenLifePoints(state)
      if (state.temperature <= OVEN_INITIAL_TEMPERATURE) {
        clearInterval(temperatureInterval)
      }
    }), 1000)
  }


  /* Temperature rapidly cooling decrements */
  if (newValue === 'off') {
    temperatureInterval = setInterval(() => set((state) => {
      state.temperature = Math.max(OVEN_INITIAL_TEMPERATURE, state.temperature - 6)
      state.lifePoints = getOvenLifePoints(state)
      if (state.temperature <= OVEN_INITIAL_TEMPERATURE) {
        clearInterval(temperatureInterval)
      }
    }), 1000)
  }
}


type OvenPartDataState = {
  statusValue: StatusProps['value']
  ovenStatus: OvenProps['status']
  temperature: number
  lifePoints: number
}

type OvenPartState = OvenPartDataState & {
  onChange: SwitchProps['onChange']
  resetState: () => void
}


const initialState: OvenPartDataState = {
  statusValue: 'off',
  ovenStatus: 'off',
  temperature: OVEN_INITIAL_TEMPERATURE,
  lifePoints: OVEN_INITIAL_LIFE_POINTS,
}

const useOvenPart = createStore<OvenPartState>((set) => ({
  ...initialState,

  onChange: (newValue) => {
    set((state) => {
      state.statusValue = newValue
      state.ovenStatus = newValue === 'off' ? 'off' : 'on'
    })

    regulateTemperature(newValue, set)
  },

  resetState: () => set(() => {
    clearInterval(temperatureInterval)
    return initialState
  }),
}))


export const selectStatusValue = (state: OvenPartState) => state.statusValue
export const selectOvenStatus = (state: OvenPartState) => state.ovenStatus
export const selectTemperature = (state: OvenPartState) => state.temperature
export const selectIsOvenReady = (state: OvenPartState) => state.temperature >= REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN
export const selectIsOvenOverheating = (state: OvenPartState) => state.temperature > REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX
export const selectIsOvenALive = (state: OvenPartState) => Boolean(state.lifePoints)
export const selectOnChange = (state: OvenPartState) => state.onChange
export const selectResetState = (state: OvenPartState) => state.resetState


export default useOvenPart
