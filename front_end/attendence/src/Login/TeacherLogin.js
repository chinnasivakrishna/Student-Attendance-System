import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './loginStyles.css';

const LoginTeacher = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/teacher/login', {
                email,
                password,
            });
            console.log('Login successful');
            console.log('User type:', response.data);
            console.log('User type:', response.data.name);
            console.log('User type:', response.data.subject);
            if(response.data.category === "admin"){
              navigate('/Dashboard/AdminDashboard', { state: { email, name: response.data.name, category: response.data.category } });
            }
            else{
              navigate('/Dashboard/TeacherDashboard', { state: { email, name: response.data.name, subject: response.data.subject } });
            }
            
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login Page</h2>
          <div className="navbar">
            <ul>
              <li><Link to="/" className="nav-link">Student</Link></li>
              <li><Link to="/login/teacher" className="nav-link">Teacher</Link></li>
            </ul>
          </div>
          
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
          <p>
            Don't have an account? <Link to="/register/RegisterAdmin" className="register-link">Register</Link>
          </p>
        </div>
      );
    };


export default LoginTeacher;

