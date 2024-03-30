import React from 'react';
import "../styles/Global/HeaderMainPage.css"
import FooterMP from "../components/MainPage/FooterMP";
import Clients from "../components/MainPage/Clients";
import PriceMp from "../components/MainPage/PriceMP";
import VideoComp from "../components/MainPage/VideoComp";
import FirstContainerMainPage from "../components/MainPage/FirstContainerMainPage";

const MainPage = () => {
    return (
        <div>
            <FirstContainerMainPage/>
            <VideoComp/>
            <PriceMp/>
            <Clients/>
            <FooterMP/>
        </div>
    );
};

export default MainPage;
