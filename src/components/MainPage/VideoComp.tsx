import React, {createRef, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';
import "../../styles/MainPage/VideoComp.css"
import Arrow from "./arrow";
import {useCustomRefHook} from "../../hooks/RefHook";

const VideoComp = () => {
    const videoRef = useCustomRefHook<HTMLIFrameElement>(null)
    const firstAcc = useCustomRefHook<HTMLUListElement>(null)
    const secondAcc = useCustomRefHook<HTMLUListElement>(null)
    const thirdAcc = useCustomRefHook<HTMLUListElement>(null)
    useEffect(()=>{
        if(videoRef.current!==null){
            videoRef.current.style.width = "80%";
            videoRef.current.style.height = "80%";
        }
    },[])
    const [accView, setAccView] = useState(
        new Array(3).fill(false)
    );
    interface setViewFuncInter{
        (ind:number) : void
    }
    const setViewFunc:setViewFuncInter = (ind:number) =>{

        const tempArr = [...accView]
        tempArr[ind] ? tempArr[ind] = false : tempArr[ind] = true
        setAccView(tempArr)
        switch (ind){
            case 0:
                if(firstAcc.current!==null){
                    if(accView[ind] === false){
                        firstAcc.current.style.transition = "max-height 1s ease-in"
                        firstAcc.current.style.maxHeight = "150px"
                        if(accView[1] === true && secondAcc.current!=null){
                            secondAcc.current.style.transition = "max-height 1s ease-in"
                            secondAcc.current.style.maxHeight = "0"
                        }
                        if(accView[2] === true && thirdAcc.current!=null){
                            thirdAcc.current.style.transition = "max-height 1s ease-in"
                            thirdAcc.current.style.maxHeight = "0"
                        }
                    }
                    if(accView[ind] === true){
                        firstAcc.current.style.transition = "max-height 1s ease-in"
                        firstAcc.current.style.maxHeight = "0"
                    }
                }
                break;
            case 1:
                if(secondAcc.current!==null){
                    if(accView[ind] === false){
                    secondAcc.current.style.transition = "max-height 1s ease-in"
                    secondAcc.current.style.maxHeight = "14vh"
                        if(accView[0] === true && firstAcc.current!=null){
                            firstAcc.current.style.transition = "max-height 1s ease-in"
                            firstAcc.current.style.maxHeight = "0"
                        }
                        if(accView[2] === true && thirdAcc.current!=null){
                            thirdAcc.current.style.transition = "max-height 1s ease-in"
                            thirdAcc.current.style.maxHeight = "0"
                        }
                    }
                    if(accView[ind] === true){
                    secondAcc.current.style.transition = "max-height 1s ease-in"
                    secondAcc.current.style.maxHeight = "0"
                    }
                }
                break;
            case 2:
                if(thirdAcc.current!==null){
                    if(accView[ind] === false){
                        thirdAcc.current.style.transition = "max-height 1s ease-in"
                        thirdAcc.current.style.maxHeight = "14vh"
                        if(accView[0] === true && firstAcc.current!=null){
                            firstAcc.current.style.transition = "max-height 1s ease-in"
                            firstAcc.current.style.maxHeight = "0"
                        }
                        if(accView[1] === true && secondAcc.current!=null){
                            secondAcc.current.style.transition = "max-height 1s ease-in"
                            secondAcc.current.style.maxHeight = "0"
                        }
                    }
                    if(accView[ind] === true){
                        thirdAcc.current.style.transition = "max-height 1s ease-in"
                        thirdAcc.current.style.maxHeight = "0"
                    }
                }
                break;
        }

    }
    const [youtubeID] = useState('Tbeud0H_gGw')



    return (
        <div>
            <div className="MainVideoCompContainer">
                <div className="StrongFunctionText">
                    <div className="GradintVordMP">Мощные</div> функции для <div className="GradintVordMP">Современных</div> маркетинговых команд
                </div>
            </div>
            <div className="videoPlusAccordions">
                <div className="AccordionsMP">
                    <div className="AccordionMP" onClick={()=>setViewFunc(0)}>
                        <svg className="svgVideoCompAccord" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 16.6667V8.33334" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15 16.6667V3.33334" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 16.6667V13.3333" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <a className="PodVieoA">Важная аналитика</a>
                        <Arrow clickProp={setViewFunc} id={0} key={0} />
                        <div>
                            <ul className="menu" ref={firstAcc}>
                                <li>
                                    <div>
                                        <div>
                                            <div className = "podAcordion">
                                                <div>
                                                    NilUrl предоставляет мощную аналитику ваших ссылок,
                                                    включая информацию о геолокации, устройстве,
                                                    браузере и реферере.
                                                </div>
                                            </div>
                                            <button className="MoreButtonMP">
                                                Подробнее
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="AccordionMP" onClick={()=>setViewFunc(1)}>
                        <svg className="svgVideoCompAccord" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.83333 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V5.83333C2.5 6.29357 2.8731 6.66667 3.33333 6.66667H5.83333C6.29357 6.66667 6.66667 6.29357 6.66667 5.83333V3.33333C6.66667 2.8731 6.29357 2.5 5.83333 2.5Z" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16.6667 2.5H14.1667C13.7065 2.5 13.3334 2.8731 13.3334 3.33333V5.83333C13.3334 6.29357 13.7065 6.66667 14.1667 6.66667H16.6667C17.1269 6.66667 17.5 6.29357 17.5 5.83333V3.33333C17.5 2.8731 17.1269 2.5 16.6667 2.5Z" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.83333 13.3333H3.33333C2.8731 13.3333 2.5 13.7064 2.5 14.1667V16.6667C2.5 17.1269 2.8731 17.5 3.33333 17.5H5.83333C6.29357 17.5 6.66667 17.1269 6.66667 16.6667V14.1667C6.66667 13.7064 6.29357 13.3333 5.83333 13.3333Z" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17.5 13.3333H15C14.558 13.3333 14.1341 13.5089 13.8215 13.8215C13.509 14.1341 13.3334 14.558 13.3334 15V17.5" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17.5 17.5V17.5083" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 5.83334V8.33334C10 8.77536 9.82445 9.19929 9.51188 9.51185C9.19932 9.82441 8.7754 10 8.33337 10H5.83337" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.5 10H2.50833" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 2.5H10.0083" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 13.3333V13.3417" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.3334 10H14.1667" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17.5 10V10.0083" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 17.5V16.6667" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <a className="PodVieoA">Бесплатный генератор QR-кодов</a>
                        <Arrow clickProp={setViewFunc} id={1} key={1}/>

                        <div>
                            <ul className="menu" ref={secondAcc}>
                                <li>
                                    <div>
                                        <div>
                                            <div className = "podAcordion">
                                                <div>
                                                    NilUrl предоставляет мощную аналитику ваших ссылок,
                                                    включая информацию о геолокации, устройстве,
                                                    браузере и реферере.
                                                </div>
                                            </div>
                                            <button className="MoreButtonMP">
                                                Подробнее
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="AccordionMP" onClick={()=>setViewFunc(2)}>
                        <svg className="svgVideoCompAccord" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.49996 14.1667H5.83329C4.72822 14.1667 3.66842 13.7277 2.88701 12.9463C2.10561 12.1649 1.66663 11.1051 1.66663 9.99999C1.66663 8.89493 2.10561 7.83512 2.88701 7.05372C3.66842 6.27232 4.72822 5.83333 5.83329 5.83333H7.49996" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.5 5.83333H14.1667C15.2717 5.83333 16.3315 6.27232 17.1129 7.05372C17.8943 7.83512 18.3333 8.89493 18.3333 9.99999C18.3333 11.1051 17.8943 12.1649 17.1129 12.9463C16.3315 13.7277 15.2717 14.1667 14.1667 14.1667H12.5" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.66663 10H13.3333" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <a className="PodVieoA">Персонализируйте свои ссылки </a>
                        <Arrow clickProp={setViewFunc} id={2} key={2} />
                        <div>
                            <ul className="menu" ref={thirdAcc}>
                                <li>
                                    <div>
                                        <div>
                                            <div className = "podAcordion">
                                                <div>
                                                    NilUrl предоставляет мощную аналитику ваших ссылок,
                                                    включая информацию о геолокации, устройстве,
                                                    браузере и реферере.
                                                </div>
                                            </div>
                                            <button className="MoreButtonMP">
                                                Подробнее
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div style={{margin: "auto",width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <iframe className='video'
                            title='Youtube player'
                            sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                            src={`https://youtube.com/embed/${youtubeID}?autoplay=0`}
                    ref={videoRef}
                    >
                            </iframe>
                </div>
            </div>

        </div>
    );
};

export default VideoComp;
