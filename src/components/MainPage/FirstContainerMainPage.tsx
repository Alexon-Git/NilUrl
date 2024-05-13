import React, {useState} from 'react';
import "../../styles/MainPage/FirstContainerMainPage.css"
import "../../styles/MainPage/ButtonBuyOrTry.css"
import LinksMainPageView from "./LinksMainPageView";
import {LINKSPAGE_ROUTE, PRICEPAGE_ROUTE} from "../../LogicComp/utils/Const";
import {useNavigate} from "react-router-dom";
import ButtonNil from "../Global/ButtonNil";
import BuyButtonBedarev from "../Global/BuyButtonBedarev";
import {BuyButton} from "../index";


const FirstContainerMainPage = () => {
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState([false, false, false]);

    const handleMouseEnter = (index:any) => {
        const updatedHovered = [...isHovered];
        updatedHovered[index] = true;
        setIsHovered(updatedHovered);
    };

    const handleMouseLeave = (index:any) => {
        const updatedHovered = [...isHovered];
        updatedHovered[index] = false;
        setIsHovered(updatedHovered);
    };
    return (
        <div>
            <div className="MaxWidthContainer">
                <div className="ShortLink">
                    <div>Короткие ссылки со</div>

                    <div className="GradientMP">
                    Сверхспособностями
                    </div>
                </div>
            </div>
                <div className="NilUrlOpisanie">
                    NilUrl - это инфраструктура управления ссылками с открытым
                    <br></br>
                    исходным кодом для современных маркетинговых команд
                </div>
            <div className="ButtonsBuyOrTry">
                <div onClick={()=>{navigate(PRICEPAGE_ROUTE)}} style={{display:"inline-flex"}}>
                <BuyButton
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Купить подписку
                </BuyButton>
                </div>
                <button className="TryButton" onClick={()=>navigate(LINKSPAGE_ROUTE)}>
                    <span>
                        Попробовать бесплатно
                    </span>
                </button>

            </div>

            <div className="LinksMPContainer">
                <LinksMainPageView/>
            </div>
        </div>
    );
};

export default FirstContainerMainPage;
