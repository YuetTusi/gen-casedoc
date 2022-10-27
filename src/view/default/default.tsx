import fs from 'fs';
import path from 'path';
import electron from 'electron';
import { FC, MouseEvent } from 'react';
import { Button, Input, Form, message, Col, Row } from 'antd';
import {
    Packer, Document, Paragraph, TextRun, Header, AlignmentType, UnderlineType,
    Table, TableCell, TableRow, WidthType
} from 'docx';
import { FormValue } from './prop';

const cwd = process.cwd();
const { shell, ipcRenderer } = electron;
const { Item, useForm } = Form;

const Default: FC<{}> = () => {

    const [formRef] = useForm<FormValue>();

    const onSelectPath = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const { filePaths } = await ipcRenderer.invoke('show-open-dialog', { properties: ['openDirectory'] });

        if (filePaths && filePaths.length > 0) {
            await writeDoc(filePaths[0]);
        }
    };

    const writeDoc = async (saveTo: string) => {

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
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    children: [
                                                        new TextRun({
                                                            text: '联系地址',
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
                                                            text: values.address,
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
                                                            text: '承办人',
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
                                                            text: values.founder,
                                                            font: '华文仿宋',
                                                            size: 22
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                new Paragraph({
                                                    children: [
                                                        new TextRun({
                                                            text: '司法鉴定机构',
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
                                                            text: values.org,
                                                            font: '华文仿宋',
                                                            size: 22
                                                        })
                                                    ]
                                                })
                                            ],
                                            columnSpan: 3
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }],
            });

            const chunk = await Packer.toBuffer(doc);

            const savePath = path.join(saveTo, '委托书测试.docx');
            fs.writeFileSync(savePath, chunk);
            message.success('生成成功');
            shell.openPath(savePath);
        } catch (error) {
            console.warn(error);
            message.warn('生成失败');
        }
    };

    return <>
        <h2>委托书生成</h2>
        <div>
            <Button onClick={onSelectPath} type="primary">生成</Button>
        </div>
        <div>
            <Form form={formRef} layout="horizontal">
                <Row gutter={12}>
                    <Col span={8}>
                        <Item
                            rules={[{ required: true, message: '档案编号' }]}
                            initialValue="GD20222376"
                            label="档案编号"
                            name="docNo">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item
                            rules={[{ required: true, message: '委托人' }]}
                            initialValue="北京市公安局朝阳分局六里屯派出所"
                            label="委托人"
                            name="client">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item
                            rules={[{ required: true, message: '联系人（电话）' }]}
                            initialValue="黄扬超13121968565"
                            label="联系人（电话）"
                            name="tel">
                            <Input />
                        </Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={8}>
                        <Item
                            rules={[{ required: true, message: '联系地址' }]}
                            initialValue="北京市朝阳区朝阳北路晨光家园小区218号楼西侧"
                            label="联系地址"
                            name="address">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item
                            rules={[{ required: true, message: '承办人' }]}
                            initialValue="黄扬超"
                            label="承办人"
                            name="founder">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item
                            rules={[{ required: true, message: '司法鉴定机构' }]}
                            initialValue="名    称：北京国盾信息中心司法鉴定所
                        地  址：北京市海淀区北三环中路31号泰思特大厦A座5层                            邮    编：100088
                        联 系 人：王怀立                      联系电话：15611390001"
                            label="司法鉴定机构"
                            name="org">
                            <Input />
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Form>
        </div>

    </>;
};

export { Default };