import fs from 'fs';
import path from 'path';
import {
    Packer, Document, AlignmentType,
    Table, TableRow, WidthType
} from 'docx';
import { GenData, SettingDoc } from "@/type/doc";
import { Draw } from '../draw';
import { ORG_NO } from '../constant';

/**
 * 生成受理审查表
 * @param genData 生成数据 
 * @param setting 设置数据
 * @param to 保存到
 */
export const showLiShenCha = async (genData: GenData, setting: SettingDoc, to: string) => {

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
                    Draw.fangsong(`${setting?.company ?? ''}受理审查表`, 28),
                ], AlignmentType.CENTER, { before: 100, after: 100 }),
                new Table({
                    width: {
                        size: 9005,
                        type: WidthType.DXA
                    },
                    rows: [
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('鉴定事项')])]),
                                Draw.cell([Draw.p([Draw.fangsong('提取、恢复委托物品内存储的全部数据')])], 3),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('审查内容')])]),
                                Draw.cell([Draw.p([Draw.fangsong('1.委托事项是否未超出本机构司法鉴定业务范围')])], 2),
                                Draw.cell([Draw.p([Draw.fangsong('是 ■  否 □')])]),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([])]),
                                Draw.cell([Draw.p([Draw.fangsong('2.鉴定材料是否真实、完整、充分及取得方式合法')])], 2),
                                Draw.cell([Draw.p([Draw.fangsong('是 ■  否 □')])]),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([])]),
                                Draw.cell([Draw.p([Draw.fangsong('3.鉴定事项的用途是否合法或者不违背社会公德')])], 2),
                                Draw.cell([Draw.p([Draw.fangsong('是 ■  否 □')])]),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([])]),
                                Draw.cell([Draw.p([Draw.fangsong('4.鉴定要求是否符合司法鉴定执业规则或相关鉴定技术规范')])], 2),
                                Draw.cell([Draw.p([Draw.fangsong('是 ■  否 □')])]),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([])]),
                                Draw.cell([Draw.p([Draw.fangsong('5.鉴定要求是否未超出机构技术条件和鉴定能力')])], 2),
                                Draw.cell([Draw.p([Draw.fangsong('是 ■  否 □')])]),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([])]),
                                Draw.cell([Draw.p([Draw.fangsong('6.委托人是否未就同一鉴定事项同时委托其他司法鉴定机构进行鉴定')])], 2),
                                Draw.cell([Draw.p([Draw.fangsong('是 ■  否 □')])]),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('重要提示')])]),
                                Draw.cell([Draw.p([
                                    Draw.fangsong('1、司法鉴定机构应当自收到委托之日起七个工作日内作出是否受理的决定。'),
                                    Draw.fangsong('2、对于复杂、疑难或者特殊鉴定事项的委托，司法鉴定机构可以与委托人协商决定受理的时间。')
                                ])], 3),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('审查人')])]),
                                Draw.cell([
                                    Draw.p([Draw.fangsong('是否符合受理条件：')]),
                                    Draw.p([Draw.fangsong('是')]),
                                    Draw.p([]),
                                    Draw.p([Draw.fangsong('年  月  日')], AlignmentType.RIGHT)
                                ]),
                                Draw.cell([Draw.p([Draw.fangsong('机构负责人')])]),
                                Draw.cell([
                                    Draw.p([Draw.fangsong('是否同意受理：')]),
                                    Draw.p([Draw.fangsong('同意')]),
                                    Draw.p([]),
                                    Draw.p([Draw.fangsong('年  月  日')], AlignmentType.RIGHT)
                                ]),
                            ]
                        }),
                        new TableRow({
                            children: [
                                Draw.cell([Draw.p([Draw.fangsong('备注')])]),
                                Draw.cell([], 3)
                            ]
                        }),
                    ]
                })
            ]
        }],
    });

    const chunk = await Packer.toBuffer(doc);
    const savePath = path.join(to, '1.受理审查表.docx');
    return await fs.promises.writeFile(savePath, chunk);
    // electron.shell.openPath(savePath);
};