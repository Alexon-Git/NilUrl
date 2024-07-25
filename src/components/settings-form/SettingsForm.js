import React, { useState, useEffect } from "react";
import "./settings-form.css";
import { DeleteAccountModal, Overlay} from "../../components";
import VerifyCodeModalEmail from "../popups/VerifyCodeModalEmail";
import VerifyCodeModalPassword from "../popups/VerifyCodeModalPassword.js";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import AlertPopup from "../popups/AlertPopup";

const SettingsForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture
  const [profilePictureError, setProfilePictureError] = useState(""); // State for file errors
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isVerifyCodeVisible, setVerifyCodeVisibility] = useState(false);
  const [isVerifyCodeVisiblePass, setVerifyCodeVisiblePass] = useState(false);
  const [message, setMessage] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [isAlertPopupVisible, setAlertPopupVisibility] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validFormats = ["image/jpeg", "image/png"];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (file) {
      if (!validFormats.includes(file.type)) {
        setProfilePictureError("Только файлы .png и .jpg разрешены.");
        return;
      }
      if (file.size > maxSize) {
        setProfilePictureError("Файл не должен превышать 2 МБ.");
        return;
      }

      setProfilePictureError(""); // Clear error
      setProfilePicture(file);
    }
  };

  const handleDeleteModalOpen = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const containsSpecialCharacters = (string) => {
    return /[!@#\$%\^\&*\)\(+=._-]+/.test(string);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name } = e.target.dataset;
    let isValid = true;
    let newErrors = { username: "", email: "" };

    if (name === "username" && (formData.username.length < 3 || containsSpecialCharacters(formData.username))) {
      newErrors.username = "Имя пользователя должно быть не менее 3 символов и не должно содержать специальных символов.";
      isValid = false;
    }

    if (name === "email" && !validateEmail(formData.email)) {
      newErrors.email = "Email должен быть действительным.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      return;
    }
    const formDataToSend = new FormData();
    if (name === "email") {
      const Send_data = JSON.stringify({ email_new: formData.email }); 
      fetch("https://nilurl.ru:8000/send_update_email_code.php", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          credentials: "include",
          body: Send_data,
      })
      .then(response => response.json())
        .then((data) => {
          if (data.success) {
            setVerifyCodeVisibility(true);
          } else {
            setPopupMessage(data.message || "Ошибка при отправке кода подтверждения.");
            setAlertPopupVisibility(true);
          }
        })
        .catch((error) => {
          setPopupMessage("Ошибка при выполнении запроса.");
          setAlertPopupVisibility(true);
          console.error("Error:", error);
        });
      return;
    }

    if (name === "password") {
      const Send_data = JSON.stringify({ email_new: formData.email }); 
      fetch("https://nilurl.ru:8000/send_update_password_code.php", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          credentials: "include",
          body: Send_data,
      })
      .then(response => response.json())
        .then((data) => {
          if (data.success) {
            setVerifyCodeVisiblePass(true);
          } else {
            setPopupMessage(data.message || "Ошибка при отправке кода подтверждения.");
            setAlertPopupVisibility(true);
          }
        })
        .catch((error) => {
          setPopupMessage("Ошибка при выполнении запроса.");
          setAlertPopupVisibility(true);
          console.error("Error:", error);
        });
      return;
    }
    
    if (name === "username") {
      formDataToSend.append("username", formData.username);
    } else if (profilePicture) {
      formDataToSend.append("profile_picture", profilePicture);
    }

    const endpoint = name === "username" ? "update_username.php" : "update_profile_picture.php";

    fetch(`https://nilurl.ru:8000/${endpoint}`, {
      method: "POST",
      body: formDataToSend,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPopupMessage("Изменения сохранены успешно.");
          setAlertPopupVisibility(true);
          if (data.access_token) {
            Cookies.set("access_token", data.access_token, { expires: 1 });
          }
          if (data.refresh_token) {
            localStorage.setItem("refresh_token", data.refresh_token);
          }
        } else {
          setPopupMessage(data.message);
          setAlertPopupVisibility(true);
        }
      })
      .catch((error) => {
        setPopupMessage("Ошибка при выполнении запроса.");
        setAlertPopupVisibility(true);
        console.error("Error:", error);
      });
  };

  

  const formItems = [
    {
      title: "Ваше имя пользователя",
      type: "text",
      description: "Оно будет отображаться в 'Nil'",
      name: "username",
      value: formData.username,
      maxLength: 32,
      error: errors.username,
    },
    {
      title: "Ваш email",
      description: "Введите вашу электронную почту",
      type: "text",
      name: "email",
      value: formData.email,
      maxLength: undefined,
      error: errors.email,
    },
    {
      title: "Смена пароля",
      description: "Введите новый пароль",
      type: "password",
      name: "password",
      value: formData.password,
      maxLength: 40,
      error: errors.password,
    },
  ];

  const handleClosePopup = () => {
    setAlertPopupVisibility(false);
    setPopupMessage("");
  };

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
          <form className="settings__controls__form">
            {formItems.map((item, index) => (
              <div key={index}>
                <div className="settings__controls__form-item">
                  <p className="title">{item.title}</p>
                  <p className="description">{item.description}</p>
                  <input
                    className={item.error ? "input input-error" : "input"}
                    type= {item.type}
                    placeholder={item.placeholder}
                    name={item.name}
                    value={item.value}
                    maxLength={item.maxLength}
                    onChange={handleChange}
                  />
                  {item.error && (
                    <span className="error-message-link">{item.error}</span>
                  )}
                </div>
                <div className="settings__controls__form-footer">
                  <p className="description">
                  {item.name === "username"
                    ? "Не менее 3 символов и не более 32 символов."
                    : item.name === "email"
                    ? "Email должен быть действительным."
                    : item.name === "password"
                    ? "После ввода текущего пароля будет открыто окно для изменения."
                    : ""}
                  </p>
                  <button
                    className="button"
                    type="submit"
                    data-name={item.name}
                    onClick={handleSubmit}
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            ))}
            <div>
              <div className="settings__controls__form-item">
                <p className="title">Фотография профиля</p>
                <p className="description">Загрузите изображение профиля</p>
                <label
                  htmlFor="profile-picture-upload"
                  className="profile-picture-upload"
                >
                  <input
                    id="profile-picture-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <div className="profile-picture-preview">
                    {profilePicture ? (
                      <img src={URL.createObjectURL(profilePicture)} alt="Profile" />
                    ) : (
                      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="m409.785156 278.5-153.785156 153.785156-153.785156-153.785156 28.285156-28.285156 105.5 105.5v-355.714844h40v355.714844l105.5-105.5zm102.214844 193.5h-512v40h512zm0 0"/>
                      </svg>
                    )}
                  </div>
                </label>
                {profilePictureError && (
                  <span className="error-message-link">
                  {profilePictureError}
                </span>
                )}
              </div>
              <div className="settings__controls__form-footer">
                <p className="description">
                  Принимаемые типы файлов: .png, .jpg. Максимальный размер файла: 2 МБ.
                </p>
                <button
                  className="button"
                  type="submit"
                  data-name="profile_picture"
                  onClick={handleSubmit}
                >
                  Сохранить
                </button>
              </div>
            </div>
            <div>
              <div className="settings__controls__form-item redborder">
                <p className="title">Удалить аккаунт</p>
                <p className="description">
                  Учетная запись и все связанные с ней ссылки будут полностью удалены
                </p>
              </div>
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
        {isVerifyCodeVisible && (
          <Overlay onClose={() => setVerifyCodeVisibility(false)}>
            <VerifyCodeModalEmail
            onClose={() => setVerifyCodeVisibility(false)}
            onSuccess={(message) => {
              setPopupMessage(message || "Email изменен успешно.");
              setAlertPopupVisibility(true);
              setVerifyCodeVisibility(false);
              
            }}
            email={formData.email}
          />
          </Overlay>
        )}
        {isVerifyCodeVisiblePass && (
          <Overlay onClose={() => setVerifyCodeVisiblePass(false)}>
            <VerifyCodeModalPassword
            onClose={() => setVerifyCodeVisiblePass(false)}
            onSuccess={(message) => {
              setPopupMessage(message || "Пароль изменен успешно.");
              setAlertPopupVisibility(true);
              setVerifyCodeVisiblePass(false);
              
            }}
            password={formData.password}
          />
          </Overlay>
        )}
        {isAlertPopupVisible && (
          <AlertPopup onClose={handleClosePopup} message={popupMessage} />
        )}
      </div>
    </div>
  );
};

export default SettingsForm;