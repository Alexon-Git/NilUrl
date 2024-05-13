import "./Regest.css"
import {useNavigate} from "react-router-dom";
import {LOGINPAGE_ROUTE} from "../LogicComp/utils/Const";
import {useRef, useState} from "react";

function Reg() {
    const ref = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate()
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [passwordSec,setPasswordSec] = useState('')
    const onEmailChange = (event:any) =>{
        setEmail(event.target.value)
    }
    const onPassChange = (event:any) =>{
        setPassword(event.target.value)
    }
    const onPassSecChange = (event:any) => {
        setPasswordSec(event.target.value);
    }
    const onButtonClick = () => {
        if(password !== passwordSec && ref.current!==null){
            ref.current.style.color = "red";
            ref.current.innerText = "Не совпадают пароли"
        }
    }
    return (
        <div className="d1">
            <div className="d2_1" style={{background: "linear-gradient(225deg, #e25186, #6059ff)"}}>
                <div className="slider-thumb"></div>
            </div>
            <div className="d2_2">
                <div className="d3_1">
                    <a href="https://nil-agency.ru" className="a3_1">
                        <img src={process.env.PUBLIC_URL +"/NilLogo.svg"} width={40} />
                    </a>
                    <h3 className="h3">Регистрация в NILUrl</h3>
                    <p className="p1">Начните создавать короткие ссылки.</p>
                </div>
                <div className="d3_2">
                    <form className="f3_1">
                        <input type="text" data-t="field:input-login" dir="ltr" aria-invalid="false" autoCorrect="off" autoCapitalize="off" autoComplete="username"
                               className="in3_1" id="passp-field-login" name="login" placeholder="Имя пользователя" value={email} onChange={(event)=>{onEmailChange(event)}}/>
                    </form>
                    <form className="f3_2">
                        <input type="password" data-t="field:input-login" dir="ltr" aria-invalid="false" autoCorrect="off" autoCapitalize="off" autoComplete="username"
                               className="in3_1" id="passp-field-login" name="login" placeholder="Пароль" value={password} onChange={(event)=>{onPassChange(event)}} />
                    </form>
                    <form className="f3_2">
                        <input type="password" data-t="field:input-login" dir="ltr" aria-invalid="false" autoCorrect="off" autoCapitalize="off" autoComplete="username"
                               className="in3_1" id="passp-field-login" name="login" placeholder="Подтверждение пароля" value={passwordSec} onChange={(event)=>{onPassSecChange(event)}} />
                    </form>
                    <button onClick={onButtonClick} type="button" className="b3" ref={ref}>
                        <p className="p2">Зарегистрироваться</p>
                    </button>
                    <p className="p3_1">Уже имеете аккаунт?
                        <a className="a3_2" style={{cursor:"pointer"}} onClick={()=>{navigate(LOGINPAGE_ROUTE)}}>Войти</a>
                        .</p>
                </div>
            </div>
        </div>
    );
}

export default Reg;
