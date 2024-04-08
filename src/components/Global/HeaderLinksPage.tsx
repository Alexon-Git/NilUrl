import React from 'react';
import "../../styles/Global/HeaderLinksPage.css"
const HeaderLinksPage = () => {
    return (
        <div style={{borderBottom:"1px solid #E5E7EB"}}>
            <div className="HeaderLinksPageC">
                <div className="leftUserLogo">
                    <div className="CircleForLogoLP">
                        <img className="SVGCircleLP" src={"https://vk.com/favicon.ico"}/>
                    </div>
                    <div>
                        <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_11_279)">
                                <path d="M23.0067 5.232L9.99335 27.768" stroke="#E5E7EB" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_11_279">
                                    <rect width="32" height="32" fill="white" transform="translate(0.5 0.5)"/>
                                </clipPath>
                            </defs>
                        </svg>


                    </div>
                    <div className="UserLogoWord">
                        <div style={{paddingBottom:"2px"}}>
                            A
                        </div>
                    </div>
                    <div style={{marginLeft:"20px"}}>
                        Profile Name
                    </div>
                </div>
                <div className="rightUserLogo">
                    <div className="UserLogoWord">
                        <div style={{paddingBottom:"2px"}}>
                            A
                        </div>
                        <div className="AbsoluteDoteUserLogo">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderLinksPage;
