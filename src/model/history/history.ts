import localstorage from 'localforage';
import { helper } from '@/util/helper';
import { Doc, GenData } from '@/type/doc';
import { HistoryState } from '.';
import { GetState, SetState } from '..';

const history = ((set: SetState, get: GetState): HistoryState => ({

    historyLoading: true,

    historyData: [],

    historyTotal: 0,

    async saveHistory(payload: GenData) {
        try {
            const prev = await localstorage.getItem<GenData[]>(Doc.History);
            if (prev === null) {
                await localstorage.setItem<GenData[]>(Doc.History, [payload]);
            } else {
                await localstorage.setItem<GenData[]>(Doc.History, [...prev, payload]);
            }
        } catch (error) {
            console.warn(error);
        }
    },
    async queryHistory(payload: { pageIndex: number, pageSize: number, caseName: string }) {
        const { pageIndex, pageSize, caseName } = payload;
        const begin = (pageIndex - 1) * pageSize;
        set({ historyLoading: true });
        try {
            let next = await localstorage.getItem<GenData[]>(Doc.History);
            if (next === null) {
                set({ historyData: [] });
            } else if (!helper.isNullOrUndefined(caseName)) {
                const ret = next.filter(item => item.caseName.includes(caseName.trim()));
                set({ historyTotal: ret.length });
                set({
                    historyData: ret
                        .sort((m, n) => (n.createdTime ?? 0) - (m.createdTime ?? 0))
                        .slice(begin, begin + pageSize)
                });
            } else {
                set({ historyTotal: next.length });
                set({
                    historyData: next
                        .sort((m, n) => (n.createdTime ?? 0) - (m.createdTime ?? 0))
                        .slice(begin, begin + pageSize)
                });
            }
        } catch (error) {
            throw error;
        } finally {
            set({ historyLoading: false });
        }
    },
    async clearHistory() {
        set({ historyLoading: true });
        try {
            await localstorage.setItem<GenData[]>(Doc.History, []);
            set({ historyData: [] });
        } catch (error) {
            throw error;
        } finally {
            set({ historyLoading: false });
        }
    }
}));

export { history };