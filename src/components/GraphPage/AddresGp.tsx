import React, {useRef, useState} from 'react';
import "../../styles/GraphPage/AddresGp.css"

import MapGP from "./MapGP";
import {GPFakeDataCity, GPFakeDataCountry} from "../../LogicComp/GPFakeData";
const AddresGp = () => {

    const [flag,setFlag] = useState(false)
    const Cities = [...GPFakeDataCity]
    const Countries = [...GPFakeDataCountry]
    const [data,setData] = useState(Countries)
    const refToBack = useRef<HTMLDivElement>(null)

    const clickCountry = () =>{
        if(refToBack.current!=null && flag){
            refToBack.current.style.transition = "0.2s ease-in"
            refToBack.current.style.left = "-1px"
            setFlag(false)
            setData(Countries)
        }
    }

    const clickCity = (event:React.MouseEvent<HTMLDivElement>) =>{
        if(refToBack.current!=null && !flag){
            refToBack.current.style.transition = "0.2s ease-in"
            refToBack.current.style.left = "103px"
            setFlag(true)
            setData(Cities)
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
            {
                data.map((value, index, array)=>
                    <MapGP name={value.name} clickCount={value.clicks} key={index} SVG={"qwe"}/>
                )
            }
        </div>
    );
};

export default AddresGp;
