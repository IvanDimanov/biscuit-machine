import { SwitchProps } from '@src/components/Switch'

import createStore from './createStore'


type SwitchPartDataState = {
  value: SwitchProps['value']
  disabled: SwitchProps['disabled']
}

type SwitchPartState = SwitchPartDataState & {
  onChange: SwitchProps['onChange']
  resetState: () => void
}


const initialState: SwitchPartDataState = {
  value: 'off',
  disabled: false,
}

const useSwitchPart = createStore<SwitchPartState>((set) => ({
  ...initialState,

  onChange: (newValue: SwitchProps['value']) => set((state) => {
    state.value = newValue
  }),

  resetState: () => set(() => initialState),
}))


export const selectValue = (state: SwitchPartState) => state.value
export const selectDisabled = (state: SwitchPartState) => state.disabled
export const selectOnChange = (state: SwitchPartState) => state.onChange
export const selectResetState = (state: SwitchPartState) => state.resetState


export default useSwitchPart
