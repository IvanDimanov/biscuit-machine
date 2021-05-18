import create, { State, StateCreator, UseStore } from 'zustand'
import { devtools } from 'zustand/middleware'
import produce, { Draft } from 'immer'


/* Turn the set method into an Immer proxy */
const immerMiddleware = <TState extends State>(
  config: StateCreator<TState, (fn: (draft: Draft<TState>) => void) => void>,
): StateCreator<TState> => (set, get, api) => config((fn) => set(produce<TState>(fn)), get, api)


const createStore = <TState extends State>(
  createState: StateCreator<TState, (fn: (draft: Draft<TState>) => void) => void>,
): UseStore<TState> => create<TState>(devtools(immerMiddleware(createState)))


export default createStore
