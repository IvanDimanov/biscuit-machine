import createStore from './createStore'


export type LanguageDataState = {
  language: 'bg' | 'en'
}

type LanguageState = LanguageDataState & {
  setLanguage: (language: LanguageDataState['language']) => void
  resetState: () => void
}


const initialState: LanguageDataState = {
  language: 'en',
}

const useLanguage = createStore<LanguageState>((set) => ({
  ...initialState,

  setLanguage: (language) => set((state) => {
    state.language = language
  }),

  resetState: () => set(() => initialState),
}))


export const selectLanguage = (state: LanguageState) => state.language
export const selectSetLanguage = (state: LanguageState) => state.setLanguage
export const selectResetState = (state: LanguageState) => state.resetState


export default useLanguage
