import Notification from '@/components/Notification/Notifications';

import { RouterProvider } from 'react-router';
import router from '@router/routes.ts';

import { useEffect } from 'react';
import { useFirebase } from '@hooks/index';

function App() {
  const { onSetupAuthListener } = useFirebase();
  useEffect(() => {
    const unsubscribe = onSetupAuthListener();
    return () => unsubscribe();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Notification />
    </>
  );
}

export default App;
