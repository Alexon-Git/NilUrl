import React, {useRef, useState} from 'react';
import "../../styles/GraphPage/AddresGp.css"

import MapGP from "./MapGP";
const AddresGp = () => {

    const [flag,setFlag] = useState(false)

    const refToBack = useRef<HTMLDivElement>(null)


    const clickCountry = () =>{
        if(refToBack.current!=null && flag){
            refToBack.current.style.transition = "0.2s ease-in"
            refToBack.current.style.left = "-1px"
            setFlag(false)
        }
    }

    const clickCity = (event:React.MouseEvent<HTMLDivElement>) =>{
        if(refToBack.current!=null && !flag){
            refToBack.current.style.transition = "0.2s ease-in"
            refToBack.current.style.left = "103px"
            setFlag(true)
        }
    }

    return (
        <div>
            <div className="AddressCountry">
                <div className="FontSizeTextGP">
                    Адреса
                </div>
                <div className="CotainerForBackAddress">
                    <div onClick={(event)=>{clickCountry()}} className="CountryGPinAd">
                        Cтрана
                    </div>
                    <div onClick={(event)=>{clickCity(event)}} className="CityGPinAd">
                        Город
                    </div>
                    <div ref={refToBack} className="BackForAddress"></div>
                </div>
            </div>
            <MapGP/>
            <MapGP/>
            <MapGP/>
        </div>
    );
};

export default AddresGp;
