import React from 'react';
import './upgradeToProPopup.css';

const Popup = () => {
  return (
      <div className="popup-container">
        <p className="popup-message">
          Статистику за последние 3 месяца можно просмотреть в проекте с тарифным планом Pro. Создайте проект или перейдите к существующему проекту для обновления.
        </p>
        <button className="popup-button">
          Обновиться до Pro
        </button>
      </div>
  );
};

export default Popup;