import React from 'react';
import FirstContainerMainPage from "../Components/MainPage/FirstContainerMainPage";
import VideoComp from "../Components/MainPage/VideoComp";
import PriceMp from "../Components/MainPage/PriceMP";
import "../styles/Global/HeaderMainPage.css"
import Clients from "../Components/MainPage/Clients";
import FooterMP from "../Components/MainPage/FooterMP";
import HeaderMainPage from "../Components/Global/HeaderMainPage";

const MainPage = () => {
    return (
        <div>
            <HeaderMainPage/>
            <FirstContainerMainPage/>
            <VideoComp/>
            <PriceMp/>
            <Clients/>
            <FooterMP/>
        </div>
    );
};

export default MainPage;
