import React, {useEffect, useState} from "react";
import { SettingsForm, HeaderLinksPage } from "../components";
import HeaderLinksPageFree from "../components/Global/HeaderLinksPageFree";
import transition from "../LogicComp/Transition";
import useAuth from "../pages/useAuth";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { Helmet } from 'react-helmet';

const SettingsPage = () => {
  const { isLoggedIn, isLoading, isRedirected, setIsRedirected } = useAuth();
  const [userStatus, setUserStatus] = useState(null);
  const navigate = useNavigate();

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
    <><Helmet>
    <title>Настройки</title>
  </Helmet>
    
      {userStatus === 'free' ? <HeaderLinksPageFree /> : <HeaderLinksPage />}
      <SettingsForm />
    </>
  );
};

export default SettingsPage;
