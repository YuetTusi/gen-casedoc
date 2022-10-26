import fs from 'fs';
import path from 'path';
import electron from 'electron';
import { FC } from 'react';
import { Button, Input, Form, message } from 'antd';
import {
    Packer, Document, Paragraph, TextRun, Header, AlignmentType, UnderlineType,
    Table, TableCell, TableRow, WidthType
} from 'docx';
import { FormValue } from './prop';

const cwd = process.cwd();
const { shell } = electron;
const { Item, useForm } = Form;

const Default: FC<{}> = () => {

    const [formRef] = useForm<FormValue>();


    const writeDoc = async () => {

        const { validateFields } = formRef;
        try {
            const values = await validateFields();

            const doc = new Document({
                sections: [{
                    headers: {
                        default: new Header({
                            children: [new Paragraph(`档案编号：${values.docNo}`)]
                        })
                    },
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [new TextRun({
                                text: '司法鉴定委托书',
                                size: 36
                            })],
                            style: 'Microsoft YaHei'
                        }),
                        new Paragraph({

                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun({
                                    text: '编号：',
                                    font: '华文仿宋',
                                    size: 22
                                }),
                                new TextRun({
                                    text: values.docNo,
                                    size: 22,
                                    underline: { type: UnderlineType.SINGLE }
                                })
                            ]
                        }),
                        new Table({
                            width: { size: 9050, type: WidthType.DXA },
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    children: [
                                                        new TextRun({
                                                            text: '委托人',
                                                            font: '华文仿宋',
                                                            size: 22
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),

                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    children: [
                                                        new TextRun({
                                                            text: values.client,
                                                            font: '华文仿宋',
                                                            size: 22
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    children: [
                                                        new TextRun({
                                                            text: '联系人（电话）',
                                                            font: '华文仿宋',
                                                            size: 22
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    children: [
                                                        new TextRun({
                                                            text: values.tel,
                                                            font: '华文仿宋',
                                                            size: 22
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }],
            });

            Packer.toBuffer(doc).then(value => {
                fs.writeFileSync('./demo.docx', value);
                message.success('finish');
                console.log(path.join(cwd, './demo.docx'));
                shell.openPath(path.join(cwd, './demo.docx'));
            }).catch(err => console.log(err));
        } catch (error) {
            console.warn(error);
        }
    };

    return <div>

        <h2>委托书生成</h2>
        <div>
            <Button onClick={() => writeDoc()} type="primary">生成</Button>
        </div>
        <Form form={formRef} layout="vertical">
            <Item
                rules={[{ required: true, message: '档案编号' }]}
                label="档案编号"
                name="docNo">
                <Input />
            </Item>
            <Item
                rules={[{ required: true, message: '委托人' }]}
                label="委托人"
                name="client">
                <Input />
            </Item>
            <Item
                rules={[{ required: true, message: '联系人（电话）' }]}
                label="联系人（电话）"
                name="tel">
                <Input />
            </Item>
            <Item
                rules={[{ required: true, message: '联系地址' }]}
                label="联系地址"
                name="address">
                <Input />
            </Item>
            <Item
                rules={[{ required: true, message: '承办人' }]}
                label="承办人"
                name="founder">
                <Input />
            </Item>
        </Form>
    </div>;
};

export { Default };