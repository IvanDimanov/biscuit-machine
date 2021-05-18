import { SwitchProps } from '@src/components/Switch'
import { StatusProps } from '@src/components/Status'
import { MotorProps } from '@src/components/Motor'

import createStore from './createStore'


type MotorPartDataState = {
  statusValue: StatusProps['value']
  motorStatus: MotorProps['status']
}

type MotorPartState = MotorPartDataState & {
  onChange: SwitchProps['onChange']
  resetState: () => void
}


const initialState: MotorPartDataState = {
  statusValue: 'off',
  motorStatus: 'off',
}

const useMotorPart = createStore<MotorPartState>((set) => ({
  ...initialState,

  onChange: (newValue: SwitchProps['value']) => set((state) => {
    state.statusValue = newValue
    state.motorStatus = newValue === 'on' ? 'on' : 'off'
  }),

  resetState: () => set(() => initialState),
}))


export const selectStatusValue = (state: MotorPartState) => state.statusValue
export const selectMotorStatus = (state: MotorPartState) => state.motorStatus
export const selectOnChange = (state: MotorPartState) => state.onChange
export const selectResetState = (state: MotorPartState) => state.resetState


export default useMotorPart
