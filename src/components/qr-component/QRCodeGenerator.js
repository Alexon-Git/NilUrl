import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import QRLogo from "../../img/qr-logo.png";

function QRCodeGenerator({ showLogo }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    // Здесь можно добавить логику для получения URL из пользовательского ввода
  }, []);

  return (
    <div className="qr-code-container">
      <QRCode
        value={url}
        size={141}
        renderAs={"svg"}
        includeMargin={false}
        imageSettings={
          showLogo
            ? { src: QRLogo, height: 40, width: 40, excavate: true }
            : null
        }
      />
    </div>
  );
}

export default QRCodeGenerator;

/* 
<div>
  <input
    type="text"
    placeholder="Введите URL"
    value={url}
    onChange={(e) => setUrl(e.target.value)}
  />
</div>
*/
