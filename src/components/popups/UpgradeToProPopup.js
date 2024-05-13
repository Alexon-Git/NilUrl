import React, { useRef } from 'react';
import './upgradeToProPopup.css';

const UpgradeToProPopup = ({ onClose, children }) => {
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleClickOutside}>
      <div className="popup-container" ref={popupRef}>
        {children}
      </div>
    </div>
  );
};

export default UpgradeToProPopup;