import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './student.css';


const EditStudent = () => {
    const navigate = useNavigate(); // Hook for navigation
    const location = useLocation();
    const { state } = location;
    const { id1 } = state || {};
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [regNo, setRegNo] = useState('');
    const [branch, setBranch] = useState('');
    const [year, setYear] = useState('');
    const [mobile, setMobile] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    console.log(id1)
    console.log(id1[0])
    let id = id1[0];
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/students/edit', {
                id,
                name,
                email,
                regNo,
                branch,
                year,
                mobile,
            });
            setSuccessMessage('Student added successfully!');
            setName('');
            setEmail('');
            setRegNo('');
            setBranch('');
            setYear('');
            setMobile('');
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to add student. Please try again.');
        }
    };

    return (
        <div className="custom-form-container">
            <h2 className="custom-form-title">Edit Student</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="custom-form-group">
                    <label className="custom-label">Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="custom-input" />
                </div>
                <div className="custom-form-group">
                    <label className="custom-label">Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="custom-input" />
                </div>
                <div className="custom-form-group">
                    <label className="custom-label">Registration Number:</label>
                    <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} required className="custom-input" />
                </div>
                <div className="custom-form-group">
                    <label className="custom-label">Branch:</label>
                    <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} required className="custom-input" />
                </div>
                <div className="custom-form-group">
                    <label className="custom-label">Year:</label>
                    <input type="text" value={year} onChange={(e) => setYear(e.target.value)} required className="custom-input" />
                </div>
                <div className="custom-form-group">
                    <label className="custom-label">Mobile:</label>
                    <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required className="custom-input" />
                </div>
                <button type="submit" className="custom-button">Save Student</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default EditStudent;
