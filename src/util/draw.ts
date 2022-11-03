import { Header, TextRun, Paragraph, ParagraphChild, AlignmentType, ISpacingProperties, TableCell, VerticalAlign, Table, WidthType } from 'docx';
import { ITableCellMarginOptions } from 'docx/build/file/table/table-properties/table-cell-margin';

/**
 * 画表格
 */
class Draw {
    /**
     * 段落
     * @param children 内容
     * @param align 对齐
     */
    static p(children: ParagraphChild[], align: AlignmentType = AlignmentType.LEFT, spacing?: ISpacingProperties) {
        return new Paragraph({
            children,
            alignment: align,
            spacing
        });
    }
    /**
     * 宋体字
     * @param value 值
     * @param size 大小
     * @param isBold 加粗
     */
    static song(value: string, size: number = 24, isBold: boolean = false) {
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
    static fangsong(value: string, size: number = 24, isBold: boolean = false) {
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
    /**
     * 页头
     */
    static header(children: ParagraphChild[] = []) {
        return new Header({
            children: [new Paragraph({
                children,
                alignment: AlignmentType.DISTRIBUTE,
                thematicBreak: true,
                contextualSpacing: true
            })]
        })
    }
    /**
     * 单元格
     */
    static cell(children: (Paragraph | Table)[], columnSpan?: number, margins?: ITableCellMarginOptions) {
        return new TableCell({
            children,
            verticalAlign: VerticalAlign.CENTER,
            columnSpan,
            margins: margins ?? { top: 100, left: 100, bottom: 100, right: 100 },
            width: {
                size: 0,
                type: WidthType.AUTO
            }
        });
    }
}



export { Draw };