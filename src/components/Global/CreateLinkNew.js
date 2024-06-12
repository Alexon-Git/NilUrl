import React, { useState, useEffect } from 'react';
import "../../styles/Global/CreateLinkNew.css"
import CreatingLink from "../creating-link/CreatingLink";
import Overlay from '../creating-link/Overlay';

const CreateLinkNew = ({highestKey, userStatus}) => {
    const [flag,setFlag] = useState(false)
    
    

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
                    <CreatingLink userStatus = {userStatus}/>
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
