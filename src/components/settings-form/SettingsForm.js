import React, { useState } from "react";
import "./settings-form.css";
import DeleteAccountModal from "../delete/DeleteAccountModal";

const SettingsForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логика сохранения данных пользователя
  };

  return (
    <div className="main">
      <h4 className="settings__title">Настройки</h4>
      <div className="settings__controls">
        <div className="settings__controls__menu">
          <div className="settings__controls__menu-item">Основные</div>
        </div>
        <form className="settings__controls__form" onSubmit={handleSubmit}>
          <div className="settings__controls__form-item">
            <p className="title">Ваше имя пользователя</p>
            <p className="description">Оно будет отображаться в "Nil"</p>
            <input
              className="input"
              type="text"
              placeholder="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="settings__controls__form-footer">
            <p className="description">Не более 32 символов</p>
            <button className="button" type="submit">
              Сохранить
            </button>
          </div>
          <div className="settings__controls__form-item">
            <p className="title">Ваш email</p>
            <p className="description">Введите вашу электронную почту</p>
            <input
              className="input"
              type="text"
              placeholder="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="settings__controls__form-footer">
            <p className="description">Email должен быть действительным</p>
            <button className="button" type="submit">
              Сохранить
            </button>
          </div>
          <div className="settings__controls__form-item redborder">
            <p className="title">Удалить аккаунт</p>
            <p className="description">
              Учетная запись и все связанные с ней ссылки будут полностью
              удалены
            </p>
          </div>
          <div className="settings__controls__form-footer redborder__footer">
            <p className="description"></p>
            <button className="button red" onClick={handleDeleteModalOpen}>
              Удалить аккаунт
            </button>
          </div>
        </form>
      </div>
      {isDeleteModalOpen && (
        <DeleteAccountModal onClose={handleDeleteModalClose} />
      )}
    </div>
  );
};

export default SettingsForm;
