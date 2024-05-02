import React, {useRef, useState} from 'react';
import "../../styles/LinksPage/LinksMapNew.css"
import TwoIcons from "./TwoIcons";
import ThreeIcons from "./ThreeIcons";
import OneIcon from "./OneIcon";
import RedactingLink from "../creating-link/RedactingLink";
import QRComponent from "../qr-component/QRComponent";
import { Overlay } from "../../components"

interface LinksMapInt{
    Data:string,
    SvgPath:string,
    pathS:string,
    pathL:string,
    UTM:boolean,
    Android:boolean,
    IOS:boolean,
    clicks:number;
}



const LinksMapNew:React.FC<LinksMapInt> = ({Data,SvgPath,pathS,pathL,UTM,Android,IOS,clicks}:LinksMapInt) => {
    const [linkChangeFlag,setLinkChangeFlag] = useState(false)
    const [qrFlag,setQrFlag] = useState(false)
    const ref = useRef<HTMLDivElement>(null);
    let count = 0;
    if(UTM) count++;
    if(Android) count++;
    if(IOS) count++;
    const closeCreatingLink = () => {
        setLinkChangeFlag(false);
    };
    const closeQrLink = () =>{
        setQrFlag(false)
    }
    const [flagTimer,setFlagTimer] = useState(true)
    const [flagTag,setFlagTag] = useState(true)
    const [copied,setCopied] = useState(false)
    function delayedFunc() {
         setCopied(false)
        }
    const onCopyClick = () =>{
        navigator.clipboard.writeText(pathS);
        setCopied(true);
        setTimeout(delayedFunc,2000)
    }
    return (
        <div className="mainCLMP">
            {linkChangeFlag &&
                 <Overlay onClose={closeCreatingLink}>
                 <RedactingLink />
               </Overlay>
            }
            {
                qrFlag &&
                <Overlay onClose={closeQrLink}>
                <QRComponent />
                </Overlay>
            }
            {flagTimer &&
            <div className="timerCLMP">
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.8453 8C5.11869 5.80761 6.98891 4.11111 9.25535 4.11111C11.71 4.11111 13.6998 6.10096 13.6998 8.55556C13.6998 11.0102 11.71 13 9.25535 13H6.47779M9.25557 8.55556V6.33333M8.14446 3H10.3667M3.70001 9.66667H6.47779M4.81112 11.3333H7.5889" stroke="black" stroke-width="1.06667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            }
            {
                flagTag &&
                <div className="tegCLMP">
                    <div style={{overflow:"hidden"}}>
                    marketingqweqwe
                    </div>
                </div>
            }
                <div style={{display:"inline-block"}}>
                    <div className="SVGCOntLP">
                        <img className="SVGLinksLP" src={"https://vk.com/favicon.ico"}/>
                    </div>
                </div>
                <div className="LinksDateCopy">
                    <div className="LinksDateTop">
                        <div style={{float:"left"}}>
                            <div className="ShortLinkLPMP">
                                {pathS}
                            </div>
                            <div style={{display:"inline-flex",marginLeft:"5px"}}>
                                <div  className="blockForCopySVG" style={{display:"flex",marginLeft:"10px"}}>
                                    {
                                        copied &&<img src={process.env.PUBLIC_URL + '/checkmark.png'} style={{width:"18px",height:"18px"}}></img>
                                    }
                                    {!copied &&
                                    <svg onClick={()=>{onCopyClick()}} width="15" height="15" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.69974 8.9645H3.69974C3.14724 8.9645 2.69974 8.5085 2.69974 7.9465V2.518C2.69974 1.955 3.14724 1.5 3.69974 1.5H7.69974C8.25224 1.5 8.69974 1.9555 8.69974 2.518V3.451M5.69974 3.536H9.69974C10.2522 3.536 10.6997 3.991 10.6997 4.5535V9.982C10.6997 10.545 10.2522 11 9.69974 11H5.69974C5.14724 11 4.69974 10.5445 4.69974 9.982V4.5535C4.69974 3.9915 5.14724 3.536 5.69974 3.536Z" stroke="#374151" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    }


                                </div>
                                <div onClick={()=>{setQrFlag(true)}} className="blockForCopySVG" style={{display:"flex",marginLeft:"5px"}}>
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.700012" width="24" height="24" rx="12" fill="#F3F4F6"/>
                                        <path d="M9.78335 6.75H8.03335C7.71118 6.75 7.45001 7.01117 7.45001 7.33333V9.08333C7.45001 9.4055 7.71118 9.66667 8.03335 9.66667H9.78335C10.1055 9.66667 10.3667 9.4055 10.3667 9.08333V7.33333C10.3667 7.01117 10.1055 6.75 9.78335 6.75Z" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.367 6.75H15.617C15.2948 6.75 15.0336 7.01117 15.0336 7.33333V9.08333C15.0336 9.4055 15.2948 9.66667 15.617 9.66667H17.367C17.6891 9.66667 17.9503 9.4055 17.9503 9.08333V7.33333C17.9503 7.01117 17.6891 6.75 17.367 6.75Z" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M9.78335 14.3333H8.03335C7.71118 14.3333 7.45001 14.5945 7.45001 14.9167V16.6667C7.45001 16.9888 7.71118 17.25 8.03335 17.25H9.78335C10.1055 17.25 10.3667 16.9888 10.3667 16.6667V14.9167C10.3667 14.5945 10.1055 14.3333 9.78335 14.3333Z" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.9503 14.3333H16.2003C15.8909 14.3333 15.5941 14.4563 15.3753 14.6751C15.1565 14.8938 15.0336 15.1906 15.0336 15.5V17.25" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.95 17.25V17.2567" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12.7003 9.08334V10.8333C12.7003 11.1428 12.5774 11.4395 12.3586 11.6583C12.1398 11.8771 11.843 12 11.5336 12H9.78363" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M7.45001 12H7.45668" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12.7 6.75H12.7067" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12.7 14.3333V14.34" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M15.0336 12H15.617" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.95 12V12.0067" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12.7 17.25V16.6667" stroke="#374151" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={ref} className="LinksDateBottom">
                        <div style={{fontWeight:400,fontSize:"14px"}}>{Data}</div>
                        <div style={{marginLeft:"10px",fontWeight:700}}>{pathL}</div>
                        <div className="BlurAbsolute"></div>
                    </div>
                </div>
                <div className="rightmainCLMP">
                    {count === 3 ?
                    <div className="threeIconsDevices">
                        <ThreeIcons/>
                    </div>
                        :
                    <div className="TwoIconsContainer">
                        {count === 2 ?
                        <div className="TwoIconsD">
                            <TwoIcons UTM={UTM} IOS={IOS} Android={Android}/>
                        </div>
                            :
                        <div className="OneIconD" style={{height:"26px"}}>
                            <OneIcon UTM={UTM} IOS={IOS} Android={Android}/>
                        </div>
                        }
                    </div>
                    }
                    <div style={{width:"91px",height:"26px",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#F3F4F6",borderRadius:"6px",marginLeft:"20px"}}>
                        <a style={{float:"left",paddingTop:"5px"}}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 13.3334V6.66669" stroke="#374151" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 13.3334V2.66669" stroke="#374151" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 13.3334V10.6667" stroke="#374151" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                        <div className="CLicksTextANum">{clicks} clicks</div>
                    </div>
                    <div onClick={()=>{setLinkChangeFlag(true)}} style={{height:"max-content",marginLeft:"10px",marginRight:"20px"}}>
                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3667 11.25C11.3667 12.2625 10.5459 13.0833 9.53335 13.0833C8.5208 13.0833 7.70001 12.2625 7.70001 11.25C7.70001 10.2374 8.5208 9.41666 9.53335 9.41666C10.5459 9.41666 11.3667 10.2374 11.3667 11.25Z" stroke="black" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11.3667 17.6667C11.3667 18.6792 10.5459 19.5 9.53335 19.5C8.5208 19.5 7.70001 18.6792 7.70001 17.6667C7.70001 16.6541 8.5208 15.8333 9.53335 15.8333C10.5459 15.8333 11.3667 16.6541 11.3667 17.6667Z" stroke="black" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11.3667 4.83333C11.3667 5.84586 10.5459 6.66667 9.53335 6.66667C8.5208 6.66667 7.70001 5.84586 7.70001 4.83333C7.70001 3.82081 8.5208 3 9.53335 3C10.5459 3 11.3667 3.82081 11.3667 4.83333Z" stroke="black" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
        </div>
    );
};

export default LinksMapNew;
