import fs from 'fs';
import path from 'path';
import nzh from 'nzh';
import {
    Packer, Document, AlignmentType,
    Table, TableRow, WidthType, TableCell, HeightRule
} from 'docx';
import { CostItem, GenData, SettingDoc } from "@/type/doc";
import { Draw } from '../draw';
import { ORG_NO, TABLE_WIDTH } from '../constant';

/**
 * 收费段落 
 */
const getCostItems = (items: CostItem[] = []) => {

    if (items.length === 0) {
        return [];
    }

    let total = 0;

    return items.map(({ costName, price }, index) => {
        total += Number.isNaN(Number.parseFloat(price)) ? 0 : Number.parseFloat(price);
        return Draw.p([
            Draw.fangsong(`${index + 1}、项目：${costName ?? ''}，收费：${price ?? ''}元；`)
        ]);
    }).concat([
        Draw.p([
            Draw.fangsong(`收费总金额：${total}元，大写：${nzh.cn.toMoney(total)}`)
        ], AlignmentType.LEFT, { before: 400 })
    ]);
};

/**
 * 6.司法鉴定收费告知书
 */
export const jianDingShouFeiGaoZhiShu = async (genData: GenData, setting: SettingDoc, to: string) => {

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
                        Draw.hei(`${setting.company ?? ''}司法鉴定收费告知书`)
                    ], AlignmentType.CENTER, { before: 100, after: 100 }),
                    new Table({
                        width: {
                            size: TABLE_WIDTH,
                            type: WidthType.DXA
                        },
                        rows: [
                            new TableRow({
                                children: [
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('缴费当事人')], AlignmentType.CENTER),
                                    ]),
                                    new TableCell({
                                        children: [],
                                        margins: { top: 100, left: 100, bottom: 100, right: 100 }
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('鉴定内容')], AlignmentType.CENTER)
                                    ]),
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('')])
                                    ])
                                ],
                                // height: { value: 2000, rule: HeightRule.EXACT }
                            }),
                            new TableRow({
                                children: [
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('收费标准')], AlignmentType.CENTER)
                                    ]),
                                    Draw.cell([
                                        Draw.p([
                                            Draw.fangsong('□ 按基准价收费')
                                        ]),
                                        Draw.p([
                                            Draw.fangsong('□ 按基准价上浮（下浮）        %收费')
                                        ]),
                                        Draw.p([
                                            Draw.fangsong('□ 按疑难、复杂及有重大社会影响的案件，与缴费当事人协商确定收费标准□ 文书、痕迹鉴定中，涉及财产案件的，按标的额（诉讼标的和鉴定标的两 者中的较小值）分段累计收费，本案标的额：         元')
                                        ])
                                    ])
                                ]
                            }),
                            new TableRow({
                                children: [
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('收费项目级金额')], AlignmentType.CENTER)
                                    ]),
                                    Draw.cell([...getCostItems(genData.costItems)])
                                ]
                            }),
                            new TableRow({
                                children: [
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('鉴定要求')], AlignmentType.CENTER)
                                    ]),
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('')])
                                    ])
                                ]
                            }),
                            new TableRow({
                                children: [
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('收费结算方式')], AlignmentType.CENTER)
                                    ]),
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('')])
                                    ])
                                ],
                            }),
                            new TableRow({
                                children: [
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('服务终止费用约定')], AlignmentType.CENTER)
                                    ]),
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('')])
                                    ])
                                ]
                            }),
                            new TableRow({
                                children: [
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('收费争议解决办法')], AlignmentType.CENTER)
                                    ]),
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('')])
                                    ])
                                ]
                            }),
                            new TableRow({
                                children: [
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('缴费当事人签字')], AlignmentType.CENTER)
                                    ]),
                                    Draw.cell([
                                        Draw.p([Draw.fangsong('年    月    日')], AlignmentType.RIGHT)
                                    ])
                                ]
                            }),
                        ]
                    })
                ]
            }
        ]
    });

    const chunk = await Packer.toBuffer(doc);

    const savePath = path.join(to, '6.司法鉴定收费告知书.docx');
    return await fs.promises.writeFile(savePath, chunk);
    // fs.writeFileSync(savePath, chunk);
    // electron.shell.openPath(savePath);
};