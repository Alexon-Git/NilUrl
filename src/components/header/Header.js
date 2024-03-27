import React from "react";
import ProfileCircle from "../ProfileCircle";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <div className="circle"></div>
        <p className="slash">/</p>
        <ProfileCircle word={"A"} />
        <div className="profile__name">Имя пользователя</div>
      </div>
      <div className="Right">
        <ProfileCircle word={"A"} />
      </div>
    </header>
  );
};

export default Header;
