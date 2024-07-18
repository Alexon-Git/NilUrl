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
  const [popupMessage, setPopupMessage] = useState(""); 
  const [isAlertPopupVisible, setAlertPopupVisibility] = useState(false); 
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const access_token = getCookie("access_token");
    if (access_token) {
      navigate("/links");
    }
  }, []);

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
        } else {
          setPopupMessage("Неправильный email или пароль");
          setAlertPopupVisibility(true);
        }
      })
      .catch((error) => {
        setPopupMessage("Ошибка при входе в систему. Пожалуйста, попробуйте позже.");
        setAlertPopupVisibility(true);
      });
  };

  return (
    <div className="d1">
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <div className="d2_1" style={{ background: "linear-gradient(225deg, #e25186, #6059ff)" }}>
        <div className="slider-thumb"></div>
      </div>
      <div className="d2_2">
        <div className="d3_1">
          <span className="button__login-back">
            <img
              src={BackImage}
              alt="Назад"
              onClick={() => { navigate(MAINPAGE_ROUTE); }}
              style={{ width: '90px', height: 'auto' }}
            />
          </span>
          <a href="https://nil-agency.ru" className="a3_1">
            <img
              src={process.env.PUBLIC_URL + "/NilLogo.svg"}
              width={40}
              alt="NIL Logo"
            />
          </a>
          <h3 className="h3">Вход в NILUrl</h3>
          <p className="p1">Войдите, чтобы начать творить!</p>
        </div>
        <div className="d3_2">
          <form className="f3_1" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              data-t="field:input-login"
              dir="ltr"
              aria-invalid="false"
              autoCorrect="off"
              autoCapitalize="off"
              autoComplete="username"
              className={errors.email ? "in3_1 input-error" : "in3_1"}
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
              className={errors.password ? "in3_1 input-error" : "in3_1"}
              id="passp-field-login"
              name="login"
              placeholder="Пароль"
              value={password}
              onChange={onPassChange}
            />
            {errors.password && <span className="error-message-link">{errors.password}</span>}
          </form>
          <div style={{ display: "flex" }}>
            <button type="button" className="b3" onClick={handleLogin}>
              <p className="p2">Войти</p>
            </button>
            <button type="button" className="b3_2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M15.073 2H8.937C3.333 2 2 3.333 2 8.927v6.136C2 20.666 3.323 22 8.927 22h6.136C20.666 22 22 20.677 22 15.073V8.937C22 3.333 20.677 2 15.073 2Zm3.073 14.27h-1.459c-.552 0-.718-.447-1.708-1.437c-.864-.833-1.229-.937-1.448-.937c-.302 0-.385.083-.385.5v1.312c0 .355-.115.563-1.042.563a5.692 5.692 0 0 1-4.448-2.667a11.626 11.626 0 0 1-2.302-4.833c0-.219.083-.417.5-.417h1.458c.375 0 .51.167.657.552c.708 2.084 1.916 3.896 2.406 3.896c.188 0 .27-.083.27-.552v-2.146c-.062-.979-.582-1.062-.582-1.416a.36.36 0 0 1 .374-.334h2.292c.313 0 .417.156.417.531v2.896c0 .313.135.417.229.417c.188 0 .333-.104.677-.448a11.999 11.999 0 0 0 1.792-2.98a.628.628 0 0 1 .635-.416h1.459c.437 0 .53.219.437.531a18.205 18.205 0 0 1-1.958 3.365c-.157.24-.22.365 0 .646c.145.219.656.646 1 1.052a6.486 6.486 0 0 1 1.229 1.708c.125.406-.084.615-.5.615Z"
                />
              </svg>
            </button>
          </div>
          <p className="p3_1">
            Не имеете аккаунта?
            <a
              className="a3_2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(REGPAGE_ROUTE);
              }}
            >
              Регистрация
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Log;
