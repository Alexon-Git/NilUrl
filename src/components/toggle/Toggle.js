import React from 'react';
import PropTypes from 'prop-types'; 
import './toggle.css';

const Toggle = ({ initialChecked, onToggle, ind, size }) => {

  return (
    <div className={`toggle-switch-${size}`}>
      <input
        type="checkbox"
        id={`switch${ind}`}
        checked={initialChecked}
        onChange={() => onToggle()} 
      />
      <label htmlFor={`switch${ind}`}></label>
    </div>
  );
};

Toggle.propTypes = {
  initialChecked: PropTypes.bool.isRequired, 
  onToggle: PropTypes.func.isRequired, 
  ind: PropTypes.number.isRequired,
  size: PropTypes.string
};

export default Toggle;