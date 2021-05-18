import { StatusProps } from '@src/components/Status'
import { StamperProps } from '@src/components/Stamper'

import createStore from './createStore'


type StamperPartDataState = {
  statusValue: StatusProps['value']
  shouldStamp: StamperProps['shouldStamp']
}

type StamperPartState = StamperPartDataState & {
  onStampStart: () => void
  onStampEnd: StamperProps['onStampEnd']
  resetState: () => void
}


const initialState: StamperPartDataState = {
  statusValue: 'off',
  shouldStamp: false,
}

const useStamperPart = createStore<StamperPartState>((set) => ({
  ...initialState,

  onStampStart: () => set((state) => {
    state.statusValue = 'on'
    state.shouldStamp = true
  }),

  onStampEnd: () => set((state) => {
    state.shouldStamp = false

    if (state.statusValue === 'on') {
      state.statusValue = 'pause'
    }
  }),

  resetState: () => set(() => initialState),
}))


export const selectStatusValue = (state: StamperPartState) => state.statusValue
export const selectShouldStamp = (state: StamperPartState) => state.shouldStamp
export const selectOnStampStart = (state: StamperPartState) => state.onStampStart
export const selectOnStampEnd = (state: StamperPartState) => state.onStampEnd
export const selectResetState = (state: StamperPartState) => state.resetState


export default useStamperPart
