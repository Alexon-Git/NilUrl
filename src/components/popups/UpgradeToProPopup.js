import React, { useRef } from 'react';
import './upgradeToProPopup.css';

const UpgradeToProPopup = ({ onClose }) => {
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose(); // Закрыть попап
    }
  };

  return (
    <div className="popup-overlay" onClick={handleClickOutside}>
      <div className="popup-container" ref={popupRef}>
        <p className="popup-message">
          Статистику за последние 3 месяца можно просмотреть в проекте с тарифным планом Pro. Создайте проект или перейдите к существующему проекту для обновления.
        </p>
        <button className="popup-button">
          Обновиться до Pro
        </button>
      </div>
    </div>
  );
};

export default UpgradeToProPopup;