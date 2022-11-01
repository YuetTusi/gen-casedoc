import { FC } from 'react';
import { PageBox } from './styled/box';
import { PageProp } from './props';

const Page: FC<PageProp> = ({ title, children }) => {

    return <PageBox>
        <div className="page-title">
            {title}
        </div>
        <div className="page-box">
            {children}
        </div>
    </PageBox>
};

export { Page };