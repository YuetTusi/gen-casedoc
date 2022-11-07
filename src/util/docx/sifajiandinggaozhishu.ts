import fs from 'fs';
import path from 'path';
import {
    Packer, Document, AlignmentType, Paragraph
} from 'docx';
import { GenData, SettingDoc } from "@/type/doc";
import { Draw } from '../draw';
import { ORG_NO } from '../constant';

/**
 * 5.司法鉴定告知书
 */
export const siFaJianDingGaoZhiShu = async (genData: GenData, setting: SettingDoc, to: string) => {

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
                        Draw.hei('司法鉴定告知书')
                    ], AlignmentType.CENTER, { before: 100, after: 400 }),
                    Draw.p([
                        Draw.fangsong('    一、委托人委托司法鉴定，应提供真实、完整、充分、符合鉴定要求的鉴定材料，并提供案件有关情况。因委托人或当事人提供虚假信息、隐瞒真实情况或提供不实材料产生的不良后果，司法鉴定机构和司法鉴定人概不负责。')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    二、司法鉴定机构和司法鉴定人按照客观、独立、公正、科学的原则进行鉴定，委托人、当事人不得要求或暗示司法鉴定机构或司法鉴定人按其意图或者特定目的提供鉴定意见。')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    三、由于受到鉴定材料的限制以及其他客观条件的制约，司法鉴定机构和司法鉴定人有时无法得出明确的鉴定意见。')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    四、因鉴定工作的需要，可能会耗尽鉴定材料或者造成不可逆的损坏。')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    五、如果存在涉及鉴定活动的民族习俗等有关禁忌，请在鉴定工作开始前告知司法鉴定人。')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    六、因鉴定工作的需要，有下列情形的，需要委托人或者当事人近亲属、监护人到场见证并签名。现场见证时，不得影响鉴定工作的独立性，不得干扰鉴定工作正常开展。未经司法鉴定机构和司法鉴定人同意，不得拍照、摄像或者录音。')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    1.需要对无民事行为能力人或者限制民事行为能力人进行身体检查')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    2.需要对被鉴定人进行法医精神病鉴定')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    3.需要到现场提取鉴定材料')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    4.需要进行尸体解剖')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    七、因鉴定工作的需要，委托人或者当事人获悉国家秘密、商业秘密或者个人隐私的，应当保密。')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    八、鉴定意见属于专业意见，是否成为定案根据，由办案机关经审查判断后作出决定，司法鉴定机构和司法鉴定人无权干涉。')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    九、当事人对鉴定意见有异议，应当通过庭审质证或者申请重新鉴定、补充鉴定等方式解决。')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    十、有下列情形的，司法鉴定机构可以终止鉴定工作：')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    （一）发现鉴定材料不真实、不完整、不充分或者取得方式不合法的；')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    （二）鉴定用途不合法或者违背社会公德的；')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    （三）鉴定要求不符合司法鉴定执业规则或者相关鉴定技术规范的；')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    （四）鉴定要求超出本机构技术条件或者鉴定能力的；')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    （五）委托人就同一鉴定事项同时委托其他司法鉴定机构进行鉴定的；')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    （六）鉴定材料发生耗损，委托人不能补充提供的；')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    （七）委托人拒不履行司法鉴定委托书规定的义务、被鉴定人拒不配合或者鉴定活动受到严重干扰，致使鉴定无法继续进行的；')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    （八）委托人主动撤销鉴定委托，或者委托人、诉讼当事人拒绝支付鉴定费用的；')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    （九）因不可抗力致使鉴定无法继续进行的；')
                    ], AlignmentType.LEFT, { line: 400 }),
                    Draw.p([
                        Draw.fangsong('    （十）其他不符合法律、法规、规章规定，需要终止鉴定的情形。')
                    ], AlignmentType.LEFT, { line: 400 }),
                    new Paragraph({
                        children: [Draw.fangsong('被告知人（签名）：')],
                        alignment: AlignmentType.END,
                        spacing: { before: 400, after: 400 },
                        indent: { right: 1800 },
                    }),
                    Draw.p([
                        Draw.fangsong('年    月    日')
                    ], AlignmentType.RIGHT, { before: 400, after: 400 }),
                ]
            }
        ]
    });

    const chunk = await Packer.toBuffer(doc);

    const savePath = path.join(to, '5.司法鉴定告知书.docx');
    return await fs.promises.writeFile(savePath, chunk);
    // fs.writeFileSync(savePath, chunk);
    // electron.shell.openPath(savePath);
};