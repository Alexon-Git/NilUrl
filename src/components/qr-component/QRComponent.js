import React, { useState } from 'react';
import QRCodeGenerator from './QRCodeGenerator';
import './qrComponent.css';

function QRComponent() {
  const [showLogo, setShowLogo] = useState(true);

  return (
    <div className="app">
      <h1>Генератор QR-кода</h1>
      <QRCodeGenerator showLogo={showLogo} />
      <div className="toggle-logo">
        <input
          type="checkbox"
          id="toggle"
          checked={showLogo}
          onChange={() => setShowLogo(!showLogo)}
        />
        <label htmlFor="toggle">Убрать логотип посередине</label>
      </div>
    </div>
  );
}

export default QRComponent;