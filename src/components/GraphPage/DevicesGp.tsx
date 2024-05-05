import React, {useEffect, useRef, useState} from 'react';
import MapGP from "./MapGP";
import "../../styles/GraphPage/AddresGp.css"
const DevicesGp = () => {

    const [state,setState] = useState(
        new Array(3).fill(false)
    )

    useEffect(()=>{
        const arr = [true,false,false]
        setState(arr)
    },[])

    const refToBack = useRef<HTMLDivElement>(null)

    const clickDevice = () =>{
        if(refToBack.current!=null && !state[0]){
            refToBack.current.style.transition = "0.2s ease-in"
            refToBack.current.style.left = "-1px"
            const arr = [true,false,false]
            setState(arr)
        }
    }

    const clickGoogle = () =>{
        if(refToBack.current!=null && !state[1]){
            refToBack.current.style.transition = "0.2s ease-in"
            refToBack.current.style.left = "102px"
            const arr = [false,true,false]
            setState(arr)
        }
    }

    const clickOC = () =>{
        if(refToBack.current!=null && !state[2]){
            refToBack.current.style.transition = "0.2s ease-in"
            refToBack.current.style.left = "206px"
            const arr = [false,false,true]
            setState(arr)
        }
    }

    console.log(state)
    return (
        <div>
            <div className="AddressCountry">
                <div className="FontSizeTextGP">
                    Устройства
                </div>
                <div className="CotainerForBackAddress">
                    <div onClick={(event)=>{clickDevice()}} className="CountryGPinAd">
                        Устройство
                    </div>
                    <div onClick={(event)=>{clickGoogle()}} className="CountryGPinAd">
                        Браузер
                    </div>
                    <div onClick={(event)=>{clickOC()}} className="CityGPinAd">
                        ОС
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

export default DevicesGp;
