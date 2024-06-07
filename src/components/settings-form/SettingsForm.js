import React, { useState, useEffect } from 'react';
import "./settings-form.css";
import { DeleteAccountModal, Overlay } from "../../components";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const SettingsForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      setFormData({
        username: decodedToken.username,
        email: decodedToken.email,
      });
    }
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteModalOpen = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      return;
    }

    fetch('http://nilurl.ru:8000/update_user_data.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify(formData),
      access_token: JSON.stringify(Cookies.get('access_token')),
    })
      .then(response => response.json())
      .then(data => {
        console.log(formData);
        if (data.success) {
          alert('Изменения сохранены успешно.');
          // Обновляем токены в куках и localStorage
          Cookies.set('access_token', data.access_token, { expires: 1 });
          localStorage.setItem('refresh_token', data.refresh_token);
        } else {
          const text = data.message;
          window.location.reload();
        alert(text);
        }
      })
      .catch(error => {
        alert('Ошибка при выполнении запроса.');
        console.error('Error:', error);
      });
  };

  const formItems = [
    {
      title: "Ваше имя пользователя",
      description: "Оно будет отображаться в 'Nil'",
      name: "username",
      value: formData.username,
      maxLength: 32,
    },
    {
      title: "Ваш email",
      description: "Введите вашу электронную почту",
      name: "email",
      value: formData.email,
      maxLength: undefined,
    },
  ];

  return (
      <div className="main">
        <div className="title__container">
          <h4 className="settings__title wrapper-title">Настройки</h4>
        </div>
        <div className="sf-background">
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
                  placeholder={item.value}
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
          {message && <div className="message">{message}</div>}
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