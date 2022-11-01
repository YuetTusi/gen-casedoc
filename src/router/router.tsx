import { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout, { Page } from '@/component/layout';
import Default from '@/view/default';
import Test from '@/view/test';

export const ViewRouter: FC<{}> = () => <Router>
    <Routes>
        <Route path="/" element={<Layout><Page title="test1"><Default /></Page></Layout>}>
            <Route path="/default" element={<Layout><Page title="test1"><Default /></Page></Layout>} />
        </Route>
        <Route
            path="/test"
            element={<Layout><Page title="test2"><Test /></Page></Layout>} />
        <Route
            path="*"
            element={<Layout><Page title="Not Found"><div>NotFound</div></Page></Layout>} />
    </Routes>
</Router>;