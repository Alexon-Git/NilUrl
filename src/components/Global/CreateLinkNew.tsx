import React, {useState} from 'react';
import "../../styles/Global/CreateLinkNew.css"
import CreatingLink from "../creating-link/CreatingLink";
import Overlay from '../creating-link/Overlay';
const CreateLinkNew = () => {
    const [flag,setFlag] = useState(false)
    const click = () =>{
        setFlag(false);
    }
    return (
        <div className="CrLinkNewButtonM">
            {flag &&
            <Overlay onClose={()=>click()}>
                <CreatingLink />
            </Overlay>
            }

            <div>
                <div onClick={()=>{setFlag(true)}} className="CrLinkNewButtonText">
                    Создать ссылку
                </div>
            </div>
        </div>
    );
};

export default CreateLinkNew;
