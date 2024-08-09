import React, { useState, useRef, useEffect } from "react";
import "./creatingLink.css";
import axios from "axios";
import PropTypes from "prop-types";
import CryptoJS from "crypto-js";
import { usePremium } from "../../LogicComp/DataProvider";
import { useNavigate } from "react-router-dom";
import { PRICEPAGE_ROUTE, FAQ_ROUTE } from "../../LogicComp/utils/Const";

import {
  FAQ,
  Toggle,
  Calendar,
  TagList,
  UpgradeToProPopup,
  AlertPopup,
} from "../../components";
import { TbBoxMargin } from "react-icons/tb";

const CreatingLink = () => {
  const { isPremium } = usePremium();
  const navigate = useNavigate();
  const [isPro, setIsPro] = useState(isPremium);
  const [activePopupId, setActivePopupId] = useState(null);
  const [showPopups, setShowPopups] = useState({
    utm: false,
    date: false,
    ios: false,
    android: false,
  });

  const [faviconSVG, setFaviconSVG] = useState(null);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isNewPopupActive, setIsNewPopupActive] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); // Состояние для текста попапа
  const [isAlertPopupVisible, setAlertPopupVisibility] = useState(false); // Состояние для отображения попапа

  const handleIconClick = () => {
    console.log("Icon clicked. Previous state:", isPopupActive);
    setIsPopupActive(!isPopupActive);
    console.log("New state:", !isPopupActive);
  };
  const handleChange = (event) => {
    const inputURL = event.target.value;
    fetchFavicon(inputURL)
      .then((svg) => setFaviconSVG(svg))
      .catch((error) => console.error("Error fetching favicon:", error));
  };
  const [faviconLoadError, setFaviconLoadError] = useState(false);
  const fetchFavicon = async (url) => {
    try {
      const proxyUrl = "https://nilurl.ru/?";
      const targetUrl = new URL(url);
      const baseUrl = targetUrl.origin;
      const response = await axios.get(proxyUrl + targetUrl.href);
      const html = response.data;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      let favicon = "/NilLogo.svg";

      const iconLink =
        doc.querySelector('link[rel="icon"]') ||
        doc.querySelector('link[rel="shortcut icon"]') ||
        doc.querySelector('link[rel*="icon"]') ||
        doc.querySelector('link[rel="apple-touch-icon"]') ||
        doc.querySelector('link[rel="apple-touch-icon-precomposed"]');
      if (iconLink) {
        favicon = iconLink.href;
      } else {
        const response = await axios.get(proxyUrl + baseUrl + "/favicon.ico");
        if (response.status === 200) {
          favicon = baseUrl + "/favicon.ico";
        }
      }

      if (favicon && !favicon.startsWith("http")) {
        favicon = baseUrl + favicon;
      }

      return favicon;
    } catch (error) {
      console.error("Error fetching favicon:", error);
      return "/NilLogo.svg";
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("https://nilurl.ru:8000/get_tag.php", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }

        const data = await response.json();

        const filteredTags = data.tags
          .filter((tag) => tag.text !== "")
          .reduce((acc, current) => {
            const x = acc.find((item) => item.text === current.text);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);

        setTags(filteredTags);
      } catch (error) {
        console.error("Ошибка при загрузке тегов:", error);
        // здесь можно добавить логику для обработки ошибки, например, установку стейта ошибки или вывод сообщения пользователю
      }
    };

    fetchTags();
  }, []);

  const validateInput = async () => {
    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
    const shortUrlPattern = /[A-Za-z0-9]{3,}$/;
    const noSpecialCharsPattern = /^[A-Za-z0-9]+$/;
    const urlErrorText =
      "Некорректный формат ссылки. Ваша ссылка должна начинаться с http:// или https://.";
    const shortUrlErrorText =
      "Короткая ссылка должна содержать минимум 3 символа.";
    const specialCharsErrorText =
      "Короткая ссылка не должна содержать специальных символов.";
    const tagLengthErrorText =
      "Название тэга должно быть не более 15 символов.";
    const commentLengthErrorText =
      "Комментарий должен быть не более 500 символов.";
    const utmLengthErrorText =
      "Каждое поле UTM должно быть не более 50 символов.";
    const iosUrlErrorText = "iOS URL должен быть действительной ссылкой.";
    const androidUrlErrorText =
      "Android URL должен быть действительной ссылкой.";
    const bannedWordsErrorText = "Ваша ссылка содержит недопустимые слова.";

    // Reset error states before validation
    setInputTextError("");
    setShortUrlError("");
    setTagError("");
    setCommentError("");
    setUtmError("");
    setIosUrlError("");
    setAndroidUrlError("");
    setBannedWordsError("");
    setErrorMessage("");

    if (!inputText || !shortUrl) {
      setInputTextError("Поля ссылок обязательны для заполнения.");
      setShortUrlError("Поля ссылок обязательны для заполнения.");
      return false;
    }

    if (!urlPattern.test(inputText)) {
      setInputTextError(urlErrorText);
      return false;
    }

    if (!noSpecialCharsPattern.test(shortUrl.replace("", ""))) {
      setShortUrlError(specialCharsErrorText);
      return false;
    }

    if (!shortUrlPattern.test(shortUrl)) {
      setShortUrlError(shortUrlErrorText);
      return false;
    }

    try {
      const response = await fetch("https://nilurl.ru:8000/check_swear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: shortUrl }),
      });
      const data = await response.json();

      if (data.profanity) {
        setBannedWordsError(bannedWordsErrorText);
        return false;
      }
    } catch (error) {
      console.error("Error checking profanity:", error);
    }

    if (tagValue.length > 15) {
      setTagError(tagLengthErrorText);
      return false;
    }

    const commentInput = getCommentData();
    if (commentInput && commentInput.length > 500) {
      setCommentError(commentLengthErrorText);
      return false;
    }

    const utmData = getUTMData(); // Получаем данные UTM
    // Проверяем данные UTM и устанавливаем ошибку при необходимости
    for (const key in utmData) {
      if (utmData[key].length > 50) {
        setUtmError(utmLengthErrorText);
        return false;
      }
    }

    if (
      toggles.find((toggle) => toggle.id === "ios").checked &&
      !urlPattern.test(getIOSData())
    ) {
      setIosUrlError(iosUrlErrorText);
      return false;
    }

    if (
      toggles.find((toggle) => toggle.id === "android").checked &&
      !urlPattern.test(getAndroidData())
    ) {
      setAndroidUrlError(androidUrlErrorText);
      return false;
    }

    return true;
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [inputText, setInputText] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [tagValue, setTagValue] = useState("");

  const [inputTextError, setInputTextError] = useState(false);
  const [shortUrlError, setShortUrlError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tagError, setTagError] = useState("");
  const [commentError, setCommentError] = useState("");
  const [utmError, setUtmError] = useState("");
  const [iosUrlError, setIosUrlError] = useState("");
  const [androidUrlError, setAndroidUrlError] = useState("");
  const [bannedWordsError, setBannedWordsError] = useState("");

  const [tagColors, setTagColors] = useState({
    svgColor: "#000000",
    color: "rgba(229, 228, 226, 1)",
  });
  const [toggles, setToggles] = useState([
    {
      id: "comment",
      title: "Комментарий",
      checked: false,
      info: <CommentComponent commentError={commentError} />,
    },
    {
      id: "utm",
      title: "UTM-метка",
      checked: false,
      info: <UTMInputs utmError={utmError} />,
    },
    {
      id: "date",
      title: "Дата окончания",
      checked: false,
      info: <Calendar onDateChange={setSelectedDate} />,
    },
    {
      id: "ios",
      title: "iOS Targeting",
      checked: false,
      info: <IOSComponent iosUrlError={iosUrlError} />,
    },
    {
      id: "android",
      title: "Android Targeting",
      checked: false,
      info: <AndroidComponent androidUrlError={androidUrlError} />,
    },
  ]);

  useEffect(() => {
    setToggles((prevToggles) =>
      prevToggles.map((toggle) =>
        toggle.id === "comment"
          ? {
              ...toggle,
              info: <CommentComponent commentError={commentError} />,
            }
          : toggle
      )
    );
  }, [commentError]);

  useEffect(() => {
    setToggles((prevToggles) =>
      prevToggles.map((toggle) =>
        toggle.id === "utm"
          ? { ...toggle, info: <UTMInputs utmError={utmError} /> }
          : toggle
      )
    );
  }, [utmError]);

  useEffect(() => {
    setToggles((prevToggles) =>
      prevToggles.map((toggle) => {
        if (toggle.id === "ios") {
          return {
            ...toggle,
            info: <IOSComponent iosUrlError={iosUrlError} />,
          };
        } else {
          return toggle;
        }
      })
    );
  }, [iosUrlError]);

  useEffect(() => {
    setToggles((prevToggles) =>
      prevToggles.map((toggle) => {
        if (toggle.id === "android") {
          return {
            ...toggle,
            info: <AndroidComponent androidUrlError={androidUrlError} />,
          };
        } else {
          return toggle;
        }
      })
    );
  }, [androidUrlError]);

  const sendLinkDataToServer = async (data) => {
    try {
      const response = await fetch("https://nilurl.ru:8000/post_link.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status === "success") {
        setPopupMessage("Ссылка успешно создана!");
        setAlertPopupVisibility(true);
        window.location.reload();
      } else {
        const message =
          result.message || "Произошла ошибка при создании ссылки.";
        setPopupMessage(message);
        setAlertPopupVisibility(true);
      }
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
      setPopupMessage("Произошла ошибка при отправке данных на сервер.");
      setAlertPopupVisibility(true);
    }
  };

  const collectLinkData = () => {
    const fullShortUrl = `https://nilurl.ru/${shortUrl}`;
    const linkData = {
      inputText: inputText,
      shortUrl: fullShortUrl,
      tagValue: tagValue,
      tagColors: tagColors,
      toggles: {
        utm: toggles.find((toggle) => toggle.id === "utm").checked
          ? getUTMData()
          : false,
        date: selectedDate ? getDateData(selectedDate) : false,
        ios: toggles.find((toggle) => toggle.id === "ios").checked
          ? getIOSData()
          : false,
        android: toggles.find((toggle) => toggle.id === "android").checked
          ? getAndroidData()
          : false,
      },
      comment: toggles.find((toggle) => toggle.id === "comment").checked
        ? getCommentData()
        : false,
    };

    return linkData;
  };

  const getUTMData = () => {
    const utmInputs = document.querySelectorAll(
      '.utm__input-item input[type="text"], .utm__input-item input[type="checkbox"]'
    );
    const utmData = {};

    utmInputs.forEach((input) => {
      const id = input.id;
      if (input.type === "checkbox") {
        utmData[id] = input.checked;
      } else {
        utmData[id] = input.value ? input.value : false;
      }
    });

    return utmData;
  };

  const getDateData = (selectedDate) => {
    const day = selectedDate.getDate().toString().padStart(2, "0");
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = selectedDate.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    console.log("Выбранная дата:", formattedDate);
    return formattedDate;
  };

  const getIOSData = () => {
    return document.querySelector(".ios-input").value;
  };

  const getAndroidData = () => {
    return document.querySelector(".android-input").value;
  };

  const getCommentData = () => {
    const commentInput = document.querySelector(".custom-textarea");
    return commentInput ? commentInput.value : false;
  };

  const handleToggle = (id) => {
    const toggle = toggles.find((toggle) => toggle.id === id);
    if (!toggle) return;

    Object.keys(showPopups).forEach((popupId) => {
      setShowPopups((prevState) => ({ ...prevState, [popupId]: false }));
    });

    if (id === "comment") {
      setToggles((prevToggles) => {
        const newToggles = prevToggles.map((toggle) =>
          toggle.id === id ? { ...toggle, checked: !toggle.checked } : toggle
        );
        return newToggles;
      });
      return;
    }

    if (
      (id === "comment" && !isPro) ||
      (id !== "utm" && id !== "date" && id !== "ios" && id !== "android")
    )
      return;

    if (!toggle.checked && !isPro && id !== "comment") {
      setShowPopups((prevState) => ({ ...prevState, [id]: true }));
      setActivePopupId(id);
    } else {
      setToggles((prevToggles) => {
        const newToggles = prevToggles.map((toggle) =>
          toggle.id === id ? { ...toggle, checked: !toggle.checked } : toggle
        );
        return newToggles;
      });
      setActivePopupId(null);
    }
  };

  const closePopup = (id) => {
    setShowPopups((prevState) => ({ ...prevState, [id]: false }));
    setActivePopupId(null);
  };

  const closeNewPopup = () => {
    setIsNewPopupActive(false);
  };

  const handleClosePopup = () => {
    setAlertPopupVisibility(false);
    setPopupMessage("");
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLongUrlChange = async (event) => {
    const newText = event.target.value;
    setInputText(newText);
    const newShortUrl = generateShortUrl(newText);
    setShortUrl(newShortUrl);
  };

  const generateShortUrl = (input) => {
    const hash = CryptoJS.SHA256(input).toString();
    const shortId = hash.substring(0, 5);
    const randomShortId = Array.from(shortId)
      .map((char) => {
        const randomCase =
          Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase();
        return randomCase;
      })
      .join("");
    const url = `${randomShortId}`;
    return url;
  };

  const handleCreateLink = async () => {
    const isValid = await validateInput();
    if (isValid) {
      const linkData = collectLinkData();
      sendLinkDataToServer(linkData);
    }
  };

  const handleCreateLinkKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCreateLink();
    }
  };

  const handleTagChange = (event) => {
    setTagValue(event.target.value);
  };

  const handleMouseOver = () => {
    console.log("Показать подсказку");
  };

  const handleMouseOut = () => {
    console.log("Скрыть подсказку");
  };

  ////////
  const [tags, setTags] = useState([]);
  ///////////////

  const handleTagClick = (tag) => {
    setTagColors({ color: tag.bgColor, svgColor: tag.textColor });
    setTagValue(tag.text);
    setIsPopupActive(false);
  };

  return (
    <div className="creating__link">
      <div className="creating__link__header">
        <span className="header__svg">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V12M3 9H21M18 21V15M21 18.0008L15 18"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <p className="header__title">Создание ссылки</p>
      </div>
      <form className="creating__link__main">
        <div className="link__input">
          <div className="link__input-title">Ваша ссылка</div>
          <div className="input__container">
            <input
              className={
                inputTextError ? "link-input input-error" : "link-input"
              }
              type="text"
              placeholder="https://app.dub.co/aleksandr-vysochenko"
              value={inputText}
              onChange={(e) => {
                handleLongUrlChange(e);
                handleChange(e);
              }}
            />
          </div>
          {inputTextError && (
            <span className="error-message-link">{inputTextError}</span>
          )}
        </div>
        <div className="link__input">
          <div className="link__input-title">Короткая ссылка</div>
          <div className="link__input-short-form">
            <span className="svg__infinity">
              {faviconSVG ? (
                <img
                  width="35"
                  height="35"
                  src={faviconSVG}
                  alt="Favicon"
                  onError={() => {
                    setFaviconLoadError(true);
                    setFaviconSVG(false);
                  }}
                />
              ) : (
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="17.5" cy="17.5" r="17.5" fill="white" />
                  <circle
                    cx="17.5"
                    cy="17.5"
                    r="17"
                    stroke="#9A9A9A"
                    strokeOpacity="0.5"
                  />
                  <path
                    d="M19.25 17.5C19.25 19.9162 17.2912 21.875 14.875 21.875H13.125C10.7088 21.875 8.75 19.9162 8.75 17.5C8.75 15.0838 10.7088 13.125 13.125 13.125H13.5625M15.75 17.5C15.75 15.0838 17.7088 13.125 20.125 13.125H21.875C24.2912 13.125 26.25 15.0838 26.25 17.5C26.25 19.9162 24.2912 21.875 21.875 21.875H21.4375"
                    stroke="black"
                    strokeWidth="1.28"
                    strokeLinecap="round"
                  />
                </svg>
              )}
              {faviconLoadError && (
                <img
                  width="35"
                  height="35"
                  className="SVGLinksLP"
                  src="/NilLogo.svg"
                />
              )}
            </span>
            <div className="input__container-short">
              <span className="static-text">https://nilurl.ru/</span>
              <input
                className={
                  shortUrlError || bannedWordsError
                    ? "link-input-short input-error"
                    : "link-input-short"
                }
                type="text"
                placeholder="Ffv3cv"
                value={shortUrl}
                onChange={(e) => setShortUrl(e.target.value)}
              />
            </div>
          </div>
          {shortUrlError && (
            <span className="error-message-link">{shortUrlError}</span>
          )}
          {bannedWordsError && (
            <span className="error-message-link">{bannedWordsError}</span>
          )}
        </div>
        <div className="link__input">
          <div className="link__input-title">Тег ссылки</div>
          <div className="input__container">
            <div
              className="input__icon left-image"
              onClick={handleMouseEnter}
              style={{
                backgroundColor: tagColors.color,
                borderLeft: "1px solid transparent",
                borderRight: "1px solid rgba(154, 154, 154, 0.5)",
                borderRadius: "4px 0 0 4px",
              }}
            >
              <svg
                className="input__svg"
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ boxSizing: "content-box" }}
              >
                <path
                  d="M5.4375 1.625H8.07283C8.71481 1.625 9.03585 1.625 9.33799 1.69753C9.60583 1.76183 9.86185 1.86789 10.0968 2.01182C10.3617 2.17415 10.5886 2.40115 11.0427 2.85515L15.9375 7.75M4.60608 7.79357H4.61483M6.32281 4.25H5.2625C3.79236 4.25 3.05729 4.25 2.49578 4.53611C2.00185 4.78778 1.60028 5.18935 1.34861 5.68328C1.0625 6.24479 1.0625 6.97986 1.0625 8.45V9.51032C1.0625 10.1523 1.0625 10.4733 1.13503 10.7755C1.19933 11.0433 1.30539 11.2993 1.44932 11.5343C1.61165 11.7991 1.83865 12.0261 2.29265 12.4802L5.09265 15.2802C6.1322 16.3197 6.65197 16.8395 7.25129 17.0342C7.77856 17.2055 8.34644 17.2055 8.87371 17.0342C9.473 16.8395 9.99284 16.3197 11.0323 15.2802L12.0927 14.2198C13.1322 13.1803 13.652 12.6605 13.8467 12.0612C14.018 11.5339 14.018 10.9661 13.8467 10.4388C13.652 9.8395 13.1322 9.31966 12.0927 8.28016L9.29266 5.48015C8.83863 5.02615 8.61165 4.79915 8.34679 4.63682C8.11185 4.49289 7.85583 4.38683 7.58799 4.32253C7.28585 4.25 6.96481 4.25 6.32281 4.25ZM5.04358 7.79357C5.04358 8.03516 4.84771 8.23107 4.60608 8.23107C4.36445 8.23107 4.16858 8.03516 4.16858 7.79357C4.16858 7.55195 4.36445 7.35607 4.60608 7.35607C4.84771 7.35607 5.04358 7.55195 5.04358 7.79357Z"
                  stroke={tagColors.svgColor}
                  strokeWidth="1.28"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {isHovered && (
              <div
                className="tag-list-container"
                onMouseLeave={handleMouseLeave}
              >
                <TagList onTagClick={setTagColors} />
              </div>
            )}
            <input
              className={
                tagError ? "link-input png input-error" : "link-input png"
              }
              type="text"
              placeholder="Название тега"
              value={tagValue}
              onChange={handleTagChange}
            />
            <div
              className={`input__icon right-image ${
                isPopupActive ? "" : "active"
              }`}
              onClick={handleIconClick}
            >
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: isPopupActive ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path
                  d="M1 1L7 7L13 1"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div
                className={`tag-popup-container ${
                  isPopupActive ? "" : "active"
                }`}
              >
                {tags.length === 0 ? (
                  <p className="popup-message">Список тегов пуст</p>
                ) : (
                  tags.map((tag, index) => (
                    <div
                      className="tag-object"
                      key={index}
                      onClick={() => handleTagClick(tag)}
                    >
                      <p
                        className="tag-info"
                        style={{
                          backgroundColor: tag.bgColor,
                          color: tag.textColor,
                        }}
                      >
                        {tag.text}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          {tagError && <span className="error-message-link">{tagError}</span>}
        </div>
        <div className="link__functional">
          <p className="link__functional-title">Функционал</p>
          {toggles.map((toggle) => (
            <div className="link__functional-item" key={toggle.id}>
              <div className="functional__item">
                <p className="functional__item-title">{toggle.title}</p>
                <span className="functional__item-faq">
                  <img
                    src={FAQ}
                    alt="Подсказка:"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={() => {
                      window.open(FAQ_ROUTE, "_blank");
                    }}
                  ></img>
                </span>
                {!isPro && (
  toggles
    .filter(toggle => toggle.id !== 'comment') 
    .some(toggle => 
      !toggle.checked &&
      (toggle.id === 'utm' || toggle.id === 'date' || toggle.id === 'ios' || toggle.id === 'android')
    ) && (
    <span className="header__svg additional-svg">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-crown ">
        <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/>
        <path d="M5 21h14"/>
      </svg>
    </span>
  )
)}
                {isNewPopupActive && (
                  <UpgradeToProPopup onClose={() => closeNewPopup(toggle.id)}>
                    <p className="popup-message">
                      Для получения дополнительной информации рекомендуем
                      посетить наш раздел часто задаваемых вопросов (FAQ).
                    </p>
                    <button
                      className="popup-button"
                      onClick={() => {
                        navigate(PRICEPAGE_ROUTE);
                      }}
                    >
                      Перейти к FAQ
                    </button>
                  </UpgradeToProPopup>
                )}
                <div className="toggle__switch">
                  <Toggle
                    initialChecked={toggle.checked}
                    onToggle={() => handleToggle(toggle.id)}
                    ind={toggle.id}
                    size="small"
                  />
                </div>
              </div>
              {toggle.checked !== undefined && toggle.checked && (
                <div className="functional__item-info">{toggle.info}</div>
              )}
              {showPopups[toggle.id] && !isPro && toggle.id !== "comment" && (
                <div className="functional__item-info">
                  <UpgradeToProPopup onClose={() => closePopup(toggle.id)}>
                    <p className="popup-message">
                      Статистику за последний год, а так же более детальную
                      настройку ссылок можно получить в проекте с тарифным
                      планом Premium.
                    </p>
                    <button
                      className="popup-button"
                      onClick={() => {
                        navigate(PRICEPAGE_ROUTE);
                      }}
                    >
                      Обновиться до Pro
                    </button>
                  </UpgradeToProPopup>
                </div>
              )}
            </div>
          ))}
        </div>
      </form>
      <div className="creating__link__footer">
        <button
          className="create__link__button"
          onClick={handleCreateLink}
          onKeyDown={handleCreateLinkKeyDown}
          tabIndex={0}
        >
          Создать ссылку
        </button>
      </div>
      {isAlertPopupVisible && (
        <AlertPopup onClose={handleClosePopup} message={popupMessage} />
      )}
    </div>
  );
};

const CommentComponent = ({ commentError }) => {
  const textAreaRef = useRef(null);
  const [val, setVal] = useState("");

  const handleChange = (e) => {
    setVal(e.target.value);
  };

  useEffect(() => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [val]);

  CommentComponent.propTypes = {
    commentError: PropTypes.string, // Ensure commentError is a string
  };

  return (
    <div className="w-screen min-h-screen bg-neutral-950 flex justify-center items-center">
      <div
        className="text-neutral-200 bg-neutral-800 p-2 w-full max-w-[30rem] rounded flex flex-col space-y-2"
        style={{ marginBottom: "10px" }}
      >
        <textarea
          className={
            commentError
              ? "p-1 bg-neutral-700 outline-none rounded border border-gray-300 custom-textarea text-neutral-300 input-error"
              : "p-1 bg-neutral-700 outline-none rounded border border-gray-300 custom-textarea text-neutral-300"
          }
          placeholder="Добавить комментарий"
          value={val}
          onChange={handleChange}
          rows="2"
          ref={textAreaRef}
        ></textarea>
        {commentError && (
          <span className="error-message-link">{commentError}</span>
        )}
      </div>
    </div>
  );
};

const UTMInputs = ({ utmError }) => {
  const [inputs, setInputs] = useState([
    {
      id: "Referral",
      title: "Referral",
      checked: false,
      inputType: "text",
      placeholder: "Referral",
    },
    {
      id: "UTM Source",
      title: "UTM Source",
      checked: false,
      inputType: "text",
      placeholder: "yandex_direct, google_adwords",
    },
    {
      id: "UTM Medium",
      title: "UTM Medium",
      checked: false,
      inputType: "text",
      placeholder: "cpc, retargeting, banner",
    },
    {
      id: "UTM Campaign",
      title: "UTM Campaign",
      checked: false,
      inputType: "text",
      placeholder: "banner, {campaign_id}",
    },
    {
      id: "UTM Term",
      title: "UTM Term",
      checked: false,
      inputType: "text",
      placeholder: "kupit_velosiped, {keyword}",
    },
    {
      id: "UTM Content",
      title: "UTM Content",
      checked: false,
      inputType: "text",
      placeholder: "skidka_50, {phrase_id}",
    },
    {
      id: "Android UTM Metrika",
      title: "Android UTM Metrika",
      checked: false,
      inputType: "checkbox",
    },
    {
      id: "iOS UTM Metrika",
      title: "iOS UTM Metrika",
      checked: false,
      inputType: "checkbox",
    },
  ]);

  const handleInputChange = (id) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, checked: !input.checked } : input
      )
    );
  };

  return (
    <div className="utm__input">
      {inputs.map((input) => (
        <div
          className={`utm__input-item ${
            input.id === "Android UTM Metrika" || input.id === "iOS UTM Metrika"
              ? "utm__input-item--checkbox"
              : ""
          }`}
          key={input.id}
        >
          <label
            className={`utm__input-label ${
              input.id === "Android UTM Metrika" ||
              input.id === "iOS UTM Metrika"
                ? "utm__input-label--checkbox"
                : ""
            }`}
            htmlFor={input.id}
          >
            {input.title}
          </label>
          <input
            className={`utm__input-input ${
              input.id === "Android UTM Metrika" ||
              input.id === "iOS UTM Metrika"
                ? "utm__input-input--checkbox"
                : ""
            }`}
            type={input.inputType}
            id={input.id}
            checked={input.checked}
            onChange={() => handleInputChange(input.id)}
            placeholder={input.placeholder}
          />
        </div>
      ))}
      {utmError && (
        <span className="error-message-link" style={{ marginBottom: "10px" }}>
          {utmError}
        </span>
      )}
    </div>
  );
};

