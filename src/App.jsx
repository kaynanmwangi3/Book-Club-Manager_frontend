import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import Path from './pages/Path';
import Members from './pages/Members';
import Bookshelf from './pages/Bookshelf';
import Schedule from './pages/Schedule';
import Analytics from './pages/Analytics';
import Club from './components/Club';
import Settings from './components/Settings'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
        <Route path="/*" element={isAuthenticated ? <Layout user={user} setIsAuthenticated={setIsAuthenticated} setUser={setUser}/> : <Navigate to="/login" />}>
          <Route index element={<Path user={user} />} />
          <Route path="clubs" element={<Club user={user} setUser={setUser}/>} />
          <Route path="members" element={<Members />} />
          <Route path="bookshelf" element={<Bookshelf user={(user)} />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings user={user} setUser={setUser} setIsAuthenticated={setIsAuthenticated} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;