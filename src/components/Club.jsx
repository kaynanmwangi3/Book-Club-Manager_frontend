import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Club.css';
import { fetchClubs, addClub, deleteClub } from '../utils/api';

const ClubSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  meeting_date: Yup.string().required('Meeting date is required').matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'Invalid date format. Use YYYY-MM-DD HH:MM:SS'),
});

function Club({ user , setUser}) {
  const [clubs, setClubs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(user || null);

  const [toast, setToast] = useState(null);

  function showToast(message, type = "error", ms = 3000) {
    setToast({ message, type });
    setTimeout(() => setToast(null), ms);
  }

  useEffect(() => {
    const loadClubs = async () => {
      const data = await fetchClubs();
      setClubs(data.clubs || []);
    };
    loadClubs();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      if (user && !user.club_id) {
        const data = await fetchUser(user.id);
        if (data.success) {
          setCurrentUser(data.user);
          setUser(data.user);
        }
      }
    };
    loadUser()
  }, [user])

  const handleEnroll = async (clubId) => {
    if (!user?.id) {
      showToast('Please log in to enroll in a club.', 'error');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/clubs/clubmember/${clubId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUser.id }),
      });
      const data = await response.json();
      if (data.success) {
        const updatedUser = { ...currentUser, club_id: clubId };
        setCurrentUser(updatedUser);
        setUser(updatedUser); // Sync with parent state
        showToast(data.message, "success");
      } else {
        showToast(data.message || 'Enrollment failed');
      }
    } catch (error) {
      showToast('Error enrolling in club: ' + error.message, 'error');
    }
  };

  const handleAddClub = async (values, { resetForm }) => {
    try {
      const response = await addClub(values);
      if (response.success) {
        setClubs([...clubs, response.club]);
        showToast(response.message, "success");
        resetForm();
        setShowForm(false);
      } else {
        showToast(response.message || 'Failed to add club');
      }
    } catch (error) {
      showToast('Error adding club: ' + error.message, 'error');
    }
  };

  const handleDelete = async (clubId) => {
    if (user.club_id !== clubId) {
      showToast('You cannot delete this club as you are not a member.', 'error');
      return;
    }

    if (window.confirm('Are you sure you want to delete this club?')) {
      try {
        const response = await deleteClub(clubId);
        if (response.success) {
            const updatedUser = { ...currentUser, club_id: null };
          setCurrentUser(updatedUser);
          setUser(updatedUser); // Sync with parent state
          setClubs(clubs.filter(club => club.id !== clubId));
          showToast(response.message, "success");
        } else {
          showToast(response.message || 'Failed to delete club');
        }
      } catch (error) {
        showToast('Error deleting club: ' + error.message, 'error');
      }
    }
  };

  return (
    <div className="clubs-page">
      <h1>Clubs</h1>
      <button onClick={() => setShowForm(true)} className='addclubbtnbtn'>Add Club</button>
      {showForm && (
        <Formik
          initialValues={{ name: '', description: '', meeting_date: '' }}
          validationSchema={ClubSchema}
          onSubmit={handleAddClub}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field name="name" placeholder="Name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div>
                <Field name="description" placeholder="Description" />
                <ErrorMessage name="description" component="div" className="error" />
              </div>
              <div>
                <Field name="meeting_date" placeholder="Meeting Date (YYYY-MM-DD HH:MM:SS)" />
                <ErrorMessage name="meeting_date" component="div" className="error" />
              </div>
              <button type="submit" disabled={isSubmitting} className='addclubbtns'>Add Club</button>
              <button type="button" onClick={() => setShowForm(false)} className='addclubbtns'>Cancel</button>
            </Form>
          )}
        </Formik>
      )}
      <div className="clubs-list">
        {clubs.map(club => (
          <div key={club.id} className="club-card">
            <h3>{club.name}</h3>
            <p>{club.description}</p>
            <p>Meeting: {club.meeting_date}</p>
            <button
              onClick={() => handleEnroll(club.id)}
              disabled={user?.club_id === club.id}
              className='clubbtn'
            >
              Enroll to Club
            </button>
            <button
              onClick={() => handleDelete(club.id)}
              className='clubbtn'
            >
              Delete Club
            </button>
          </div>
        ))}
      </div>
      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type === "error" ? "error" : "success"}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default Club;