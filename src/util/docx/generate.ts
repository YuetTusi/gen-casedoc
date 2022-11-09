import { GenData, SettingDoc } from "@/type/doc";
import { CaseWords } from "@/type/word";
import { showLiShenCha } from './showlishencha';
import { showLiTongZhiShu } from './shoulitongzhishu';
import { chuBuJianChaQingKuangQueRen } from './chubujianchaqingkuangqueren';
import { jianAnZhaiYaoAndAnJianYaoQiu } from './jiananzhaiyaoandjiandingyaoqiu';
import { siFaJianDingGaoZhiShu } from './sifajiandinggaozhishu';
import { jianDingShouFeiGaoZhiShu } from './jiandingshoufeigaozhishu';
import { siFaJianDingWeiTuoShu } from './sifajiandingweituoshu';
import { jianDingCaiLiaoJieShouDengJi } from './jiandingcailiaojieshoudengji';
import { siFaJianDingYiJianLingQuTongZhi } from './sifajiandingyijianlingqutongzhi';
import { jianDingXiangGuanWuPinCaiLiaoJiaoJie } from './jiandingxiangguanwupincailiaojiaojie';

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
        case CaseWords.SiFaJianDingGaoZhiShu_5:
            return await siFaJianDingGaoZhiShu(genData, setting, to);
        case CaseWords.JianDingShouFeiGaoZhiShu_6:
            return await jianDingShouFeiGaoZhiShu(genData, setting, to);
        case CaseWords.SiFaJianDingWeiTuoShu_7:
            return await siFaJianDingWeiTuoShu(genData, setting, to);
        case CaseWords.JianDingCaiLiaoJieShouDengJi_8:
            return await jianDingCaiLiaoJieShouDengJi(genData, setting, to);
        case CaseWords.SiFaJianDingYiJianLingQuTongZhi_9:
            return await siFaJianDingYiJianLingQuTongZhi(genData, setting, to);
        case CaseWords.JianDingXiangGuanWuPinCaiLiaoJiaoJie_10:
            return await jianDingXiangGuanWuPinCaiLiaoJiaoJie(genData, setting, to);
        default:
            console.warn('未知文档类型');
    }
};