import fs from 'fs';
import path from 'path';
import {
    Packer, Document, AlignmentType,
    Table, TableRow, WidthType, TableCell, VerticalAlign
} from 'docx';
import { Evidence, GenData, SettingDoc } from "@/type/doc";
import { Draw } from '../draw';
import { ORG_NO, TABLE_WIDTH } from '../constant';

/**
 * 动态绘制检材行
 */
const drawEvidenceRow = (evi: Evidence[]) => {

    let rows: TableRow[] = [];

    evi.forEach((item, i) => {
        for (let j = 0; j < 3; j++) {
            let cells: TableCell[] = [];
            if (i === 0 && j === 0) {
                //首行首列计算跨行数
                cells.push(
                    new TableCell({
                        children: [Draw.p([Draw.fangsong('委托物品初检情况')], AlignmentType.CENTER)],
                        verticalAlign: VerticalAlign.CENTER,
                        width: { size: 30, type: WidthType.DXA },
                        rowSpan: evi.length * 3 //每个物品占3行，首列跨行为N*3
                    })
                );
            }
            switch (j) {
                case 0:
                    cells.push(
                        new TableCell({
                            children: [Draw.p([Draw.fangsong((i + 1).toString())], AlignmentType.CENTER)],
                            verticalAlign: VerticalAlign.CENTER,
                            rowSpan: 3 //编号跨3行
                        })
                    );
                    cells.push(Draw.cell([Draw.p([Draw.fangsong('物品名称')])]));
                    cells.push(Draw.cell([Draw.p([Draw.fangsong(item.eviName)])], 2));
                    cells.push(Draw.cell([Draw.p([Draw.fangsong('数量')])]));
                    cells.push(Draw.cell([Draw.p([Draw.fangsong(item.eviCount ?? '')])]));
                    break;
                case 1:
                    cells.push(Draw.cell([Draw.p([Draw.fangsong('特征描述')])]));
                    cells.push(Draw.cell([Draw.p([Draw.fangsong(item.eviDesc ?? '')])], 4));
                    break;
                case 2:
                    cells.push(Draw.cell([Draw.p([Draw.fangsong('存储容量')])]));
                    cells.push(Draw.cell([Draw.p([Draw.fangsong(item.eviCapacity ?? '')])]));
                    cells.push(Draw.cell([Draw.p([Draw.fangsong('总计存储')])]));
                    cells.push(Draw.cell([Draw.p([Draw.fangsong(item.eviTotal ?? '')])], 2));
                    break;
            }
            rows.push(
                new TableRow({
                    children: cells
                })
            );
        }
    });

    return rows;
}

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
                    Draw.song(ORG_NO ?? '', 18)
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
                        size: TABLE_WIDTH,
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
                        ...drawEvidenceRow(genData.evidences ?? []),
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

    const savePath = path.join(to, '3.初步检查情况确认表.docx');
    return fs.promises.writeFile(savePath, chunk);
    // fs.writeFileSync(savePath, chunk);
    // electron.shell.openPath(savePath);
};