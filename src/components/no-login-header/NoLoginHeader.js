import React, { useState } from "react";
import "./noLoginHeader.css";
import LogoImage from "../../img/logo-icon.svg";
import CreatingLink from "../creating-link/CreatingLink";

const NoLoginHeader = () => {
  const [isCreatingLinkOpen, setIsCreatingLinkOpen] = useState(false);

  const toggleCreatingLink = () => {
    setIsCreatingLinkOpen(!isCreatingLinkOpen);
  };

  const closeCreatingLink = () => {
    setIsCreatingLinkOpen(false);
  };

  return (
    <header className="no-login-header wrapper">
      {isCreatingLinkOpen && <CreatingLink onClose={closeCreatingLink} />}
      <p className="prices-button">Цены</p>
      <span className="logo">
        <img src={LogoImage} alt="Логотип" />
      </span>
      <div className="no-login-header-right">
        <p className="prices-button login">Войти</p>
        <button className="registration-button" onClick={toggleCreatingLink}>Зарегистрироваться</button>
      </div>
    </header>
  );
};

export default NoLoginHeader;