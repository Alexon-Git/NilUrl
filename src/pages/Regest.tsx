import "./Regest.css";
import { useNavigate } from "react-router-dom";
import { LOGINPAGE_ROUTE, MAINPAGE_ROUTE } from "../LogicComp/utils/Const";
import { useRef, useState, useEffect } from "react";
import { BackImage, AlertPopup } from "../components";
import { Helmet } from 'react-helmet';

function Reg() {
  const ref = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSec, setPasswordSec] = useState("");
  const [username, setUsername] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [serverVerificationCode, setServerVerificationCode] = useState("");
  const [timer, setTimer] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); 
  const [isAlertPopupVisible, setAlertPopupVisibility] = useState(false); 
  const [currentError, setCurrentError] = useState<string | null>(null);

  useEffect(() => {
    const access_token = getCookie("access_token");
    if (access_token) {
      navigate("/links");
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
        const countdown = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        setIsButtonDisabled(true);
        return () => clearInterval(countdown);
    } else {
        setIsButtonDisabled(false);
    }
}, [timer]);

  const getCookie = (name: string) => {
    const cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      const cookiePair = cookieArray[i].split("=");
      if (name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  };

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onPassSecChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordSec(event.target.value);
  };

  const onVerificationCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(event.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(username);
  };

  const onButtonClick = () => {
    if (!email) {
      setCurrentError("Пожалуйста, введите адрес электронной почты.");
      return;
    }

    if (!username) {
      setCurrentError("Пожалуйста, введите имя пользователя.");
      return;
    }

    if (!password) {
      setCurrentError("Пожалуйста, введите пароль.");
      return;
    }

    if (!passwordSec) {
      setCurrentError("Пожалуйста, введите подтверждение пароля.");
      return;
    }

    if (!isValidEmail(email)) {
      setCurrentError("Пожалуйста, введите действительный адрес электронной почты.");
      return;
    }

    if (!isValidUsername(username)) {
      setCurrentError("Имя пользователя не должно содержать специальных символов.");
      return;
    }

    if (username.length < 3) {
      setCurrentError("Имя пользователя должно быть не менее 3 символов.");
      return;
    }

    if (password.length < 6) {
      setCurrentError("Пароль должен содержать минимум 6 символов.");
      return;
    }

    if (password !== passwordSec) {
      setCurrentError("Не совпадают пароли.");
      return;
    }

    setCurrentError(null);
    handleRegistration();
  };

  const handleRegistration = () => {
    const checkData = {
      email: email,
      username: username,
    };

    fetch("https://nilurl.ru:8000/check_unique.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          sendVerificationCode();
        } else {
          setCurrentError("Email или имя пользователя уже заняты.");
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setCurrentError(
          "Произошла ошибка при проверке уникальности данных. Пожалуйста, попробуйте позже."
        );
      });
  };

  const sendVerificationCode = () => {
    const userData = {
      email: email,
      username: username,
    };

    fetch("https://nilurl.ru:8000/send_verification_code.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setIsVerificationSent(true);
          setTimer(60); // Set the timer for 60 seconds
        } else {
          setCurrentError("Не удалось отправить проверочный код. Пожалуйста, попробуйте снова.");
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setCurrentError(
          "Произошла ошибка при отправке проверочного кода. Пожалуйста, попробуйте позже."
        );
      });
  };

  const resendVerificationCode = () => {
    sendVerificationCode();
    setTimer(60);
  };

  const verifyCodeAndRegister = () => {
    const userData = {
      email: email,
      verificationCode: verificationCode, 
    };

    fetch("https://nilurl.ru:8000/check_mail_code.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          handleFinalRegistration(); // Вызываем функцию для окончательной регистрации
        } else {
          setCurrentError("Регистрация не удалась. Пожалуйста, попробуйте снова.");
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setCurrentError(
          "Произошла ошибка при регистрации. Пожалуйста, попробуйте позже."
        );
      });
  };

  const handleFinalRegistration = () => {
    const userData = {
      email: email,
      username: username,
      password: password,
    };

    fetch("https://nilurl.ru:8000/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPopupMessage("Успешная регистрация.");
          setAlertPopupVisibility(true);
          navigate("/login"); // Переход на страницу логина после успешной регистрации
        } else {
          setCurrentError("Неверный код, попробуйте снова");
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setCurrentError(
          "Произошла ошибка при регистрации. Пожалуйста, попробуйте позже."
        );
      });
  };

  const handleClosePopup = () => {
    setAlertPopupVisibility(false);
    setPopupMessage("");
  };

  return (
    <div className="d1">
      <Helmet>
        <title>Регистрация</title>
      </Helmet>
      <div
        className="d2_1"
        style={{ background: "linear-gradient(225deg, #e25186, #6059ff)" }}
      >
        <div className="slider-thumb"></div>
      </div>
      <div className="d2_2">
        <div className="d3_1">
          <span className="button__login-back">
            <img src={BackImage} alt="Назад" onClick={() => { navigate(MAINPAGE_ROUTE); }} style={{ width: '90px', height: 'auto' }} />
          </span>
          <a href="https://nil-agency.ru" className="a3_1">
            <img
              src={process.env.PUBLIC_URL + "/NilLogo.svg"}
              width={40}
              alt="NIL Logo"
            />
          </a>
          <h3 className="h3">Регистрация в NILUrl</h3>
          <p className="p1">Начните создавать короткие ссылки.</p>
        </div>
        <div className="d3_2">
          {currentError && <div className="error-message-link">{currentError}</div>}
          {!isVerificationSent ? (
            <>
              <form className="f3_1">
                <input
                  type="text"
                  data-t="field:input-login"
                  dir="ltr"
                  aria-invalid="false"
                  autoComplete="username"
                  className="in3_1"
                  id="passp-field-login"
                  name="login"
                  placeholder="Имя пользователя"
                  value={username}
                  onChange={onUsernameChange}
                />
              </form>
              <form className="f3_1">
                <input
                  type="text"
                  data-t="field:input-login"
                  dir="ltr"
                  aria-invalid="false"
                  autoComplete="username"
                  className="in3_1"
                  id="passp-field-login"
                  name="login"
                  placeholder="Электронная почта"
                  value={email}
                  onChange={onEmailChange}
                />
              </form>
              <form className="f3_2">
                <input
                  type="password"
                  data-t="field:input-login"
                  dir="ltr"
                  aria-invalid="false"
                  autoComplete="new-password"
                  className="in3_1"
                  id="passp-field-login"
                  name="login"
                  placeholder="Пароль"
                  value={password}
                  onChange={onPassChange}
                />
              </form>
              <form className="f3_2">
                <input
                  type="password"
                  data-t="field:input-login"
                  dir="ltr"
                  aria-invalid="false"
                  autoComplete="new-password"
                  className="in3_1"
                  id="passp-field-login"
                  name="login"
                  placeholder="Подтверждение пароля"
                  value={passwordSec}
                  onChange={onPassSecChange}
                />
              </form>
              <button
                onClick={onButtonClick}
                type="button"
                className="b3"
                ref={ref}
              >
                <p className="p2">Зарегистрироваться</p>
              </button>
            </>
          ) : (
            <>
              <p className="p1">Пожалуйста, введите проверочный код, отправленный на вашу почту.</p>
              <form className="f3_2">
                <input
                  type="text"
                  data-t="field:input-verification"
                  dir="ltr"
                  aria-invalid="false"
                  className="in3_1"
                  id="passp-field-verification"
                  name="verification"
                  placeholder="Проверочный код"
                  value={verificationCode}
                  onChange={onVerificationCodeChange}
                />
                <button
                  onClick={resendVerificationCode}
                  type="button"
                  className="b3"
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled ? `Отправить повторно (${timer} сек)` : 'Отправить повторно'}
                </button>
              </form>
              <button
                onClick={verifyCodeAndRegister}
                type="button"
                className="b3"
                ref={ref}
              >
                <p className="p2">Подтвердить</p>
              </button>
            </>
          )}
          <p className="p3_1">
            Уже имеете аккаунт?
            <a
              className="a3_2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(LOGINPAGE_ROUTE);
              }}
            >
              Войти
            </a>
            .
          </p>
        </div>
      </div>
      {isAlertPopupVisible && (
        <AlertPopup onClose={handleClosePopup} message={popupMessage} />
      )}
    </div>
  );
}

export default Reg;
