import React, { useEffect, useState } from "react";
import LinkPageMainPart from "../components/MainPage/LinkPageMainPart";
import HeaderLinksPage from "../components/Global/HeaderLinksPage";
import HeaderLinksPageFree from "../components/Global/HeaderLinksPageFree";
import HeaderLinksPageBase from "../components/Global/HeaderLinksPageBase"; 
import transition from "../LogicComp/Transition";
import useAuth from "../pages/useAuth";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { usePremium } from '../LogicComp/DataProvider';
import { Helmet } from 'react-helmet';

const LinksPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn, isLoading, isRedirected, setIsRedirected } = useAuth();
    const { isPremium, setIsPremium } = usePremium();
    
    const [userStatus, setUserStatus] = useState(''); 

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            const userStatus_ = decodedToken.user_status; 
            setIsPremium(userStatus_);
            setUserStatus(userStatus_);
        }

        if (!isLoading && !isLoggedIn && !isRedirected) {
            setIsRedirected(true);
            navigate('/login');
        }
    }, [isLoading, isLoggedIn, navigate, isRedirected, setIsRedirected]);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    const renderHeader = () => {
        switch (userStatus) {
            case 'free':
                return <HeaderLinksPageFree />;
            case 'premium':
                return <HeaderLinksPage />;
            case 'base':
                return <HeaderLinksPageBase />;
            default:
                return <HeaderLinksPageFree />;
        }
    };

    return (
        <div>
            <Helmet>
                <title>Ссылки</title>
            </Helmet>
            {renderHeader()}
            <LinkPageMainPart />
        </div>
    );
};

export default LinksPage;
