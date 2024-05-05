import React, {useEffect, useState} from 'react';
import "../../styles/MainPage/LinkPageMainPart.css"

import Filter from "../LinksPage/Filter";
import LinksMapNew from "../LinksPage/LinksMapNew";
import SortButton from "../LinksPage/SortButton";
import CreateLinkNew from "../Global/CreateLinkNew";
import SortNew from "../LinksPage/SortNew";

const LinkPageMainPart = () => {
    const [flag, setFlag] = useState(true);
    useEffect(()=>{

    },[])
    return (

        <div className="LinkPageMainPart" >
            <div className="TopContainer">
                <div className="FakeDivLP">
                </div>
                <div className="RightTopCont">
                    <SortNew/>
                    <CreateLinkNew/>
                </div>
            </div>
            <div className="MainContainer">
                <div className="FilerContainer">
                    <Filter/>
                </div>
                <div className="LinksContainer">
                        <LinksMapNew Data={"24/03/24"} clicks={3} pathS={"nil-url.ru/Ffv3cv"} pathL={"https://www.svgrepo.com/collection/dazzle-line-iconsm/collectionqqqqqqqqqqqqqqqqqqqqq"} SvgPath={"/test.svg"} Android={true} IOS={true} UTM={true}/>
                        <LinksMapNew Data={"24/03/24"} clicks={3} pathS={"nil-url.ru/Ffv3cv"} pathL={"https://www.svgrepo.com/collection/dazzle-line-iconsm/collection"} SvgPath={"/test.svg"} Android={false} IOS={false} UTM={true}/>
                        <LinksMapNew Data={"24/03/24"} clicks={3} pathS={"nil-url.ru/Ffv3cv"} pathL={"https://www.svgrepo.com/collection/dazzle-line-iconsm/collection"} SvgPath={"/test.svg"} Android={false} IOS={true} UTM={true}/>
                        <LinksMapNew Data={"24/03/24"} clicks={3} pathS={"nil-url.ru/Ffv3cv"} pathL={"https://www.svgrepo.com/collection/dazzle-line-iconsm/collectionqqqqqqqqq"} SvgPath={"/test.svg"} Android={false} IOS={true} UTM={true}/>
                </div>
            </div>
        </div>
    );
};

export default LinkPageMainPart;
