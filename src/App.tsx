import { RouterProvider } from 'react-router';
import router from '@router/routes.ts';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
