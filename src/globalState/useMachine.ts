import { v4 as uuidv4 } from 'uuid'
import { BiscuitProps } from '@src/components/Biscuit'

import createStore from './createStore'

const REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN = Number(process.env.REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN)
const REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX = Number(process.env.REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX)

const BISCUIT_INITIAL_SCORE = 0.1
const BISCUIT_STAMP_SCORE = 0.2
const BISCUIT_BACKED_SCORE = 1
const BISCUIT_OVER_BACKED_SCORE = -1.2

export type MachineBiscuit = {
  key: string
  centerUnitIndex: number
  form: BiscuitProps['form']
  isBacking: BiscuitProps['isBacking']
}

type MachineBiscuitScore = {
  key: string
  backingScore: number
  score: number
}

type MachineDataState = {
   biscuits: MachineBiscuit[]
   biscuitScores: MachineBiscuitScore[]
   totalScore: number
   totalCollectedBiscuits: number
}

type MachineState = MachineDataState & {
  addBiscuit: () => void
  setBiscuits: (update: (biscuits: MachineBiscuit[]) => MachineBiscuit[]) => void
  stampBiscuit: (centerUnitIndex: number) => void
  moveBiscuits: (maxCenterUnitIndex: number) => { removedBiscuits: MachineBiscuit[], removedBiscuitScores: MachineBiscuitScore[] }
  bakeBiscuits: (temperature: number) => void
  addScore: (score: number) => void
  resetState: () => void
}


const initialState: MachineDataState = {
  biscuits: [],
  biscuitScores: [],
  totalScore: 0,
  totalCollectedBiscuits: 0,
}

const useMachine = createStore<MachineState>((set, get) => ({
  ...initialState,

  addBiscuit: () => set((state) => {
    const newBiscuit: MachineBiscuit = {
      key: uuidv4(),
      centerUnitIndex: 0,
      form: 'blob',
      isBacking: false,
    }

    const newBiscuitScore: MachineBiscuitScore = {
      key: newBiscuit.key,
      backingScore: 0,
      score: BISCUIT_INITIAL_SCORE,
    }

    state.biscuits = [
      ...state.biscuits,
      newBiscuit,
    ]

    state.biscuitScores = [
      ...state.biscuitScores,
      newBiscuitScore,
    ]
  }),


  setBiscuits: (update) => set((state) => {
    state.biscuits = update(state.biscuits)
  }),


  stampBiscuit: (centerUnitIndex: number) => set((state) => {
    state.biscuits = state.biscuits.map((biscuit) => {
      if (biscuit.centerUnitIndex !== centerUnitIndex) {
        return biscuit
      }

      const biscuitScore = state.biscuitScores.find(({ key }) => key === biscuit.key)
      if (biscuitScore) {
        biscuitScore.score += BISCUIT_STAMP_SCORE
      }

      return {
        ...biscuit,
        form: 'unbacked',
      }
    })
  }),


  moveBiscuits: (maxCenterUnitIndex) => {
    const { biscuits, biscuitScores } = get()

    const removedBiscuits = biscuits.filter(({ centerUnitIndex }) => centerUnitIndex >= maxCenterUnitIndex)
    const keptBiscuits = biscuits
      .filter(({ centerUnitIndex }) => centerUnitIndex < maxCenterUnitIndex)
      .map((biscuit) => ({
        ...biscuit,
        centerUnitIndex: biscuit.centerUnitIndex + 1,
      }))

    const removedBiscuitsKeys = removedBiscuits.map(({ key }) => key)
    const removedBiscuitScores = biscuitScores.filter(({ key }) => removedBiscuitsKeys.includes(key))

    set((state) => {
      state.biscuits = keptBiscuits
    })

    return {
      removedBiscuits,
      removedBiscuitScores,
    }
  },


  bakeBiscuits: (temperature: number) => set((state) => {
    state.biscuits.forEach((biscuit) => {
      if (!biscuit.isBacking) {
        return
      }

      const biscuitScore = state.biscuitScores.find(({ key }) => key === biscuit.key)
      if (!biscuitScore) {
        return
      }

      biscuitScore.backingScore += temperature

      if (biscuitScore.backingScore > 8 * REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MIN && biscuit.form === 'unbacked') {
        biscuit.form = 'backed'
        biscuitScore.score += BISCUIT_BACKED_SCORE
      }

      if (biscuitScore.backingScore > 21 * REACT_APP_OVEN_OPTIMAL_TEMPERATURE_MAX && biscuit.form === 'backed') {
        biscuit.form = 'overBacked'
        biscuitScore.score += BISCUIT_OVER_BACKED_SCORE
      }
    })
  }),


  addScore: (score) => set((state) => {
    state.totalScore += score
    state.totalCollectedBiscuits += 1
  }),


  resetState: () => set(() => initialState),
}))


export const selectBiscuits = (state: MachineState) => state.biscuits
export const selectTotalScore = (state: MachineState) => state.totalScore
export const selectTotalCollectedBiscuits = (state: MachineState) => state.totalCollectedBiscuits
export const selectMoveBiscuits = (state: MachineState) => state.moveBiscuits
export const selectAddBiscuits = (state: MachineState) => state.addBiscuit
export const selectSetBiscuits = (state: MachineState) => state.setBiscuits
export const selectStampBiscuit = (state: MachineState) => state.stampBiscuit
export const selectAddScore = (state: MachineState) => state.addScore
export const selectResetState = (state: MachineState) => state.resetState


export default useMachine
