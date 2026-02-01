import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Calendar from './Calendar';
import './custom-styles.css'; // Assuming the CSS file is named custom-styles.css

const Class = () => {
    const [branch, setBranch] = useState('');
    const [year, setYear] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [classIdsToDelete, setClassIdsToDelete] = useState([]);
    const [selectedStudentsNames, setSelectedStudentsNames] = useState([]);
    const [regNoToIdMap, setRegNoToIdMap] = useState({});
    const location = useLocation();
    const { state } = location;
    const { id, branch: initialBranch, year: initialYear, regNos, date: initialDate, startTime: initialStartTime, endTime: initialEndTime, subject } = state || {};
    const teacherEmail = state?.email;

    const [removedRegNos, setRemovedRegNos] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/students/fetch');
                const extractedStudentsData = response.data.map(student => ({
                    regNo: student.regNo,
                    name: student.name,
                    id: student.id,
                    branch: student.branch,
                    year: student.year,
                    email: student.email,
                }));
                const regNoIdMap = {};
                extractedStudentsData.forEach(student => {
                    regNoIdMap[student.regNo] = student.id;
                });

                setStudents(extractedStudentsData);
                setBranch(initialBranch || '');
                setYear(initialYear || '');
                setSelectedDate(initialDate || '');
                setStartTime(initialStartTime || '');
                setEndTime(initialEndTime || '');
                setRegNoToIdMap(regNoIdMap);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStudents();
    }, [initialBranch, initialYear, initialDate, initialStartTime, initialEndTime]);

    useEffect(() => {
        const selectedIds = students.filter(student => regNos.includes(student.regNo)).map(student => student.id);
        
        setSelectedStudents(selectedIds);
    }, [regNos, students]);

    useEffect(() => {
        const selectedNames = students.filter(student => selectedStudents.includes(student.id)).map(student => student.name);
        setSelectedStudentsNames(selectedNames);
    }, [selectedStudents, students]);

    const handleCheckboxChange = (e) => {
        const studentId = parseInt(e.target.value);
        const isChecked = e.target.checked;

        setSelectedStudents(prevSelectedStudents => {
            if (isChecked) {
                return [...prevSelectedStudents, studentId];
            } else {
                return prevSelectedStudents.filter(id => id !== studentId);
            }
        });

        // Update removedRegNos when a checkbox is unchecked
        if (!isChecked) {
            const regNo = students.find(student => student.id === studentId).regNo;
            setRemovedRegNos(prevRemovedRegNos => [...prevRemovedRegNos, regNo]);
        }
    };

    const handleDateSelection = (date) => {
        const currentDate = new Date();
        if (date >= currentDate) {
            const formattedDate = `${date.getDate()}, ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
            setSelectedDate(formattedDate);
        } else {
            alert('Please select a date greater than or equal to today');
        }
    };

    const handleUpdateClass = async (e) => {
        e.preventDefault();

        const classData = {
            id,
            branch,
            year,
            selectedStudents: selectedStudents.map(studentId => ({ id: studentId})),
            selectedDate,
            startTime,
            endTime,
            subject,
            teacherEmail
        };
        
        const selectedRegNos = students.filter(student => selectedStudents.includes(student.id)).map(student => student.regNo);
        const addedRegNos = [];
        const removedRegNos = [];

        regNos.forEach(regNo => {
            if (!selectedRegNos.includes(regNo)) {
                removedRegNos.push(regNo);
            }
        });

        selectedRegNos.forEach(regNo => {
            if (!regNos.includes(regNo)) {
                addedRegNos.push(regNo);
            }
        });

        try {
            if (addedRegNos.length > 0) {
                // Add students to the class
                for (let i = 0; i < addedRegNos.length; i++) {
                    const regNoToAdd = addedRegNos[i];
                    const studentToAdd = students.find(student => student.regNo === regNoToAdd);
                
                    if (studentToAdd) {
                        const { selectedDate, branch, year, startTime, endTime, subject, teacherEmail } = classData;
                        const response = {
                            name: studentToAdd.name,
                            email: studentToAdd.email,
                            regNo: studentToAdd.regNo,
                            branch,
                            year,
                            date: selectedDate,
                            startTime,
                            endTime,
                            subject,
                            teacherEmail
                        };
                
                        await axios.post('http://localhost:8080/api/classes/create', response);
                    }
                }
            }
            
            if (removedRegNos.length > 0) {
                // Remove students from the class
                const response = await axios.get('http://localhost:8080/api/classes/fetch');
                const matchingClasses = response.data.filter(classObj => {
                    return (
                        removedRegNos.includes(classObj.regNo) &&
                        classObj.date === selectedDate &&
                        classObj.startTime === startTime &&
                        classObj.endTime === endTime
                    );
                });
            
                if (matchingClasses.length > 0) {
                    const classIdsToDelete = matchingClasses.map(classObj => classObj.id);
            
                    await axios.delete('http://localhost:8080/api/classes/delete', { data: classIdsToDelete });
                }
            }

            const response = await axios.get('http://localhost:8080/api/classes/fetch');
            for (let i = 0; i < response.data.length; i++) {
                const regNoToAdd = response.data[i].id;
                const studentToAdd = students.find(student => student.regNo === regNoToAdd);
                const id = regNoToAdd;
                
                const response1 = {
                    id,
                    branch,
                    year,
                    date: selectedDate,
                    startTime,
                    endTime,
                    subject,
                    teacherEmail
                };
            
                await axios.put('http://localhost:8080/api/classes/update', response1);
            }

            alert('Class updated successfully');
        } catch (error) {
            console.error('Error updating class:', error);
            alert('Error updating class. Please try again.');
        }
    };

    const filteredStudents = students.filter(student => student.branch === branch && student.year === year);

    return (
        <div className="custom-form-container">
            <h2 className="custom-form-title">Edit Class</h2>
            <form onSubmit={handleUpdateClass}>
                <div className="custom-form-group">
                    <label className="custom-label">Branch:</label>
                    <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} required className="custom-input" />
                </div>
                <div className="custom-form-group">
                    <label className="custom-label">Year:</label>
                    <input type="text" value={year} onChange={(e) => setYear(e.target.value)} required className="custom-input" />
                </div>
                <div className="custom-form-group">
                    <label className="custom-label">Date:</label>
                    <input type="text" value={selectedDate} readOnly className="custom-input" />
                </div>
                <div className="custom-form-group">
                    <label className="custom-label">Start Time:</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="custom-input" />
                </div>
                <div className="custom-form-group">
                    <label className="custom-label">End Time:</label>
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="custom-input" />
                </div>
                <Calendar onDateSelection={handleDateSelection} className="custom-calendar" />
                <div>
                    <ul className="custom-ul">
                        {filteredStudents.map(student => (
                            <li key={student.id} className="custom-li">
                                <label className="custom-checkbox-label">
                                    <input
                                        type="checkbox"
                                        value={student.id}
                                        checked={selectedStudents.includes(student.id)}
                                        onChange={handleCheckboxChange}
                                    />
                                    {student.name} - {student.regNo}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="submit" className="custom-button">Update Class</button>
            </form>
        </div>
    );
};

export default Class;
