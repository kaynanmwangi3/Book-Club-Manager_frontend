import { useState, useEffect } from 'react';
import { fetchUsers } from '../utils/api';
import './DashBoard.css';

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const loadMembers = async () => {
      const data = await fetchUsers();
      setMembers(data.users || []);
    };
    loadMembers();
  }, []);

  return (
    <div className="members-page">
      <h1>Members</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Join Date</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phone_number}</td>
              <td>{member.join_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Members;