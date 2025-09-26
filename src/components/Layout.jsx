import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';

function Layout({ user, setIsAuthenticated, setUser }) {
  return (
    <>
      <Header user={user} setIsAuthenticated={setIsAuthenticated} setUser={setUser}/>
      <div className="dashboard-container">
        <SideBar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;