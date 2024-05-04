import React, {useState} from 'react';
import "../../styles/MainPage/LinksMainPageView.css"
import {LinksIntMap, LinksPropTest} from "../../LogicComp/LinksIntMap";
import LinksMap from "./LinksMap";
const LinksMainPageView = () => {


    const [arr,setArr] = useState(
        LinksPropTest
    )
    const [inputValue, setInputValue] = React.useState("");
    console.log(inputValue)
    const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    };
    const click = ():void =>{
        const arrTemp = [...arr];
        const obj:LinksIntMap = {
            imageURL:"/NILLogo.png",
            path: inputValue,
            clicksCount:0
        }

        arrTemp.splice(1,0,obj)
        arrTemp.pop()
        setArr(arrTemp)
    }

    return (
        <div>
            <div className="InputForLinksMP">
                <svg className="svgLinksMP" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.50033 16.1666H5.83366C4.72859 16.1666 3.66878 15.7277 2.88738 14.9463C2.10598 14.1649 1.66699 13.105 1.66699 12C1.66699 10.8949 2.10598 9.8351 2.88738 9.0537C3.66878 8.2723 4.72859 7.83331 5.83366 7.83331H7.50033" stroke="#9CA3AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.5 7.83331H14.1667C15.2717 7.83331 16.3315 8.2723 17.1129 9.0537C17.8943 9.8351 18.3333 10.8949 18.3333 12C18.3333 13.105 17.8943 14.1649 17.1129 14.9463C16.3315 15.7277 15.2717 16.1666 14.1667 16.1666H12.5" stroke="#9CA3AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.66699 12H13.3337" stroke="#9CA3AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input onChange={(event)=>{onChangeHandler(event)}} className="InputLinksMP" placeholder="https://app.NilUrl/register"></input>
                <button onClick={(e)=>{click()}} className="VvodMPLinks">

                    <svg style={{width:"100%"}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.00033 6.66669L2.66699 10L6.00033 13.3334" stroke="#9CA3AF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.3337 2.66669V7.33335C13.3337 8.0406 13.0527 8.71888 12.5526 9.21897C12.0525 9.71907 11.3742 10 10.667 10H2.66699" stroke="#9CA3AF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div>
                {arr.map((el,index)=>(
                    <LinksMap path={el.path} imageURL={el.imageURL} clicks={el.clicksCount}/>
                ))}
            </div>
            <div className="InfoMapLinks">
                <div style={{height:"51px",width:"418px",textAlign:"left",paddingLeft:"15px"}}>
                Хотите запросить свои ссылки,
                отредактировать их или посмотреть их аналитику?
                Создайте бесплатную учетную запись на NilUrl
                </div>
            </div>
        </div>
    );
};

export default LinksMainPageView;
