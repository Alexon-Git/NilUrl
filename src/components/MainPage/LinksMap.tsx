import React from 'react';
import "../../styles/MainPage/LinksMainPageView.css"

interface LinksMapInt{
    imageURL:string,
    path:string,
    clicks:number;
}

const LinksMap:React.FC<LinksMapInt>= ({clicks,path,imageURL}:LinksMapInt) => {
    return (
        clicks !== -1 ? (
        <div className="LinksMapOneContainer" style={{width:"100%"}}>
            <div className="LogoAndTextLinksMap">
                <svg style={{paddingBottom:"2px"}} width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1_488)">
                        <path d="M25.6068 4.3454C19.7491 -1.44847 10.2509 -1.44847 4.39324 4.3454C-1.46441 10.1393 -1.46441 19.534 4.39324 25.3279L13.5859 34.4204C14.3675 35.1935 15.6335 35.1935 16.415 34.4204L25.6068 25.3279C31.4653 19.534 31.4653 10.1393 25.6068 4.3454ZM15.1155 27.8931C7.73475 27.9549 1.73829 22.0246 1.80071 14.7233C1.86126 7.63486 7.71892 1.84099 14.8854 1.7811C22.2662 1.71936 28.2626 7.6496 28.2002 14.9509C28.1387 22.0394 22.282 27.8323 15.1155 27.8931Z" fill="black"/>
                        <path d="M21.5048 21.2709C20.1875 22.5738 18.5703 23.3993 16.8721 23.7467C17.9015 22.5572 19.2522 20.3854 16.5172 19.3792C13.0005 18.0865 17.8493 17.1365 18.1437 17.0554C18.8461 16.8628 18.7865 16.8822 18.8983 16.8472C19.7087 16.5901 22.0385 15.6622 16.7911 14.4303C10.7247 13.0067 17.7506 11.2781 17.7506 11.2781C17.7506 11.2781 8.66878 12.4981 13.3294 14.0912C17.5829 15.5452 15.4338 15.7286 15.0248 15.7497C14.9596 15.7534 14.8944 15.758 14.8301 15.7645C13.7989 15.8603 7.16803 16.5652 9.73169 18.5997C11.5538 20.0463 9.94968 20.9521 8.63245 21.4036C8.58587 21.3602 8.54022 21.3151 8.49458 21.27C4.90155 17.716 4.90155 11.9544 8.49458 8.40145C12.0876 4.84755 17.9127 4.84755 21.5048 8.40145C25.0987 11.9563 25.0987 17.7179 21.5048 21.2709Z" fill="black"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1_488">
                            <rect width="30" height="35" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <div className="SmallAndLargeLink">
                    <a href="url" style={{color:"#1E40AF",fontWeight:"600",fontSize:"16px"}}>NilUrl.sh/try</a><br></br>
                    <a style={{fontWeight:"400",fontSize:"13.56px",color:"#6B7280"}}>{path}</a>
                </div>
                <div className="ButtonsContainerLinksMap">
                    <button className="ButtonCircleCopyAndShare">
                        <svg style={{verticalAlign:"Middle"}} width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.66634 9.45858H2.49967C1.85509 9.45858 1.33301 8.92658 1.33301 8.27092V1.93767C1.33301 1.28083 1.85509 0.75 2.49967 0.75H7.16634C7.81092 0.75 8.33301 1.28142 8.33301 1.93767V3.02617M4.83301 3.12533H9.49967C10.1443 3.12533 10.6663 3.65617 10.6663 4.31242V10.6457C10.6663 11.3025 10.1443 11.8333 9.49967 11.8333H4.83301C4.18842 11.8333 3.66634 11.3019 3.66634 10.6457V4.31242C3.66634 3.65675 4.18842 3.12533 4.83301 3.12533Z" stroke="#374151" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </button>
                    <button className="ButtonCircleCopyAndShare">
                        <svg style={{verticalAlign:"Middle"}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.66667 2H2.66667C2.29848 2 2 2.29848 2 2.66667V4.66667C2 5.03486 2.29848 5.33333 2.66667 5.33333H4.66667C5.03486 5.33333 5.33333 5.03486 5.33333 4.66667V2.66667C5.33333 2.29848 5.03486 2 4.66667 2Z" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.3337 2H11.3337C10.9655 2 10.667 2.29848 10.667 2.66667V4.66667C10.667 5.03486 10.9655 5.33333 11.3337 5.33333H13.3337C13.7018 5.33333 14.0003 5.03486 14.0003 4.66667V2.66667C14.0003 2.29848 13.7018 2 13.3337 2Z" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.66667 10.6667H2.66667C2.29848 10.6667 2 10.9652 2 11.3334V13.3334C2 13.7015 2.29848 14 2.66667 14H4.66667C5.03486 14 5.33333 13.7015 5.33333 13.3334V11.3334C5.33333 10.9652 5.03486 10.6667 4.66667 10.6667Z" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.0003 10.6667H12.0003C11.6467 10.6667 11.3076 10.8072 11.0575 11.0572C10.8075 11.3073 10.667 11.6464 10.667 12V14" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14 14V14.0067" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.00033 4.66669V6.66669C8.00033 7.02031 7.85985 7.35945 7.6098 7.6095C7.35975 7.85954 7.02061 8.00002 6.66699 8.00002H4.66699" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2 8H2.00667" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 2H8.00667" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 10.6667V10.6734" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10.667 8H11.3337" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14 8V8.00667" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 14V13.3333" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button className="countOfViewLinksMap">
                        <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <a style={{float:"left",paddingTop:"5px"}}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 13.3334V6.66669" stroke="#374151" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12 13.3334V2.66669" stroke="#374151" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4 13.3334V10.6667" stroke="#374151" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </a>
                            <div className="CLicksTextANum">{clicks} clicks</div>
                        </div>
                    </button>
                </div>
            </div>
            <div className="TriDotMenu">
                <button style={{border:"none",backgroundColor:"white"}}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0003 10.8334C10.4606 10.8334 10.8337 10.4603 10.8337 10C10.8337 9.53978 10.4606 9.16669 10.0003 9.16669C9.54009 9.16669 9.16699 9.53978 9.16699 10C9.16699 10.4603 9.54009 10.8334 10.0003 10.8334Z" stroke="#6B7280" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.0003 4.99998C10.4606 4.99998 10.8337 4.62688 10.8337 4.16665C10.8337 3.70641 10.4606 3.33331 10.0003 3.33331C9.54009 3.33331 9.16699 3.70641 9.16699 4.16665C9.16699 4.62688 9.54009 4.99998 10.0003 4.99998Z" stroke="#6B7280" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.0003 16.6667C10.4606 16.6667 10.8337 16.2936 10.8337 15.8333C10.8337 15.3731 10.4606 15 10.0003 15C9.54009 15 9.16699 15.3731 9.16699 15.8333C9.16699 16.2936 9.54009 16.6667 10.0003 16.6667Z" stroke="#6B7280" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
        )
            :
        (
            <div className="containerNoContentMP">
                <svg style={{marginLeft:"8px"}} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="#E5E7EB"/>
                </svg>
                <svg style={{marginLeft:"12px"}} width="380" height="50" viewBox="0 0 380 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="112" height="24" rx="6" fill="#E5E7EB"/>
                    <rect x="120" width="24" height="24" rx="12" fill="#E5E7EB"/>
                    <rect x="152" width="97" height="24" rx="6" fill="#E5E7EB"/>
                    <rect y="34" width="380" height="16" rx="6" fill="#E5E7EB"/>
                </svg>
            </div>
        )
    );
};

export default LinksMap;
