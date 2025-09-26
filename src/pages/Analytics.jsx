import { useState, useEffect } from 'react';
import { fetchUsers, fetchBooks, fetchClubs } from '../utils/api';
import './DashBoard.css';

function Analytics() {
  const [stats, setStats] = useState({ users: 0, books: 0, clubs: 0 });

  useEffect(() => {
    const loadStats = async () => {
      const usersData = await fetchUsers();
      const booksData = await fetchBooks();
      const clubsData = await fetchClubs();
      setStats({
        users: usersData.users?.length || 0,
        books: booksData.books?.length || 0,
        clubs: clubsData.clubs?.length || 0,
      });
    };
    loadStats();
  }, []);

  return (
    <div className="analytics-page">
      <h1>Analytics</h1>
      <div className="stats">
        <div>Users: {stats.users}</div>
        <div>Books: {stats.books}</div>
        <div>Clubs: {stats.clubs}</div>
      </div>
    </div>
  );
}

export default Analytics;