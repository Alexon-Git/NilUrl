import React from 'react';
import TopLinks from "../components/LinksPage/TopLinks";
import LinkPageMainPart from "../components/MainPage/LinkPageMainPart";
import HeaderLinksPage from "../components/Global/HeaderLinksPage";


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
