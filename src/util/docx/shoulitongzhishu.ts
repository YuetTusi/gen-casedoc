import electron from 'electron';
import fs from 'fs';
import path from 'path';
import {
    Packer, Document, AlignmentType, Header,
    Table, TableRow, WidthType
} from 'docx';
import { GenData, SettingDoc } from "@/type/doc";
import { Draw } from '../draw';
import { ORG_NO } from '../constant';

/**
 * 受理通知书
 * @param genData 生成数据 
 * @param setting 设置数据
 * @param to 保存到
 */
export const showLiTongZhiShu = async (genData: GenData, setting: SettingDoc, to: string) => {

    const doc = new Document({
        sections: [{
            headers: {
                default: new Header({
                    children: [
                        Draw.p([
                            Draw.song(ORG_NO, 18)
                        ], AlignmentType.CENTER)
                    ]
                })
            },
            children: [
                Draw.p([
                    Draw.hei(`${setting?.company ?? ''}司法鉴定中心（所）受理通知书`, 32),
                ], AlignmentType.CENTER, { before: 400, after: 400 }),
                Draw.p([
                    Draw.fangsong('××司鉴[×]××鉴字第××号'),
                ], AlignmentType.RIGHT, { before: 400, after: 400 }),
                Draw.p([
                    Draw.fangsong(`${genData.deleMan ?? ''}：`)
                ], AlignmentType.LEFT, { line: 400 }),
                Draw.p([
                    Draw.fangsong(`    ${genData.receiveTime.format('YYYY年M月D日')}，贵单位因办理${genData.caseName}一案的需要，委托我中心（所）进行司法鉴定。现经审查，贵单位的委托鉴定事项符合受理条件，我中心（所）决定于本日受理本次鉴定委托。`)
                ], AlignmentType.LEFT, { line: 400 }),
                Draw.p([
                    Draw.fangsong('    特此通知。')
                ], AlignmentType.LEFT, { line: 400 }),
                Draw.p([
                    Draw.fangsong(genData.checkTime.format('YYYY年M月D日'))
                ], AlignmentType.RIGHT, { before: 400, after: 400 }),
                Draw.p([
                    Draw.fangsong('（公章）')
                ])
            ]
        }],
    });

    const chunk = await Packer.toBuffer(doc);
    const savePath = path.join(to, '2.受理通知书.docx');
    await fs.promises.writeFile(savePath, chunk);
};