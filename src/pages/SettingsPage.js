import React, { useEffect } from "react";
import { SettingsForm, HeaderLinksPage } from "../components";
import transition from "../LogicComp/Transition";
import useAuth from "../pages/useAuth";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { isLoggedIn, isLoading, isRedirected, setIsRedirected } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn && !isRedirected) { 
      setIsRedirected(true); 
      navigate('/login');
    }
  }, [isLoading, isLoggedIn, navigate, isRedirected, setIsRedirected]); 

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <HeaderLinksPage />
      <SettingsForm />
    </>
  );
};

export default transition(SettingsPage);
