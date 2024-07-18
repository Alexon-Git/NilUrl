import React, { useRef } from 'react';
import './upgradeToProPopup.css';

const AlertPopup = ({ onClose, message }) => {
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleClickOutside}>
      <div className="popup-container" ref={popupRef}>
        <p className="popup-message-not-margin">
          {message}
        </p>
      </div>
    </div>
  );
};

export default AlertPopup;