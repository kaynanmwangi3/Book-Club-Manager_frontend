import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import 'boxicons/css/boxicons.min.css';
import { useState } from 'react';

function Header({ user, setIsAuthenticated, setUser }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    navigate(`/bookshelf?search=${encodeURIComponent(term)}`)}

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <header className="header">
      <div className="logo">
        <i className="bx bx-book"></i> BOOKCLUB
      </div>
      <nav className="tabs">
        <Link to="/clubs">Clubs</Link>
        <Link to="/members">Members</Link>
        <Link to="/bookshelf">Bookshelf</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/analytics">Analytics</Link>
      </nav>
      <input 
      type="search" 
      placeholder="Search  Book name or Genre" 
      className="search-bar" 
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)} />
      <i className="bx bx-bell notification"></i>
      <div className="profile">
        <i className="bx bxs-user"></i>
        <span>{user?.name || 'User'}</span>
        <button className="settings-btn" onClick={() => navigate('/settings')}>
          <i className="bx bxs-cog"></i>
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="bx bx-log-out"></i> Logout
        </button>
      </div>
    </header>
  );
}

export default Header;