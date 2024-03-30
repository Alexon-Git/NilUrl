import React from 'react';
import "../../styles/LinksPage/TopLinks.css"
import CreateLinkButton from "../Global/CreateLinkButton";

const TopLinks = () => {
    return (
        <div className="mainContainer">
            <div className="contentContainer">
                <div className="left">
                    Мои ссылки
                </div>
                <div className="right">
                    <CreateLinkButton/>
                </div>
            </div>
        </div>
    );
};

export default TopLinks;
