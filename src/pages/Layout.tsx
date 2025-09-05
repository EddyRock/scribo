import { Outlet } from 'react-router';
import LeftMenu from '@/components/LeftMenu';
import Header from '@/components/Header/Header';

function Layout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <LeftMenu />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
