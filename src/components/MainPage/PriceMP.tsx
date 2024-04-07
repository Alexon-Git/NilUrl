import React from 'react';
import "../../styles/MainPage/PriceMP.css"
import {PRICEPAGE_ROUTE} from "../../LogicComp/utils/Const";
import {useNavigate} from "react-router-dom";

const PriceMp = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="Sverdostup">
                <div className="GradientMP">Сверхдоступные</div>
                 <div style={{display:"inline-block",marginLeft:"20px"}}>цены</div>
            </div>
            <div className="ContTOCEntr">
                <div className="FlexInIMPMP">
                    <svg className="CircleMP" width="1240" height="600" viewBox="0 0 1240 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.5" filter="url(#filter0_f_1_899)">
                            <ellipse cx="594.862" cy="309.121" rx="350.224" ry="180.251" transform="rotate(-27.8851 594.862 309.121)" fill="url(#paint0_linear_1_899)"/>
                        </g>
                        <defs>
                            <filter id="filter0_f_1_899" x="-118.251" y="-311.582" width="1426.23" height="1241.41" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feGaussianBlur stdDeviation="196.1" result="effect1_foregroundBlur_1_899"/>
                            </filter>
                            <linearGradient id="paint0_linear_1_899" x1="244.638" y1="309.121" x2="945.085" y2="309.121" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#6A11CB"/>
                                <stop offset="1" stop-color="#2575FC"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <button className="MoreWithDots" onClick={()=>navigate(PRICEPAGE_ROUTE)}>
                        <svg  width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="12" height="12" rx="6" fill="white"/>
                        </svg>

                        <span>
                            Подробнее
                        </span>
                    </button>
                    <img className="ThreeCardPicMP" src={process.env.PUBLIC_URL + '/TriCard.png'}></img>
                </div>
            </div>
        </div>
    );
};

export default PriceMp;
