import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Calendar from './Calendar';

import './EditClasses.css'; // Import the CSS file

const EditClasses = () => {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { email, name, subject } = state || {};
    const teacherEmail = email;
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

    const handleDelete = async (classIds) => {
        try {
            console.log('Deleting classes with IDs:', classIds);
            await axios.delete('http://localhost:8080/api/classes/delete', { data: classIds });
            // Update classes state after deletion
            setClasses(classes.filter(classData => !classIds.includes(classData.id)));
        } catch (error) {
            console.error('Error deleting classes:', error);
        }
    };

    const handleAttendance = (id, branch, year, regNos, date, startTime, endTime, subject) => {
        // Logic to mark attendance for the selected students
        console.log('Attendance marked for students with IDs and RegNos:', id, regNos);
        const ids = classes
            .filter(classData => regNos.includes(classData.regNo)) // Filter classes by regNos
            .map(classData => classData.id); // Extract IDs from filtered classes
    
        console.log('IDs of selected students:', ids);
        navigate('/Dashboard/Class', { state: { id: ids, branch, year, regNos, date, startTime, endTime, subject, email } });
    };

    const handleRowDelete = async (classData) => {
        console.log('Deleting class:', classData);
    
        const regNosToDelete = classData.regNos; // Get all regNos associated with the class
    
        for (const regNo of regNosToDelete) {
            const classIdToDelete = classes.find(cls => cls.regNo === regNo)?.id;
            if (classIdToDelete) {
                try {
                    console.log('Deleting class with ID:', classIdToDelete);
                    await handleDelete([classIdToDelete]); // Call handleDelete for each class ID to delete
                } catch (error) {
                    console.error('Error deleting class with ID:', classIdToDelete, error);
                }
            }
        }
        window.location.reload();
    };

    const groupedClasses = classes.reduce((groups, classData) => {
        const key = `${classData.subject}_${classData.date}_${classData.startTime}_${classData.endTime}`;
        if (!groups[key]) {
            groups[key] = { ...classData, regNos: [classData.regNo] };
        } else {
            groups[key].regNos.push(classData.regNo);
        }
        return groups;
    }, {});

    const filteredClasses = selectedDate
        ? Object.values(groupedClasses).filter(classData => classData.teacherEmail === teacherEmail && classData.date === selectedDate)
        : Object.values(groupedClasses).filter(classData => classData.teacherEmail === teacherEmail);

    return (
        <div className="edit-classes-container">
            <h2 className="edit-classes-header">Edit Classes</h2>
            <Calendar className="edit-classes-calendar" onDateSelection={handleDateSelection} />
            <table className="edit-classes-table">
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
                                {new Date(classData.date) >= new Date().setHours(0, 0, 0, 0) ? (
                                    <>
                                        <button className="edit-attendance-button" onClick={() => handleAttendance(classData.id, classData.branch, classData.year, classData.regNos, classData.date, classData.startTime, classData.endTime, classData.subject)}>Edit Classes</button>
                                        <button className="edit-classes-button delete-button" onClick={() => handleRowDelete(classData)}>Delete</button>
                                    </>
                                ) : (
                                    <span className="edit-classes-message">Class Completed</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EditClasses;
