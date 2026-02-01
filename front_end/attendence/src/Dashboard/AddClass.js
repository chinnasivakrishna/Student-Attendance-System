import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Calendar from './Calendar';
import './class.css'

const AddClass = () => {
    const [branch, setBranch] = useState('');
    const [year, setYear] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const location = useLocation();
    const { state } = location;
    const { email, name, subject } = state || {};
    const teacherEmail = email;
    const teacherName = name;

    const fetchStudents = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/students/fetch`);
            const extractedStudentsData = response.data.map(student => ({
                regNo: student.regNo,
                name: student.name,
                id: student.id,
                branch: student.branch,
                year: student.year,
                email: student.email,
                mobile:student.mobile
            }));
            console.log(extractedStudentsData)
            setStudents(extractedStudentsData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectAll = () => {
        setSelectAll(selectAll);
        if (selectAll) {
            setSelectedStudents(students.map(student => student.id));
        } else {
            setSelectedStudents([]);
        }
    };

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
    };
    
    const handleDateSelection = (date) => {
        const currentDate = new Date();
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        console.log(nextDate)
        if (nextDate >= currentDate) {
            const formattedDate = `${date.getDate()}, ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
            setSelectedDate(formattedDate);
        } else {
            alert('Please select a date greater than or equal to today');
        }
    }

    const handleCreateClass = async () => {
        try {
            if (selectedStudents.length === 0) {
                alert('Please select at least one student.');
                return;
            }
    
            const selectedStudentsData = students.filter(student => selectedStudents.includes(student.id));
    
            try {
                const response = await axios.get('http://localhost:8080/api/classes/fetch');
                const classes = response.data;
    
                const duplicateClass = classes.find(classData => (
                    classData.regNo === selectedStudentsData[0]?.regNo &&
                    classData.date === selectedDate &&
                    classData.startTime === startTime &&
                    classData.endTime === endTime
                ));
    
                if (duplicateClass) {
                    const duplicateStudents = selectedStudentsData.filter(student =>
                        student.regNo === duplicateClass.regNo
                    );
    
                    const duplicateRegNos = duplicateStudents.map(student => student.regNo);
                    alert(`A class with the same details already exists for students with regNos: ${duplicateRegNos.join(', ')}`);
                    return;
                }
            } catch (error) {
                console.error(error);
            }
            alert("Class Added successfully")
            selectedStudentsData.forEach(async (student, index) => {
                const payload = {
                    branch,
                    year,
                    date: selectedDate,
                    startTime,
                    endTime,
                    teacherEmail,
                    subject,
                    regNo: student.regNo,
                    name: student.name,
                    email: student.email,
                    mobile: student.mobile
                };
                
                const response = await axios.post('http://localhost:8080/api/classes/create', payload);
                console.log(`Response from Backend for Student ${index + 1}:`, response.data);
                console.log(payload)
                
            });
        } catch (error) {
            console.error(error);
        }
    };
    
    const filteredStudents = students.filter(student => student.branch === branch && student.year === year);

    return (
        <div className="custom-form-container">
            <h2 className="custom-form-title">Add Class</h2>
            <Calendar onDateSelection={handleDateSelection} />
            <form onSubmit={fetchStudents} className="form">
                <div className="custom-form-group">
                    <div className="custom-label-input-container">
                        <label className="custom-label">Date:</label>
                        <input type="text" value={selectedDate} readOnly className="custom-input" />
                    </div>
                    <div className="custom-label-input-container">
                        <label className="custom-label">Start Time:</label>
                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="custom-input" />
                    </div>
                    <div className="custom-label-input-container">
                        <label className="custom-label">End Time:</label>
                        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="custom-input" />
                    </div>
                    <label className="custom-label">Branch:</label>
                    <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} className="custom-input" required />
                </div>
                <div className="custom-form-group">
                    <label className="custom-label">Year:</label>
                    <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="custom-input" required />
                </div>
                <button type="submit" className="custom-button">Fetch Students</button>
            </form>

            <div>
                <label className="custom-checkbox-label">
                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className="custom-checkbox" />
                    Select All
                </label>
                <ul className="custom-ul">
                    {filteredStudents.map(student => (
                        <li key={student.id} className="custom-li">
                            <input
                                type="checkbox"
                                value={student.id}
                                checked={selectedStudents.includes(student.id)}
                                onChange={handleCheckboxChange}
                                className="custom-checkbox"
                            />
                            {student.name} - {student.regNo}
                        </li>
                    ))}
                </ul>
                <button onClick={handleCreateClass} className="custom-button">Create Class</button>
            </div>
        </div>
    );
};

export default AddClass;