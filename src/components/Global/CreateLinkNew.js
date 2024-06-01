import React, { useState, useEffect } from 'react';
import "../../styles/Global/CreateLinkNew.css"
import CreatingLink from "../creating-link/CreatingLink";
import Overlay from '../creating-link/Overlay';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
const CreateLinkNew = ({highestKey}) => {
    const [flag,setFlag] = useState(false)
    const [userStatus, setUserStatus] = useState(null);
    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            const user_status = decodedToken.user_status;
            setUserStatus(user_status);
        }
    }, []);

    const click = () => {
        if (userStatus === 'free' && highestKey >= 15) {
            alert('Ваше количество ссылок достигло максимума для Бесплатной подписки, для большего количества ссылок приобретите Premium');
        } else {
            setFlag(true);
        }
    };
    return (
        <div>
            {flag &&
                <Overlay onClose={()=> setFlag(false)}>
                    <CreatingLink />
                </Overlay>
            }

        <div className="CrLinkNewButtonM" onClick={()=>{click()}}>
            <div >
                <div  className="CrLinkNewButtonText">
                    Создать ссылку
                </div>
            </div>
        </div>
        </div>
    );
};

export default CreateLinkNew;
