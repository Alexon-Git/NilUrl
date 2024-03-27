import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './dateCalendar.css';

const DateCalendar = () => {
  const [value, onChange] = useState(new Date()); 

  const handleDateChange = (date) => {
    onChange(date); 
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange} 
        value={value} 
        className="calendar" 
      />
    </div>
  );
};

export default DateCalendar;
