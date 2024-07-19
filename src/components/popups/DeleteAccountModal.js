import React, { useState } from "react";
import "./deleteAccountModal.css";
import Cookies from 'js-cookie';
import AlertPopup from "../popups/AlertPopup";
import { useNavigate } from "react-router-dom";
import VerifyCodeModal from "./VerifyCodeModal";

const DeleteAccountModal = ({ onClose }) => {
  const [popupMessage, setPopupMessage] = useState(""); 
  const [isAlertPopupVisible, setAlertPopupVisibility] = useState(false); 
  const [isVerifyCodeVisible, setVerifyCodeVisibility] = useState(false); 
  const [isDeleteModalVisible, setDeleteModalVisibility] = useState(true);
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    fetch('https://nilurl.ru:8000/send_delete_account_code.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setDeleteModalVisibility(false);
        setVerifyCodeVisibility(true);
      } else {
        setPopupMessage("Ошибка при отправке кода подтверждения.");
        setAlertPopupVisibility(true);
      }
    })
    .catch(error => {
      setPopupMessage("Ошибка при выполнении запроса.");
      setAlertPopupVisibility(true);
      console.error('Error:', error);
    });
  };

  const sendEmailNotification = async () => {
    try {
      const response = await fetch('https://nilurl.ru:8000/send_account_deletion_email_notification.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (!data.success) {
        console.error('Ошибка при отправке email уведомления.');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  return (
    <>
      {isDeleteModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="button-exit"
              aria-label="Close"
              type="button"
              onClick={onClose}
            >
              <svg
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
              >
                <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
              </svg>
            </button>
            <p className="title">Удалить аккаунт</p>
            <p className="description">
              Вы действительно хотите удалить ваш аккаунт?
            </p>
            <div className="modal-buttons">
              <button className="button red" onClick={handleDeleteAccount}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
      {isVerifyCodeVisible && (
        <VerifyCodeModal
          onClose={() => setVerifyCodeVisibility(false)}
          onSuccess={async (message) => {
            setPopupMessage(message || "Ваш аккаунт успешно удален.");
            setAlertPopupVisibility(true);

            await sendEmailNotification(); 

            setTimeout(() => {
              Cookies.remove('access_token');
              localStorage.removeItem('refresh_token');
              navigate('/login');
            }, 5000);
          }}
        />
      )}
      {isAlertPopupVisible && <AlertPopup message={popupMessage} onClose={() => setAlertPopupVisibility(false)} />}
    </>
  );
};

export default DeleteAccountModal;