import React, {useEffect, useRef, useState} from 'react';
import "../../styles/LinksPage/SortNew.css"
const SortNew = () => {
    useEffect(()=>{
        clickToGalki(1);
    },[])
    const refToUL = useRef<HTMLUListElement>(null)
    const refToStrelochka = useRef<SVGSVGElement>(null)
    const [flagsToGalka,setFlagToGalka] = useState(
        new Array(6).fill(null)
    )
    const [isDrop,setIsDrop] = useState(false)
    const [rule,setRule] = useState(false)
    const [period,setPeriod] = useState("Не отсортированный")
    const clickToGalki = (prop:number) =>{
        let arr = new Array(6).fill(null);
        arr.map((value,index)=>{
            if(index == prop) arr[index] = true;
        })
        console.log(arr);
        setFlagToGalka(arr);
    }
    const clickShowUL = () =>{
        if(!isDrop){
            if(refToUL.current !=null) {
                refToUL.current.style.transition = "max-height 0.3s ease-in"
                refToUL.current.style.maxHeight = "347px"
            }
            if(refToStrelochka.current!=null){
                refToStrelochka.current.style.transition = "rotate 0.3s ease-in";
                refToStrelochka.current.style.rotate = "270deg";
            }
            setIsDrop(true);
        }
        if(isDrop){
            if(refToUL.current !=null) {
                refToUL.current.style.transition = "max-height 0.3s ease-in"
                refToUL.current.style.maxHeight = "0px"
            }
            if(refToStrelochka.current!=null){
                refToStrelochka.current.style.transition = "rotate 0.3s ease-in";
                refToStrelochka.current.style.rotate = "90deg";
            }
            setIsDrop(false)
        }
    }
    return (
        <div className="dropdownGraphLinks">
            <button className="ButtonToDrop" onClick={(e)=>{clickShowUL();}}>
                <div className="buttonGPPDrop">
                    <svg style={{marginRight:"20px"}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_330_84)">
                            <path d="M5.00065 3.99984V0.666504M11.6673 3.99984V0.666504M14.334 11.3332V14.3332H2.33398V12.3332M14.2427 5.6665H2.23532M0.333984 12.1665V12.3332H12.2673L12.3673 12.1665L12.5233 11.8392C13.7154 9.33364 14.334 6.59385 14.334 3.81917V2.33317H2.33398V3.75184C2.33401 6.54796 1.70588 9.30837 0.495984 11.8292L0.333984 12.1665Z" stroke="#2F2F2F"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_330_84">
                                <rect width="16" height="16" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    {period}
                    <svg ref={refToStrelochka} className="SVGinPeriodTop" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.25939 0.128174C4.12502 0.128174 3.9875 0.181299 3.88437 0.284424C3.67812 0.490674 3.67812 0.828174 3.88437 1.03442L10.9437 8.0938L3.9875 15.05C3.78125 15.2563 3.78125 15.5938 3.9875 15.8C4.19375 16.0063 4.53125 16.0063 4.7375 15.8L12.0719 8.4688C12.2781 8.26255 12.2781 7.92505 12.0719 7.7188L4.6375 0.284424C4.53125 0.178174 4.39689 0.128174 4.25939 0.128174Z" fill="#2F2F2F"/>
                    </svg>
                </div>
            </button>
            <ul className="ULDP" ref={refToUL}>
                <li className="LIDP" onClick={(e)=>{setPeriod("Дата ↓");clickToGalki(0);}}>
                    <div>Дата ↓</div>
                    {
                        flagsToGalka[0] &&
                        <div style={{marginLeft:"auto",marginRight:"5px"}}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.25939 0.128174C4.12502 0.128174 3.9875 0.181299 3.88437 0.284424C3.67812 0.490674 3.67812 0.828174 3.88437 1.03442L10.9437 8.0938L3.9875 15.05C3.78125 15.2563 3.78125 15.5938 3.9875 15.8C4.19375 16.0063 4.53125 16.0063 4.7375 15.8L12.0719 8.4688C12.2781 8.26255 12.2781 7.92505 12.0719 7.7188L4.6375 0.284424C4.53125 0.178174 4.39689 0.128174 4.25939 0.128174Z" fill="#2F2F2F"/>
                            </svg>
                        </div>
                    }
                </li>
                <li className="LIDP" onClick={(e)=>{setPeriod("Дата ↑");clickToGalki(1);}}>
                    <div>Дата ↑</div>
                    {
                        flagsToGalka[1] &&
                        <div style={{marginLeft:"auto",marginRight:"5px"}}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.25939 0.128174C4.12502 0.128174 3.9875 0.181299 3.88437 0.284424C3.67812 0.490674 3.67812 0.828174 3.88437 1.03442L10.9437 8.0938L3.9875 15.05C3.78125 15.2563 3.78125 15.5938 3.9875 15.8C4.19375 16.0063 4.53125 16.0063 4.7375 15.8L12.0719 8.4688C12.2781 8.26255 12.2781 7.92505 12.0719 7.7188L4.6375 0.284424C4.53125 0.178174 4.39689 0.128174 4.25939 0.128174Z" fill="#2F2F2F"/>
                            </svg>
                        </div>
                    }
                </li>
                <li className="LIDP" onClick={(e)=>{setPeriod("По алфавиту ↓");clickToGalki(2);}}>
                    <div>По алфавиту ↓</div>
                    {
                        flagsToGalka[2] &&
                        <div style={{marginLeft:"auto",marginRight:"5px"}}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.25939 0.128174C4.12502 0.128174 3.9875 0.181299 3.88437 0.284424C3.67812 0.490674 3.67812 0.828174 3.88437 1.03442L10.9437 8.0938L3.9875 15.05C3.78125 15.2563 3.78125 15.5938 3.9875 15.8C4.19375 16.0063 4.53125 16.0063 4.7375 15.8L12.0719 8.4688C12.2781 8.26255 12.2781 7.92505 12.0719 7.7188L4.6375 0.284424C4.53125 0.178174 4.39689 0.128174 4.25939 0.128174Z" fill="#2F2F2F"/>
                            </svg>
                        </div>
                    }
                </li>
                <li className="LIDP" onClick={(e)=>{setPeriod("По алфавиту ↑");clickToGalki(3);}}>
                    <div>По алфавиту ↑</div>
                    {
                        flagsToGalka[3] &&
                        <div style={{marginLeft:"auto",marginRight:"5px"}}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.25939 0.128174C4.12502 0.128174 3.9875 0.181299 3.88437 0.284424C3.67812 0.490674 3.67812 0.828174 3.88437 1.03442L10.9437 8.0938L3.9875 15.05C3.78125 15.2563 3.78125 15.5938 3.9875 15.8C4.19375 16.0063 4.53125 16.0063 4.7375 15.8L12.0719 8.4688C12.2781 8.26255 12.2781 7.92505 12.0719 7.7188L4.6375 0.284424C4.53125 0.178174 4.39689 0.128174 4.25939 0.128174Z" fill="#2F2F2F"/>
                            </svg>
                        </div>
                    }
                </li>
            </ul>
        </div>
    );
};

export default SortNew;
