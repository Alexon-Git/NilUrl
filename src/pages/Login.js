import "./Regest.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { REGPAGE_ROUTE, MAINPAGE_ROUTE } from "../LogicComp/utils/Const";
import { useState } from "react";
import { BackImage } from "../components";
import { Helmet } from 'react-helmet';
import AlertPopup from "../../src/components/popups/AlertPopup";

function Log() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [isAccountUnlockMode, setIsAccountUnlockMode] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isAlertPopupVisible, setAlertPopupVisibility] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    verificationCode: '',
    recoveryEmail: ''
  });
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

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name) => {
    const cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      const cookiePair = cookieArray[i].split("=");
      if (name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPassChange = (event) => {
    setPassword(event.target.value);
  };

  const onVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };
  const onRecoveryEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    let newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Пожалуйста, введите адрес электронной почты.";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Пожалуйста, введите пароль.";
      isValid = false;
    }

    if (email && !isValidEmail(email)) {
      newErrors.email = "Пожалуйста, введите действительный адрес электронной почты.";
      isValid = false;
    }

    if (password && password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      return;
    }

    fetch("https://nilurl.ru:8000/check_loginData.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          localStorage.setItem("refresh_token", response.refresh_token);
          setCookie("access_token", response.access_token, 1);
          navigate("/links");
        } else if (response.recover) {
          setIsAccountUnlockMode(true);
          sendAccountUnlockCode();
        } else {
          setErrors({
            email: "Неправильный email или пароль",
            password: ""
          });
          isValid = false;
        }
      })
      .catch((error) => {
        setErrors({
          email: "Ошибка при входе в систему. Пожалуйста, попробуйте позже.",
          password: ""
        });
      });
  };

  
  
  const sendVerificationCode = () => {
    if (!isValidEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Введите действительный адрес электронной почты.",
        password: "",
        verificationCode: "",
        recoveryEmail: "Введите действительный адрес электронной почты"
      }));
      return;
    }
    
    fetch("https://nilurl.ru:8000/send_recovery_code.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setIsVerificationSent(true);
          setTimer(60);
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Не удалось отправить проверочный код. Пожалуйста, попробуйте снова.",
            password: "",
            verificationCode: "",
            recoveryEmail: data.message
          }));
        }
      })
      .catch((error) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Произошла ошибка при отправке проверочного кода. Пожалуйста, попробуйте позже.",
          password: "",
          verificationCode: "",
          recoveryEmail: "Произошла ошибка при отправке проверочного кода. Пожалуйста, попробуйте позже."
        }));
      });
  };
  
  const sendAccountUnlockCode = () => {
    fetch("https://nilurl.ru:8000/send_unlock_code.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setIsVerificationSent(true);
          setTimer(60);
        } else {
          setErrors({
            email: "Не удалось отправить код разблокировки. Пожалуйста, попробуйте снова.",
            password: "",
            verificationCode: "",
            recoveryEmail: "Не удалось отправить код разблокировки. Пожалуйста, попробуйте снова."
          });
        }
      })
      .catch((error) => {
        setErrors({
          email: "Произошла ошибка при отправке кода разблокировки. Пожалуйста, попробуйте позже.",
          password: "",
          verificationCode: "",
          recoveryEmail: ""
        });
      });
  };
  
  const verifyCodeAndRecover = () => {
    fetch("https://nilurl.ru:8000/verify_recovery_code.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, verificationCode }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPopupMessage("Ваш пароль был отправлен на почту.");
          setAlertPopupVisibility(true);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          setErrors({
            email: "",
            password: "",
            verificationCode: "Неверный проверочный код. Пожалуйста, попробуйте снова.",
            recoveryEmail: ""
          });
        }
      })
      .catch((error) => {
        setErrors({
          email: "",
          password: "",
          verificationCode: "Произошла ошибка при проверке проверочного кода. Пожалуйста, попробуйте позже.",
          recoveryEmail: ""
        });
      });
  };
  
  const verifyUnlockCodeAndUnfreeze = () => {
    fetch("https://nilurl.ru:8000/verify_unlock_code.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, verificationCode }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPopupMessage("Ваш аккаунт был разблокирован.");
          setAlertPopupVisibility(true);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          setErrors({
            email: "",
            password: "",
            verificationCode: "Неверный код разблокировки. Пожалуйста, попробуйте снова.",
            recoveryEmail: ""
          });
        }
      })
      .catch((error) => {
        setErrors({
          email: "",
          password: "",
          verificationCode: "Произошла ошибка при проверке кода разблокировки. Пожалуйста, попробуйте позже.",
          recoveryEmail: ""
        });
      });
  };

  const handleClosePopup = () => {
    setAlertPopupVisibility(false);
    setPopupMessage("");
  };

  return (
    <div className="d1">
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <div className="d2_1" style={{ background: 'linear-gradient(225deg, #e25186, #6059ff)' }}>
        <div className="slider-thumb"></div>
      </div>
      <div className="d2_2">
        <div className="d3_1">
          <span className="button__login-back">
            <img
              src={BackImage}
              alt="Назад"
              onClick={() => navigate(MAINPAGE_ROUTE)}
              style={{ width: '90px', height: 'auto' }}
            />
          </span>
          <a href="https://nil-agency.ru" className="a3_1">
            <img src={`${process.env.PUBLIC_URL}/NilLogo.svg`} width={40} alt="NIL Logo" />
          </a>
          <h3 className="h3">Вход в NILUrl</h3>
          <p className="p1">Войдите, чтобы начать творить!</p>
        </div>
        <div className="d3_2">
            {isAccountUnlockMode ? (
          <>
            <p className="p1">Ваш аккаунт был заморожен. Введите код разблокировки, отправленный на вашу почту.</p>
            <form className="f3_2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                data-t="field:input-verification"
                dir="ltr"
                aria-invalid="false"
                className={errors.verificationCode ? 'in3_1 input-error' : 'in3_1'}
                id="passp-field-verification"
                name="verification"
                placeholder="Код разблокировки"
                value={verificationCode}
                onChange={onVerificationCodeChange}
              />
              {errors.verificationCode && <span className="error-message-link">{errors.verificationCode}</span>}
              <button onClick={sendAccountUnlockCode} type="button" className="b3" disabled={isButtonDisabled}>
                {isButtonDisabled ? `Отправить повторно (${timer} сек)` : 'Отправить повторно'}
              </button>
            </form>
            <button type="button" className="b3" onClick={verifyUnlockCodeAndUnfreeze}>
              <p className="p2">Подтвердить</p>
            </button>
          </>
        ) : isRecoveryMode ? (
          <>
            {isVerificationSent ? (
              <>
                <p className="p1">Пожалуйста, введите проверочный код, отправленный на вашу почту.</p>
                <form className="f3_2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    data-t="field:input-verification"
                    dir="ltr"
                    aria-invalid="false"
                    className={errors.verificationCode ? 'in3_1 input-error' : 'in3_1'}
                    id="passp-field-verification"
                    name="verification"
                    placeholder="Проверочный код"
                    value={verificationCode}
                    onChange={onVerificationCodeChange}
                  />
                  {errors.verificationCode && <span className="error-message-link">{errors.verificationCode}</span>}
                  <button onClick={sendVerificationCode} type="button" className="b3" disabled={isButtonDisabled}>
                    {isButtonDisabled ? `Отправить повторно (${timer} сек)` : 'Отправить повторно'}
                  </button>
                </form>
                <button type="button" className="b3" onClick={verifyCodeAndRecover}>
                  <p className="p2">Подтвердить</p>
                </button>
              </>
            ) : (
              <>
                <p className="p1">Пожалуйста, введите ваш email для восстановления пароля.</p>
                <form className="f3_1" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    data-t="field:input-recovery"
                    dir="ltr"
                    aria-invalid="false"
                    className={errors.recoveryEmail ? 'in3_1 input-error' : 'in3_1'}
                    id="passp-field-recovery"
                    name="recovery"
                    placeholder="Электронная почта"
                    value={email}
                    onChange={onRecoveryEmailChange}
                  />
                  {errors.recoveryEmail && <span className="error-message-link">{errors.recoveryEmail}</span>}
                </form>
                <button type="button" className="b3" onClick={sendVerificationCode}>
                  <p className="p2">Отправить код</p>
                </button>
              </>
            )}
          </>
        ) : (
            <>
              <form className="f3_1" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  data-t="field:input-login"
                  dir="ltr"
                  aria-invalid="false"
                  autoCorrect="off"
                  autoCapitalize="off"
                  autoComplete="username"
                  className={errors.email ? 'in3_1 input-error' : 'in3_1'}
                  id="passp-field-login"
                  name="login"
                  placeholder="Электронная почта"
                  value={email}
                  onChange={onEmailChange}
                />
                {errors.email && <span className="error-message-link">{errors.email}</span>}
              </form>
              <form className="f3_2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="password"
                  data-t="field:input-login"
                  dir="ltr"
                  aria-invalid="false"
                  autoCorrect="off"
                  autoCapitalize="off"
                  autoComplete="current-password"
                  className={errors.password ? 'in3_1 input-error' : 'in3_1'}
                  id="passp-field-login"
                  name="login"
                  placeholder="Пароль"
                  value={password}
                  onChange={onPassChange}
                />
                {errors.password && <span className="error-message-link">{errors.password}</span>}
              </form>
              <div style={{ display: 'flex' }}>
                <button type="button" className="b3" onClick={handleLogin}>
                  <p className="p2">Войти</p>
                </button>
              </div>
              <p className="p3_1">
                Не имеете аккаунта?
                <a className="a3_2" style={{ cursor: 'pointer' }} onClick={() => navigate(REGPAGE_ROUTE)}>
                  Регистрация
                </a>
                .
              </p>
              <p className="p3_1">
                Забыли пароль?&nbsp;
                <a
                  className="a3_2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsRecoveryMode(true)}
                >
                  Восстановить
                </a>
                .
                </p>
            </>
          )}
        </div>
      </div>
      {isAlertPopupVisible && <AlertPopup onClose={handleClosePopup} message={popupMessage} />}
    </div>
  );
};

export default Log;