import { ConveyorBeltProps } from '@src/components/ConveyorBelt'

import createStore from './createStore'


type ConveyorBeltPartDataState = {
  shouldMove: ConveyorBeltProps['shouldMove']
}

type ConveyorBeltPartState = ConveyorBeltPartDataState & {
  setShouldMove: (newShouldMove: ConveyorBeltProps['shouldMove']) => void
  resetState: () => void
}


const initialState: ConveyorBeltPartDataState = {
  shouldMove: false,
}

const useConveyorBeltPart = createStore<ConveyorBeltPartState>((set) => ({
  ...initialState,

  setShouldMove: (newShouldMove: ConveyorBeltProps['shouldMove']) => set((state) => {
    state.shouldMove = newShouldMove
  }),

  resetState: () => set(() => initialState),
}))


export const selectShouldMove = (state: ConveyorBeltPartState) => state.shouldMove
export const selectSetShouldMove = (state: ConveyorBeltPartState) => state.setShouldMove
export const selectResetState = (state: ConveyorBeltPartState) => state.resetState


export default useConveyorBeltPart
