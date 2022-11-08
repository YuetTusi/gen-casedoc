import moment from 'moment';
import electron from 'electron';
import debounce from 'lodash/debounce';
import { FC, MouseEvent, useEffect } from 'react';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import FileWordOutlined from '@ant-design/icons/FileWordOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { Button, DatePicker, Input, Form, message, Col, Row, Divider } from 'antd';
import { useStore } from '@/model';
import Panel from '@/component/panel';
import { DefaultProp } from './prop';
import { GenData } from '@/type/doc';
import { generate } from '@/util/docx/generate';
import { CaseWords } from '@/type/word';
import { helper } from '@/util/helper';

const { ipcRenderer } = electron;
const { Item, List, useForm } = Form;
const formLayout = {
    labelCol: { span: 10 },
    // wrapperCol: { span: 12 },
};

const Default: FC<DefaultProp> = () => {

    const {
        setting, setReading, querySettingData
    } = useStore(selector => ({
        setReading: selector.setReading,
        setting: selector.settingData,
        querySettingData: selector.querySettingData
    }));
    const [formRef] = useForm<GenData>();

    useEffect(() => { querySettingData() }, []);

    /**
     * 生成Click
     */
    const genClick = debounce(async (e: MouseEvent<HTMLButtonElement>) => {

        const { validateFields } = formRef;
        e.preventDefault();
        message.destroy();
        try {
            const values = await validateFields();
            const { filePaths } = await ipcRenderer.invoke('show-open-dialog', {
                properties: ['openDirectory']
            });
            if (filePaths.length === 0) {
                return;
            }

            setReading(true);
            await Promise.all([
                generate(CaseWords.ShowLiShenCha_1, values, setting!, filePaths[0]),
                generate(CaseWords.ShowLiTongZhiShu_2, values, setting!, filePaths[0]),
                generate(CaseWords.ChuBuJianChaQingKuangQueRen_3, values, setting!, filePaths[0]),
                generate(CaseWords.JianAnZhaiYaoAndAnJianYaoQiu_4, values, setting!, filePaths[0]),
                generate(CaseWords.SiFaJianDingGaoZhiShu_5, values, setting!, filePaths[0]),
                generate(CaseWords.JianDingShouFeiGaoZhiShu_6, values, setting!, filePaths[0]),
                generate(CaseWords.SiFaJianDingWeiTuoShu_7, values, setting!, filePaths[0]),
            ]);
            message.success('生成成功');
        } catch (error) {
            console.warn(error);
        } finally {
            setReading(false);
        }
    }, 500, { leading: true, trailing: false });

    return <>
        <div className="search-bar">
            <Button onClick={genClick} type="primary">
                <FileWordOutlined />
                <span>生成</span>
            </Button>
        </div>
        <div className="scroll-box">
            <Form form={formRef} layout="horizontal" {...formLayout}>
                <Row>
                    <Col span={6}>
                        <Item
                            rules={[{ required: true, message: '请输入案件名称' }]}
                            initialValue="杨风环等人利用邪教组织破坏法律实施案"
                            label="案件名称"
                            name="caseName">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item
                            rules={[{ required: true, message: '请输入案件编号' }]}
                            initialValue="2201060919481302"
                            label="案件编号"
                            name="caseNo">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item
                            initialValue={moment()}
                            label="接收时间"
                            name="receiveTime">
                            <DatePicker />
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item
                            initialValue={moment()}
                            label="检查时间"
                            name="checkTime">
                            <DatePicker />
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Item
                            initialValue="委托人"
                            label="委托人"
                            name="deleMan">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item
                            initialValue="委托单位"
                            label="委托单位"
                            name="deleUnit">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item
                            initialValue="委托经手人"
                            label="委托经手人"
                            name="deleHandMan">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item
                            initialValue="承办人"
                            label="承办人"
                            name="undertaker">
                            <Input />
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Item
                            initialValue="初查人"
                            label="初查人"
                            name="preMan">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item
                            initialValue="测试 13801111111"
                            label="联系人/电话"
                            name="userAndTel">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item
                            initialValue="13801111111"
                            label="联系电话"
                            name="tel">
                            <Input />
                        </Item>
                    </Col>
                    <Col span={6}>

                    </Col>
                </Row>
                <List name="evidences">
                    {(fields, { add, remove }) => {
                        return <>
                            <Row>
                                <Col span={24}>
                                    <Button type="primary" onClick={() => add()}>
                                        <PlusCircleOutlined />
                                        <span>检材（物证）</span>
                                    </Button>
                                </Col>
                            </Row>
                            {
                                fields.map(({ key, name, ...rest }) => {
                                    return <Panel
                                        title={<Divider orientation="left" style={{ marginTop: 0 }}>
                                            <Button onClick={() => remove(name)} type="default" danger={true}>
                                                <DeleteOutlined />
                                                <span>删除检材</span>
                                            </Button>
                                        </Divider>}
                                        key={`RK_${key}`}>
                                        <Row>
                                            <Col span={6}>
                                                <Item
                                                    initialValue={"演示（U盘）"}
                                                    rules={[{ required: true, message: '请输入物品名称' }]}
                                                    label="物品名称"
                                                    name={[name, 'eviName']}
                                                    {...rest}>
                                                    <Input />
                                                </Item>
                                            </Col>
                                            <Col span={6}>
                                                <Item
                                                    initialValue="1个"
                                                    label="数量"
                                                    name={[name, 'eviCount']}
                                                    {...rest}>
                                                    <Input />
                                                </Item>
                                            </Col>
                                            <Col span={6}>
                                                <Item
                                                    initialValue="内部保存敏感文件"
                                                    label="特征描述"
                                                    name={[name, 'eviDesc']}
                                                    {...rest}>
                                                    <Input />
                                                </Item>
                                            </Col>
                                            <Col span={6}>
                                                <Item label="存储容量" name={[name, 'eviCapacity']} {...rest}>
                                                    <Input />
                                                </Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={6}>
                                                <Item label="总计存储" name={[name, 'eviTotal']} {...rest}>
                                                    <Input />
                                                </Item>
                                            </Col>
                                            <Col span={6}>
                                                <Item label="种类" name={[name, 'eviCategory']} {...rest}>
                                                    <Input />
                                                </Item>
                                            </Col>
                                            <Col span={6}>
                                                <Item label="性状" name={[name, 'eviChar']} {...rest}>
                                                    <Input />
                                                </Item>
                                            </Col>
                                            <Col span={6}>
                                                <Item label="保存状态" name={[name, 'eviState']} {...rest}>
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
                <List name="costItems">
                    {(fields, { add, remove }) => {
                        return <>
                            <Row style={{ marginTop: '5px' }}>
                                <Col span={24}>
                                    <Button type="primary" onClick={() => add()}>
                                        <PlusCircleOutlined />
                                        <span>收费项目</span>
                                    </Button>
                                </Col>
                            </Row>
                            {
                                fields.map(({ key, name, ...rest }) => {
                                    return <Panel
                                        title={<Divider orientation="left" style={{ marginTop: 0 }}>
                                            <Button onClick={() => remove(name)} type="default" danger={true}>
                                                <DeleteOutlined />
                                                <span>删除收费项目</span>
                                            </Button>
                                        </Divider>}
                                        key={`CK_${key}`}>
                                        <Row>
                                            <Col span={6}>
                                                <Item label="项目名称" name={[name, 'costName']} {...rest}>
                                                    <Input />
                                                </Item>
                                            </Col>
                                            <Col span={6}>
                                                <Item label="费用" name={[name, 'price']} {...rest}>
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
                    <Col span={6}>

                    </Col>
                    <Col span={6}></Col>
                    <Col span={6}></Col>
                    <Col span={6}></Col>
                </Row>
                <Row>
                    <Col span={6}>
                    </Col>
                    <Col span={6}></Col>
                    <Col span={6}></Col>
                    <Col span={6}></Col>
                </Row>
            </Form>
        </div>

    </>;
};

export { Default };