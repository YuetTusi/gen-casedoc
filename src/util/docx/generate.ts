import { GenData, SettingDoc } from "@/type/doc";
import { CaseWords } from "@/type/word";
import { showLiShenCha } from './showlishencha';
import { showLiTongZhiShu } from './shoulitongzhishu';
import { chuBuJianChaQingKuangQueRen } from './chubujianchaqingkuangqueren';
import { jianAnZhaiYaoAndAnJianYaoQiu } from './jiananzhaiyaoandjiandingyaoqiu';

/**
 * 生成Word文档
 */
export const generate = async (type: CaseWords, genData: GenData, setting: SettingDoc, to: string) => {

    switch (type) {
        case CaseWords.ShowLiShenCha_1:
            return await showLiShenCha(genData, setting, to);
        case CaseWords.ShowLiTongZhiShu_2:
            return await showLiTongZhiShu(genData, setting, to);
        case CaseWords.ChuBuJianChaQingKuangQueRen_3:
            return await chuBuJianChaQingKuangQueRen(genData, setting, to);
        case CaseWords.JianAnZhaiYaoAndAnJianYaoQiu_4:
            return await jianAnZhaiYaoAndAnJianYaoQiu(genData, setting, to);
        default:
            console.warn('未知文档类型');
    }
};