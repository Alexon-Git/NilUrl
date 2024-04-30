import React, {useState} from 'react';
import "../../styles/Global/CreateLinkNew.css"
import CreatingLink from "../creating-link/CreatingLink";
const CreateLinkNew = () => {
    const [flag,setFlag] = useState(false)
    return (
        <div className="CrLinkNewButtonM">
            {flag &&
                <CreatingLink onClose={()=>setFlag(false)}/>
            }

            <div>
                <div onClick={()=>{setFlag(true)}} className="CrLinkNewButtonText">
                    Создать ссылку
                </div>
            </div>
            <svg style={{marginLeft:"10px"}} width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.589966" width="23" height="20" rx="4" fill="#3F3F46"/>
                <path d="M14.6212 12.7129C14.0079 12.9668 13.3654 13.0938 12.6935 13.0938C11.6115 13.0938 10.7794 12.7715 10.1974 12.127C9.61926 11.4785 9.3302 10.5215 9.3302 9.25586C9.3302 8.64258 9.41028 8.08789 9.57043 7.5918C9.73059 7.0957 9.95911 6.67578 10.256 6.33203C10.5529 5.98438 10.9122 5.7168 11.3341 5.5293C11.756 5.3418 12.2286 5.24805 12.7521 5.24805C13.1075 5.24805 13.4376 5.2793 13.7423 5.3418C14.047 5.40039 14.34 5.49219 14.6212 5.61719V6.64258C14.3439 6.49023 14.0568 6.375 13.7599 6.29688C13.463 6.21484 13.1388 6.17383 12.7872 6.17383C12.4279 6.17383 12.1017 6.24219 11.8087 6.37891C11.5197 6.51172 11.2736 6.70703 11.0704 6.96484C10.8673 7.21875 10.7111 7.53125 10.6017 7.90234C10.4923 8.26953 10.4376 8.68945 10.4376 9.16211C10.4376 10.1543 10.6388 10.9023 11.0411 11.4062C11.4435 11.9102 12.0333 12.1621 12.8107 12.1621C13.1388 12.1621 13.4532 12.125 13.754 12.0508C14.0548 11.9727 14.3439 11.8652 14.6212 11.7285V12.7129Z" fill="#9CA3AF"/>
            </svg>
        </div>
    );
};

export default CreateLinkNew;
