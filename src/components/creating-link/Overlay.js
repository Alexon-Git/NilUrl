import React, { useState } from 'react';
import "./creatingLink.css";

const Overlay = ({ children, onClose }) => {
  const [isMouseDownOutside, setIsMouseDownOutside] = useState(false);

  const handleMouseDown = (event) => {
    if (event.target === event.currentTarget) {
      setIsMouseDownOutside(true);
    } else {
      setIsMouseDownOutside(false);
    }
  };

  const handleMouseUp = (event) => {
    if (isMouseDownOutside && event.target === event.currentTarget) {
      onClose(); // Закрыть компонент при отпускании кнопки мыши на оверлее
    }
    setIsMouseDownOutside(false);
  };

  return (
    <div className="overlay" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      {React.cloneElement(children, { onClose })}
    </div>
  );
};

export default Overlay;