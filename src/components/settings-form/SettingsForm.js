import React, { useState, useEffect } from "react";
import "./settings-form.css";
import { DeleteAccountModal, Overlay } from "../../components";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import AlertPopup from "../popups/AlertPopup";

const SettingsForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture
  const [profilePictureError, setProfilePictureError] = useState(""); // State for file errors
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [isAlertPopupVisible, setAlertPopupVisibility] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
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
      setProfilePicture(URL.createObjectURL(file));
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
    let isValid = true;
    let newErrors = { username: "", email: "" };

    if (!validateEmail(formData.email)) {
      newErrors.email = "Email должен быть действительным.";
      isValid = false;
    }

    if (formData.username.length < 3) {
      newErrors.username = "Имя пользователя должно быть не менее 3 символов.";
      isValid = false;
    }

    if (containsSpecialCharacters(formData.username)) {
      newErrors.username =
        "Имя пользователя не должно содержать специальных символов.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    if (profilePicture) {
      formDataToSend.append("profile_picture", profilePicture);
    }

    fetch("https://nilurl.ru:8000/update_user_data.php", {
      method: "POST",
      body: formDataToSend,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPopupMessage("Изменения сохранены успешно.");
          setAlertPopupVisibility(true);
          Cookies.set("access_token", data.access_token, { expires: 1 });
          localStorage.setItem("refresh_token", data.refresh_token);
        } else {
          const text = data.message;
          window.location.reload();
          setPopupMessage(text);
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
      description: "Оно будет отображаться в 'Nil'",
      name: "username",
      value: formData.username,
      maxLength: 32,
      error: errors.username,
    },
    {
      title: "Ваш email",
      description: "Введите вашу электронную почту",
      name: "email",
      value: formData.email,
      maxLength: undefined,
      error: errors.email,
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
          <form className="settings__controls__form" onSubmit={handleSubmit}>
            {formItems.map((item, index) => (
              <div key={index}>
                <div className="settings__controls__form-item">
                  <p className="title">{item.title}</p>
                  <p className="description">{item.description}</p>
                  <input
                    className={item.error ? "input input-error" : "input"}
                    type="text"
                    placeholder={item.value}
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
                      ? "Не менее 3 символов и не более 32 символов"
                      : "Email должен быть действительным"}
                  </p>
                  <button className="button" type="submit">
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
                      <img src={profilePicture} alt="Profile" />
                    ) : (
                      <svg
                        width="100"
                        height="100"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                            <path
                              d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
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
                      Принимаемые типы файлов: .png, .jpg. Максимальный размер
                      файла: 2 МБ.
                    </p>
                    <button className="button" type="submit">
                      Сохранить
                    </button>
                  </div>
                </div>
                <div>
                  <div className="settings__controls__form-item redborder">
                    <p className="title">Удалить аккаунт</p>
                    <p className="description">
                      Учетная запись и все связанные с ней ссылки будут
                      полностью удалены
                    </p>
                  </div>
                  <div className="settings__controls__form-footer redborder__footer">
                    <p className="description"></p>
                    <button
                      className="button red"
                      onClick={handleDeleteModalOpen}
                    >
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
          {isAlertPopupVisible && (
            <AlertPopup onClose={handleClosePopup} message={popupMessage} />
          )}
        </div>
      );
    };

    export default SettingsForm;