UTMInputs.propTypes = {
  utmError: PropTypes.string, // Убедитесь, что utmError является строкой
};

const IOSComponent = ({ iosUrlError }) => {
  const [inputValue_IOS, setInputValue_IOS] = useState("");

  const handleInputChange = (event) => {
    setInputValue_IOS(event.target.value);
  };

  return (
    <div>
      <input
        className={iosUrlError ? "ios-input input-error" : "ios-input"}
        type="text"
        placeholder="https://apps.apple.com/app/18362974"
        value={inputValue_IOS}
        onChange={handleInputChange}
      />
      {iosUrlError && <span className="error-message-link">{iosUrlError}</span>}
    </div>
  );
};

const AndroidComponent = ({ androidUrlError }) => {
  const [inputValue_android, setInputValue_android] = useState("");

  const handleInputChange = (event) => {
    setInputValue_android(event.target.value);
  };

  return (
    <div>
      <input
        className={
          androidUrlError ? "android-input input-error" : "android-input"
        }
        type="text"
        placeholder="https://play.google.com/store/apps/details?id=18362974"
        value={inputValue_android}
        onChange={handleInputChange}
      />
      {androidUrlError && (
        <span className="error-message-link">{androidUrlError}</span>
      )}
    </div>
  );
};

export default CreatingLink;
