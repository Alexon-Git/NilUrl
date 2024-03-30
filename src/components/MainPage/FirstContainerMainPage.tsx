import React from 'react';
import "../../styles/MainPage/FirstContainerMainPage.css"
import "../../styles/MainPage/ButtonBuyOrTry.css"
import LinksMainPageView from "./LinksMainPageView";


const FirstContainerMainPage = () => {


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
                    NillUrl - это инфраструктура управления ссылками с открытым
                    <br></br>
                    исходным кодом для современных маркетинговых команд
                </div>
            <div className="ButtonsBuyOrTry">
                <button className="BuyPodpiska">
                    <div className="CircleBuy">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="12" height="12" rx="6" fill="white"/>
                        </svg>
                    </div>
                    <span>
                        Купить подписку
                    </span>
                </button>

                <button className="TryButton">
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
