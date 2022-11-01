import fs from 'fs';
import path from 'path';
import electron from 'electron';
import { FC } from 'react';
import FileWordOutlined from '@ant-design/icons/FileWordOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { Button, Input, Form, message, Col, Row, Divider } from 'antd';
import {
    Packer, Document, Paragraph, TextRun, Header, AlignmentType, UnderlineType,
    Table, TableCell, TableRow, WidthType
} from 'docx';
import { useStore } from '@/model';
import { DocText } from '@/util/draw';
import Panel from '@/component/panel';
import { Evidence, FormValue } from './prop';

const { shell, ipcRenderer } = electron;
const { Item, List, useForm } = Form;

const Default: FC<{}> = () => {

    const { setReading } = useStore(selector => ({
        setReading: selector.setReading
    }));
    const [formRef] = useForm<FormValue>();

    const writeDoc = async () => {

        const { validateFields } = formRef;
        try {
            const values = await validateFields();

            const { filePaths } = await ipcRenderer.invoke('show-open-dialog', { properties: ['openDirectory'] });

            if (filePaths.length === 0) {
                return;
            }
            setReading(true);
            // const eviRow = new TableRow({
            //     children: [
            //         new TableCell({
            //             children: [
            //                 DocText.fangsong('委托物品初检情况')
            //             ],
            //             rowSpan: values.evidences.length * 3
            //         }),
            //         ...[
            //         ]
            //     ],
            // });

            const doc = new Document({
                sections: [{
                    headers: {
                        default: new Header({
                            children: [new Paragraph(`档案编号：${values.docNo}`)]
                        })
                    },
                    children: [
                        DocText.p([
                            DocText.hei('北京国盾信息中心司法鉴定所委托鉴定物品初步检查情况确认表')
                        ], AlignmentType.CENTER),
                        DocText.p([
                            DocText.fangsong(`档案编号：${values.docNo}`)
                        ], AlignmentType.RIGHT),
                        new Table({
                            width: { size: 9050, type: WidthType.DXA },
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                DocText.p([
                                                    DocText.fangsong('检查时间')
                                                ])
                                            ],
                                            columnSpan: 2
                                        }),
                                        new TableCell({
                                            children: [
                                                DocText.p([
                                                    DocText.fangsong(values.checkTime)
                                                ])
                                            ],
                                            columnSpan: 5
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                DocText.p([
                                                    DocText.fangsong('委托单位')
                                                ])
                                            ],
                                            columnSpan: 2
                                        }),
                                        new TableCell({
                                            children: [
                                                DocText.p([
                                                    DocText.fangsong(values.client)
                                                ])
                                            ],
                                            columnSpan: 5
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                DocText.p([
                                                    DocText.fangsong('案件名称')
                                                ])
                                            ],
                                            columnSpan: 2
                                        }),
                                        new TableCell({
                                            children: [
                                                DocText.p([
                                                    DocText.fangsong(values.caseName)
                                                ])
                                            ],
                                            columnSpan: 5
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                DocText.p([
                                                    DocText.fangsong('其它须说明的情况')
                                                ])
                                            ],
                                            columnSpan: 2
                                        }),
                                        new TableCell({
                                            children: [
                                                DocText.p([
                                                    DocText.fangsong(values.others)
                                                ])
                                            ],
                                            columnSpan: 5
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [
                                                DocText.p([
                                                    DocText.fangsong('初查人签名')
                                                ])
                                            ],
                                            columnSpan: 2
                                        }),
                                        new TableCell({
                                            children: [
                                                DocText.p([
                                                    DocText.fangsong(values.sign1)
                                                ])
                                            ],
                                            columnSpan: 2
                                        }),
                                        new TableCell({
                                            children: [
                                                DocText.p([
                                                    DocText.fangsong('委托经手人签名')
                                                ])
                                            ],
                                            columnSpan: 2
                                        }),
                                        new TableCell({
                                            children: [
                                                DocText.p([
                                                    DocText.fangsong(values.sign2)
                                                ])
                                            ]
                                        })
                                    ]
                                }),
                                // new TableRow({
                                //     children: [
                                //         new TableCell({
                                //             children: [
                                //                 DocText.p([DocText.fangsong('委托物品初检情况')])
                                //             ],
                                //             rowSpan: values.evidences.length * 3
                                //         }),
                                //         new TableCell({
                                //             children: [
                                //                 DocText.p([DocText.fangsong('1')])
                                //             ],
                                //             rowSpan: 3
                                //         })
                                //     ],
                                // }),
                                // new TableRow({
                                //     children: [
                                //         new TableCell({ children: [DocText.p([DocText.fangsong('1')])], rowSpan: 2 }),
                                //         new TableCell({ children: [DocText.p([DocText.fangsong('2')])] }),
                                //         new TableCell({ children: [DocText.p([DocText.fangsong('3')])] }),
                                //         new TableCell({ children: [DocText.p([DocText.fangsong('4')])] }),
                                //         new TableCell({ children: [DocText.p([DocText.fangsong('5')])] }),
                                //         new TableCell({ children: [DocText.p([DocText.fangsong('6')])] }),
                                //         new TableCell({ children: [DocText.p([DocText.fangsong('7')])] })
                                //     ],
                                // }),
                                // new TableRow({
                                //     children: [
                                //         // new TableCell({ children: [DocText.p([DocText.fangsong('1')])] }),
                                //         new TableCell({ children: [DocText.p([DocText.fangsong('2')])] }),
                                //         new TableCell({ children: [DocText.p([DocText.fangsong('3')])] }),
                                //         new TableCell({ children: [DocText.p([DocText.fangsong('4')])] }),
                                //         new TableCell({ children: [DocText.p([DocText.fangsong('5')])] }),
                                //         new TableCell({ children: [DocText.p([DocText.fangsong('6')])] }),
                                //         new TableCell({ children: [DocText.p([DocText.fangsong('7')])] })
                                //     ],
                                // })
                            ]
                        })
                    ]
                }],
            });

            const chunk = await Packer.toBuffer(doc);

            const savePath = path.join(filePaths[0], '委托书测试.docx');
            fs.writeFileSync(savePath, chunk);
            message.success('生成成功');
            shell.openPath(savePath);
        } catch (error) {
            console.warn(error);
        } finally {
            setReading(false);
        }
    };

    return <>
        <div className="search-bar">
            <Button onClick={() => writeDoc()} type="primary">
                <FileWordOutlined />
                <span>生成</span>
            </Button>
        </div>
        <div className="scroll-box">
            <Form form={formRef} layout="horizontal">
                <Panel>
                    <Row>
                        <Col span={8}>
                            <Item
                                rules={[{ required: true, message: '档案编号' }]}
                                initialValue="GD20222376"
                                label="档案编号"
                                name="docNo">
                                <Input />
                            </Item>
                        </Col>
                    </Row>
                </Panel>
                <Row>
                    <Col span={8}>
                        <Item
                            rules={[{ required: true, message: '检查时间' }]}
                            initialValue="2022年9月30日"
                            label="检查时间"
                            name="checkTime">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item
                            rules={[{ required: true, message: '委托单位' }]}
                            initialValue="北京市公安局朝阳分局六里屯派出所"
                            label="委托单位"
                            name="client">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item
                            rules={[{ required: true, message: '案件名称' }]}
                            initialValue="杨风环等人利用邪教组织破坏法律实施案"
                            label="案件名称"
                            name="caseName">
                            <Input />
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Item
                            rules={[{ required: true, message: '其它须说明的情况' }]}
                            initialValue="test"
                            label="其它须说明的情况"
                            name="others">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item
                            rules={[{ required: true, message: '初查人签名' }]}
                            initialValue="test"
                            label="初查人签名"
                            name="sign1">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item
                            rules={[{ required: true, message: '委托经手人签名' }]}
                            initialValue="test"
                            label="委托经手人签名"
                            name="sign2">
                            <Input />
                        </Item>
                    </Col>
                </Row>
                <List name="evidences">
                    {(fields, { add, remove }) => {
                        return <>
                            <Row>
                                <Col span={24}>
                                    <Button type="default" onClick={() => add()}>添加物品</Button>
                                </Col>
                            </Row>
                            {
                                fields.map(({ key, name, ...rest }) => {
                                    return <Panel
                                        title={<Divider orientation="left">
                                            <Button onClick={() => remove(name)} type="default">
                                                <DeleteOutlined />
                                            </Button>
                                        </Divider>}
                                        key={`RK_${key}`}>
                                        <Row>
                                            <Col span={8}>
                                                <Item label="物品名称" name={[name, 'eviName']} {...rest}>
                                                    <Input />
                                                </Item>
                                            </Col>
                                            <Col span={8}>
                                                <Item label="数量" name={[name, 'eviCount']} {...rest}>
                                                    <Input />
                                                </Item>
                                            </Col>
                                            <Col span={8}>
                                                <Item label="特征描述" name={[name, 'eviDesc']} {...rest}>
                                                    <Input />
                                                </Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>
                                                <Item label="存储容量" name={[name, 'eviCapacity']} {...rest}>
                                                    <Input />
                                                </Item>
                                            </Col>
                                            <Col span={8}>
                                                <Item label="总计" name={[name, 'eviTotal']} {...rest}>
                                                    <Input />
                                                </Item>
                                            </Col>
                                        </Row>
                                    </Panel>
                                })
                            }
                        </>
                    }}
                </List>

                <Row>
                    <Col span={8}>

                    </Col>
                    <Col span={8}></Col>
                    <Col span={8}></Col>
                </Row>
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={8}></Col>
                    <Col span={8}></Col>
                </Row>
            </Form>
        </div>

    </>;
};

export { Default };