import React, { useState, useEffect } from "react";
import "./verifyCodeModal.css";

const VerifyCodeModal = ({ onClose, onSuccess }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (isResendDisabled) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      if (timer === 0) {
        setIsResendDisabled(false);
        clearInterval(countdown);
      }

      return () => clearInterval(countdown);
    }
  }, [timer, isResendDisabled]);

  const handleVerification = () => {
    fetch("https://nilurl.ru:8000/verify_delete_account_code.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ code: verificationCode }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          onSuccess(data.message);
        } else {
          setError(data.message || "Неверный код подтверждения.");
        }
      })
      .catch((error) => {
        setError("Ошибка при выполнении запроса.");
        console.error("Error:", error);
      });
  };

  const handleResendCode = () => {
    fetch("https://nilurl.ru:8000/send_delete_account_code.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTimer(60);
          setIsResendDisabled(true);
        } else {
          setError("Ошибка при повторной отправке кода подтверждения.");
        }
      })
      .catch((error) => {
        setError("Ошибка при выполнении запроса.");
        console.error("Error:", error);
      });
  };

  return (
    <div className="modal-verify">
      <div className="modal-content-verify">
        <p className="title-verify">Введите код подтверждения</p>
        <p className="description-verify">
          Код подтверждения был отправлен на вашу электронную почту. Пожалуйста,
          введите его ниже.
        </p>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="code-input-verify"
        />
        {error && (
          <p
            style={{
              paddingTop: "0px",
              marginBottom: "20px",
              marginTop: "0px",
            }}
            className="error-message-link"
          >
            {error}
          </p>
        )}
        <div className="modal-buttons-verify">
          <button className="button-verify red" onClick={handleVerification}>
            Подтвердить
          </button>
          <button
            className="button-verify resend"
            onClick={handleResendCode}
            disabled={isResendDisabled}
          >
            {isResendDisabled
              ? `Повторная отправка (${timer}s)`
              : "Повторная отправка"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodeModal;
