import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Calendar from './Calendar';

function TeacherDashboard() {
    const [selectedDate, setSelectedDate] = useState('');
    const handleDateSelection = (date) => {
        const currentDate = new Date();
        if (date <= currentDate) {
            const formattedDate = `${date.getDate()}, ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
            setSelectedDate(formattedDate);
            console.log(selectedDate);
        } else {
            alert('Please select a date greater than or equal to today');
        }
    };
    

    return (
        <div className="container">
           
                <Calendar onDateSelection={handleDateSelection} />
                <h1>{selectedDate}</h1>
                </div>
    )
}

export default TeacherDashboard;
