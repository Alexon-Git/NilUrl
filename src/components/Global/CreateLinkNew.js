import React, { useState, useEffect } from "react";
import "../../styles/Global/CreateLinkNew.css";
import CreatingLink from "../creating-link/CreatingLink";
import Overlay from "../creating-link/Overlay";
import AlertPopup from "../popups/AlertPopup";
import { usePremium } from '../../LogicComp/DataProvider';

const CreateLinkNew = ({ highestKey, availableLinks }) => {
  const [flag, setFlag] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); 
  const [isAlertPopupVisible, setAlertPopupVisibility] = useState(false); 
  const { isPremium } = usePremium();
  

 

  const handleClosePopup = () => {
    setAlertPopupVisibility(false);
    setPopupMessage("");
  };

  const click = () => {
    let limit = 0;
    if (isPremium === "free") {
      limit = 10;
    } else if (isPremium === "base") {
      limit = 100;
    } else if (isPremium === "premium") {
      limit = 1000;
    }
    console.log(availableLinks);
    console.log(highestKey);
    if (highestKey >= limit || availableLinks <= 0) {
      setPopupMessage(
        `Ваше количество ссылок достигло максимума для ${isPremium === "free" ? "Бесплатной подписки" : isPremium === "base" ? "Базовой подписки" : "Премиум подписки"}, для большего количества ссылок приобретите более высокий план.`
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
          <CreatingLink />
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
      {isAlertPopupVisible && (
        <AlertPopup onClose={handleClosePopup} message={popupMessage} />
      )}
    </div>
  );
};

export default CreateLinkNew;