import fs from 'fs';
import path from 'path';
import {
    Packer, Document, AlignmentType,
    Table, TableRow, WidthType, TableCell, VerticalAlign, HeightRule
} from 'docx';
import { GenData, SettingDoc } from "@/type/doc";
import { Draw } from '../draw';
import { ORG_NO } from '../constant';

/**
 * 司法鉴定委托书
 */
export const siFaJianDingWeiTuoShu = async (genData: GenData, setting: SettingDoc, to: string) => {

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
                    Draw.hei('司法鉴定委托书', 36),
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
                                new TableCell({
                                    children: [Draw.p([Draw.fangsong('委托人')], AlignmentType.CENTER)],
                                    width: { type: WidthType.PERCENTAGE, size: 16 },
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                                Draw.cell([Draw.p([Draw.fangsong(genData.deleMan ?? '')])]),
                                new TableCell({
                                    children: [Draw.p([Draw.fangsong('联系人（电话）')], AlignmentType.CENTER)],
                                    width: { type: WidthType.PERCENTAGE, size: 16 },
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                                Draw.cell([Draw.p([Draw.fangsong(genData.userAndTel ?? '')])]),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('承办人')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong(genData.undertaker ?? '')])]),
                                Draw.cell([Draw.p([Draw.fangsong('联系电话')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong(genData.tel ?? '')])]),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('司法鉴定机构')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([
                                    Draw.fangsong(`名称：${setting.company ?? ''}`)
                                ])], 3)
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('委托鉴定事项')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([])], 3)
                            ],
                            height: { value: 2000, rule: HeightRule.EXACT }
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('是否属于重新鉴定')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([])], 3)
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('鉴定用途')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([])], 3)
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('与鉴定有关的基本案情')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([])], 3)
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('鉴定材料')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([])], 3)
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('预计费用及收取方式')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([
                                    Draw.fangsong('预计收费总金额：， 大写：')
                                ])], 3)
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('司法鉴定意见书发送方式')], AlignmentType.CENTER)]),
                                Draw.cell([
                                    Draw.p([Draw.fangsong('□ 自取')]),
                                    Draw.p([Draw.fangsong('□ 邮寄  地址：')]),
                                    Draw.p([Draw.fangsong('□ 其他方式（说明）')])
                                ], 3)
                            ]
                        })
                    ]
                })
            ]
        }]
    });

    const chunk = await Packer.toBuffer(doc);
    const savePath = path.join(to, '7.司法鉴定委托书.docx');
    return fs.promises.writeFile(savePath, chunk);
    // fs.writeFileSync(savePath, chunk);
    // electron.shell.openPath(savePath);
};