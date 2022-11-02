import { FC, MouseEvent, useEffect } from 'react';
import SaveOutlined from '@ant-design/icons/SaveOutlined';
import { Button, Input, Form, message } from 'antd';
import { SettingDoc } from '@/type/doc';
import { FormBox } from './styled/box';
import { useStore } from '@/model';

const { useForm, Item } = Form;

const Setting: FC<{}> = () => {

    const [form] = useForm<SettingDoc>();

    const {
        settingData,
        querySettingData,
        saveSettingData
    } = useStore(selector => ({
        settingData: selector.settingData,
        querySettingData: selector.querySettingData,
        saveSettingData: selector.saveSettingData
    }));

    useEffect(() => {
        (async () => {
            try {
                await querySettingData();
            } catch (e) {
                console.warn(e);
            }
        })();
    }, []);

    /**
     * 保存Submit
     */
    const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        message.destroy();
        const { validateFields } = form;
        try {
            const values = await validateFields();
            const success = await saveSettingData(values);
            if (success) {
                message.success('保存成功');
            } else {
                message.warn('保存失败');
            }
        } catch (error) {
            console.warn(error);
            message.error(`保存失败（${error.info}）`);
        }
    };

    return <>
        <div className="search-bar">
            <Button onClick={onSubmit} type="primary">
                <SaveOutlined />
                <span>保存</span>
            </Button>
        </div>
        <FormBox>
            <Form form={form}>
                <Item
                    initialValue={settingData?.company}
                    rules={[
                        { required: true, message: '请填写公司名称' }
                    ]}
                    name="company"
                    label="公司名称">
                    <Input />
                </Item>
                <Item
                    initialValue={settingData?.fileNo}
                    rules={[
                        { required: true, message: '请填写档案编号' }
                    ]}
                    name="fileNo"
                    label="档案编号">
                    <Input />
                </Item>
                <Item
                    initialValue={settingData?.orgNo}
                    rules={[
                        { required: true, message: '请填写组织编号' }
                    ]}
                    name="orgNo"
                    label="组织编号">
                    <Input />
                </Item>
            </Form>
        </FormBox>
    </>
};

export { Setting };