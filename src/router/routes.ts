import { createBrowserRouter, redirect } from 'react-router';
import { getAuth } from 'firebase/auth';
import app from '@/services/firebase/firebase-config';

import Layout from '@/pages/Layout';
import HomePage from '@pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';

async function isLoggedIn() {
  const auth = getAuth(app);

  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(!!user);
    });
  });
}

async function requireAuth() {
  const authenticated = await isLoggedIn();
  if (!authenticated) {
    return redirect('/login');
  }
  return null;
}

async function redirectIfAuth() {
  const authenticated = await isLoggedIn();
  if (authenticated) {
    return redirect('/folders');
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/folders'),
  },
  {
    path: '/folders/:folderId?',
    Component: Layout,
    loader: requireAuth,
    children: [
      { index: true, Component: HomePage },
    ]
  },
  {
    path: '/login',
    Component: LoginPage,
    loader: redirectIfAuth,
  },
  {
    path: '/signup',
    Component: SignUpPage,
    loader: redirectIfAuth,
  },
]);

export default router;
