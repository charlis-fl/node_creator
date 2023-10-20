import React, { memo, Suspense } from 'react';
import { linkPath } from 'common/constants';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Loader from 'common/designSystem/loader';
import { SidebarRoute } from 'common/designSystem/SidebarRoute';
const HomePage = React.lazy(() => import('./homePage'));
const NodeEditor = React.lazy(() => import('./nodeEditor'));
const NoteTaker = React.lazy(() => import('./noteTaker'));

const WebRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Router basename="/node_creator">
        <Routes>
          <Route path={linkPath.homePage} element={<SidebarRoute component={HomePage} />} />
          <Route path={linkPath.nodeEditor} element={<SidebarRoute component={NodeEditor} />} />
          <Route path={linkPath.noteTaker} element={<SidebarRoute component={NoteTaker} />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default memo(WebRoutes);
