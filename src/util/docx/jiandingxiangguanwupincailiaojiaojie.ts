import electron from 'electron';
import fs from 'fs';
import path from 'path';
import {
    Packer, Document, AlignmentType,
    Table, TableRow, WidthType, TableCell, VerticalAlign
} from 'docx';
import { GenData, SettingDoc } from "@/type/doc";
import { Draw } from '../draw';
import { ORG_NO, TABLE_WIDTH } from '../constant';


/**
 * 10.鉴定物品材料交接表
 */
export const jianDingXiangGuanWuPinCaiLiaoJiaoJie = async (genData: GenData, setting: SettingDoc, to: string) => {

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
                    Draw.hei(`${setting?.company ?? ''}司法鉴定中心鉴定相关物品、材料交接表`, 36),
                ], AlignmentType.CENTER, { before: 100, after: 100 }),
                new Table({
                    width: {
                        size: TABLE_WIDTH,
                        type: WidthType.DXA
                    },
                    rows: [
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('案件名称')], AlignmentType.CENTER)], 2),
                                Draw.cell([Draw.p([Draw.fangsong(genData.caseName)])], 3),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('所属单位及案号')], AlignmentType.CENTER)], 2),
                                Draw.cell([
                                    Draw.p([Draw.fangsong(`统一司法鉴定案件编号：${genData.caseNo}`)])
                                ], 3),
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [Draw.p([Draw.fangsong('鉴定相关物品材料')], AlignmentType.CENTER)],
                                    rowSpan: 7,
                                    verticalAlign: VerticalAlign.CENTER,
                                    width: { size: 8, type: WidthType.PERCENTAGE }
                                }),
                                new TableCell({
                                    children: [Draw.p([Draw.fangsong('序号')], AlignmentType.CENTER)],
                                    verticalAlign: VerticalAlign.CENTER,
                                    width: { size: 8, type: WidthType.PERCENTAGE }
                                }),
                                Draw.cell([Draw.p([Draw.fangsong('相关物品、材料名称')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong('数量')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong('接收人确认是否收到')], AlignmentType.CENTER)])
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('1')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong('鉴定意见书')])]),
                                Draw.cell([Draw.p([Draw.fangsong('一（正）二（副）')])]),
                                Draw.cell([
                                    Draw.p([Draw.fangsong('是（    ）')]),
                                    Draw.p([Draw.fangsong('否（    ）')])
                                ]),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('2')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong('鉴定委托书')])]),
                                Draw.cell([Draw.p([Draw.fangsong('一式（二）份')])]),
                                Draw.cell([
                                    Draw.p([Draw.fangsong('是（    ）')]),
                                    Draw.p([Draw.fangsong('否（    ）')])
                                ]),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('3')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong('鉴定材料清单')])]),
                                Draw.cell([Draw.p([Draw.fangsong('一式（一）份')])]),
                                Draw.cell([
                                    Draw.p([Draw.fangsong('是（    ）')]),
                                    Draw.p([Draw.fangsong('否（    ）')])
                                ]),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('4')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong('鉴定检材')])]),
                                Draw.cell([Draw.p([Draw.fangsong('')])]),
                                Draw.cell([
                                    Draw.p([Draw.fangsong('是（    ）')]),
                                    Draw.p([Draw.fangsong('否（    ）')])
                                ]),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('5')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong('鉴定聘请书')])]),
                                Draw.cell([Draw.p([Draw.fangsong('分局联一份')])]),
                                Draw.cell([
                                    Draw.p([Draw.fangsong('是（    ）')]),
                                    Draw.p([Draw.fangsong('否（    ）')])
                                ]),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('6')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong('发票')])]),
                                Draw.cell([Draw.p([Draw.fangsong('（    ）张')])]),
                                Draw.cell([
                                    Draw.p([Draw.fangsong('是（    ）')]),
                                    Draw.p([Draw.fangsong('否（    ）')])
                                ]),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('重要提示')], AlignmentType.CENTER)], 2),
                                Draw.cell([
                                    Draw.p([Draw.fangsong('1.双方对上述鉴定材料的名称、数量、完好程度清点无误；')], AlignmentType.LEFT, { before: 100, after: 100 }),
                                    Draw.p([Draw.fangsong('2.接收人应当如实填写本表，鉴定机构编入鉴定档案。')], AlignmentType.LEFT, { before: 100, after: 100 })
                                ], 4),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([
                                    Draw.p([Draw.fangsong(`委托人：${genData.deleMan ?? ''}`)]),
                                    Draw.p([Draw.fangsong('  年  月  日')], AlignmentType.RIGHT)
                                ], 3),
                                Draw.cell([
                                    Draw.p([Draw.fangsong(`鉴定机构：${setting.company ?? ''}`)]),
                                    Draw.p([Draw.fangsong('    年    月    日')], AlignmentType.RIGHT)
                                ], 3)
                            ]
                        })
                    ]
                })
            ]
        }]
    });

    const chunk = await Packer.toBuffer(doc);
    const savePath = path.join(to, '10.鉴定物品材料交接表.docx');
    // return fs.promises.writeFile(savePath, chunk);
    fs.writeFileSync(savePath, chunk);
    electron.shell.openPath(savePath);
};