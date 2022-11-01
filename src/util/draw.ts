import { TextRun, Paragraph, ParagraphChild, AlignmentType } from 'docx';

/**
 * 写文本
 */
class DocText {
    /**
     * 段落
     * @param children 内容
     * @param align 对齐
     */
    static p(children: ParagraphChild[], align: AlignmentType = AlignmentType.LEFT) {
        return new Paragraph({
            children,
            alignment: align
        });
    }
    /**
     * 宋体字
     * @param value 值
     * @param size 大小
     * @param isBold 加粗
     */
    static song(value: string, size: number = 22, isBold: boolean = false) {
        return new TextRun({
            text: value,
            size,
            bold: isBold,
            font: '宋体'
        });
    }
    /**
     * 仿宋字
     * @param value 值
     * @param size 大小
     * @param isBold 加粗
     */
    static fangsong(value: string, size: number = 22, isBold: boolean = false) {
        return new TextRun({
            text: value,
            size,
            bold: isBold,
            font: '仿宋'
        });
    }
    /**
     * 黑体字
     * @param value 值
     * @param size 大小
     * @param isBold 加粗
     */
    static hei(value: string, size: number = 36, isBold: boolean = false) {
        return new TextRun({
            text: value,
            size,
            bold: isBold,
            font: '黑体'
        });
    }
}



export { DocText };