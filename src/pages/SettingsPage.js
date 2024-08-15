import React, {useEffect, useState} from "react";
import { SettingsForm, HeaderLinksPage } from "../components";
import HeaderLinksPageFree from "../components/Global/HeaderLinksPageFree";
import HeaderLinksPageBase from "../components/Global/HeaderLinksPageBase";
import useAuth from "../pages/useAuth";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { Helmet } from 'react-helmet';
import { usePremium } from "../LogicComp/DataProvider"; 

const SettingsPage = () => {
  const { isLoggedIn, isLoading, isRedirected, setIsRedirected } = useAuth();
  const [userStatus, setUserStatus] = useState(null);
  const navigate = useNavigate();
  const { isPremium } = usePremium();
  useEffect(() => {
    setUserStatus(isPremium);
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
    <><Helmet>
    <title>Настройки</title>
  </Helmet>  
  {renderHeader()}
      <SettingsForm />
    </>
  );
};

export default SettingsPage;
