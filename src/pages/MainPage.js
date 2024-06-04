import React , { useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/Global/HeaderMainPage.css"
import Clients from "../components/MainPage/Clients";
import PriceMp from "../components/MainPage/PriceMP";
import VideoComp from "../components/MainPage/VideoComp";
import FirstContainerMainPage from "../components/MainPage/FirstContainerMainPage";
import Cookies from 'js-cookie';
import "../styles/Global/BackgroundDots.css"
import HeaderMainPage from "../components/Global/HeaderMainPage";
import FooterMP from "../components/footer-mp/FooterMP";
import NoLoginHeader from "../components/no-login-header/NoLoginHeader";

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
            <NoLoginHeader/>
            <div
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/BackgroundDots.svg'})
                    `,

                }}
            >
                
                <FirstContainerMainPage/>
                <VideoComp/>
                <PriceMp/>
                <Clients/>
            </div>
            <FooterMP/>
        </div>
    );
};

export default MainPage;
