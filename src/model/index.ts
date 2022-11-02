import create, { StoreApi } from 'zustand';
import { reading, ReadingState } from './reading';
import { setting, SettingState } from './setting';

type State = ReadingState & SettingState;
type SetState = StoreApi<State>['setState'];
type GetState = StoreApi<State>['getState'];

const useStore = create<State>((set, get) => ({

    ...reading(set, get),
    ...setting(set, get)
}));

export type { State, SetState, GetState };
export { useStore };