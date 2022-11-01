import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import FileWordOutlined from '@ant-design/icons/FileWordOutlined';
import { LayoutProp } from './props';
import { LayoutBox } from './styled/box';

/**
 * 布局页
 */
const Layout: FC<LayoutProp> = ({ children }) => {

    return <LayoutBox>
        <div className="menu">
            <div className="caption">
                <FileWordOutlined />
                <span>文档生成工具</span>
            </div>
            <ul>
                <li>
                    <NavLink to="/default">菜单项</NavLink>
                </li>
                <li>
                    <NavLink to="/test">菜单项</NavLink>
                </li>
                <li>
                    <NavLink to="/1">菜单项</NavLink>
                </li>
                <li>
                    <NavLink to="/2">菜单项</NavLink>
                </li>
                <li>
                    <NavLink to="/3">菜单项</NavLink>
                </li>
            </ul>
        </div>
        <div className="main">
            {children}
        </div>
    </LayoutBox>
};

export { Layout };