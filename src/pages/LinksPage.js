import React, { useEffect } from "react";
import TopLinks from "../components/LinksPage/TopLinks";
import LinkPageMainPart from "../components/MainPage/LinkPageMainPart";
import HeaderLinksPage from "../components/Global/HeaderLinksPage";
import transition from "../LogicComp/Transition";
import useAuth from "../pages/useAuth";
import { useNavigate } from "react-router-dom";


const LinksPage = () => {

    return (
        <div>
            <HeaderLinksPage/>
            <TopLinks/>
            <LinkPageMainPart/>
        </div>
    );
};

export default LinksPage;
