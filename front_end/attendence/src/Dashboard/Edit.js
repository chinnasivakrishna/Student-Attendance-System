import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './EditStyles.css'; // Import the CSS file

const Edit = () => {
    const [attendanceStatus, setAttendanceStatus] = useState([]);
    const location = useLocation();
    const { state } = location;
    const { regNos, date, startTime, endTime, subject, email } = state || {};

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                // Fetch attendance data for the specified criteria
                const response = await axios.get(`http://localhost:8080/api/attendance/fetch?date=${date}&startTime=${startTime}&endTime=${endTime}&regNos=${regNos.join(',')}`);
                const attendanceData = response.data;

                // Set attendance status based on fetched data
                const initialStatus = regNos.map(regNo => {
                    const student = attendanceData.find(entry => entry.regNo === regNo);
                    return student ? student.attendanceStatus : '';
                });
                setAttendanceStatus(initialStatus);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchAttendanceData();
    }, [date, startTime, endTime, regNos]);

    const handleStatusChange = (index, status) => {
        const updatedStatus = [...attendanceStatus];
        updatedStatus[index] = status;
        setAttendanceStatus(updatedStatus);
    };

    const handleSubmit = async () => {
        try {
            const updatedAttendanceData = regNos.map((regNo, index) => ({
                regNo,
                attendanceStatus: attendanceStatus[index],
                date,
                startTime,
                endTime,
                subject,
                email,
            }));

            // Send updated attendance data to the backend
            const response = await axios.put('http://localhost:8080/api/attendance/update', updatedAttendanceData);
            console.log('Attendance data updated successfully:', response.data);
            // Handle success, such as showing a success message or redirecting
        } catch (error) {
            console.error('Error updating attendance data:', error);
            // Handle error, such as displaying an error message
        }
    };

    return (
        <div className="edit-container">
            <h2 className="edit-header">Edit Attendance</h2>
            <table className="edit-table">
                <thead>
                    <tr>
                        <th>Registration Number</th>
                        <th>Attendance Status</th>
                    </tr>
                </thead>
                <tbody>
                    {regNos.map((regNo, index) => (
                        <tr key={index}>
                            <td>{regNo}</td>
                            <td>
                                <select className="edit-select" value={attendanceStatus[index]} onChange={(e) => handleStatusChange(index, e.target.value)} required>
                                    <option value="">Select</option>
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                    <option value="Tardy">Tardy</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="edit-button" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Edit;
