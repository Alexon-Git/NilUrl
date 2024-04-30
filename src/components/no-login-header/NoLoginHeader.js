import React, { useState } from "react";
import "./noLoginHeader.css";
import LogoImage from "../../img/logo-icon.svg";
// import CreatingLink from "../creating-link/CreatingLink";
import RedactingLink from "../creating-link/RedactingLink";
import {useNavigate} from "react-router-dom";
import {MAINPAGE_ROUTE, PRICEPAGE_ROUTE} from "../../LogicComp/utils/Const";
import QRComponent from "../qr-component/QRComponent";

const NoLoginHeader = () => {
    const navigate = useNavigate()




  return (
    <header className="no-login-header wrapper">
      <p className="prices-button" onClick={()=>navigate(PRICEPAGE_ROUTE)}>Цены</p>
      <span className="logo">
        <img src={LogoImage} alt="Логотип" style={{cursor:"Pointer"}} onClick={()=>navigate(MAINPAGE_ROUTE)}/>
      </span>
      <div className="no-login-header-right">
        <p className="prices-button login" onClick={()=>{navigate("/login")}}>Войти</p>
        <button className="registration-button" onClick={()=>{navigate("/registration")}}>Зарегистрироваться</button>
      </div>
    </header>
  );
};

export default NoLoginHeader;
