import { useState, useEffect } from 'react';
import { fetchClubs } from '../utils/api';
import './DashBoard.css';

function Schedule() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const loadSchedule = async () => {
      const data = await fetchClubs();
      setClubs(data.clubs || []);
    };
    loadSchedule();
  }, []);

  return (
    <div className="schedule-page">
      <h1>Schedule</h1>
      <ul>
        {clubs.map(club => (
          <li key={club.id} className='club-item'>
            <h3>{club.name}</h3>
            <p>Meeting: {club.meeting_date}</p>
            <p>{club.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Schedule;