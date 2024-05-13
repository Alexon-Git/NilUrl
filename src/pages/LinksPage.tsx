import React from 'react';
import TopLinks from "../components/LinksPage/TopLinks";
import LinkPageMainPart from "../components/MainPage/LinkPageMainPart";
import HeaderLinksPage from "../components/Global/HeaderLinksPage";
import transition from "../LogicComp/Transition";


const LinksPage = () => {
    return (
        <div>
            <HeaderLinksPage/>
            <TopLinks/>
            <LinkPageMainPart/>
        </div>
    );
};

export default transition(LinksPage);
