import { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/component/layout';
import Default from '@/view/default';

export const ViewRouter: FC<{}> = () => <Router>
    <Routes>
        <Route path="/" element={<Layout><Default /></Layout>} />
    </Routes>
</Router>;