import { FC } from 'react';
import { LayoutProp } from './props';

/**
 * 布局页
 */
const Layout: FC<LayoutProp> = ({ children }) => {

    return <div>{children}</div>
};

export { Layout };