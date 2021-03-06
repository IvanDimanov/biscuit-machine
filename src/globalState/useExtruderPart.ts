import { StatusProps } from '@src/components/Status'
import { ExtruderProps } from '@src/components/Extruder'

import createStore from './createStore'


type ExtruderPartDataState = {
  statusValue: StatusProps['value']
  shouldExtrude: ExtruderProps['shouldExtrude']
}

type ExtruderPartState = ExtruderPartDataState & {
  onExtrudeStart: () => void
  onPause: () => void
  onOff: () => void
  onExtrudeEnd: ExtruderProps['onExtrudeEnd']
  resetState: () => void
}


const initialState: ExtruderPartDataState = {
  statusValue: 'off',
  shouldExtrude: false,
}

const useExtruderPart = createStore<ExtruderPartState>((set) => ({
  ...initialState,

  onExtrudeStart: () => set((state) => {
    state.statusValue = 'on'
    state.shouldExtrude = true
  }),

  onPause: () => set((state) => {
    state.statusValue = 'pause'
  }),

  onOff: () => set((state) => {
    state.statusValue = 'off'
  }),

  onExtrudeEnd: () => set((state) => {
    state.shouldExtrude = false

    if (state.statusValue === 'on') {
      state.statusValue = 'pause'
    }
  }),

  resetState: () => set(() => initialState),
}))


export const selectStatusValue = (state: ExtruderPartState) => state.statusValue
export const selectShouldExtrude = (state: ExtruderPartState) => state.shouldExtrude
export const selectOnExtrudeStart = (state: ExtruderPartState) => state.onExtrudeStart
export const selectOnPause = (state: ExtruderPartState) => state.onPause
export const selectOnOff = (state: ExtruderPartState) => state.onOff
export const selectOnExtrudeEnd = (state: ExtruderPartState) => state.onExtrudeEnd
export const selectResetState = (state: ExtruderPartState) => state.resetState


export default useExtruderPart
