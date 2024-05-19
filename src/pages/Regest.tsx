import "./Regest.css";
import { useNavigate } from "react-router-dom";
import { LOGINPAGE_ROUTE } from "../LogicComp/utils/Const";
import { useRef, useState } from "react";

function Reg() {
    const ref = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSec, setPasswordSec] = useState('');
    const [username, setUsername] = useState('');

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

    const onButtonClick = () => {
        if (password !== passwordSec && ref.current !== null) {
            ref.current.style.color = "red";
            ref.current.innerText = "Не совпадают пароли";
        } else {
            handleRegistration();
        }
    };

    const handleRegistration = () => {
        const checkData = {
            email: email,
            username: username
        };

        fetch('check_unique.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    registerUser();
                } else {
                    alert('Email или имя пользователя уже заняты.');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при проверке уникальности данных. Пожалуйста, попробуйте позже.');
            });
    };

    const registerUser = () => {
        const userData = {
            email: email,
            username: username,
            password: password
        };

        fetch('register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/login';
                } else {
                    alert('Регистрация не удалась. Пожалуйста, попробуйте снова.');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.');
            });
    };

    return (
        <div className="d1">
            <div className="d2_1" style={{ background: "linear-gradient(225deg, #e25186, #6059ff)" }}>
                <div className="slider-thumb"></div>
            </div>
            <div className="d2_2">
                <div className="d3_1">
                    <a href="https://nil-agency.ru" className="a3_1">
                        <img src={process.env.PUBLIC_URL + "/NilLogo.svg"} width={40} alt="NIL Logo" />
                    </a>
                    <h3 className="h3">Регистрация в NILUrl</h3>
                    <p className="p1">Начните создавать короткие ссылки.</p>
                </div>
                <div className="d3_2">
                    <form className="f3_1">
                        <input type="text" data-t="field:input-login" dir="ltr" aria-invalid="false" autoComplete="username"
                            className="in3_1" id="passp-field-login" name="login" placeholder="Имя пользователя" value={username} onChange={onUsernameChange} />
                    </form>
                    <form className="f3_1">
                        <input type="text" data-t="field:input-login" dir="ltr" aria-invalid="false" autoComplete="username"
                            className="in3_1" id="passp-field-login" name="login" placeholder="Email" value={email} onChange={onEmailChange} />
                    </form>
                    <form className="f3_2">
                        <input type="password" data-t="field:input-login" dir="ltr" aria-invalid="false" autoComplete="new-password"
                            className="in3_1" id="passp-field-login" name="login" placeholder="Пароль" value={password} onChange={onPassChange} />
                    </form>
                    <form className="f3_2">
                        <input type="password" data-t="field:input-login" dir="ltr" aria-invalid="false" autoComplete="new-password"
                            className="in3_1" id="passp-field-login" name="login" placeholder="Подтверждение пароля" value={passwordSec} onChange={onPassSecChange} />
                    </form>
                    <button onClick={onButtonClick} type="button" className="b3" ref={ref}>
                        <p className="p2">Зарегистрироваться</p>
                    </button>
                    <p className="p3_1">Уже имеете аккаунт?
                        <a className="a3_2" style={{ cursor: "pointer" }} onClick={() => { navigate(LOGINPAGE_ROUTE) }}>Войти</a>
                        .</p>
                </div>
            </div>
        </div>
    );
}

export default Reg;
