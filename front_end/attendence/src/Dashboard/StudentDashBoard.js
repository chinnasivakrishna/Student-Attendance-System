import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import hiiImage from './student_placeholder.png';
import axios from 'axios';
import styles from './styles.css'; // Import the CSS file
import Calendar from './Calendar';

const StudentDashboard = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const location = useLocation();
  const { state } = location;
  const {  name, RegNo } = state || {};

  useEffect(() => {
    // Fetch attendance data from the backend
    axios.get('http://localhost:8080/api/attendance/fetch')
      .then(response => {
        // Filter attendance data based on RegNo
        const filteredData = response.data.filter(attendance => attendance.regNo === RegNo);
        setAttendanceData(filteredData);
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });

    // Fetch image URL from the backend
    // For simplicity, assuming image fetching logic is handled elsewhere

  }, [RegNo]); // Trigger the effect when RegNo changes

  const handleDateSelection = (date) => {
    const formattedDate = `${date.getDate()}, ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    setSelectedDate(formattedDate);
  };

  // Filter attendance data based on the selected date or display all data if no date is selected
  const filteredAttendanceData = selectedDate ? attendanceData.filter(attendance => attendance.date === selectedDate) : attendanceData;

  // Calculate attendance percentage based on all attendance data
  const calculateAttendancePercentage = () => {
    const totalClasses = attendanceData.length;
    let presentCount = 0;
    let tardyCount = 0;

    attendanceData.forEach(attendance => {
      if (attendance.attendanceStatus === 'Present') {
        presentCount += 1;
      } else if (attendance.attendanceStatus === 'Tardy') {
        tardyCount += 0.5;
      }
    });

    const attendanceValue = presentCount + tardyCount;
    const attendancePercentage = (attendanceValue / totalClasses) * 100;
    return attendancePercentage.toFixed(2);
  };

  return (
    <div className="dashboard-container">
      {/* Display the image */}
      {<img src={hiiImage} alt="hii" className="student-image" />}
      <h2>{name}</h2>
      {/* Display attendance percentage */}
      <h2 className="attendance-percentage">Attendance Percentage: {calculateAttendancePercentage()}%</h2>

      {/* Display attendance data */}
      <h2>Attendance Data</h2>
      <Calendar onDateSelection={handleDateSelection} />
      <table className="attendance-table">
        {/* Table headers */}
        <thead>
          <tr>
            <th>Date</th>
            <th>Subject</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Attendance Status</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {filteredAttendanceData.map((attendance, index) => (
            <tr key={index}>
              <td>{attendance.date}</td>
              <td>{attendance.subject}</td>
              <td>{attendance.startTime}</td>
              <td>{attendance.endTime}</td>
              <td>{attendance.attendanceStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
