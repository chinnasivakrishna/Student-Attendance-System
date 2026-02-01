import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ViewStudents.css'; // Import the CSS file

const ViewStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [branchFilter, setBranchFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/students/fetch');
      // Filter students based on branch and year if filters are provided
      let filteredStudents = response.data;
      if (branchFilter !== '') {
        filteredStudents = filteredStudents.filter(student => student.branch === branchFilter);
      }
      if (yearFilter !== '') {
        filteredStudents = filteredStudents.filter(student => student.year === yearFilter);
      }
      setStudents(filteredStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDeleteStudent = async (studentIdsToDelete) => {
    try {
      await axios.delete('http://localhost:8080/api/students/delete', { data: studentIdsToDelete });
      // Optionally, you can update the state here to reflect the deletion
      fetchStudents(); // Refresh the student list after deletion
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'branch') {
      setBranchFilter(value);
    } else if (name === 'year') {
      setYearFilter(value);
    }
  };

  const handleFilterSubmit = () => {
    fetchStudents(); // Trigger fetching students with filters
  };

  const handleEditStudent = (id1) => {
    navigate('/Dashboard/EditStudent', { state: { id1 } });
  };

  return (
    <div className="students-container">
      <h2 className="students-header">Students</h2>
      <div className="filter-container">
        <label className="filter-label" htmlFor="branch">Branch:</label>
        <input className="filter-input" type="text" id="branch" name="branch" value={branchFilter} onChange={handleFilterChange} />
        <label className="filter-label" htmlFor="year">Year:</label>
        <input className="filter-input" type="text" id="year" name="year" value={yearFilter} onChange={handleFilterChange} />
        <button className="filter-button" onClick={handleFilterSubmit}>Check</button>
      </div>
      <table className="students-table">
        <thead>
          <tr>
            <th className="centered">Student Name</th>
            <th className="centered">Student Email</th>
            <th className="centered">Branch</th>
            <th className="centered">Year</th>
            <th className="centered">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.branch}</td>
              <td>{student.year}</td>
              <td>
              <div className="button-container">
                  <button className="delete-button" onClick={() => handleDeleteStudent([student.id])}>
                    Delete Student
                  </button>
                  <button className="edit-button" onClick={() => handleEditStudent([student.id])}>
                    Edit Student
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

export default ViewStudents;
