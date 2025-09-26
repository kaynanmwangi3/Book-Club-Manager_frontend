import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import 'boxicons/css/boxicons.min.css';

function LoginPage({ setIsAuthenticated, setUser }) {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const navigate = useNavigate();

  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [toast, setToast] = useState(null);

  function showToast(message, type = "error", ms = 3000) {
    setToast({ message, type });
    setTimeout(() => setToast(null), ms);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(' https://book-club-manager-backend.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: loginName, password: loginPassword }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('username', data.user.name);
        localStorage.setItem('userId', data.user.id);
        setUser(data.user);
        setIsAuthenticated(true);
        navigate('/');
      } else {
      showToast(data.message || "either username or password is wrong");
      }
    } catch (error) {
    showToast("Login failed: " + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(' https://book-club-manager-backend.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regName, email: regEmail, phone_number: regPhone, password: regPassword }),
      });
      const data = await response.json();
      if (response.status === 201) {
        showToast("Registered successfully. You can login now.", "success");
        setIsRegisterActive(false);
      } else {
        showToast(data.message || "Registration failed");
      }
    } catch (error) {
    showToast("Registration failed: " + error.message);
    }
  };

  return (
    <>
      <div className={`container ${isRegisterActive ? "active" : ""}`}>
        {/* Login Form */}
        <div className="form-box login">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="input-box">
              <input value={loginName} onChange={e => setLoginName(e.target.value)} type="text" placeholder="Username" required />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input value={loginPassword} onChange={e => setLoginPassword(e.target.value)} type="password" placeholder="Password" required />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="forgot-link">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="btn">Login</button>
            <p>or login with social platforms</p>
            <div className="social-icons">
              <a href="#"><i className="bx bxl-google"></i></a>
              <a href="#"><i className="bx bxl-facebook"></i></a>
              <a href="#"><i className="bx bxl-github"></i></a>
              <a href="#"><i className="bx bxl-linkedin"></i></a>
            </div>
          </form>
        </div>

        {/* Register Form */}
        <div className="form-box register">
          <form onSubmit={handleRegister}>
            <h1>Registration</h1>
            <div className="input-box">
              <input value={regName} onChange={e => setRegName(e.target.value)} type="text" placeholder="Username" required />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input value={regEmail} onChange={e => setRegEmail(e.target.value)} type="email" placeholder="Email" required />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box">
              <input value={regPhone} onChange={e => setRegPhone(e.target.value)} type="tel" placeholder="Phone Number" required />
              <i className="bx bxs-phone"></i>
            </div>
            <div className="input-box">
              <input value={regPassword} onChange={e => setRegPassword(e.target.value)} type="password" placeholder="Password" required />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn">Register</button>
            <p>or register with social platforms</p>
            <div className="social-icons">
              <a href="#"><i className="bx bxl-google"></i></a>
              <a href="#"><i className="bx bxl-facebook"></i></a>
              <a href="#"><i className="bx bxl-github"></i></a>
              <a href="#"><i className="bx bxl-linkedin"></i></a>
            </div>
          </form>
        </div>

        {/* Toggle Panels */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={() => setIsRegisterActive(true)}>Register</button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={() => setIsRegisterActive(false)}>Login</button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type === "error" ? "error" : "success"}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}
export default LoginPage;
