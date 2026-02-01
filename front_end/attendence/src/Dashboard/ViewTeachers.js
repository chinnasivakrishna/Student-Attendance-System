import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ViewTeachers.css'; // Import the CSS file

const ViewTeachers = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/teacher/fetch');
      // Filter out teachers with category 'admin'
      const filteredTeachers = response.data.filter(teacher => teacher.category !== 'admin');
      setTeachers(filteredTeachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleEditTeacher = (id1) => {
    navigate('/Dashboard/EditTeacher', { state: { id1 } });
  };

  const handleDeleteTeacher = async (teacherIdsToDelete) => {
    try {
      console.log(teacherIdsToDelete);
      await axios.delete('http://localhost:8080/api/teacher/delete', { data: teacherIdsToDelete });
      // Optionally, you can update the state here to reflect the deletion
      fetchTeachers(); // Refresh the teacher list after deletion
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  return (
    <div className="teachers-container">
      <h2 className="teachers-header">Teachers</h2>
      <table className="teachers-table">
        <thead>
          <tr>
            <th className="centered">Teacher Name</th>
            <th className="centered">Teacher Email</th>
            <th className="centered">Subject</th>
            <th className="centered">Mobile Number</th>
            <th className="centered">Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.subject}</td>
              <td>{teacher.mobileNumber}</td>
              <td>
              <div className="button-container">
                  <button className="delete-button" onClick={() => handleDeleteTeacher([teacher.id])}>
                    Delete Teacher
                  </button>
                  <button className="edit-button" onClick={() => handleEditTeacher([teacher.id])}>
                    Edit Teacher
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTeachers;
