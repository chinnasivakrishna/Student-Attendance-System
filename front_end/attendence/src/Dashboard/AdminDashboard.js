import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './formStyles.css'; // Import your dashboard styles
const AdminDashboard = () => {
    const navigate = useNavigate(); // Hook for navigation
    const location = useLocation();
    const { state } = location;
    const { email, name, subject } = state || {};
    console.log(email);
    console.log(name);
    console.log(subject);
    console.log('State in TeacherDashboard:', { email, name, subject });
    
    const handleViewTeachers = () => {
        navigate('/Dashboard/ViewTeachers', { state: { email, name, subject } });
    };

    const handleAddStudent = () => {
        navigate('/Dashboard/AddStudent', { state: { email, name, subject } });
    };

    const handleAddAdmin = () => {
        navigate('/register/RegisterAdmin', { state: { email, name, subject } });
    };

    const handleViewStudents = () => {
        navigate('/Dashboard/ViewStudents', { state: { email, name, subject } });
    };

    const handleAddTeachers = () => {
        navigate('/register/teacher', { state: { email, name, subject } });
    };

    return (
        <div className="teacher-dashboard-container">
            <h2>Dashboard</h2>
            <div className="teacher-card-container">
                <div className="teacher-dashboard-card" onClick={handleAddAdmin}>
                    <h3>Add Admin</h3>
                    <p>Add new admins to the system.</p>
                </div>
                <div className="teacher-dashboard-card" onClick={handleAddTeachers}>
                    <h3>Add Teachers</h3>
                    <p>Add new teachers to the system.</p>
                </div>
                
                <div className="teacher-dashboard-card" onClick={handleAddStudent}>
                    <h3>Add Students</h3>
                    <p>Click here to add new students.</p>
                </div>
                
                <div className="teacher-dashboard-card" onClick={handleViewTeachers}>
                    <h3>View Teachers</h3>
                    <p>Check the teachers in the college.</p>
                </div>
                {/* Card 4: Edit Classes */}
                <div className="teacher-dashboard-card" onClick={handleViewStudents}>
                    <h3>View Students</h3>
                    <p>Check the students in the college.</p>
                </div>
                
                
            </div>
        </div>
    );
};

export default AdminDashboard;
