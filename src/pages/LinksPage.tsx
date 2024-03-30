import React from 'react';
import LinkPageMainPart from "../Components/MainPage/LinkPageMainPart";
import HeaderMainPage from "../Components/Global/HeaderMainPage";
import TopLinks from "../Components/LinksPage/TopLinks";

const LinksPage = () => {
    return (
        <div>
            <HeaderMainPage/>
            <TopLinks/>
            <LinkPageMainPart/>
        </div>
    );
};

export default LinksPage;
