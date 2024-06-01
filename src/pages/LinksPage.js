import React, { useEffect, useState } from "react";
import TopLinks from "../components/LinksPage/TopLinks";
import LinkPageMainPart from "../components/MainPage/LinkPageMainPart";
import HeaderLinksPage from "../components/Global/HeaderLinksPage";
import HeaderLinksPageFree from "../components/Global/HeaderLinksPageFree"; 
import transition from "../LogicComp/Transition";
import useAuth from "../pages/useAuth";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const LinksPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn, isLoading, isRedirected, setIsRedirected } = useAuth();
    const [userStatus, setUserStatus] = useState(null); 

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            const user_status = decodedToken.user_status;
            setUserStatus(user_status);
        }

        if (!isLoading && !isLoggedIn && !isRedirected) {
            setIsRedirected(true);
            navigate('/login');
        }
    }, [isLoading, isLoggedIn, navigate, isRedirected, setIsRedirected]);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            {userStatus === 'free' ? <HeaderLinksPageFree /> : <HeaderLinksPage />}
            <TopLinks />
            <LinkPageMainPart />
        </div>
    );
};

export default transition(LinksPage);
