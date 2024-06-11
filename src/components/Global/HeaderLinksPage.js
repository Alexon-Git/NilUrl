import React, { useState, useEffect } from 'react';
import "../../styles/Global/HeaderLinksPage.css"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'
import { LINKSPAGE_ROUTE, SETTINGPAGE_ROUTE } from "../../LogicComp/utils/Const";


const HeaderLinksPage = () => {
    const [username, setUsername] = useState('');
    const [usernameInitial, setUsernameInitial] = useState('');
    const navigator = useNavigate();

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setUsername(decodedToken.username);
            setUsernameInitial(decodedToken.username.charAt(0));
        }
    }, []);

    return (
        <div style={{ borderBottom: "1px solid #E5E7EB" }}>
            <div className="HeaderLinksPageC">
                <div className="leftUserLogo">
                    <div className="UserLogoWord">
                        <div style={{ paddingBottom: "2px" }}>
                            {usernameInitial}
                        </div>
                    </div>
                </div>
                <div className="CentreHeaderLinksPageC">
                    <div onClick={()=>{navigator(SETTINGPAGE_ROUTE)}} className="CentreHeaderLinksPageT">
                        Настройки
                    </div>
                    <div onClick={()=>{navigator(LINKSPAGE_ROUTE)}} className="CentreHeaderLinksPageT">
                        Ссылки
                    </div>
                    <div onClick={()=>{navigator("/Graph")}} className="CentreHeaderLinksPageT">
                        Аналитика
                    </div>
                </div>
                <div className='header-right' style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                <div style={{display:"inline-flex",alignItems:"center"}}>
                    <svg width="86" height="31" viewBox="0 0 86 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_552_765"  maskUnits="userSpaceOnUse" x="0" y="0" width="86" height="31">
                            <rect x="0.5" y="0.5" width="85" height="30" rx="15" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_552_765)">
                            <rect x="0.5" y="0.5" width="85" height="30" rx="15" fill="url(#paint0_linear_552_765)"/>
                            <path d="M20.0977 19.5H17.8896V11.625H13.8291V19.5H11.6211V9.69727H20.0977V19.5ZM24.3154 18.6865H24.2881V22.7197H22.1279V12.5H24.2881V13.5527H24.3154C24.8486 12.737 25.5983 12.3291 26.5645 12.3291C27.4714 12.3291 28.1709 12.6413 28.6631 13.2656C29.1598 13.8854 29.4082 14.7308 29.4082 15.8018C29.4082 16.9684 29.1188 17.9049 28.54 18.6113C27.9658 19.3177 27.2002 19.6709 26.2432 19.6709C25.4001 19.6709 24.7575 19.3428 24.3154 18.6865ZM24.2539 15.8154V16.376C24.2539 16.859 24.3815 17.2533 24.6367 17.5586C24.8919 17.8639 25.2269 18.0166 25.6416 18.0166C26.1338 18.0166 26.5143 17.8275 26.7832 17.4492C27.0566 17.0664 27.1934 16.5264 27.1934 15.8291C27.1934 14.5986 26.7148 13.9834 25.7578 13.9834C25.3158 13.9834 24.9535 14.152 24.6709 14.4893C24.3929 14.8219 24.2539 15.264 24.2539 15.8154ZM37.0986 16.6152H32.5322C32.6051 17.6315 33.2454 18.1396 34.4531 18.1396C35.2233 18.1396 35.9001 17.9574 36.4834 17.5928V19.1514C35.8363 19.4977 34.9954 19.6709 33.9609 19.6709C32.8307 19.6709 31.9535 19.3587 31.3291 18.7344C30.7048 18.1055 30.3926 17.2305 30.3926 16.1094C30.3926 14.9473 30.7298 14.0267 31.4043 13.3477C32.0788 12.6686 32.9082 12.3291 33.8926 12.3291C34.9134 12.3291 35.7018 12.6322 36.2578 13.2383C36.8184 13.8444 37.0986 14.667 37.0986 15.7061V16.6152ZM35.0957 15.2891C35.0957 14.2865 34.6901 13.7852 33.8789 13.7852C33.5326 13.7852 33.2318 13.9287 32.9766 14.2158C32.7259 14.5029 32.5732 14.8607 32.5186 15.2891H35.0957ZM47.4414 19.5H45.4248V14.0518C45.3792 14.307 45.2585 14.7376 45.0625 15.3438L43.7021 19.5H41.8018L40.4414 15.3438C40.2181 14.6602 40.0973 14.234 40.0791 14.0654V19.5H38.3838V12.5H41.2275L42.5537 16.4922C42.7588 17.1074 42.8727 17.5221 42.8955 17.7363C42.9274 17.5312 43.0436 17.1211 43.2441 16.5059L44.5566 12.5H47.4414V19.5ZM56.2256 19.5H54.2637V14.9199C54.0859 15.2799 53.8945 15.6126 53.6895 15.918L51.3105 19.5H49.2666V12.5H51.2422V16.9365C51.388 16.6312 51.5475 16.3464 51.7207 16.082L54.0996 12.5H56.2256V19.5ZM64.7227 12.5L61.8789 20.0605C61.1953 21.8789 60.1654 22.7881 58.7891 22.7881C58.265 22.7881 57.8343 22.7288 57.4971 22.6104V20.8877C57.7842 21.0563 58.0964 21.1406 58.4336 21.1406C58.9896 21.1406 59.377 20.8786 59.5957 20.3545L59.9648 19.4863L57.1211 12.5H59.5137L60.8193 16.7588C60.9014 17.0231 60.9652 17.3353 61.0107 17.6953H61.0381C61.0791 17.431 61.1543 17.1234 61.2637 16.7725L62.583 12.5H64.7227ZM74.6484 19.5H72.6318V14.0518C72.5863 14.307 72.4655 14.7376 72.2695 15.3438L70.9092 19.5H69.0088L67.6484 15.3438C67.4251 14.6602 67.3044 14.234 67.2861 14.0654V19.5H65.5908V12.5H68.4346L69.7607 16.4922C69.9658 17.1074 70.0798 17.5221 70.1025 17.7363C70.1344 17.5312 70.2507 17.1211 70.4512 16.5059L71.7637 12.5H74.6484V19.5Z" fill="white"/>
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_552_765" x1="0.499999" y1="15.5" x2="85.5" y2="15.5" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#624CEB"/>
                                <stop offset="1" stop-color="#FF35AE"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <p className="header_button-exit" onClick={()=>{}}>Выйти</p>
                </div>
            </div>
        </div>
    );
};

export default HeaderLinksPage;
