import { SwitchProps } from '@src/components/Switch'

import createStore from './createStore'


type SwitchPartDataState = {
  value: SwitchProps['value']
  disabled: SwitchProps['disabled']
}

type SwitchPartState = SwitchPartDataState & {
  onChangeValue: SwitchProps['onChange']
  onChangeDisabled: (newDisabled: boolean) => void
  resetState: () => void
}


const initialState: SwitchPartDataState = {
  value: 'off',
  disabled: false,
}

const useSwitchPart = createStore<SwitchPartState>((set) => ({
  ...initialState,

  onChangeValue: (newValue) => set((state) => {
    state.value = newValue
  }),

  onChangeDisabled: (newDisabled) => set((state) => {
    state.disabled = newDisabled
  }),

  resetState: () => set(() => initialState),
}))


export const selectValue = (state: SwitchPartState) => state.value
export const selectDisabled = (state: SwitchPartState) => state.disabled
export const selectOnChangeValue = (state: SwitchPartState) => state.onChangeValue
export const selectOnChangeDisabled = (state: SwitchPartState) => state.onChangeDisabled
export const selectResetState = (state: SwitchPartState) => state.resetState


export default useSwitchPart
