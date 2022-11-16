import moment from 'moment';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import { TableColumnType, Button } from 'antd';
import { GenData } from '@/type/doc';

const getColumns = (): TableColumnType<GenData>[] => {
    return [
        {
            key: 'caseName',
            dataIndex: 'caseName',
            title: '案件名称'
        },
        {
            key: 'caseNo',
            dataIndex: 'caseNo',
            title: '案件编号'
        },
        {
            key: 'deleMan',
            dataIndex: 'deleMan',
            title: '委托人'
        },
        {
            key: 'createdTime',
            dataIndex: 'createdTime',
            title: '生成时间',
            align: 'center',
            width: 150,
            render(value: number) {
                return <span>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</span>;
            }
        },
        {
            key: 'cpy',
            dataIndex: 'cpy',
            title: '',
            align: 'center',
            width: 60,
            render(value: number, record) {
                return <Button
                    onClick={() => console.log(record)}
                    type="default"
                    size="small">
                    <CopyOutlined />
                </Button>
            }
        }
    ];
}

export { getColumns };