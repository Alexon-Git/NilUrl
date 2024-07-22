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
  const [username, setUsername] = useState("");
  const [usernameInitial, setUsernameInitial] = useState("");
  const navigator = useNavigate();
  const location = useLocation();  // Hook to get the current location
  const handleLogout = () => {
    Cookies.remove("access_token");
    window.location.reload();
  };

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      setUsername(decodedToken.username);
      setUsernameInitial(decodedToken.username.charAt(0));
    }
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div style={{ borderBottom: "1px solid #E5E7EB" }}>
      <div className="wrapper">
        <div className="HeaderLinksPageC">
        <div className="HeaderMainPageLogoCentr">
                <svg width="100" height="28" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1_987)">
                        <path d="M20.0488 3.47632C15.4626 -1.15877 8.02595 -1.15877 3.43969 3.47632C-1.14656 8.11141 -1.14656 15.6272 3.43969 20.2623L10.6371 27.5363C11.249 28.1548 12.2402 28.1548 12.8522 27.5363L20.0488 20.2623C24.6358 15.6272 24.6358 8.11141 20.0488 3.47632ZM11.8347 22.3145C6.05593 22.3639 1.361 17.6197 1.40987 11.7787C1.45727 6.10788 6.04353 1.47279 11.6545 1.42488C17.4333 1.37549 22.1283 6.11968 22.0794 11.9607C22.0312 17.6315 17.4457 22.2658 11.8347 22.3145Z" fill="black"/>
                        <path d="M16.8374 17.0167C15.8061 18.0591 14.5399 18.7195 13.2103 18.9974C14.0162 18.0458 15.0738 16.3084 12.9324 15.5034C10.179 14.4692 13.9754 13.7092 14.2059 13.6444C14.7558 13.4903 14.7091 13.5058 14.7966 13.4778C15.4312 13.2721 17.2553 12.5298 13.1468 11.5443C8.39718 10.4054 13.8981 9.02254 13.8981 9.02254C13.8981 9.02254 6.78746 9.9985 10.4365 11.273C13.7668 12.4362 12.0841 12.5829 11.7639 12.5998C11.7129 12.6028 11.6618 12.6065 11.6115 12.6116C10.8041 12.6883 5.61246 13.2522 7.61967 14.8798C9.04631 16.0371 7.79034 16.7617 6.75902 17.1229C6.72255 17.0882 6.68681 17.0521 6.65107 17.016C3.83791 14.1729 3.83791 9.56359 6.65107 6.72121C9.46424 3.87809 14.025 3.87809 16.8374 6.72121C19.6513 9.56507 19.6513 14.1744 16.8374 17.0167Z" fill="black"/>
                    </g>
                    <path d="M99.9995 4.17285V22.4001H95.7402V4.17285H99.9995Z" fill="black"/>
                    <path d="M94.1931 9.0113V12.9025C93.5249 12.7318 92.9654 12.6465 92.5144 12.6465C90.3764 12.6465 89.3074 13.8924 89.3074 16.3841V22.4001H85.0732V9.1905H89.1321L89.107 11.4433C89.558 10.5729 90.0925 9.9329 90.7105 9.5233C91.3452 9.09663 92.1386 8.8833 93.0907 8.8833C93.4581 8.8833 93.8256 8.92597 94.1931 9.0113Z" fill="black"/>
                    <path d="M77.3004 4.17285H81.9856V15.1041C81.9856 17.7153 81.3258 19.6438 80.0063 20.8897C78.7034 22.1185 76.7575 22.7329 74.1686 22.7329C71.5295 22.7329 69.5753 22.1185 68.3058 20.8897C67.0531 19.6438 66.4268 17.7153 66.4268 15.1041V4.17285H71.1119V15.2065C71.1119 16.3841 71.3458 17.2801 71.8135 17.8945C72.2978 18.5089 73.1163 18.8161 74.2688 18.8161C76.2898 18.8161 77.3004 17.6129 77.3004 15.2065V4.17285Z" fill="black"/>
                    <path d="M63.3479 4.17285V22.4001H59.0887V4.17285H63.3479Z" fill="black"/>
                    <path d="M55.9343 4.17285V7.44965H51.675V4.17285H55.9343ZM55.9343 9.19045V22.4001H51.675V9.19045H55.9343Z" fill="black"/>
                    <path d="M33.1045 22.4001V4.17285H37.7646L44.2036 15.6929L44.0032 4.17285H48.513V22.4001H43.9781L37.464 10.7009L37.5892 22.4001H33.1045Z" fill="black"/>
                    <defs>
                        <clipPath id="clip0_1_987">
                            <rect width="23.4885" height="28" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
          <div className="leftUserLogo">
            <div
              className="header-right-status-pro"
              onClick={() => {
                navigator("/price");
              }}
            >
              Pro
            </div>
          </div>
          <div
            className="header-right"
            style={{ display: "flex", gap: "30px", alignItems: "center" }}
          >
            <div className="UserLogoWord" onClick={handleTogglePopup}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_849_398)">
                  <circle
                    cx="15"
                    cy="15"
                    r="15"
                    fill="url(#paint0_linear_849_398)"
                  />
                  <path
                    d="M15.4101 10.8469C15.4808 11.1615 15.4719 11.5104 15.4227 11.8267C15.3989 11.9798 15.2141 12.9467 14.9283 12.8679C14.4 12.7221 13.8559 12.1127 13.5839 11.6769C13.3462 11.2959 13.0541 10.6992 13.3151 10.2514C13.5103 9.91645 14.0015 9.85035 14.3454 9.89409C14.968 9.97327 15.23 10.5846 14.7568 11.0453C13.8342 11.9437 12.1063 10.6859 12.1891 9.56387C12.247 8.77924 13.2018 8.62299 13.8095 8.57501C14.0892 8.55294 13.7154 8.14688 13.6218 8.05172C13.4902 7.91785 13.2457 7.83472 13.1653 7.65653C13.0345 7.36662 13.503 7.27746 13.6741 7.2415C14.1402 7.14358 14.5897 7.0791 15.0636 7.0791C15.5383 7.0791 16.0911 7.11169 16.5 7.37865C16.726 7.52621 16.8888 7.73856 17.0882 7.91638C17.3848 8.18081 17.7012 8.41459 17.9688 8.71035C18.2947 9.07056 18.6368 9.41088 18.9288 9.80026C19.0992 10.0275 19.1343 10.2571 19.2139 10.5257C19.3058 10.8355 19.5458 11.7733 19.49 11.455C19.374 10.7941 19.1936 10.1486 18.8007 9.59635C18.5316 9.2182 18.2217 8.84666 17.9129 8.49923C17.7399 8.30463 17.5328 8.152 17.3156 8.01021C17.2357 7.95804 17.1469 7.89404 17.0575 7.85683C16.9704 7.82051 17.207 7.97235 17.2831 8.02826C17.811 8.41604 18.4241 8.69885 18.9324 9.10734C19.2209 9.33914 19.3533 9.63787 19.4701 9.97709C19.6325 10.4486 19.5926 10.9424 19.7282 11.4171C19.8691 11.9103 19.9336 12.4211 19.9231 12.9346C19.9133 13.409 19.8176 13.905 19.7228 14.3692C19.5781 15.0772 19.4917 15.7961 19.2789 16.4877C19.1036 17.0573 18.8136 17.5731 18.6256 18.1369C18.4108 18.7816 18.2671 19.4584 18.0157 20.0894C17.7491 20.7588 17.499 21.4011 17.3805 22.1176C17.2968 22.6238 17.2847 23.1184 17.6151 23.5396C17.9893 24.0164 18.504 24.4192 19.0154 24.7413C19.5234 25.0614 20.1703 25.1359 20.7441 25.2755C21.2169 25.3905 21.6866 25.5201 22.1588 25.6382C22.2349 25.6572 22.683 25.6764 22.6641 25.6977C22.4252 25.9664 21.9549 26.1498 21.6337 26.277C20.957 26.5448 20.2477 26.6652 19.5387 26.8129C19.0508 26.9145 18.5971 27.0585 18.0987 27.1196C17.4121 27.2038 16.7388 27.306 16.0452 27.3145C15.7045 27.3187 15.3748 27.3614 15.0365 27.3921C14.6019 27.4316 14.1605 27.412 13.7247 27.412C13.0691 27.412 12.4957 27.3687 11.8588 27.1828C11.3238 27.0266 10.7292 26.9287 10.2204 26.6974C9.99768 26.5962 9.78863 26.469 9.56174 26.3762C9.25898 26.2523 8.94091 26.1756 8.62883 26.0803C8.28869 25.9763 7.94394 25.8604 7.60749 25.7482C7.58789 25.7417 7.44515 25.681 7.52088 25.6652C7.81673 25.6036 8.14857 25.6294 8.44838 25.6183C10.2072 25.5534 11.8771 24.8121 13.6489 24.8532C14.7778 24.8794 15.9019 25.0895 17.0287 25.1672C17.6022 25.2068 15.9159 24.8771 15.3559 24.7468C14.3582 24.5146 13.3638 24.2744 12.3623 24.0592C12.1287 24.0091 12.0338 24.0136 12.1945 23.8319C12.2907 23.7231 12.5072 23.561 12.5301 23.4096C12.5554 23.2427 12.3587 23.0825 12.2612 22.9802C12.0664 22.7756 12.0321 22.654 12.0321 22.3775C12.0321 21.8311 12.2456 21.3876 12.0718 20.8581C12.0054 20.656 11.9272 20.467 11.8354 20.2753C11.7006 19.9937 11.6352 19.6953 11.525 19.4055C11.3226 18.8732 10.8932 18.5043 10.6246 18.007C10.221 17.2599 10.1791 16.428 10.0183 15.6143C9.82633 14.6433 9.66859 13.6607 9.59603 12.673C9.52539 11.7115 9.74182 10.9071 10.0598 10.0006C10.1743 9.67392 10.3523 9.39823 10.5235 9.10012C10.7109 8.77403 10.8622 8.43847 11.1731 8.20871C11.6743 7.83838 12.2466 7.65979 12.8657 7.66917C13.6 7.68029 14.3306 7.91655 14.9553 8.30073C15.5404 8.66053 15.9307 9.25899 16.2672 9.84176C16.5571 10.3439 16.8746 10.8565 17.0377 11.4171C17.2066 11.9974 17.2398 12.594 17.2759 13.1927C17.3125 13.7991 17.3837 14.4046 17.4094 15.0116C17.442 15.7827 17.3324 16.5581 17.1099 17.2961C16.7464 18.5014 16.0857 19.5881 15.8107 20.8256C15.5282 22.0968 15.8603 23.2844 16.6479 24.3083C16.8487 24.5692 17.0645 24.7907 17.1857 25.1022C17.2457 25.2566 17.3149 25.4164 17.3571 25.5768C17.4064 25.7642 17.1868 25.5002 17.1821 25.4956C16.5875 24.9162 15.9934 24.3322 15.4155 23.7362C14.8445 23.1474 14.4864 22.5032 14.3202 21.6954C14.0402 20.3349 14.1489 18.9057 14.5006 17.574C14.9108 16.0205 15.5602 14.5031 15.5725 12.8679C15.574 12.6685 15.3316 12.8311 15.2513 12.8859C15.0244 13.0407 14.8538 13.2596 14.6919 13.4778C14.3755 13.9042 14.079 14.3497 13.7932 14.7969C13.5051 15.2477 13.2254 15.7047 13.0245 16.2025C12.905 16.4988 12.8349 16.8113 12.7286 17.112C12.6684 17.2825 12.5949 17.4716 12.4832 17.6173C12.3737 17.76 12.3822 17.446 12.3803 17.4296C12.1924 15.7697 11.8963 14.1297 11.682 12.4745C11.6462 12.1979 11.6494 11.9259 11.6279 11.648C11.6163 11.4987 11.5259 11.3472 11.7073 11.399"
                    stroke="white"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                  <path
                    d="M15 0C6.72461 0 0 6.72461 0 15C0 23.2754 6.72461 30 15 30C23.2754 30 30 23.2754 30 15C30 6.72461 23.2754 0 15 0ZM15 1.5C22.4647 1.5 28.5 7.53527 28.5 15C28.5 18.5241 27.1431 21.7178 24.9375 24.1201L23.9971 23.8184L22.7344 23.4697L21.46 23.1738L20.1709 22.9307L19.9834 22.875L19.8193 22.7725L19.6875 22.6318L19.5938 22.4619L19.5498 22.2715L19.5527 22.0811L19.6055 21.8936L19.7051 21.7266L20.0215 21.29L20.2939 20.8271L20.751 19.9131L21.1553 18.9785L21.5098 18.0205L21.8115 17.042L22.0576 16.0547L22.251 15.0527L22.3887 14.0391L22.4736 13.0225L22.5 12.0029L22.4736 11.3496L22.3857 10.6992L22.2451 10.0605L22.0459 9.43652L21.7969 8.83301L21.4951 8.25L21.1465 7.69922L20.7451 7.18066L20.3057 6.69727L19.8193 6.25781L19.3037 5.85938L18.75 5.50488L18.1699 5.20312L17.5664 4.9541L16.9424 4.75488L16.3008 4.61426L15.6533 4.5293L15 4.5L14.3467 4.5293L13.6992 4.61426L13.0576 4.75488L12.4336 4.9541L11.8301 5.20312L11.25 5.50488L10.6992 5.85938L10.1807 6.25781L9.69434 6.69727L9.25488 7.18066L8.85645 7.69922L8.50488 8.25L8.20312 8.83301L7.9541 9.43652L7.75488 10.0605L7.61426 10.6992L7.5293 11.3496L7.5 12.0029L7.52637 13.0225L7.61133 14.0391L7.74902 15.0527L7.94238 16.0547L8.18848 17.042L8.49023 18.0205L8.84766 18.9785L9.24902 19.9131L9.70605 20.8271L9.97852 21.29L10.2949 21.7266L10.3945 21.8936L10.4473 22.0811L10.4531 22.2715L10.4062 22.4619L10.3125 22.6318L10.1807 22.7725L10.0166 22.875L9.8291 22.9307L8.54297 23.1738L7.26562 23.4697L6.00293 23.8184L5.0625 24.1201C2.85687 21.7178 1.5 18.5241 1.5 15C1.5 7.53527 7.53527 1.5 15 1.5ZM15 6L15.5889 6.0293L16.1719 6.11719L16.7402 6.26074L17.2939 6.45703L17.8301 6.71191L18.334 7.01074L18.8057 7.3623L19.2451 7.75781L19.6377 8.19434L19.9893 8.66895L20.291 9.17285L20.543 9.70605L20.7422 10.2598L20.8857 10.8311L20.9736 11.4141L21 12.0029L20.9766 12.9434L20.8975 13.8779L20.7686 14.8066L20.5928 15.7295L20.3643 16.6406L20.0859 17.54L19.7607 18.4189L19.3887 19.2832L18.9697 20.124L18.7646 20.4668L18.5273 20.7979L18.3311 21.0938L18.1816 21.4189L18.085 21.7646L18.0439 22.1221L18.0645 22.4795L18.1377 22.8311L18.2666 23.165L18.4482 23.4785L18.6768 23.7539L18.9434 23.9941L19.2451 24.1846L19.5791 24.3252L19.9248 24.4102L21.1494 24.6416L22.3682 24.9229L23.5693 25.2539L23.7188 25.3008C21.3668 27.2932 18.3292 28.5 15 28.5C11.6708 28.5 8.63321 27.2932 6.28125 25.3008L6.43066 25.2539L7.63184 24.9229L8.85059 24.6416L10.0752 24.4102L10.4209 24.3252L10.7549 24.1846L11.0566 23.9941L11.3262 23.7539L11.5518 23.4785L11.7334 23.165L11.8652 22.8311L11.9355 22.4795L11.9561 22.1221L11.915 21.7646L11.8184 21.4189L11.6689 21.0938L11.4727 20.7979L11.2354 20.4668L11.0303 20.124L10.6113 19.2832L10.2393 18.4189L9.91406 17.54L9.63574 16.6406L9.41016 15.7295L9.23145 14.8066L9.10254 13.8779L9.02344 12.9434L9 12.0029L9.0293 11.4141L9.11719 10.8311L9.25781 10.2598L9.45703 9.70605L9.70898 9.17285L10.0107 8.66895L10.3623 8.19434L10.7549 7.75781L11.1943 7.3623L11.666 7.01074L12.1729 6.71191L12.7061 6.45703L13.2598 6.26074L13.8281 6.11719L14.4111 6.0293L15 6Z"
                    fill="#222222"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_849_398"
                    x1="30.5"
                    y1="1.19582e-06"
                    x2="-1.80304e-06"
                    y2="30"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#634CEC" />
                    <stop offset="1" stop-color="#FE35AF" />
                  </linearGradient>
                  <clipPath id="clip0_849_398">
                    <rect width="30" height="30" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            {showPopup && (
              <div className="header-popup">
                <p
                  className="header_button-exit"
                  onClick={() => {
                    navigator(FAQ_ROUTE);
                  }}
                  style={{ marginBottom: "15px" }}
                >
                  <svg
                    width="10"
                    height="10"
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
                <p className="header_button-exit" onClick={handleLogout}>
                  <svg
                    width="8"
                    height="9"
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
            onClick={() => {
              navigator(SETTINGPAGE_ROUTE);
            }}
            className={`CentreHeaderLinksPageT ${
              location.pathname === SETTINGPAGE_ROUTE ? "active-link" : ""
            }`}
          >
            Настройки
          </div>
          <div
            onClick={() => {
              navigator(LINKSPAGE_ROUTE);
            }}
            className={`CentreHeaderLinksPageT ${
              location.pathname === LINKSPAGE_ROUTE ? "active-link" : ""
            }`}
          >
            Ссылки
          </div>
          <div
            onClick={() => {
              navigator("/Graph");
            }}
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
