
import { FC, useEffect, useState } from 'react';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { Button, Form, Input, Table, Modal, message } from 'antd';
import { useStore } from '@/model';
import { GenData } from '@/type/doc';
import { getColumns } from './column';

const { Item, useForm } = Form;

const GenLog: FC<{}> = () => {

    const [formRef] = useForm<{ caseName: string }>();
    const [pageIndex, setPageIndex] = useState<number>(1);

    const {
        historyLoading,
        historyData,
        historyTotal,
        queryHistory,
        clearHistory
    } = useStore(selector => ({
        historyLoading: selector.historyLoading,
        historyData: selector.historyData,
        historyTotal: selector.historyTotal,
        queryHistory: selector.queryHistory,
        saveHistory: selector.saveHistory,
        clearHistory: selector.clearHistory
    }));

    useEffect(() => {
        (async () => {
            await queryHistory({ pageIndex: 1, pageSize: 10 });
        })();
    }, []);

    const onPageChange = async (pageIndex: number) => {
        setPageIndex(pageIndex);
        await queryHistory({ pageIndex, pageSize: 10 });
    };

    const onSearchSubmit = async () => {
        const { getFieldsValue } = formRef;
        const { caseName } = getFieldsValue();
        try {
            await queryHistory({
                caseName,
                pageIndex: 1,
                pageSize: 10
            });
        } catch (error) {
            message.warn(`查询失败（${error.message}）`);
        }
    };

    const onClearClick = () => {
        Modal.confirm({
            async onOk() {
                await clearHistory();
            },
            title: '清空历史记录',
            content: '历史记录将清空且不可恢复，确认吗？',
            okText: '是',
            cancelText: '否',
            centered: true
        });
    }

    return <>

        <div className="search-bar">
            <Form form={formRef} layout="inline">
                <Item name="caseName" label="案件名称">
                    <Input />
                </Item>
                <Item>
                    <Button
                        onClick={onSearchSubmit}
                        type="primary">
                        <SearchOutlined />
                        <span>查询</span>
                    </Button>
                </Item>
                <Item>
                    <Button
                        onClick={onClearClick}
                        type="primary"
                        danger={true}>
                        <DeleteOutlined />
                        <span>清空</span>
                    </Button>
                </Item>
            </Form>
        </div>
        <div className="scroll-box">
            <Table<GenData>
                columns={getColumns()}
                dataSource={historyData}
                bordered={true}
                rowKey="_id"
                loading={historyLoading}
                pagination={{
                    current: pageIndex,
                    pageSize: 10,
                    total: historyTotal,
                    onChange: onPageChange
                }}
            />
        </div>
    </>
};

export { GenLog };