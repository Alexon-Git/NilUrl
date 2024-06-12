import React, { useState,useEffect } from "react";
import { NoLoginHeader, PricesBlock, FooterMP } from "../components";
import HeaderLinksPage from "../components/Global/HeaderLinksPage";
import HeaderLinksPageFree from "../components/Global/HeaderLinksPageFree"; 
import { Helmet } from 'react-helmet';
import useAuth from "../pages/useAuth";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const PricesPage = () => {

  const accessToken = Cookies.get("access_token");
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, isRedirected, setIsRedirected } = useAuth();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const user_status = decodedToken.user_status;
      setUserStatus(user_status);
    }
    if (!isLoading && !isLoggedIn && !isRedirected) {
      setIsRedirected(true);
      setUserStatus("no_login");
    }
  }, [isLoading, isLoggedIn, navigate, isRedirected, setIsRedirected, accessToken]);


  return (
    <>
    
     <Helmet>
    <title>Цены</title>
  </Helmet>
      {userStatus === 'no_login' && <NoLoginHeader />}
      {userStatus === 'free' && <HeaderLinksPageFree />}
      {userStatus === 'premium' && <HeaderLinksPage />}
      <PricesBlock />
      <FooterMP />
    </>
  );


};

export default PricesPage;
