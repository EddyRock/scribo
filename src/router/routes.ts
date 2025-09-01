import { createBrowserRouter, redirect } from 'react-router';

import Layout from '@/pages/Layout';
import HomePage from '@pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/folders'),
  },
  {
    path: '/folders/:folderId?',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
    ]
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/signup',
    Component: SignUpPage,
  },
]);

export default router;
