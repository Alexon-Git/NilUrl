import React, {useEffect, useRef, useState} from 'react';
import MapGP from "./MapGP";
import "../../styles/GraphPage/AddresGp.css"
import {
    DateFromServInterface,
    GPFakeDataBrowser,
    GPFakeDataCity,
    GPFakeDataCountry,
    GPFakeDataDevice,
    GPFakeDataOC
} from "../../LogicComp/GPFakeData";


interface AddresGpInt{
    Dates:DateFromServInterface[]
}

interface DualData{
    country:string,
    clicks:number
}
const DevicesGp = ({Dates}:AddresGpInt) => {

    const Device:DualData[] = []
    const OC:DualData[] = []
    const Browser:DualData[] = []
    Dates.map((value,index)=>{
        let flag:boolean = false;
        Device.map((country,indexC)=>{
            if(country.country == value.device) {
                country.clicks++;
                flag = true
            }
        })
        if(flag === false){
            let temp:DualData = {
                country:value.device,
                clicks:1
            }
            Device.push(temp)
        }
    })

    Dates.map((value,index)=>{
        let flag:boolean = false;
        OC.map((country,indexC)=>{
            if(country.country == value.os) {
                country.clicks++;
                flag = true
            }
        })
        if(flag === false){
            let temp:DualData = {
                country:value.os,
                clicks:1
            }
            OC.push(temp)
        }
    })

    Dates.map((value,index)=>{
        let flag:boolean = false;
        Browser.map((country,indexC)=>{
            if(country.country == value.browser) {
                country.clicks++;
                flag = true
            }
        })
        if(flag === false){
            let temp:DualData = {
                country:value.browser,
                clicks:1
            }
            Browser.push(temp)
        }
    })

    const [data,setData] = useState(Device)
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
            setData(Device)
        }
    }

    const clickGoogle = () =>{
        if(refToBack.current!=null && !state[1]){
            refToBack.current.style.transition = "0.2s ease-in"
            refToBack.current.style.left = "102px"
            const arr = [false,true,false]
            setState(arr)
            setData(Browser)
        }
    }

    const clickOC = () =>{
        if(refToBack.current!=null && !state[2]){
            refToBack.current.style.transition = "0.2s ease-in"
            refToBack.current.style.left = "206px"
            const arr = [false,false,true]
            setState(arr)
            setData(OC)
        }
    }

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
            {
                data.map((value, index, array)=>
                    <MapGP name={value.country} clickCount={value.clicks} key={index} SVG={"qwe"}/>
                )
            }
        </div>
    );
};

export default DevicesGp;
