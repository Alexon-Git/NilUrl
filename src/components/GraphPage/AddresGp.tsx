import React, {useRef, useState} from 'react';
import "../../styles/GraphPage/AddresGp.css"

import MapGP from "./MapGP";
import {DateFromServInterface} from "../../LogicComp/GPFakeData";

interface AddresGpInt{
    Dates:DateFromServInterface[]
}

interface DualData{
    country:string,
    clicks:number
}

const AddresGp = ({Dates}:AddresGpInt) => {
    console.log(Dates)
    const [flag,setFlag] = useState(false)
    const Countries:DualData[] = []
    const City:DualData[] = []
    Dates.map((value,index)=>{
        let flag:boolean = false;
        Countries.map((country,indexC)=>{
            if(country.country == value.country) {
                country.clicks++;
                flag = true
            }
        })
        if(flag === false){
            let temp:DualData = {
                country:value.country,
                clicks:1
            }
            Countries.push(temp)
        }
    })

    Dates.map((value,index)=>{
        let flag:boolean = false;
        City.map((country,indexC)=>{
            if(country.country == value.city) {
                country.clicks++;
                flag = true
            }
        })
        if(flag === false){
            let temp:DualData = {
                country:value.city,
                clicks:1
            }
            City.push(temp)
        }
    })

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
            setData(City)
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
                    <MapGP name={value.country} clickCount={value.clicks} key={index} SVG={"qwe"}/>
                )
            }
        </div>
    );
};

export default AddresGp;
