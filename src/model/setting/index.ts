import { setting } from './setting';

import { SettingDoc } from "@/type/doc";

interface SettingState {

    /**
     * 设置数据
     */
    settingData?: SettingDoc,
    /**
     * 查询设置数据
     */
    querySettingData: () => void,
    /**
     * 保存设置数据
     */
    saveSettingData: (payload: SettingDoc) => Promise<boolean>
}

export type { SettingState };
export { setting };