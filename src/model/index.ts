import create, { createStore, StoreApi } from 'zustand';
import { reading, ReadingState } from './reading';

type State = ReadingState;
type SetState = StoreApi<State>['setState'];
type GetState = StoreApi<State>['getState'];

const useStore = create<State>((set, get) => ({

    ...reading(set, get)
}));

export type { State, SetState, GetState };
export { useStore };