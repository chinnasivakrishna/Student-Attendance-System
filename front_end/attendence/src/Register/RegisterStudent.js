import React, { useState } from 'react';
import axios from 'axios';
import './registerStyles.css';


const RegisterStudent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/student/register', {
                name,
                email,
                password,
            });
            console.log(response.data);
            // Redirect or perform actions after successful registration
        } catch (error) {
            console.error(error);
            // Handle registration error
        }
    };

    return (
        <div>
            <h1>HIIII</h1>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterStudent;
