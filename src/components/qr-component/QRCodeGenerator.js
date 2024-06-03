import React, {useState, useEffect, useRef } from "react";
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
        imageSettings={
          showLogo
            ? { src: QRLogo, height: 32, width: 24, excavate: true }
            : null
        }
      />
      <style>
        {`.qr-code-container svg path:nth-of-type(2) { fill: ${borderColor}; }`}
      </style>
    </div>
  );
});

export default QRCodeGenerator;