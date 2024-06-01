import React, { useState, useEffect } from 'react';
import "../../styles/Global/HeaderLinksPage.css"
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'
import {LINKSPAGE_ROUTE, SETTINGPAGE_ROUTE} from "../../LogicComp/utils/Const";
const HeaderLinksPage = () => {
    const [username, setUsername] = useState('');
    const navigator = useNavigate()
    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setUsername(decodedToken.username);
        }
    }, []);
    return (
        <div style={{borderBottom:"1px solid #E5E7EB"}}>
            <div className="HeaderLinksPageC">
                <div className="leftUserLogo">
                    <div className="UserLogoWord">
                        <div style={{paddingBottom:"2px"}}>
                            {username}
                        </div>
                    </div>
                </div>
                <div className="CentreHeaderLinksPageC">
                    <div onClick={()=>{navigator(SETTINGPAGE_ROUTE)}} className="CentreHeaderLinksPageT">
                        Настройки
                    </div>
                    <div onClick={()=>{navigator(LINKSPAGE_ROUTE)}} className="CentreHeaderLinksPageT">
                        Ссылки
                    </div>
                    <div onClick={()=>{navigator("/Graph")}} className="CentreHeaderLinksPageT">
                        Аналитика
                    </div>
                </div>
                <div onClick={()=>{navigator("/price")}} style={{display:"inline-flex",alignItems:"center",cursor:"pointer"}}>
                   FREE
                </div>
            </div>
        </div>
    );
};

export default HeaderLinksPage;
