import fs from 'fs';
import path from 'path';
import {
    Packer, Document, AlignmentType,
    Table, TableRow, WidthType, TableCell, VerticalAlign, HeightRule
} from 'docx';
import { Evidence, GenData, SettingDoc } from "@/type/doc";
import { Draw } from '../draw';
import { ORG_NO, TABLE_WIDTH } from '../constant';

/**
 * 检材
 */
const getEvi = (evidences: Evidence[] = []) => {
    const evi = evidences.reduce((acc: string[], current) => {
        acc.push(`${current.eviName ?? ''}${current.eviCount ?? ''}`);
        return acc;
    }, []);
    return Draw.p([Draw.fangsong(evi.join('、'))]);
};

/**
 * 17.鉴定文书复核单
 */
export const jianDingWenShuFuHeDan = async (genData: GenData, setting: SettingDoc, to: string) => {

    const doc = new Document({
        sections: [{
            headers: {
                default: Draw.header([
                    Draw.song(`档案编号：${setting?.fileNo ?? ''}`, 18),
                    Draw.song('                                           '),
                    Draw.song(ORG_NO ?? '', 18)
                ])
            },
            children: [
                Draw.p([
                    Draw.hei('鉴定文书复核单', 36),
                ], AlignmentType.CENTER, { before: 100, after: 400 }),
                new Table({
                    width: {
                        size: TABLE_WIDTH,
                        type: WidthType.DXA
                    },
                    rows: [
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('文书编号')], AlignmentType.CENTER)]),
                                Draw.cell([], 4),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('委托单位')], AlignmentType.CENTER)]),
                                Draw.cell([Draw.p([Draw.fangsong(genData.deleUnit ?? '')])]),
                                // Draw.cell([Draw.p([Draw.fangsong('')])]),
                                Draw.cell([Draw.p([Draw.fangsong('检材')], AlignmentType.CENTER)]),
                                Draw.cell([getEvi(genData.evidences)], 2),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('鉴定事项')], AlignmentType.CENTER)]),
                                Draw.cell([], 4),
                            ],
                            height: { value: 2000, rule: HeightRule.EXACT }
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [Draw.p([Draw.fangsong('简要鉴定意见：')], AlignmentType.LEFT)],
                                    verticalAlign: VerticalAlign.TOP,
                                    columnSpan: 5,
                                    margins: { top: 100, left: 100, bottom: 100, right: 100 }
                                })
                            ],
                            height: { value: 4000, rule: HeightRule.EXACT }
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('复核情况：')], AlignmentType.LEFT)], 5),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('复核人')], AlignmentType.LEFT)]),
                                Draw.cell([Draw.p([])], 2),
                                Draw.cell([Draw.p([Draw.fangsong('    年    月    日')], AlignmentType.RIGHT)], 2)
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('批准人')], AlignmentType.LEFT)]),
                                Draw.cell([Draw.p([])], 2),
                                Draw.cell([Draw.p([Draw.fangsong('    年    月    日')], AlignmentType.RIGHT)], 2)
                            ]
                        })
                    ]
                })
            ]
        }]
    });

    const chunk = await Packer.toBuffer(doc);
    const savePath = path.join(to, '17.鉴定文书复核单.docx');
    return await fs.promises.writeFile(savePath, chunk);
    // fs.writeFileSync(savePath, chunk);
    // electron.shell.openPath(savePath);
};