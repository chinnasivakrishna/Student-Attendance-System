import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MarkAttendance.css'; // Import your CSS file

const MarkAttendance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { regNos, date, startTime, endTime, subject, email, mobiles, ids } = state || {};
  const [attendanceStatus, setAttendanceStatus] = useState(Array(regNos.length).fill(''));
  const [submitting, setSubmitting] = useState(false);
  console.log(ids);

  const handleStatusChange = (index, status) => {
    const updatedStatus = [...attendanceStatus];
    updatedStatus[index] = status;
    setAttendanceStatus(updatedStatus);
  };

  const sendSMS = async (mobile, message) => {
    try {
      const response = await axios.post('http://localhost:8080/sms', {
        to: mobile,
        message: message,
      });
      console.log('SMS sent successfully to', mobile);
      console.log(response.data); // You may want to handle the SMS response accordingly
    } catch (error) {
      console.error('Error sending SMS:', error);
      // Handle error, such as displaying an error message
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      for (let i = 0; i < regNos.length; i++) {
        const response = await axios.post('http://localhost:8080/api/attendance/mark', {
          regNo: regNos[i],
          attendanceStatus: attendanceStatus[i],
          date,
          startTime,
          endTime,
          subject,
          email,
          mobile: mobiles[i], // Pass the corresponding mobile number for each registration number
        });
        console.log(response);
        console.log('Attendance marked successfully for regNo:', regNos[i]);
        console.log('Attendance marked successfully for regNo:', attendanceStatus[i]);
        const response1 = await axios.post('http://localhost:8080/api/classes/status', {
          id: ids[i],
          status: 'marked',
        });
        console.log(response1);

        // Send SMS for each marked attendance
        if (attendanceStatus[i] === 'Present') {
          await sendSMS(mobiles[i], 'Your attendance has been marked as Present.');
        } else if (attendanceStatus[i] === 'Absent') {
          await sendSMS(mobiles[i], 'Your attendance has been marked as Absent.');
        } else if (attendanceStatus[i] === 'Tardy') {
          await sendSMS(mobiles[i], 'Your attendance has been marked as Tardy.');
        }
      }
      console.log('done');
      alert('Attendance posted successfully');
      // Handle overall success, such as showing a success message or redirecting
    } catch (error) {
      console.error('Error marking attendance:', error);
      // Handle error, such as displaying an error message
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mark-attendance-container">
      <h2>Mark Attendance</h2>
      <table className="mark-attendance-table">
        <thead>
          <tr>
            <th>Registration Number</th>
            <th>Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          {regNos.map((regNo, index) => (
            <tr key={index} className="mark-attendance-row">
              <td className="mark-attendance-cell">{regNo}</td>
              <td className="mark-attendance-cell">
                <select
                  className="mark-attendance-select"
                  value={attendanceStatus[index]}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                  required // Added required attribute here
                >
                  <option value="">Select...</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Tardy">Tardy</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mark-attendance-submit-button-container">
        <button className="mark-attendance-submit-button" onClick={handleSubmit} disabled={submitting}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default MarkAttendance;
