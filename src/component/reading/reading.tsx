import styled from 'styled-components';
import { FC } from 'react';
import { Spin } from 'antd';
import { useStore } from '@/model';

const ReadingBox = styled.div`

    display: none;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom: 0;
    background-color: rgba(40,40,40,0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color:#06acb3;

    &>.r-info{
        margin-top: 1rem;
    }
`;

const Reading: FC<{}> = () => {

    const { reading } = useStore(selector => ({
        reading: selector.reading
    }));

    return <ReadingBox style={{ display: reading ? 'flex' : 'none' }}>
        <Spin size="default" />
        <div className="r-info">请稍等...</div>
    </ReadingBox>
};

export { Reading };