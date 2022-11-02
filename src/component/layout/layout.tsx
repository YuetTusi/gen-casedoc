import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import FileWordOutlined from '@ant-design/icons/FileWordOutlined';
import { LayoutProp } from './props';
import { LayoutBox } from './styled/box';

/**
 * 布局页
 */
const Layout: FC<LayoutProp> = ({ children }) => <LayoutBox>
    <div className="menu">
        <div className="caption">
            <FileWordOutlined />
            <span>文档生成工具</span>
        </div>
        <ul>
            <li>
                <NavLink to="/default">文档生成</NavLink>
            </li>
            <li>
                <NavLink to="/gen-log">历史记录</NavLink>
            </li>
            <li>
                <NavLink to="/setting">设置</NavLink>
            </li>
        </ul>
    </div>
    <div className="main">
        {children}
    </div>
</LayoutBox>;

export { Layout };