import fs from 'fs';
import path from 'path';
import {
    Packer, Document, AlignmentType,
    Table, TableRow, WidthType, TableCell, VerticalAlign
} from 'docx';
import { Evidence, GenData, SettingDoc } from "@/type/doc";
import { Draw } from '../draw';
import { ORG_NO, TABLE_WIDTH } from '../constant';

const getEvi = (evidences: Evidence[] = []) =>
    evidences.map((i, index) =>
        new TableRow({
            children: [
                Draw.cell([Draw.p([Draw.fangsong((index + 1).toString())], AlignmentType.CENTER)]),
                Draw.cell([Draw.p([Draw.fangsong(i.eviName ?? '')])]),
                Draw.cell([Draw.p([Draw.fangsong(i.eviCategory ?? '')])]),
                Draw.cell([Draw.p([Draw.fangsong(i.eviCount ?? '')])]),
                Draw.cell([Draw.p([Draw.fangsong(i.eviChar ?? '')])]),
                Draw.cell([Draw.p([Draw.fangsong(i.eviState ?? '')])]),
            ]
        }));

/**
 * 8.鉴定材料接收登记表
 */
export const jianDingCaiLiaoJieShouDengJi = async (genData: GenData, setting: SettingDoc, to: string) => {

    const doc = new Document({
        sections: [{
            headers: {
                default: Draw.header([
                    Draw.song(`档案编号：${setting?.fileNo ?? ''}`, 18),
                    Draw.song('                                       '),
                    Draw.song(ORG_NO ?? '', 18)
                ])
            },
            children: [
                Draw.p([
                    Draw.hei(`${setting?.company ?? ''}鉴定材料接收登记表`, 36),
                ], AlignmentType.CENTER, { before: 100, after: 100 }),
                Draw.p([
                    Draw.fangsong(`统一司法鉴定案件编号：${genData.caseNo}`),
                ], AlignmentType.RIGHT, { before: 100, after: 100 }),
                new Table({
                    width: {
                        size: TABLE_WIDTH,
                        type: WidthType.DXA
                    },
                    rows: [
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('案件名称')], AlignmentType.CENTER)], 2),
                                Draw.cell([Draw.p([Draw.fangsong(genData.caseName)])], 5),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('接收时间')], AlignmentType.CENTER)], 2),
                                Draw.cell([Draw.p([Draw.fangsong(genData.receiveTime.format('YYYY年MM月DD日'))])], 5),
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [Draw.p([Draw.fangsong('鉴定材料')], AlignmentType.CENTER)],
                                    rowSpan: (genData.evidences ?? []).length + 1,
                                    verticalAlign: VerticalAlign.CENTER,
                                    width: { size: 400, type: WidthType.DXA }
                                }),
                                Draw.cell([Draw.p([Draw.fangsong('序号')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong('名称')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong('种类')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong('数量')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong('性状')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong('保存状况')], AlignmentType.CENTER)]),
                            ]
                        }),
                        ...getEvi(genData.evidences),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('重要提示')], AlignmentType.CENTER)], 2),
                                Draw.cell([
                                    Draw.p([Draw.fangsong('1.双方对上述鉴定材料的名称、数量、完好程序清点无误。')], AlignmentType.LEFT, { before: 100, after: 100 }),
                                    Draw.p([Draw.fangsong('2.补充鉴定材料时应当填写新的表单，切勿在原表上涂改、添加。')], AlignmentType.LEFT, { before: 100, after: 100 }),
                                    Draw.p([Draw.fangsong('3.邮寄鉴定材料的，双方应当填写本表单求并留存邮寄凭证。')], AlignmentType.LEFT, { before: 100, after: 100 })
                                ], 5),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([
                                    Draw.p([Draw.fangsong(`委托人：${genData.deleMan ?? ''}`)]),
                                    Draw.p([Draw.fangsong('    年    月    日')], AlignmentType.RIGHT)
                                ], 3),
                                Draw.cell([
                                    Draw.p([Draw.fangsong(`鉴定机构：${setting.company ?? ''}`)]),
                                    Draw.p([Draw.fangsong('    年    月    日')], AlignmentType.RIGHT)
                                ], 4)
                            ]
                        })
                    ]
                })
            ]
        }]
    });

    const chunk = await Packer.toBuffer(doc);
    const savePath = path.join(to, '8.鉴定材料接收登记表.docx');
    return fs.promises.writeFile(savePath, chunk);
    // fs.writeFileSync(savePath, chunk);
    // electron.shell.openPath(savePath);
};