import { Outlet } from 'react-router';
import LeftMenu from '@/components/LeftMenu';

function Layout() {
  return (
    <div className="flex">
      <LeftMenu />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
