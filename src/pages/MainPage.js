import React , { useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/Global/HeaderMainPage.css"
import Clients from "../components/MainPage/Clients";
import PriceMp from "../components/MainPage/PriceMP";
import VideoComp from "../components/MainPage/VideoComp";
import FirstContainerMainPage from "../components/MainPage/FirstContainerMainPage";
import Cookies from 'js-cookie';
import HeaderMainPage from "../components/Global/HeaderMainPage";
import FooterMP from "../components/footer-mp/FooterMP";
import NoLoginHeader from "../components/no-login-header/NoLoginHeader";
import { Helmet } from 'react-helmet';

const MainPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            navigate('/links');
        }
    }, []);
    
    return (
        <div>
            <Helmet>
            <title>Основная страница</title>
          </Helmet>
            <NoLoginHeader/>
            <div className='mp-background'>                
                <FirstContainerMainPage />
                <VideoComp />
                <PriceMp />
                <Clients />
            </div>
            <FooterMP/>
        </div>
    );
};

export default MainPage;
