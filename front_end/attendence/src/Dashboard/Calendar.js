// Calendar.js
import React, { useState } from 'react';
import './CalendarStyles.css';

function Calendar({ onDateSelection }) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        onDateSelection(date);
    };

    const renderCalendar = () => {
        const calendar = [];
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendar.push(<div key={`empty-${i}`} className="empty"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentYear, currentMonth, i);
            const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
            calendar.push(
                <div
                    key={i}
                    onClick={() => handleDateClick(date)}
                    className={`day ${isSelected ? 'selected' : ''}`}
                >
                    {i}
                </div>
            );
        }

        return calendar;
    };

    const handlePrevMonth = () => {
        const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const handleNextMonth = () => {
        const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    return (
        <div className="calendar">
            <div className="controls">
                <button onClick={handlePrevMonth}>&lt;</button>
                <span>{`${currentMonth + 1}/${currentYear}`}</span>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="days">
                <div className="day">Sun</div>
                <div className="day">Mon</div>
                <div className="day">Tue</div>
                <div className="day">Wed</div>
                <div className="day">Thu</div>
                <div className="day">Fri</div>
                <div className="day">Sat</div>
            </div>
            <div className="calendar-grid">
                {renderCalendar()}
            </div>
        </div>
    );
}

export default Calendar;
