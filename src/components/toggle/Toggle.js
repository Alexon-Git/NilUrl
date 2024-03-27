import React, { useState } from 'react';
import './toggle.css';

const Toggle = ({ initialChecked, onToggle, ind }) => {

  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        id={`switch${ind}`}
        checked={initialChecked}
        onClick={() => onToggle()}
        // onChange={() => onToggle()}
      />
      <label htmlFor={`switch${ind}`}></label>
    </div>
  );
};

export default Toggle;