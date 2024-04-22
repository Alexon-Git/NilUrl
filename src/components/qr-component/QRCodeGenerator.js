import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import QRLogo from "../../img/qr-logo.png";

function QRCodeGenerator({ showLogo, borderColor }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    // Здесь можно добавить логику для получения URL из пользовательского ввода
  }, []);

  return (
    <div className="qr-code-container" style={{ borderColor: borderColor }}>
      <QRCode
        value={url}
        size={141}
        renderAs={"svg"}
        includeMargin={false}
        imageSettings={
          showLogo
            ? { src: QRLogo, height: 40, width: 30, excavate: true }
            : null
        }
      />
    </div>
  );
}

export default QRCodeGenerator;