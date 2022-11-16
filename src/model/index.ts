import create, { StoreApi } from 'zustand';
import { reading, ReadingState } from './reading';
import { setting, SettingState } from './setting';
import { history, HistoryState } from './history';

type State = ReadingState & SettingState & HistoryState;
type SetState = StoreApi<State>['setState'];
type GetState = StoreApi<State>['getState'];

const useStore = create<State>((set, get) => ({

    ...reading(set, get),
    ...setting(set, get),
    ...history(set, get)
}));

export type { State, SetState, GetState };
export { useStore };