import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Calendar from './Calendar';
import './EditAttendance.css'; // Import the CSS file

const EditAttendance = () => {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { email } = state || {};
    const teacherEmail = email;
    const [attendanceStatus, setAttendanceStatus] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateSelection = (date) => {
        const currentDate = new Date();
        const formattedDate = `${date.getDate()}, ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        setSelectedDate(formattedDate);
    }

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/classes/fetch');
                setClasses(response.data);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchClasses();
    }, []);

    const handleAttendance = (regNos, date, startTime, endTime, subject) => {
        // Logic to mark attendance for the selected students
        console.log('Attendance marked for students with RegNos:', regNos);
        navigate('/Dashboard/Edit', { state: { regNos, date, startTime, endTime, subject, email } });
    };

    // Group classes based on date, startTime, endTime, and subject
    const groupedClasses = classes.reduce((groups, classData) => {
        const key = `${classData.date}_${classData.startTime}_${classData.endTime}_${classData.subject}`;
        if (!groups[key]) {
            groups[key] = { ...classData, regNos: [classData.regNo] };
        } else {
            groups[key].regNos.push(classData.regNo);
        }
        return groups;
    }, {});

    const isEditAttendancePossible = (status) => status === 'marked';

    // Filter grouped classes based on teacherEmail
    const filteredClasses = Object.values(groupedClasses).filter(classData => classData.teacherEmail === teacherEmail);

    return (
        <div className="edit-attendance-container">
            <h2 className="edit-attendance-header">Edit Attendance</h2>
            <Calendar className="edit-classes-calendar" onDateSelection={handleDateSelection} />
            <table className="edit-attendance-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Students</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClasses.map(classData => (
                        <tr key={classData.id}>
                            <td>{classData.subject}</td>
                            <td>{classData.date}</td>
                            <td>{classData.startTime}</td>
                            <td>{classData.endTime}</td>
                            <td>{classData.regNos.join(', ')}</td>
                            <td>
                                {isEditAttendancePossible(classData.status) ? (
                                    <button className="edit-attendance-button" onClick={() => handleAttendance(classData.regNos, classData.date, classData.startTime, classData.endTime, classData.subject)}>Edit Attendance</button>
                                ) : (
                                    <span className="edit-attendance-not-possible">Attendance Not Marked</span>
                                )}    
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EditAttendance;
