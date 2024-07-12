import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import QRLogo from "../../img/qr-logo.png";

const QRCodeGenerator = React.forwardRef(({ showLogo, borderColor, pathS }, ref ) => {
    return (
    <div ref={ref} className="qr-code-container" style={{ borderColor: borderColor }}>
      <QRCode
        value={pathS}
        size={141}
        level={'Q'}
        renderAs={"svg"}
        includeMargin={false}
        fgColor={borderColor} // Установить цвет QR-кода
        imageSettings={
          showLogo
            ? { src: QRLogo, height: 37.6, width: 32, excavate: true }
            : null
        }
      />
    </div>
  );
});

export default QRCodeGenerator;
