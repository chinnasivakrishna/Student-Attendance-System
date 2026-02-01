import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './attendance.css';
import Calendar from './Calendar';

const AddAttendance = () => {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { email } = state || {};
    const teacherEmail = email;
    const [selectedDate, setSelectedDate] = useState(null); // Initialize selectedDate to null

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

    const handleAttendance = (regNos, date, startTime, endTime, subject, mobiles, ids) => {
        // Logic to mark attendance for the selected students
        navigate('/Dashboard/MarkAttendance', { state: { regNos, date, startTime, endTime, subject, email, mobiles, ids } });
    };

    const handleDateSelection = (date) => {
        const currentDate = new Date();
        if (date >= currentDate) {
            const formattedDate = `${date.getDate()}, ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
            setSelectedDate(formattedDate);
        }else if (date <= currentDate) {
            const formattedDate = `${date.getDate()}, ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
            setSelectedDate(formattedDate);
        } else {
            alert('Please select a date greater than or equal to today');
        }
    };

    // Filter classes based on whether the selected date matches the class date
    const groupedClasses = classes.reduce((groups, classData) => {
        const key = `${classData.date}_${classData.startTime}_${classData.endTime}_${classData.subject}`;
        if (!groups[key]) {
            groups[key] = { ...classData, regNos: [classData.regNo], mobiles: [classData.mobile], ids:[classData.id] };
        } else {
            groups[key].regNos.push(classData.regNo);
            groups[key].mobiles.push(classData.mobile);
            groups[key].ids.push(classData.id);
        }
        return groups;
    }, {});

    // Filter grouped classes based on teacherEmail
    const filteredClasses = Object.values(groupedClasses).filter(classData => {
        // Check if date is provided and matches with classData.date
        console.log(classData.date)
        console.log(selectedDate)
        if(selectedDate == null){
            return true;
        }
        if (classData.date === selectedDate) {
            return classData.teacherEmail === teacherEmail;
        }
        // If date is not provided, display all classData
        
    });
    


    const isAttendanceMarked = (status) => status === 'marked';

    return (
        <div className="add-attendance-container">
            <h2 className="add-attendance-header">Add Attendance</h2>
            <Calendar onDateSelection={handleDateSelection} />
            <br></br>
            <table className="add-attendance-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th className="students-column">Students</th>
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
                            <td className="students-column">{classData.regNos.join(', ')}</td>
                            <td>
                                {isAttendanceMarked(classData.status) ? (
                                    <span className="already-marked-text">Already Marked</span>
                                ) : (
                                    <button className="add-attendance-button" onClick={() => handleAttendance(classData.regNos, classData.date, classData.startTime, classData.endTime, classData.subject, classData.mobiles, classData.ids)}>
                                        Mark Attendance
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddAttendance;
