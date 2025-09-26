import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Settings.css';

const SettingsSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function Settings({ user, setUser, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [toast, setToast] = useState(null);
  
  function showToast(message, type = "error", ms = 3000) {
    setToast({ message, type });
    setTimeout(() => setToast(null), ms);
  }
  

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await fetch(`http://localhost:5000/users/${user.id}`, { method: 'DELETE' });
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
        showToast('Account deleted successfully', 'success');
      } catch (error) {
        showToast('Error deleting account: ' + error.message);
      }
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.success) {
        const updatedUser = { ...user, ...values };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
        showToast('Profile updated successfully', 'success');
      } else {
        showToast(data.message || 'Failed to update profile', 'error');
      }
    } catch (error) {
      showToast('Error updating profile: ' + error.message, 'error');
    }
  };

  return (
    <div className="settings-modal">
      <button className= "settings-button" onClick={() => setIsEditing(!isEditing)}>Settings</button>
      {isEditing && (
        <div className="settings-content">
          <Formik
            initialValues={{ name: user.name, phone_number:user.phone_number, email: user.email, password: '' }}
            validationSchema={SettingsSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <Field name="name" placeholder="Name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
                <div>
                  <Field name="email" type="email" placeholder="Email" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div>
                  <Field name="phone_number" type="number" placeholder="Phone Number" />
                  <ErrorMessage name="phone_number" component="div" className="error" />
                </div>
                <div>
                  <Field name="password" type="password" placeholder="New Password" />
                  <ErrorMessage name="password" component="div" className="error" />
                </div>
                <button type="submit" disabled={isSubmitting} className='settingbtns'>Save Changes</button>
                <button onClick={handleDelete} className='settingbtns'>Delete Account</button>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type === "error" ? "error" : "success"}`}>
          {toast.message}
        </div>
      )}

    </div>
  );
}

export default Settings;
