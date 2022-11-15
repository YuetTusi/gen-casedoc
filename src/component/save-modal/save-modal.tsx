import debounce from 'lodash/debounce';
import electron from 'electron';
import { FC, MouseEvent, useState, useEffect, useRef } from 'react';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import { Key } from 'antd/lib/table/interface';
import { Button, Input, Tree, Modal } from 'antd';
import { expChioce } from '@/type/exp-choice';
import { FooterBox } from './styled/box';
import { SaveModalProp } from './prop';

const { ipcRenderer } = electron;

const SaveModal: FC<SaveModalProp> = ({ open, onCancel, onSave }) => {

    const [saveTo, setSaveTo] = useState<string>('');
    const [checkedKeys, setCheckedKeys] = useState<string[]>([
        'ALL', 'ShowLiShenCha', 'ShowLiTongZhiShu', 'ChuBuJianChaQingKuangQueRen',
        'JianAnZhaiYaoAndAnJianYaoQiu', 'SiFaJianDingGaoZhiShu', 'JianDingShouFeiGaoZhiShu',
        'JianDingCaiLiaoJieShouDengJi', 'SiFaJianDingWeiTuoShu', 'SiFaJianDingYiJianLingQuTongZhi',
        'JianDingXiangGuanWuPinCaiLiaoJiaoJie', 'JianDingWenShuFuHeDan']);

    useEffect(() => {
        ipcRenderer
            .invoke('get-path', 'documents')
            .then((doc: string) => setSaveTo(doc));
    }, []);

    /**
     * 取消Click
     */
    const onCancelClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onCancel();
    };

    /**
     * 保存Click
     */
    const onSaveClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSave(checkedKeys, saveTo);
    };

    /**
     * 树节点Checked
     */
    const onTreeCheck = (checked: {
        checked: Key[];
        halfChecked: Key[];
    } | Key[]) => {

        setCheckedKeys(checked as string[]);
    }

    /**
     * 目录选择窗口
     */
    const onSelectDir = debounce(async () => {
        try {
            const { filePaths } = await ipcRenderer.invoke('show-open-dialog', {
                properties: ['openDirectory']
            });
            if (filePaths.length === 0) {
                return;
            }
            setSaveTo(filePaths[0]);
        } catch (error) {
            console.warn(error);
        }
    }, 500, { leading: true, trailing: false });

    return <Modal
        footer={[
            <FooterBox key="F_0">
                <div className="l">
                    <label>存储目录：</label>
                    <Input
                        onClick={() => onSelectDir()}
                        value={saveTo}
                        placeholder="请选择目录"
                        readOnly={true} />
                </div>
                <div className="r">
                    <Button
                        onClick={onCancelClick}
                        type="default"
                        key="B_0">
                        <CloseCircleOutlined />
                        <span>取消</span>
                    </Button>
                    <Button
                        onClick={onSaveClick}
                        type="primary"
                        key="B_1">
                        <CheckCircleOutlined />
                        <span>确定</span>
                    </Button>
                </div>
            </FooterBox>
        ]}
        onCancel={() => onCancel()}
        open={open}
        title="文档生成"
        centered={true}
        maskClosable={false}
        destroyOnClose={true}>
        <div>
            <Tree
                onCheck={onTreeCheck}
                checkedKeys={checkedKeys}
                treeData={expChioce}
                defaultExpandAll={true}
                checkable={true}
                showLine={true} />
        </div>
    </Modal>
};

SaveModal.defaultProps = {
    open: false,
    onCancel: () => { },
    onSave: () => { }
}

export { SaveModal };