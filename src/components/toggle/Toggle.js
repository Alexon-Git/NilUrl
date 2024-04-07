import React from 'react';
import PropTypes from 'prop-types'; 
import './toggle.css';

const Toggle = ({ initialChecked, onToggle, ind, ...rest }) => {

  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        id={`switch${ind}`}
        checked={initialChecked}
        onClick={() => onToggle()}
        {...rest}
        style={{ width: '50px', height: '24px' }}
      />
      <label htmlFor={`switch${ind}`}></label>
    </div>
  );
};

Toggle.propTypes = {
  initialChecked: PropTypes.bool.isRequired, 
  onToggle: PropTypes.func.isRequired, 
  ind: PropTypes.number.isRequired 
};

export default Toggle;