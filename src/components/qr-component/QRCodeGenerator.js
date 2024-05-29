import React, {useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import QRLogo from "../../img/qr-logo.png";

const QRCodeGenerator = React.forwardRef(({ showLogo, borderColor }, ref) => {
  const [url, setUrl] = useState("");  return (
    <div ref={ref} className="qr-code-container" style={{ borderColor: borderColor }}>
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
      <style>
        {`.qr-code-container svg path:nth-of-type(2) { fill: ${borderColor}; }`}
      </style>
    </div>
  );
});

export default QRCodeGenerator;