import React, { useState, useEffect } from "react";
import "../../styles/Global/HeaderLinksPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  LINKSPAGE_ROUTE,
  SETTINGPAGE_ROUTE,
  FAQ_ROUTE,
} from "../../LogicComp/utils/Const";

const HeaderLinksPage = () => {
  const [userSVG, setUserSVG] = useState(null);
  const [username, setUsername] = useState("");
  const [usernameInitial, setUsernameInitial] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigator = useNavigate();
  const location = useLocation(); // Hook to get the current location

  const handleLogout = () => {
    Cookies.remove("access_token");
    window.location.reload();
  };

  const handleTogglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        setUsername(decodedToken.username);
        setUsernameInitial(decodedToken.username.charAt(0));

        fetch("https://nilurl.ru:8000/get_user_svg.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              if (data.svg) {
                setUserSVG(data.svg);
              } else {
                console.error("SVG path is null.");
              }
            } else {
              console.error(data.message || "Failed to fetch SVG.");
            }
          })
          .catch((error) => console.error("Error fetching SVG:", error));
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    }
  }, []);

  return (
    <div style={{ borderBottom: "1px solid #E5E7EB" }}>
      <div className="wrapper">
        <div className="HeaderLinksPageC">
          <div className="HeaderMainPageLogoCentr">
            <svg
              width="100"
              height="28"
              viewBox="0 0 100 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1_987)">
                <path
                  d="M20.0488 3.47632C15.4626 -1.15877 8.02595 -1.15877 3.43969 3.47632C-1.14656 8.11141 -1.14656 15.6272 3.43969 20.2623L10.6371 27.5363C11.249 28.1548 12.2402 28.1548 12.8522 27.5363L20.0488 20.2623C24.6358 15.6272 24.6358 8.11141 20.0488 3.47632ZM11.8347 22.3145C6.05593 22.3639 1.361 17.6197 1.40987 11.7787C1.45727 6.10788 6.04353 1.47279 11.6545 1.42488C17.4333 1.37549 22.1283 6.11968 22.0794 11.9607C22.0312 17.6315 17.4457 22.2658 11.8347 22.3145Z"
                  fill="black"
                />
                <path
                  d="M16.8374 17.0167C15.8061 18.0591 14.5399 18.7195 13.2103 18.9974C14.0162 18.0458 15.0738 16.3084 12.9324 15.5034C10.179 14.4692 13.9754 13.7092 14.2059 13.6444C14.7558 13.4903 14.7091 13.5058 14.7966 13.4778C15.4312 13.2721 17.2553 12.5298 13.1468 11.5443C8.39718 10.4054 13.8981 9.02254 13.8981 9.02254C13.8981 9.02254 6.78746 9.9985 10.4365 11.273C13.7668 12.4362 12.0841 12.5829 11.7639 12.5998C11.7129 12.6028 11.6618 12.6065 11.6115 12.6116C10.8041 12.6883 5.61246 13.2522 7.61967 14.8798C9.04631 16.0371 7.79034 16.7617 6.75902 17.1229C6.72255 17.0882 6.68681 17.0521 6.65107 17.016C3.83791 14.1729 3.83791 9.56359 6.65107 6.72121C9.46424 3.87809 14.025 3.87809 16.8374 6.72121C19.6513 9.56507 19.6513 14.1744 16.8374 17.0167Z"
                  fill="black"
                />
              </g>
              <path
                d="M99.9995 4.17285V22.4001H95.7402V4.17285H99.9995Z"
                fill="black"
              />
              <path
                d="M94.1931 9.0113V12.9025C93.5249 12.7318 92.9654 12.6465 92.5144 12.6465C90.3764 12.6465 89.3074 13.8924 89.3074 16.3841V22.4001H85.0732V9.1905H89.1321L89.107 11.4433C89.558 10.5729 90.0925 9.9329 90.7105 9.5233C91.3452 9.09663 92.1386 8.8833 93.0907 8.8833C93.4581 8.8833 93.8256 8.92597 94.1931 9.0113Z"
                fill="black"
              />
              <path
                d="M77.3004 4.17285H81.9856V15.1041C81.9856 17.7153 81.3258 19.6438 80.0063 20.8897C78.7034 22.1185 76.7575 22.7329 74.1686 22.7329C71.5295 22.7329 69.5753 22.1185 68.3058 20.8897C67.0531 19.6438 66.4268 17.7153 66.4268 15.1041V4.17285H71.1119V15.2065C71.1119 16.3841 71.3458 17.2801 71.8135 17.8945C72.2978 18.5089 73.1163 18.8161 74.2688 18.8161C76.2898 18.8161 77.3004 17.6129 77.3004 15.2065V4.17285Z"
                fill="black"
              />
              <path
                d="M63.3479 4.17285V22.4001H59.0887V4.17285H63.3479Z"
                fill="black"
              />
              <path
                d="M55.9343 4.17285V7.44965H51.675V4.17285H55.9343ZM55.9343 9.19045V22.4001H51.675V9.19045H55.9343Z"
                fill="black"
              />
              <path
                d="M33.1045 22.4001V4.17285H37.7646L44.2036 15.6929L44.0032 4.17285H48.513V22.4001H43.9781L37.464 10.7009L37.5892 22.4001H33.1045Z"
                fill="black"
              />
              <defs>
                <clipPath id="clip0_1_987">
                  <rect width="23.4885" height="28" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="leftUserLogo">
            <div
              className="header-right-status"
              onClick={() => navigator("/price")}
            >
              Base
            </div>
          </div>
          <div
            className="header-right"
            style={{ display: "flex", gap: "20px", alignItems: "center" }}
          >
            <p
              onClick={() => navigator("/price")}
              className="header-gradient-text"
            >
              Обновить тарифный план
            </p>
            <div
              className="UserLogoWord"
              onClick={handleTogglePopup}
              style={{ overflow: "hidden", borderRadius: "50%" }}
            >
              {userSVG ? (
                <img
                  className="image-container-logo-free"
                  src={userSVG}
                  alt="User SVG"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginTop: "5px" }}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
                      fill="#ababab"
                    ></path>
                  </g>
                </svg>
              )}
            </div>
            {showPopup && (
              <div className="header-popup">
                <p
                  className="header_button-exit"
                  onClick={() => navigator(FAQ_ROUTE)}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.836 3.8C3.93004 3.53267 4.11566 3.30724 4.36 3.16365C4.60432 3.02006 4.89156 2.96758 5.17088 3.01548C5.4502 3.0634 5.70352 3.20861 5.88604 3.42541C6.06852 3.64221 6.16844 3.91661 6.168 4.2C6.168 5 4.968 5.4 4.968 5.4M5 7H5.004M9 5C9 7.20912 7.20912 9 5 9C2.79086 9 1 7.20912 1 5C1 2.79086 2.79086 1 5 1C7.20912 1 9 2.79086 9 5Z"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Помощь
                </p>
                <a
                  href="https://t.me/ARTEMYAG"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <p
                    className="header_button-exit"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M8.24999 18L5.24999 20.25V15.75H2.25C1.85217 15.75 1.47064 15.5919 1.18934 15.3106C0.908034 15.0293 0.749999 14.6478 0.749999 14.25V2.25C0.749999 1.85217 0.908034 1.47064 1.18934 1.18934C1.47064 0.908034 1.85217 0.749999 2.25 0.749999H18.75C19.1478 0.749999 19.5293 0.908034 19.8106 1.18934C20.0919 1.47064 20.25 1.85217 20.25 2.25V6.71484"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M5.24999 5.24999H15.75"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M5.24999 9.74999H8.24999"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M23.25 18.75H20.25V23.25L15.75 18.75H11.25V9.74999H23.25V18.75Z"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M19.5 15H15"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </g>
                    </svg>
                    Сообщить об ошибке
                  </p>
                </a>
                <p className="header_button-exit" onClick={handleLogout}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 8 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.69488 0.5C0.764942 0.5 0 1.2823 0 2.23333V6.76667C0 7.7177 0.764942 8.5 1.69488 8.5H3.93184C4.79564 8.5 5.51666 7.82489 5.61491 6.96667H4.55578C4.47607 7.24214 4.23334 7.43333 3.93184 7.43333H1.69488C1.32472 7.43333 1.043 7.14522 1.043 6.76667V2.23333C1.043 1.85478 1.32472 1.56667 1.69488 1.56667H3.93184C4.23334 1.56667 4.47607 1.75786 4.55578 2.03333H5.61491C5.51666 1.17511 4.79564 0.5 3.93184 0.5H1.69488Z"
                      fill="#020202"
                    />
                    <path
                      d="M6.39463 2.90002C6.32614 2.90002 6.25832 2.91381 6.19505 2.94061C6.13178 2.96741 6.07428 3.0067 6.02586 3.05622C5.97743 3.10575 5.93901 3.16454 5.9128 3.22925C5.88659 3.29396 5.8731 3.36332 5.8731 3.43336C5.8731 3.5034 5.88659 3.57275 5.9128 3.63746C5.93901 3.70217 5.97743 3.76097 6.02586 3.81049L6.17859 3.96669H2.31209C2.17378 3.96669 2.04113 4.02288 1.94333 4.1229C1.84553 4.22292 1.79059 4.35858 1.79059 4.50002C1.79059 4.64147 1.84553 4.77713 1.94333 4.87715C2.04113 4.97717 2.17378 5.03336 2.31209 5.03336H6.17859L6.02586 5.18956C5.97743 5.23908 5.93901 5.29788 5.9128 5.36259C5.88659 5.42729 5.8731 5.49665 5.8731 5.56669C5.8731 5.63673 5.88659 5.70609 5.9128 5.7708C5.93901 5.83551 5.97743 5.8943 6.02586 5.94383C6.07428 5.99335 6.13177 6.03264 6.19505 6.05945C6.25832 6.08625 6.32614 6.10005 6.39463 6.10005C6.46311 6.10005 6.53093 6.08625 6.5942 6.05945C6.65748 6.03264 6.71497 5.99335 6.76339 5.94383L7.71241 4.97328C7.79835 4.92918 7.8707 4.86164 7.92146 4.77812C7.97222 4.6946 7.99941 4.59836 8.00003 4.50002C7.9999 4.40018 7.97238 4.30238 7.92059 4.21775C7.8688 4.13312 7.79482 4.06505 7.70706 4.0213L6.76339 3.05622C6.71497 3.0067 6.65747 2.96741 6.5942 2.94061C6.53093 2.91381 6.46311 2.90002 6.39463 2.90002Z"
                      fill="black"
                    />
                  </svg>
                  Выйти
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="CentreHeaderLinksPageC">
          <div
            onClick={() => navigator(SETTINGPAGE_ROUTE)}
            className={`CentreHeaderLinksPageT ${
              location.pathname === SETTINGPAGE_ROUTE ? "active-link" : ""
            }`}
          >
            Настройки
          </div>
          <div
            onClick={() => navigator(LINKSPAGE_ROUTE)}
            className={`CentreHeaderLinksPageT ${
              location.pathname === LINKSPAGE_ROUTE ? "active-link" : ""
            }`}
          >
            Ссылки
          </div>
          <div
            onClick={() => navigator("/Graph")}
            className={`CentreHeaderLinksPageT ${
              location.pathname === "/Graph" ? "active-link" : ""
            }`}
          >
            Аналитика
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLinksPage;
