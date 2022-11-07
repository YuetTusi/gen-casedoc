import fs from 'fs';
import path from 'path';
import {
    Packer, Document, AlignmentType, Header,
    Table, TableRow, WidthType, TableCell, HeightRule
} from 'docx';
import { GenData, SettingDoc } from "@/type/doc";
import { Draw } from '../draw';
import { ORG_NO } from '../constant';

/**
 * 4.检案摘要及鉴定要求
 */
export const jianAnZhaiYaoAndAnJianYaoQiu = async (genData: GenData, setting: SettingDoc, to: string) => {

    const doc = new Document({
        sections: [
            {
                headers: {
                    default: Draw.header([
                        Draw.song(`档案编号：${setting?.fileNo ?? ''}`, 18),
                        Draw.song('                                       '),
                        Draw.song(ORG_NO ?? '', 18)
                    ])
                },
                children: [
                    Draw.p([
                        Draw.hei(`${setting.company ?? ''}司法鉴定中心检案摘要及鉴定要求`)
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
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('委托单位')], AlignmentType.CENTER)
                                    ]),
                                    new TableCell({
                                        children: [Draw.p([Draw.fangsong(genData.deleUnit ?? '')])],
                                        width: { size: 7600, type: WidthType.DXA },
                                        margins: { top: 100, left: 100, bottom: 100, right: 100 }
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('检案摘要')], AlignmentType.CENTER)
                                    ]),
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('')])
                                    ])
                                ],
                                height: { value: 4000, rule: HeightRule.EXACT }
                            }),
                            new TableRow({
                                children: [
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('鉴定要求')], AlignmentType.CENTER)
                                    ]),
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('')])
                                    ])
                                ],
                                height: { value: 4000, rule: HeightRule.EXACT }
                            })
                        ]
                    }),
                    Draw.p([
                        Draw.fangsong(`委托人：${genData.deleMan ?? ''}`)
                    ], AlignmentType.RIGHT, { before: 400, after: 400 }),
                    Draw.p([
                        Draw.fangsong('年    月    日')
                    ], AlignmentType.RIGHT, { before: 400, after: 400 }),
                ]
            }
        ]
    });

    const chunk = await Packer.toBuffer(doc);

    const savePath = path.join(to, '4.检案摘要及鉴定要求.docx');
    return await fs.promises.writeFile(savePath, chunk);
    // fs.writeFileSync(savePath, chunk);
    // electron.shell.openPath(savePath);
};