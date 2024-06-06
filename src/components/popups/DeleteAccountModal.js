import React from "react";
import "./deleteAccountModal.css";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


const DeleteAccountModal = ({ onClose }) => {
  const navigate = useNavigate();
  const handleDeleteAccount = () => {
    fetch('http://localhost:8000/delete_account.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({}),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Ваш аккаунт успешно удален.');
        // Очищаем куки и localStorage
        Cookies.remove('access_token');
        localStorage.removeItem('refresh_token');
        
        navigate('/login');
      } else {
        alert('Ошибка при удалении аккаунта.');
      }
    })
    .catch(error => {
      alert('Ошибка при выполнении запроса.');
      console.error('Error:', error);
    });
  };
  
  return (
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
  );
};

export default DeleteAccountModal;