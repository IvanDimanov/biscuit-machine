import { CollectionBoxProps } from '@src/components/CollectionBox'

import createStore from './createStore'


type CollectionBoxPartDataState = {
  item?: CollectionBoxProps['item']
}

type CollectionBoxPartState = CollectionBoxPartDataState & {
  setItem: (item: CollectionBoxProps['item']) => void
  resetState: () => void
}


const initialState: CollectionBoxPartDataState = {
  item: undefined,
}

const useCollectionBoxPart = createStore<CollectionBoxPartState>((set) => ({
  ...initialState,

  setItem: (item) => set((state) => {
    state.item = item
  }),

  resetState: () => set(() => initialState),
}))


export const selectItem = (state: CollectionBoxPartState) => state.item
export const selectSetItem = (state: CollectionBoxPartState) => state.setItem
export const selectResetState = (state: CollectionBoxPartState) => state.resetState


export default useCollectionBoxPart
