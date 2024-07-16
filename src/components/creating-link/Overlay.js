import React from 'react';
import "./creatingLink.css";

const Overlay = ({ children, onClose }) => {
  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      onClose(); // Закрыть компонент при клике на оверлей
    }
  };

  return (
    <div className="overlay" onClick={handleClickOutside}>
      {React.cloneElement(children, { onClose })}
    </div>
  );
};

export default Overlay;