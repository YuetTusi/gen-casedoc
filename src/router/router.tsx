import { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout, { Page } from '@/component/layout';
import Default from '@/view/default';
import GenLog from '@/view/gen-log';
import Setting from '@/view/setting';

export const ViewRouter: FC<{}> = () => <Router>
    <Routes>
        <Route path="/" element={<Layout><Page title="文档生成"><Default /></Page></Layout>}>
            <Route path="/default" element={<Layout><Page title="文档生成"><Default /></Page></Layout>} />
        </Route>
        <Route path="/setting" element={<Layout><Page title="设置"><Setting /></Page></Layout>} />
        <Route
            path="/gen-log"
            element={<Layout><Page title="历史记录"><GenLog /></Page></Layout>} />
        <Route
            path="*"
            element={<Layout><Page title="Not Found"><div>NotFound</div></Page></Layout>} />
    </Routes>
</Router>;