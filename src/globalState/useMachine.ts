import { v4 as uuidv4 } from 'uuid'
import { BiscuitProps } from '@src/components/Biscuit'

import createStore from './createStore'

const BISCUIT_INITIAL_SCORE = 0.1

export type MachineBiscuit = {
  key: string
  centerUnitIndex: number
  form: BiscuitProps['form']
  isBacking: BiscuitProps['isBacking']
  score: number
}

type MachineDataState = {
   biscuits: MachineBiscuit[]
   totalScore: number
}

type MachineState = MachineDataState & {
  addBiscuit: () => void
  setBiscuits: (update: (biscuits: MachineBiscuit[]) => MachineBiscuit[]) => void
  addScore: (score: number) => void
  resetState: () => void
}


const initialState: MachineDataState = {
  biscuits: [],
  totalScore: 0,
}

const useMachine = createStore<MachineState>((set) => ({
  ...initialState,

  addBiscuit: () => set((state) => {
    state.biscuits = [
      ...state.biscuits,
      {
        key: uuidv4(),
        centerUnitIndex: 0,
        form: 'blob',
        isBacking: false,
        score: BISCUIT_INITIAL_SCORE,
      },
    ]
  }),

  setBiscuits: (update) => set((state) => {
    state.biscuits = update(state.biscuits)
  }),

  addScore: (score) => set((state) => {
    state.totalScore += score
  }),

  resetState: () => set(() => initialState),
}))


export const selectBiscuits = (state: MachineState) => state.biscuits
export const selectAddBiscuits = (state: MachineState) => state.addBiscuit
export const selectSetBiscuits = (state: MachineState) => state.setBiscuits
export const selectAddScore = (state: MachineState) => state.addScore
export const selectResetState = (state: MachineState) => state.resetState


export default useMachine
