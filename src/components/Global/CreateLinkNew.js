import React, { useState, useEffect } from "react";
import "../../styles/Global/CreateLinkNew.css";
import CreatingLink from "../creating-link/CreatingLink";
import Overlay from "../creating-link/Overlay";
import AlertPopup from "../popups/AlertPopup";

const CreateLinkNew = ({ highestKey, userStatus }) => {
  const [flag, setFlag] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); 
  const [isAlertPopupVisible, setAlertPopupVisibility] = useState(false); 

  const click = () => {
    if (userStatus === "free" && highestKey >= 15) {
      setPopupMessage(
        "Ваше количество ссылок достигло максимума для Бесплатной подписки, для большего количества ссылок приобретите Premium"
      );
      setAlertPopupVisibility(true);
    } else {
      setFlag(true);
    }
  };
  return (
    <div>
      {flag && (
        <Overlay onClose={() => setFlag(false)}>
          <CreatingLink userStatus={userStatus} />
        </Overlay>
      )}

      <div
        className="CrLinkNewButtonM"
        onClick={() => {
          click();
        }}
      >
        <div>
          <div className="CrLinkNewButtonText">Создать ссылку</div>
        </div>
      </div>
    </div>
  );
};

export default CreateLinkNew;
