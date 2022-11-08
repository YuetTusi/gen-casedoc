import fs from 'fs';
import path from 'path';
import {
    Packer, Document, AlignmentType
} from 'docx';
import { GenData, SettingDoc } from "@/type/doc";
import { Draw } from '../draw';
import { ORG_NO } from '../constant';


/**
 * 9.司法鉴定意见领取通知
 */
export const siFaJianDingYiJianLingQuTongZhi = async (genData: GenData, setting: SettingDoc, to: string) => {

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
                    Draw.hei(`${setting?.company ?? ''}司法鉴定中心司法鉴定意见书领取通知`, 36),
                ], AlignmentType.CENTER, { before: 200, after: 200 }),
                Draw.p([
                    Draw.fangsong(`统一司法鉴定案件编号：${genData.caseNo}`),
                ], AlignmentType.RIGHT, { before: 200, after: 200 }),
                Draw.p([
                    Draw.fangsong('****公安局：')
                ], AlignmentType.LEFT, { before: 200, after: 200 }),
                Draw.p([
                    Draw.fangsong(`    我机构根据统一司法鉴定案件编号：${genData.caseNo}号《司法鉴定委托书》的有关条款，对贵单位委托的************进行了有关内容的鉴定，鉴定结论详见统一司法鉴定案件编号：${genData.caseNo}号《司法鉴定意见书》。`)
                ], AlignmentType.LEFT, { before: 200, after: 200, line: 400 }),
                Draw.p([
                    Draw.fangsong('    根据《中华人民共和国刑事诉讼法》第一百二十条之规定，如果你对该鉴定意见书有异议，可以提出补充鉴定或者重新鉴定的申请。')
                ], AlignmentType.LEFT, { before: 200, after: 200, line: 400 }),
                Draw.p([
                    Draw.fangsong('（司法鉴定所印章)')
                ], AlignmentType.RIGHT, { before: 400, after: 200 }),
                Draw.p([
                    Draw.fangsong('年    月    日')
                ], AlignmentType.RIGHT, { before: 200, after: 200 }),
                Draw.p([
                    Draw.fangsong('鉴定意见书已领取')
                ], AlignmentType.LEFT, { before: 400, after: 200 }),
                Draw.p([
                    Draw.fangsong('领取人：')
                ], AlignmentType.LEFT, { before: 200, after: 200 }),
                Draw.p([
                    Draw.fangsong('    年    月    日')
                ], AlignmentType.LEFT, { before: 200, after: 200 }),
            ]
        }]
    });

    const chunk = await Packer.toBuffer(doc);
    const savePath = path.join(to, '9.司法鉴定意见领取通知.docx');
    return fs.promises.writeFile(savePath, chunk);
    // fs.writeFileSync(savePath, chunk);
    // electron.shell.openPath(savePath);
};