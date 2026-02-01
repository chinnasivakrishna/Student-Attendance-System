import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './loginStyles.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        
            if(email === "admin@gmail.com" && password ==="admin"){
                console.log('Login successful');
                navigate('/register/teacher');
            }
            
         else{
            setErrorMessage('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
          <div className="navbar">
            <ul>
              <li><Link to="/" className="nav-link">Student</Link></li>
              <li><Link to="/login/teacher" className="nav-link">Teacher</Link></li>
              <li><Link to="/login/AdminLogin" className="nav-link">Admin</Link></li>
            </ul>
          </div>
            <h2>Admin Login</h2>
          
          
          <form>
            <div>
              <label className="input-label">E-Mail:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>
            <button type="button" onClick={handleLogin} className="login-button">
              Login
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          
        </div>
      );
    };


export default AdminLogin;

