import React, { useState } from "react";
import "./settings-form.css";
import { DeleteAccountModal, Overlay } from "../../components";

const SettingsForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save user data
  };

  const formItems = [
    {
      title: "Ваше имя пользователя",
      description: "Оно будет отображаться в 'Nil'",
      placeholder: "username",
      name: "username",
      value: formData.username,
      maxLength: 32,
    },
    {
      title: "Ваш email",
      description: "Введите вашу электронную почту",
      placeholder: "email",
      name: "email",
      value: formData.email,
      maxLength: undefined,
    },
  ];

  return (
    <div className="sf-background">
      <div className="main">
        <div className="title__container">
          <h4 className="settings__title wrapper-title">Настройки</h4>
        </div>
        <div className="settings__controls wrapper">
          <div className="settings__controls__menu">
            <div className="settings__controls__menu-item">Основные</div>
          </div>
          <form className="settings__controls__form" onSubmit={handleSubmit}>
            {formItems.map((item, index) => (
              <div className="settings__controls__form-item" key={index}>
                <p className="title">{item.title}</p>
                <p className="description">{item.description}</p>
                <input
                  className="input"
                  type="text"
                  placeholder={item.placeholder}
                  name={item.name}
                  value={item.value}
                  maxLength={item.maxLength}
                  onChange={handleChange}
                />
                <div className="settings__controls__form-footer">
                  <p className="description">
                    {item.name === "username"
                      ? "Не более 32 символов"
                      : "Email должен быть действительным"}
                  </p>
                  <button className="button" type="submit">
                    Сохранить
                  </button>
                </div>
              </div>
            ))}
            <div className="settings__controls__form-item redborder">
              <p className="title">Удалить аккаунт</p>
              <p className="description">
                Учетная запись и все связанные с ней ссылки будут полностью
                удалены
              </p>
              <div className="settings__controls__form-footer redborder__footer">
                <p className="description"></p>
                <button className="button red" onClick={handleDeleteModalOpen}>
                  Удалить аккаунт
                </button>
              </div>
            </div>
          </form>
        </div>
        {isDeleteModalOpen && (
          <Overlay onClose={handleDeleteModalClose}>
            <DeleteAccountModal onClose={handleDeleteModalClose} />
          </Overlay>
        )}
      </div>
    </div>
  );
};

export default SettingsForm;