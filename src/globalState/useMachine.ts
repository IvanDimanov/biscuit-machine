import { v4 as uuidv4 } from 'uuid'
import { BiscuitProps } from '@src/components/Biscuit'

import createStore from './createStore'

export type MachineBiscuit = {
  key: string
  centerUnitIndex: number
  form: BiscuitProps['form']
  isBacking: BiscuitProps['isBacking']
  score: number
}

type MachineDataState = {
   biscuits: MachineBiscuit[]
   stage: 'move' | 'craft'
   totalScore: number
}

type MachineState = MachineDataState & {
  addBiscuit: () => void
  setBiscuits: (newBiscuits: MachineBiscuit[]) => void
  removeBiscuit: (key: string) => void
  setStage: (stage: MachineDataState['stage']) => void
  addScore: (score: number) => void
  resetState: () => void
}


const initialState: MachineDataState = {
  biscuits: [],
  stage: 'craft',
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
        score: 0.1,
      },
    ]
  }),

  setBiscuits: (newBiscuits) => set((state) => {
    state.biscuits = newBiscuits
  }),

  removeBiscuit: (key) => set((state) => {
    state.biscuits = state.biscuits.filter((biscuit) => biscuit.key !== key)
  }),

  setStage: (newStage) => set((state) => {
    state.stage = newStage
  }),

  addScore: (score) => set((state) => {
    state.totalScore += score
  }),

  resetState: () => set(() => initialState),
}))


export const selectBiscuits = (state: MachineState) => state.biscuits
export const selectAddBiscuits = (state: MachineState) => state.addBiscuit
export const selectSetBiscuits = (state: MachineState) => state.setBiscuits
export const selectRemoveBiscuit = (state: MachineState) => state.removeBiscuit
export const selectStage = (state: MachineState) => state.stage
export const selectSetStage = (state: MachineState) => state.setStage
export const selectAddScore = (state: MachineState) => state.addScore
export const selectResetState = (state: MachineState) => state.resetState


export default useMachine
