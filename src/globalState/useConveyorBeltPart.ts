import { ConveyorBeltProps } from '@src/components/ConveyorBelt'

import createStore from './createStore'


type ConveyorBeltPartDataState = {
  centerUnitsPerSecond: ConveyorBeltProps['centerUnitsPerSecond']
}

type ConveyorBeltPartState = ConveyorBeltPartDataState & {
  setCenterUnitsPerSecond: (newCenterUnitsPerSecond: ConveyorBeltProps['centerUnitsPerSecond']) => void
  resetState: () => void
}


const initialState: ConveyorBeltPartDataState = {
  centerUnitsPerSecond: 0,
}

const useConveyorBeltPart = createStore<ConveyorBeltPartState>((set) => ({
  ...initialState,

  setCenterUnitsPerSecond: (newCenterUnitsPerSecond: ConveyorBeltProps['centerUnitsPerSecond']) => set((state) => {
    state.centerUnitsPerSecond = newCenterUnitsPerSecond
  }),

  resetState: () => set(() => initialState),
}))


export const selectCenterUnitsPerSecond = (state: ConveyorBeltPartState) => state.centerUnitsPerSecond
export const selectSetCenterUnitsPerSecond = (state: ConveyorBeltPartState) => state.setCenterUnitsPerSecond
export const selectResetState = (state: ConveyorBeltPartState) => state.resetState


export default useConveyorBeltPart
