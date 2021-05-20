import createStore from './createStore'


type SfxDataState = {
  volume: number
}

type SfxState = SfxDataState & {
  setVolume: (volume: number) => void
  resetState: () => void
}


const initialState: SfxDataState = {
  volume: 100,
}

const useSfx = createStore<SfxState>((set) => ({
  ...initialState,

  setVolume: (volume) => set((state) => {
    state.volume = Math.min(100, Math.max(0, volume))
  }),

  resetState: () => set(() => initialState),
}))


export const selectVolume = (state: SfxState) => state.volume
export const selectSetVolume = (state: SfxState) => state.setVolume
export const selectResetState = (state: SfxState) => state.resetState


export default useSfx
