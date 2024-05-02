import React, { useState, useRef } from "react";
import QRCodeGenerator from "./QRCodeGenerator";
import { QRImage, Toggle, ColorPickerGfg } from "../../components";
import "./qrComponent.css";

function QRComponent() {
  const [showLogo, setShowLogo] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [borderColor, setBorderColor] = useState("#000000");
  const qrRef = useRef(null);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleColorChange = (newColor) => {
    setBorderColor(newColor.hex); // Обновляем цвет рамки
  };

  const copyToClipboard = () => {
    const qrCodeText = qrRef.current.querySelector("img").src;
    navigator.clipboard.writeText(qrCodeText);
  };

  const downloadQRCode = () => {
    const qrCodeImage = qrRef.current.querySelector("img").src;
    const link = document.createElement("a");
    link.href = qrCodeImage;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
      <div className="creating__qr">
        <div className="qr__header">
          <span className="header__svg">
            <img src={QRImage} alt=""></img>
          </span>
          <p className="header__title">Скачать QR code</p>
        </div>
        <div className="qr__main">
          <QRCodeGenerator showLogo={showLogo} borderColor={borderColor} />
          <div className="edit-button" onClick={toggleEditing}>
            {isEditing ? (
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: "rotate(90deg)" }}
              >
                <path
                  d="M1.5 11L6.5 6L1.5 1"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 11L6.5 6L1.5 1"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {isEditing ? "Скрыть редактирование" : "Редактирование"}
          </div>
          {isEditing && (
            <div className="editing-content">
              <div className="toggle-logo">
                <p className="editing-title">Логотип</p>
                <div className="editing-toggle">
                  <Toggle
                    initialChecked={showLogo}
                    onToggle={() => setShowLogo(!showLogo)}
                    ind={1}
                    size="big"
                  />
                  <p className="toggle-text">Логотип Nil-URL.ru</p>
                </div>
              </div>
              <div className="toggle-logo">
                <p className="editing-title">Цвет</p>
                <ColorPickerGfg
                  initialColor={borderColor}
                  onColorChange={handleColorChange}
                />
              </div>
            </div>
          )}
        </div>
        <div className="qr__footer">
        <button className="footer__button" onClick={copyToClipboard}>
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.229 6.10425L2.16239 8.17089C1.86405 8.46922 1.71487 8.61834 1.6082 8.79247C1.51362 8.94676 1.44392 9.11504 1.40166 9.29109C1.354 9.48956 1.354 9.70059 1.354 10.1224V13.8859C1.354 14.852 1.354 15.335 1.54202 15.7041C1.7074 16.0287 1.9713 16.2925 2.29587 16.4579C2.66487 16.6459 3.14792 16.6459 4.114 16.6459H14.8857C15.8518 16.6459 16.3348 16.6459 16.7038 16.4579C17.0284 16.2925 17.2922 16.0287 17.4576 15.7041C17.6457 15.335 17.6457 14.852 17.6457 13.8859V10.1224C17.6457 9.70059 17.6457 9.48956 17.598 9.29109C17.5558 9.11504 17.486 8.94676 17.3915 8.79247C17.2848 8.61834 17.1356 8.46922 16.8373 8.17089L14.7707 6.10425"
                stroke="white"
                strokeWidth="0.96"
              />
              <path
                d="M17.6457 10.8958H15.1938C14.5271 10.8958 14.1937 10.8958 13.9427 11.0767C13.6918 11.2575 13.5864 11.5738 13.3755 12.2063L13.2908 12.4602C13.08 13.0927 12.9746 13.409 12.7237 13.5898C12.4727 13.7708 12.1393 13.7708 11.4726 13.7708H7.52713C6.8604 13.7708 6.52703 13.7708 6.27605 13.5898C6.02507 13.409 5.91966 13.0927 5.70882 12.4602L5.62419 12.2063C5.41335 11.5738 5.30793 11.2575 5.05696 11.0767C4.80598 10.8958 4.47261 10.8958 3.80588 10.8958H1.354"
                stroke="white"
                strokeWidth="0.96"
              />
              <path
                d="M14.7707 10.8958V4.82263C14.7707 4.58823 14.7707 4.47103 14.7442 4.36074C14.7207 4.26295 14.682 4.16947 14.6294 4.08373C14.5702 3.98702 14.4873 3.90414 14.3216 3.7384L12.3447 1.7616C12.1791 1.59586 12.0962 1.51298 11.9995 1.45372C11.9137 1.40117 11.8202 1.36246 11.7224 1.33898C11.6121 1.3125 11.4949 1.3125 11.2606 1.3125H6.529C5.72393 1.3125 5.32139 1.3125 5.01389 1.46918C4.74341 1.607 4.5235 1.8269 4.38568 2.09738C4.229 2.40488 4.229 2.80742 4.229 3.6125V10.8958"
                stroke="white"
                strokeWidth="0.96"
              />
              <path
                d="M10.9375 1.3125V3.6125C10.9375 4.14921 10.9375 4.41758 11.042 4.62257C11.1339 4.80289 11.2804 4.9495 11.4607 5.04139C11.6657 5.14583 11.9341 5.14583 12.4708 5.14583H14.7708"
                stroke="white"
                strokeWidth="0.96"
              />
            </svg>
            Скопировать
          </button>
          <button className="footer__button" onClick={downloadQRCode}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 8.1665C1.5 8.94309 1.5 9.33134 1.62687 9.63767C1.79603 10.046 2.12048 10.3705 2.52886 10.5397C2.83515 10.6665 3.22343 10.6665 4 10.6665H4.56287C5.04705 10.6665 5.28913 10.6665 5.4824 10.778C5.53121 10.8061 5.57704 10.8392 5.61919 10.8766C5.78605 11.0247 5.86261 11.2543 6.01572 11.7137L6.12013 12.0269C6.30347 12.5769 6.39513 12.8519 6.61338 13.0092C6.83162 13.1665 7.1215 13.1665 7.70125 13.1665H10.2988C10.8785 13.1665 11.1684 13.1665 11.3867 13.0092C11.6048 12.8519 11.6965 12.5769 11.8798 12.0269L11.9843 11.7137C12.1374 11.2543 12.2139 11.0247 12.3808 10.8766C12.4229 10.8392 12.4687 10.8061 12.5176 10.778C12.7108 10.6665 12.9529 10.6665 13.4372 10.6665H14C14.7766 10.6665 15.1648 10.6665 15.4712 10.5397C15.8795 10.3705 16.204 10.046 16.3732 9.63767C16.5 9.33134 16.5 8.94309 16.5 8.1665"
                stroke="white"
                strokeWidth="1.28"
              />
              <path
                d="M5.6665 6.49984L8.99984 8.99984M8.99984 8.99984L12.3332 6.49984M8.99984 8.99984V0.666504"
                stroke="white"
                strokeWidth="1.28"
              />
              <path
                d="M12.3333 3.1665H13.1667C14.738 3.1665 15.5237 3.1665 16.0118 3.65466C16.5 4.14281 16.5 4.92849 16.5 6.49984V13.1665C16.5 14.7378 16.5 15.5235 16.0118 16.0117C15.5237 16.4998 14.738 16.4998 13.1667 16.4998H4.83333C3.26198 16.4998 2.47631 16.4998 1.98816 16.0117C1.5 15.5235 1.5 14.7378 1.5 13.1665V6.49984C1.5 4.92849 1.5 4.14281 1.98816 3.65466C2.47631 3.1665 3.26198 3.1665 4.83333 3.1665H5.66667"
                stroke="white"
                strokeWidth="1.28"
              />
            </svg>
            Скачать
          </button>
        </div>
      </div>
  );
}

export default QRComponent;
