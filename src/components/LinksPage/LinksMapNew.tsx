import React, { useRef, useState, useEffect } from "react";
import "../../styles/LinksPage/LinksMapNew.css";
import TwoIcons from "./TwoIcons";
import ThreeIcons from "./ThreeIcons";
import OneIcon from "./OneIcon";
import RedactingLink from "../creating-link/RedactingLink";
import QRComponent from "../qr-component/QRComponent";
import { Overlay } from "../../components";
import { GRAPHPAGE_ROUTE } from "../../LogicComp/utils/Const";
import { useNavigate } from "react-router-dom";

interface LinksMapInt {
  Data: string;
  SvgPath: string;
  pathS: string;
  pathL: string;
  UTM: boolean;
  Android: boolean;
  IOS: boolean;
  commentary: string;
  clicks: number;
  svgColor: string;
  backgrounds: string;
  tagValue: string;
  timer_flag: number;
  tag_flag: boolean;
}

const LinksMapNew: React.FC<LinksMapInt> = ({
  Data,
  SvgPath,
  pathS,
  pathL,
  UTM,
  Android,
  IOS,
  commentary,
  clicks,
  svgColor,
  backgrounds,
  tagValue,
  timer_flag,
  tag_flag,
}: LinksMapInt) => {
  const navigate = useNavigate();
  const [imageLoadError, setImageLoadError] = useState(false);
  const handleImageError = () => {
    setImageLoadError(true);
  };
  const [linkChangeFlag, setLinkChangeFlag] = useState(false);
  const [qrFlag, setQrFlag] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  let count = 0;
  if (UTM) count++;
  if (Android) count++;
  if (IOS) count++;
  const closeCreatingLink = () => {
    setLinkChangeFlag(false);
  };
  const closeQrLink = () => {
    setQrFlag(false);
  };
  const [flagTimer, setFlagTimer] = useState(timer_flag);
  const [flagTag, setFlagTag] = useState(tag_flag);
  const [isCommentPopupVisible, setIsCommentPopupVisible] = useState(false);
  const [gradient, setGradient] = useState('');
  const [copied, setCopied] = useState(false);
  function delayedFunc() {
    setCopied(false);
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const applyRandomGradient = () => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const randomGradient = `linear-gradient(45deg, ${color1}, ${color2})`;
    setGradient(randomGradient);
  };

  useEffect(() => {
    applyRandomGradient();
  }, []);

  const onCopyClick = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(pathS)
        .then(() => {
          setCopied(true);
          setTimeout(delayedFunc, 2000);
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = pathS;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(delayedFunc, 2000);
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }
      document.body.removeChild(textArea);
    }
  };
  return (
    <div className="mainCLMP">
      {linkChangeFlag && (
        <Overlay onClose={closeCreatingLink}>
          <RedactingLink pathS={pathS} pathL={pathL} />
        </Overlay>
      )}
      {qrFlag && (
        <Overlay onClose={closeQrLink}>
          <QRComponent pathS={pathS} />
        </Overlay>
      )}
      {flagTimer == 1 && (
        <div className="timerCLMP">
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ paddingTop: '2px' }}
          >
            <path
              d="M4.8453 8C5.11869 5.80761 6.98891 4.11111 9.25535 4.11111C11.71 4.11111 13.6998 6.10096 13.6998 8.55556C13.6998 11.0102 11.71 13 9.25535 13H6.47779M9.25557 8.55556V6.33333M8.14446 3H10.3667M3.70001 9.66667H6.47779M4.81112 11.3333H7.5889"
              stroke="black"
              stroke-width="1.06667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      )}
      {flagTimer == 2 && (
        <div className="timerCLMPRed">
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ paddingTop: '2px' }}
          >
            <path
              d="M4.8453 8C5.11869 5.80761 6.98891 4.11111 9.25535 4.11111C11.71 4.11111 13.6998 6.10096 13.6998 8.55556C13.6998 11.0102 11.71 13 9.25535 13H6.47779M9.25557 8.55556V6.33333M8.14446 3H10.3667M3.70001 9.66667H6.47779M4.81112 11.3333H7.5889"
              stroke="white"
              stroke-width="1.06667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <line x1="0" y1="0" x2="17" y2="16" stroke="white" strokeWidth="1.06667" strokeLinecap="round" />
          </svg>
        </div>
      )}
      {flagTag && (
        <div
          className="tegCLMP"
          style={{ backgroundColor: `${backgrounds}`, color: `${svgColor}` }}
        >
          <div style={{ overflow: "hidden" }}>{tagValue}</div>
        </div>
      )}
      <div style={{ display: "inline-block" }}>
        <div className="SVGCOntLP">
          {!imageLoadError ? (
            <img
              className="SVGLinksLP"
              src={SvgPath}
              onError={handleImageError}
            />
          ) : (
            <div className="gradient-circle"
            style={{
              background: gradient,
            }}></div>
          )}
        </div>
      </div>
      <div className="LinksDateCopy">
        <div className="LinksDateTop">
          <div style={{ float: "left" }}>
            <div className="ShortLinkLPMP">{pathS}</div>
            <div className="ShortLinkBtn">
              <div
                className="blockForCopySVG"
                style={{ display: "flex", marginLeft: "10px" }}
              >
                {copied && (
                  <img
                    src={process.env.PUBLIC_URL + "/checkmark.png"}
                    style={{ width: "15px", height: "15px" }}
                  ></img>
                )}
                {!copied && (
                  <svg
                    onClick={() => {
                      onCopyClick();
                    }}
                    width="15"
                    height="15"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.69974 8.9645H3.69974C3.14724 8.9645 2.69974 8.5085 2.69974 7.9465V2.518C2.69974 1.955 3.14724 1.5 3.69974 1.5H7.69974C8.25224 1.5 8.69974 1.9555 8.69974 2.518V3.451M5.69974 3.536H9.69974C10.2522 3.536 10.6997 3.991 10.6997 4.5535V9.982C10.6997 10.545 10.2522 11 9.69974 11H5.69974C5.14724 11 4.69974 10.5445 4.69974 9.982V4.5535C4.69974 3.9915 5.14724 3.536 5.69974 3.536Z"
                      stroke="#374151"
                      stroke-width="0.875"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </div>
              <div
                onClick={() => {
                  setQrFlag(true);
                }}
                className="blockForCopySVG"
                style={{ display: "flex", marginLeft: "10px" }}
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.700012"
                    width="24"
                    height="24"
                    rx="12"
                    fill="#F3F4F6"
                  />
                  <path
                    d="M9.78335 6.75H8.03335C7.71118 6.75 7.45001 7.01117 7.45001 7.33333V9.08333C7.45001 9.4055 7.71118 9.66667 8.03335 9.66667H9.78335C10.1055 9.66667 10.3667 9.4055 10.3667 9.08333V7.33333C10.3667 7.01117 10.1055 6.75 9.78335 6.75Z"
                    stroke="#374151"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.367 6.75H15.617C15.2948 6.75 15.0336 7.01117 15.0336 7.33333V9.08333C15.0336 9.4055 15.2948 9.66667 15.617 9.66667H17.367C17.6891 9.66667 17.9503 9.4055 17.9503 9.08333V7.33333C17.9503 7.01117 17.6891 6.75 17.367 6.75Z"
                    stroke="#374151"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.78335 14.3333H8.03335C7.71118 14.3333 7.45001 14.5945 7.45001 14.9167V16.6667C7.45001 16.9888 7.71118 17.25 8.03335 17.25H9.78335C10.1055 17.25 10.3667 16.9888 10.3667 16.6667V14.9167C10.3667 14.5945 10.1055 14.3333 9.78335 14.3333Z"
                    stroke="#374151"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.9503 14.3333H16.2003C15.8909 14.3333 15.5941 14.4563 15.3753 14.6751C15.1565 14.8938 15.0336 15.1906 15.0336 15.5V17.25"
                    stroke="#374151"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.95 17.25V17.2567"
                    stroke="#374151"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.7003 9.08334V10.8333C12.7003 11.1428 12.5774 11.4395 12.3586 11.6583C12.1398 11.8771 11.843 12 11.5336 12H9.78363"
                    stroke="#374151"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.45001 12H7.45668"
                    stroke="#374151"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.7 6.75H12.7067"
                    stroke="#374151"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.7 14.3333V14.34"
                    stroke="#374151"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.0336 12H15.617"
                    stroke="#374151"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.95 12V12.0067"
                    stroke="#374151"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.7 17.25V16.6667"
                    stroke="#374151"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div
                className="blockForCopySVG"
                style={{
                  display: commentary.trim() ? "flex" : "none",
                  marginLeft: "10px",
                  position: "relative",
                }}
                onMouseEnter={() =>
                  commentary.trim() && setIsCommentPopupVisible(true)
                }
                onMouseLeave={() =>
                  commentary.trim() && setIsCommentPopupVisible(false)
                }
              >
                <svg
                  height="18"
                  width="18"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3.5"
                >
                  <g
                    fill="none"
                    stroke="#374151"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <line x1="5.75" x2="9" y1="11.25" y2="11.25" />
                    <line x1="5.75" x2="12.25" y1="8.25" y2="8.25" />
                    <line x1="5.75" x2="12.25" y1="5.25" y2="5.25" />
                    <rect
                      height="14.5"
                      width="12.5"
                      rx="2"
                      ry="2"
                      x="2.75"
                      y="1.75"
                    />
                  </g>
                </svg>
                <rect
                  x="0.700012"
                  width="24"
                  height="24"
                  rx="12"
                  fill="#F3F4F6"
                />
                {isCommentPopupVisible && commentary.trim() && (
                  <div className="comment-popup">{commentary}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div ref={ref} className="LinksDateBottom">
          <div style={{ marginRight: "10px", fontWeight: 500 }}>{pathL}</div>
          <div
            style={{
              fontWeight: 400,
              fontSize: "14px",
              color: "rgba(156, 163, 175, 1)",
            }}
          >
            {Data}
          </div>
          <div className="BlurAbsolute"></div>
        </div>
      </div>
      <div className="rightmainCLMP">
        {count === 3 ? (
          <div className="threeIconsDevices">
            <ThreeIcons />
          </div>
        ) : (
          <div className="TwoIconsContainer">
            {count === 2 ? (
              <div className="TwoIconsD">
                <TwoIcons UTM={UTM} IOS={IOS} Android={Android} />
              </div>
            ) : (
              <div className="OneIconD" style={{ height: "26px" }}>
                <OneIcon UTM={UTM} IOS={IOS} Android={Android} />
              </div>
            )}
          </div>
        )}
        <div className="stats-button">
          <a style={{ float: "left", paddingTop: "5px" }}>
          <svg height="18" width="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="text-gray-6000 h-4 w-4 shrink-0">
  <g fill="none" stroke="#374151" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
    <path d="M8.095,7.778l7.314,2.51c.222,.076,.226,.388,.007,.47l-3.279,1.233c-.067,.025-.121,.079-.146,.146l-1.233,3.279c-.083,.219-.394,.215-.47-.007l-2.51-7.314c-.068-.197,.121-.385,.318-.318Z"/>
    <line x1="12.031" x2="16.243" y1="12.031" y2="16.243"/>
    <line x1="7.75" x2="7.75" y1="1.75" y2="3.75"/>
    <line x1="11.993" x2="10.578" y1="3.507" y2="4.922"/>
    <line x1="3.507" x2="4.922" y1="11.993" y2="10.578"/>
    <line x1="1.75" x2="3.75" y1="7.75" y2="7.75"/>
    <line x1="3.507" x2="4.922" y1="3.507" y2="4.922"/>
  </g>
</svg>
          </a>
          <div
            className="CLicksTextANum"
            onClick={() => navigate(GRAPHPAGE_ROUTE, { state: { pathS } })}
          >
            {clicks}
          </div>
        </div>
        <div
          onClick={() => {
            setLinkChangeFlag(true);
          }}
          style={{
            height: "max-content",
            marginLeft: "10px",
            marginRight: "20px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0003 10.8334C10.4606 10.8334 10.8337 10.4603 10.8337 10C10.8337 9.53978 10.4606 9.16669 10.0003 9.16669C9.54009 9.16669 9.16699 9.53978 9.16699 10C9.16699 10.4603 9.54009 10.8334 10.0003 10.8334Z"
              stroke="#6B7280"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.0003 4.99998C10.4606 4.99998 10.8337 4.62688 10.8337 4.16665C10.8337 3.70641 10.4606 3.33331 10.0003 3.33331C9.54009 3.33331 9.16699 3.70641 9.16699 4.16665C9.16699 4.62688 9.54009 4.99998 10.0003 4.99998Z"
              stroke="#6B7280"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.0003 16.6667C10.4606 16.6667 10.8337 16.2936 10.8337 15.8333C10.8337 15.3731 10.4606 15 10.0003 15C9.54009 15 9.16699 15.3731 9.16699 15.8333C9.16699 16.2936 9.54009 16.6667 10.0003 16.6667Z"
              stroke="#6B7280"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LinksMapNew;
