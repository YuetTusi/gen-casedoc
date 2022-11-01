import { FC, ReactNode } from 'react';
import { PanelProp } from './prop';
import { PanelBox } from './styled/box';

const Tip: FC<{ title: string | ReactNode }> = ({ title }) => {

    if (title) {
        return <div>{title}</div>
    } else {
        return null;
    }
};


const Panel: FC<PanelProp> = ({ title, children }) => {
    return <PanelBox>
        <Tip title={title} />
        <div>{children}</div>
    </PanelBox>
};

export { Panel };