import localforage from 'localforage';
import { Doc, SettingDoc } from '@/type/doc';
import { GetState, SetState } from '..';
import { SettingState } from '.';

const setting = ((set: SetState, get: GetState): SettingState => ({

    settingData: undefined,

    async querySettingData() {
        set({ reading: true });
        try {
            const next = await localforage.getItem<SettingDoc>(Doc.Setting);
            set({ settingData: next === null ? undefined : next });
        } catch (error) {
            console.error(error);
        } finally {
            set({ reading: false });
        }
    },
    async saveSettingData(payload: SettingDoc) {
        set({ reading: true });
        try {
            const next = await localforage.setItem(Doc.Setting, payload);
            set({ settingData: next });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            set({ reading: false });
        }
    }
}));

export { setting };