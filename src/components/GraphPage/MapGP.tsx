import React from 'react';


interface MapGpInterface{
    SVG:string,
    clickCount:number,
    name:string,
}

const MapGp = () => {
    return (
        <div className="MPContainerGP">
                <div className="ContainerForCountries">
                    <div style={{display:"inline-flex"}}>
                        <div>
                            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_403_103)">
                                    <path d="M-0.333984 -0.333008H20.3327V12.3337H-0.333984V-0.333008Z" fill="#D22F27"/>
                                    <path d="M-0.333984 -0.333008H20.3327V4.00033H-0.333984V-0.333008Z" fill="white"/>
                                    <path d="M-0.333984 4H20.3327V8H-0.333984V4Z" fill="#1E50A0"/>
                                    <path d="M-0.333984 -0.333008H20.3327V12.3337H-0.333984V-0.333008Z" stroke="#2F2F2F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_403_103">
                                        <rect width="20" height="12" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div style={{marginLeft:"10px"}}>
                            Россия
                        </div>
                    </div>
                    <div style={{color:"grey"}}>58</div>
            </div>
        </div>
    );
};

export default MapGp;
