import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './teacherDashboardStyles.css'; // Import your dashboard styles

const TeacherDashboard = () => {
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation();
  const { state } = location;
  const { email, name, subject } = state || {};

  const handleAddClass = () => {
    navigate('/Dashboard/AddClass', { state: { email, name, subject } });
  };

  const handleAddStudent = () => {
    navigate('/Dashboard/AddStudent', { state: { email, name, subject } });
  };

  const handleAddAttendance = () => {
    navigate('/Dashboard/AddAttendance', { state: { email, name, subject } });
  };

  const handleEditClasses = () => {
    navigate('/Dashboard/EditClasses', { state: { email, name, subject } });
  };

  const handleEditAttendance = () => {
    navigate('/Dashboard/EditAttendance', { state: { email, name, subject } });
  };

  const handleAddTeachers = () => {
    navigate('/register/teacher', { state: { email, name, subject } });
  };
  const handleViewStudents = () => {
    navigate('/Dashboard/ViewStudents', { state: { email, name, subject } });
};

  return (
    <div className="teacher-dashboard-container">
      <h2>Faculty Dashboard</h2>
      <div className="teacher-card-container">
            <div className="teacher-dashboard-card" onClick={handleAddTeachers}>
          <h3>Add Teachers</h3>
          <p>Add new teachers to the system.</p>
        </div>
        {/* Card 1: Add Students */}
        <div className="teacher-dashboard-card" onClick={handleAddStudent}>
          <h3>Add Students</h3>
          <p>Click here to add new students.</p>
        </div>
        {/* Card 2: Add Attendance */}
        <div className="teacher-dashboard-card" onClick={handleAddAttendance}>
          <h3>Add Attendance</h3>
          <p>Record attendance for classes.</p>
        </div>
        {/* Card 3: Add Classes */}
        <div className="teacher-dashboard-card" onClick={handleAddClass}>
          <h3>Add Classes</h3>
          <p>Create new classes or subjects.</p>
        </div>
        {/* Card 4: Edit Classes */}
        <div className="teacher-dashboard-card" onClick={handleEditClasses}>
          <h3>Edit Classes</h3>
          <p>Edit existing classes or subjects.</p>
        </div>
        {/* Card 5: Edit Attendance */}
        <div className="teacher-dashboard-card" onClick={handleEditAttendance}>
          <h3>Edit Attendance</h3>
          <p>Edit attendance records.</p>
        </div>
        {/* Card 6: Add Teachers */}
        
        <div className="teacher-dashboard-card" onClick={handleViewStudents}>
            <h3>View Students</h3>
            <p>Check the students in the college.</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
