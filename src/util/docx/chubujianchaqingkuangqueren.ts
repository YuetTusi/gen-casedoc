import fs from 'fs';
import path from 'path';
import electron from 'electron';
import {
    Packer, Document, AlignmentType,
    Table, TableRow, WidthType
} from 'docx';
import { GenData, SettingDoc } from "@/type/doc";
import { Draw } from '../draw';

/**
 * 初步检查情况确认表
 * @param genData 生成数据 
 * @param setting 设置数据
 * @param to 保存到
 */
export const chuBuJianChaQingKuangQueRen = async (genData: GenData, setting: SettingDoc, to: string) => {

    const doc = new Document({
        sections: [{
            headers: {
                default: Draw.header([
                    Draw.song(`档案编号：${setting?.fileNo ?? ''}`, 18),
                    Draw.song('                                       '),
                    Draw.song(setting?.orgNo ?? '', 18)
                ])
            },
            children: [
                Draw.p([
                    Draw.hei(`${setting?.company ?? ''}司法鉴定中心委托鉴定物品初步检查情况确认表`, 36),
                ], AlignmentType.CENTER, { before: 100, after: 100 }),
                Draw.p([
                    Draw.fangsong(`统一司法鉴定案件编号：${genData.caseNo}`),
                ], AlignmentType.RIGHT, { before: 100, after: 100 }),
                new Table({
                    width: {
                        size: 9005,
                        type: WidthType.DXA
                    },
                    rows: [
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('检查时间')])], 2),
                                Draw.cell([Draw.p([Draw.fangsong(genData.checkTime.format('YYYY年M月D日'))])], 5),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('委托单位')])], 2),
                                Draw.cell([Draw.p([Draw.fangsong(genData.deleUnit ?? '')])], 5),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('案件名称')])], 2),
                                Draw.cell([Draw.p([Draw.fangsong(genData.caseName)])], 5),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('其它须说明的情况：')])], 7),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('初查人签名')])], 2),
                                Draw.cell([Draw.p([])], 2),
                                Draw.cell([Draw.p([Draw.fangsong('委托经手人签名')])], 2),
                                Draw.cell([Draw.p([])]),
                            ]
                        })
                    ]
                }),
                Draw.p([
                    Draw.fangsong('★此表作为与委托方鉴定签立协议书时确定委托鉴定物品情况的原始依据，请使用钢笔或签字笔认真填写。', 20, true)
                ])
            ]
        }],
    });

    const chunk = await Packer.toBuffer(doc);

    const savePath = path.join(to, '1.受理审查表.docx');
    fs.writeFileSync(savePath, chunk);
    electron.shell.openPath(savePath);
};