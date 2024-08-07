import React, { useState, useEffect } from "react";
import "./verifyCodeModal.css";
import Cookies from "js-cookie";

const VerifyCodeModalEmail = ({ onClose, onSuccess, email }) => {
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
    fetch("https://nilurl.ru:8000/verify_email_update_code.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ code: verificationCode, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (data.access_token) {
            Cookies.set("access_token", data.access_token, { expires: 1 });
          }
          if (data.refresh_token) {
            localStorage.setItem("refresh_token", data.refresh_token);
          }
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
    fetch("https://nilurl.ru:8000/send_update_email_code.php", {
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

export default VerifyCodeModalEmail;