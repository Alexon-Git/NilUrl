import React, { useState, useEffect } from 'react';
import "../../styles/Global/HeaderLinksPage.css"
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'
import {LINKSPAGE_ROUTE, SETTINGPAGE_ROUTE} from "../../LogicComp/utils/Const";
const HeaderLinksPage = () => {
  const [username, setUsername] = useState('');
  const navigator = useNavigate()
  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      setUsername(decodedToken.username);
    }
  }, []);
  return (
    <div style={{borderBottom:"1px solid #E5E7EB"}}>
      <div className="HeaderLinksPageC">
        <div className="leftUserLogo">
          <div className="UserLogoWord">
            <div style={{paddingBottom:"2px"}}>
                            {username}
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
        <div
          onClick={() => {
            navigator("/price");
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <svg
            width="86"
            height="31"
            viewBox="0 0 86 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_552_765"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="86"
              height="31"
            >
              <rect
                x="0.5"
                y="0.5"
                width="85"
                height="30"
                rx="15"
                fill="#D9D9D9"
              />
            </mask>
            <g mask="url(#mask0_552_765)">
              <rect
                x="0.5"
                y="0.5"
                width="85"
                height="30"
                rx="15"
                fill="url(#paint0_linear_552_765)"
              />
<text
        style={{
          fontVariant: "normal",
          fontWeight: "700",
          fontSize: "14px", 
          fontFamily: "Helvetica Neue Cyr", 
          fill: "#FFFFFF",
          fillOpacity: 1,
          fillRule: "nonzero",
          stroke: "none",
          letterSpacing: "1px"
        }}
        x="50%" 
        y="55%" 
        textAnchor="middle" 
        dominantBaseline="middle" 
      >
        FREE
      </text>
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_552_765"
                x1="0.499999"
                y1="15.5"
                x2="85.5"
                y2="15.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#D9D9D9" />
                <stop offset="1" stopColor="#000000" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeaderLinksPage;
