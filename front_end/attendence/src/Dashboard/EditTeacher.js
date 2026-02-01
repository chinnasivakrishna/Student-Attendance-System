import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './registerStyles.css';

const EditTeacher = () => {
    const navigate = useNavigate(); // Hook for navigation
    const location = useLocation();
    const { state } = location;
    const { id1 } = state || {};
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [subject, setSubject] = useState('');
    let id =id1;
    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/teacher/register', {
                id,
                name,
                email,
                password,
                mobileNumber,
                subject,
            });
            console.log(response.data);
            navigate('/login/teacher');
            // Redirect or perform actions after successful registration
        } catch (error) {
            console.error(error);
            // Handle registration error
        }
    };

    return (
        <div className="registration-form">
            <h2>Teacher Registration</h2>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="subject">subject:</label>
            <input type="text" id="subject" placeholder="Enter your subject" value={subject} onChange={(e) => setSubject(e.target.value)} />

            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input type="tel" id="mobileNumber" placeholder="Enter your mobile number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleRegister}>Register</button>
            
        </div>
    );
};

export default EditTeacher;
