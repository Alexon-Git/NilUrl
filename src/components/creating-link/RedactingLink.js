import React, { useState, useRef, useEffect } from "react";
import "./creatingLink.css";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { PRICEPAGE_ROUTE, FAQ_ROUTE } from "../../LogicComp/utils/Const";
import { usePremium } from "../../LogicComp/DataProvider";
import {
  FAQ,
  Toggle,
  Calendar,
  TagList,
  UpgradeToProPopup,
  AlertPopup,
} from "../../components";

const RedactingLink = ({ pathS, pathL }) => {
  const navigate = useNavigate();
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isNewPopupActive, setIsNewPopupActive] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); // Состояние для текста попапа
  const [isAlertPopupVisible, setAlertPopupVisibility] = useState(false); // Состояние для отображения попапа
  // const [isPopupVisible, setIsPopupVisible] = useState(true);

  const handleIconClick = () => {
    console.log("Icon clicked. Previous state:", isPopupActive);
    setIsPopupActive(!isPopupActive);
    console.log("New state:", !isPopupActive);
  };

  const [faviconSVG, setFaviconSVG] = useState();

  useEffect(() => {
    fetchFavicon(pathL)
      .then((svg) => setFaviconSVG(svg))
      .catch((error) => {
        console.error("Error fetching favicon:", error);
        setFaviconLoadError(true);
        setFaviconSVG(false);
      });
  }, [pathL]);

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
      const response = await fetch("https://nilurl.ru:8000/get_tag.php", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
    };

    fetchTags();
  }, []);

  const { isPremium } = usePremium();

  const [isPro, setIsPro] = useState(isPremium);
  const [activePopupId, setActivePopupId] = useState(null);
  const [date_last, setDate_last] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const handleDeleteClick = async (event) => {
    event.preventDefault();
    const data = {
      pathS: pathS,
    };

    try {
      const response = await fetch("https://nilurl.ru:8000/delete_link.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status === "success") {
        setPopupMessage("Ссылка успешно удалена!");
        setAlertPopupVisibility(true);
        window.location.reload();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setPopupMessage("Возникла ошибка при удалении ссылки!");
      setAlertPopupVisibility(true);
    }
  };

  const handleClosePopup = () => {
    setAlertPopupVisibility(false);
    setPopupMessage("");
  };

  const [showPopups, setShowPopups] = useState({
    utm: false,
    date: false,
    ios: false,
    android: false,
  });

  const validateInput = async () => {
    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
    const urlErrorText =
      "Некорректный формат ссылки. Ваша ссылка должна начинаться с http:// или https://.";
    const tagLengthErrorText =
      "Название тэга должно быть не более 15 символов.";
    const commentLengthErrorText =
      "Комментарий должен быть не более 500 символов.";
    const utmLengthErrorText =
      "Каждое поле UTM должно быть не более 50 символов.";
    const iosUrlErrorText = "iOS URL должен быть действительной ссылкой.";
    const androidUrlErrorText =
      "Android URL должен быть действительной ссылкой.";

    // Reset error states before validation
    setInputTextError("");
    setTagError("");
    setCommentError("");
    setUtmError("");
    setIosUrlError("");
    setAndroidUrlError("");
    setBannedWordsError("");
    setErrorMessage("");

    if (!inputText) {
      setInputTextError("Поля ссылок обязательны для заполнения.");
      return false;
    }

    if (!urlPattern.test(inputText)) {
      setInputTextError(urlErrorText);
      return false;
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
    svgColor: "black",
    color: "transparent",
  });
  const [toggles, setToggles] = useState([
    {
      id: "comment",
      title: "Комментарий",
      checked: true,
      info: <CommentComponent commentError={commentError} />,
    },
    {
      id: "utm",
      title: "UTM-метка",
      checked: true,
      info: <UTMInputs utmError={utmError} />,
    },
    {
      id: "date",
      title: "Дата окончания",
      checked: true,
      info: <Calendar onDateChange={setSelectedDate} />,
    },
    {
      id: "ios",
      title: "iOS Targeting",
      checked: true,
      info: <IOSComponent iosUrlError={iosUrlError} />,
    },
    {
      id: "android",
      title: "Android Targeting",
      checked: true,
      info: <AndroidComponent androidUrlError={androidUrlError}/>,
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
          return { ...toggle, info: <IOSComponent iosUrlError={iosUrlError} /> };
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
          return { ...toggle, info: <AndroidComponent androidUrlError={androidUrlError} /> };
        } else {
          return toggle;
        }
      })
    );
  }, [androidUrlError]);

  const sendLinkDataToServer = async (data) => {
    try {
      const response = await fetch("https://nilurl.ru:8000/update_link.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...data, pathS }),
      });

      const result = await response.json();

      if (result.status === "success") {
        setPopupMessage("Данные успешно изменены!");
        setAlertPopupVisibility(true);
        window.location.reload();
      } else {
        const message = result.message;
        setPopupMessage(message);
        setAlertPopupVisibility(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const collectLinkData = () => {
    const linkData = {
      inputText: inputText,
      shortUrl: shortUrl,
      tagValue: tagValue,
      tagColors: tagColors,
      toggles: {
        utm: toggles.find((toggle) => toggle.id === "utm").checked
          ? getUTMData()
          : false,
        date: toggles.find((toggle) => toggle.id === "date").checked
          ? selectedDate
            ? getDateData(selectedDate)
            : date_last
            ? date_last
            : false
          : false,
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLongUrlChange = async (event) => {
    const newText = event.target.value;
    setInputText(newText);
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
      event.preventDefault(); // Prevent default form submission behavior
      document.querySelector(".create__link__button").click();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://nilurl.ru:8000/get_link_for_update.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ pathS }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        if (data.status === "success") {
          const {
            base_url,
            code_url,
            tag,
            commentary,
            android,
            ios,
            utm,
            utm_data,
            date_last,
            tag_svgcolor,
            tag_backgrounds,
          } = data.data;
          setInputText(base_url);
          setShortUrl(`https://nilurl.ru/${code_url}`);
          setTagValue(tag);
          setTagColors({
            svgColor: tag_svgcolor,
            color: tag_backgrounds,
          });
          const defaultUtmData = {
            utm_source: "",
            utm_medium: "",
            utm_campaign: "",
            utm_term: "",
            utm_content: "",
            utm_referral: "",
            utm_android: "",
            utm_ioc: "",
          };
          const finalUtmData = utm !== "false" ? utm_data : defaultUtmData;
          setDate_last(date_last);
          setToggles((prevToggles) =>
            prevToggles.map((toggle) => {
              switch (toggle.id) {
                case "comment":
                  return {
                    ...toggle,
                    info: <CommentComponent initialComment={commentary} />,
                    checked: !!commentary,
                  };
                case "utm":
                  return {
                    ...toggle,
                    info: <UTMInputs initialUTM={finalUtmData} />,
                    checked: utm,
                  };
                case "date":
                  return {
                    ...toggle,
                    info: (
                      <Calendar
                        initialDate={date_last}
                        onDateChange={setSelectedDate}
                      />
                    ),
                    checked: !!date_last,
                  };
                case "ios":
                  return {
                    ...toggle,
                    info: (
                      <IOSComponent initialURL={ios !== "false" ? ios : ""} />
                    ),
                    checked: ios !== "false",
                    value: ios !== "false" ? ios : "",
                  };
                case "android":
                  return {
                    ...toggle,
                    info: (
                      <AndroidComponent
                        initialURL={android !== "false" ? android : ""}
                      />
                    ),
                    checked: android !== "false",
                    value: android !== "false" ? android : "",
                  };
                default:
                  return toggle;
              }
            })
          );
        } else {
          const text = data.message;
          setPopupMessage(text);
          setAlertPopupVisibility(true);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pathS]);

  const [tags, setTags] = useState([]);
  ///////////////

  const handleTagClick = (tag) => {
    setTagColors({ color: tag.bgColor, svgColor: tag.textColor });
    setTagValue(tag.text);
    setIsPopupActive(false);
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  if (error) {
    return <div>Страница обновляется до актуальных данных...</div>;
  }
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
              d="M15.4998 5.50067L18.3282 8.3291M13 21H21M3 21.0004L3.04745 20.6683C3.21536 19.4929 3.29932 18.9052 3.49029 18.3565C3.65975 17.8697 3.89124 17.4067 4.17906 16.979C4.50341 16.497 4.92319 16.0772 5.76274 15.2377L17.4107 3.58969C18.1918 2.80865 19.4581 2.80864 20.2392 3.58969C21.0202 4.37074 21.0202 5.63707 20.2392 6.41812L8.37744 18.2798C7.61579 19.0415 7.23497 19.4223 6.8012 19.7252C6.41618 19.994 6.00093 20.2167 5.56398 20.3887C5.07171 20.5824 4.54375 20.6889 3.48793 20.902L3 21.0004Z"
              stroke="black"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="header__title">Редактирование</p>
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
          <div className="input__container">
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
            <input
              className="link-input short-redact"
              type="text"
              placeholder="https://nilurl.ru/Ffv3cv"
              value={shortUrl}
              readOnly
            />
          </div>
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
                {tags.map((tag, index) => (
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
                ))}
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
                      window.open(FAQ_ROUTE, '_blank');
                    }}
                  ></img>
                </span>
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
        <button
          className="delete__link"
          type="button"
          onClick={handleDeleteClick}
        >
          Удалить
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", marginLeft: "auto" }}
          >
            <path
              d="M15 4L14.1991 16.0129C14.129 17.065 14.0939 17.5911 13.8667 17.99C13.6666 18.3412 13.3648 18.6235 13.0011 18.7998C12.588 19 12.0607 19 11.0062 19H6.99377C5.93927 19 5.41202 19 4.99889 18.7998C4.63517 18.6235 4.33339 18.3412 4.13332 17.99C3.90607 17.5911 3.871 17.065 3.80086 16.0129L3 4M1 4H17M13 4L12.7294 3.18807C12.4671 2.40125 12.3359 2.00784 12.0927 1.71698C11.8779 1.46013 11.6021 1.26132 11.2905 1.13878C10.9376 1 10.523 1 9.6936 1H8.3064C7.477 1 7.0624 1 6.70951 1.13878C6.39792 1.26132 6.12208 1.46013 5.90729 1.71698C5.66405 2.00784 5.53292 2.40125 5.27064 3.18807L5 4M11 8V15M7 8V15"
              stroke="#BF0000"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
      <div className="creating__link__footer">
        <button
          className="create__link__button"
          onClick={handleCreateLink}
          onKeyDown={handleCreateLinkKeyDown}
          tabIndex={0}
        >
          Сохранить
        </button>
      </div>
      {isAlertPopupVisible && (
        <AlertPopup onClose={handleClosePopup} message={popupMessage} />
      )}
    </div>
  );
};

const CommentComponent = ({ initialComment, commentError }) => {
  const textAreaRef = useRef(null);
  const [val, setVal] = useState(initialComment);
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
      <div className="text-neutral-200 bg-neutral-800 p-2 w-full max-w-[30rem] rounded flex flex-col space-y-2">
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

const UTMInputs = ({ initialUTM, utmError }) => {
  const [utmReferral, setUtmReferral] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [utmTerm, setUtmTerm] = useState("");
  const [utmContent, setUtmContent] = useState("");
  const [utmAndroid, setUtmAndroid] = useState(false);
  const [utmIOC, setUtmIOC] = useState(false);

  useEffect(() => {
    if (initialUTM) {
      setUtmReferral(initialUTM.utm_referral || "");
      setUtmSource(initialUTM.utm_source || "");
      setUtmMedium(initialUTM.utm_medium || "");
      setUtmCampaign(initialUTM.utm_campaign || "");
      setUtmTerm(initialUTM.utm_term || "");
      setUtmContent(initialUTM.utm_content || "");
      setUtmAndroid(initialUTM.utm_android || false);
      setUtmIOC(initialUTM.utm_ioc || false);
    }
  }, [initialUTM]);

  const handleTextChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleCheckboxChange = (setter) => (e) => {
    setter(e.target.checked);
  };

  const getClassNames = (inputId) => {
    const isCheckbox = inputId === "UTM Android" || inputId === "UTM iOC";
    return {
      itemClass: `utm__input-item ${
        isCheckbox ? "utm__input-item--checkbox" : ""
      }`,
      labelClass: `utm__input-label ${
        isCheckbox ? "utm__input-label--checkbox" : ""
      }`,
      inputClass: `utm__input-input ${
        isCheckbox ? "utm__input-input--checkbox" : ""
      }`,
    };
  };

  const androidClassNames = getClassNames("UTM Android");
  const iocClassNames = getClassNames("UTM iOC");

  return (
    <div className="utm__input">
      <div className="utm__input-item">
        <label className="utm__input-label" htmlFor="UTM Referral">
          Referral
        </label>
        <input
          className="utm__input-input"
          type="text"
          id="UTM Referral"
          value={utmReferral}
          onChange={handleTextChange(setUtmReferral)}
          placeholder="Referral"
        />
      </div>
      <div className="utm__input-item">
        <label className="utm__input-label" htmlFor="UTM Source">
          UTM Source
        </label>
        <input
          className="utm__input-input"
          type="text"
          id="UTM Source"
          value={utmSource}
          onChange={handleTextChange(setUtmSource)}
          placeholder="yandex_direct, google_adword"
        />
      </div>
      <div className="utm__input-item">
        <label className="utm__input-label" htmlFor="UTM Medium">
          UTM Medium
        </label>
        <input
          className="utm__input-input"
          type="text"
          id="UTM Medium"
          value={utmMedium}
          onChange={handleTextChange(setUtmMedium)}
          placeholder="cpc, retargeting, banner"
        />
      </div>
      <div className="utm__input-item">
        <label className="utm__input-label" htmlFor="UTM Campaign">
          UTM Campaign
        </label>
        <input
          className="utm__input-input"
          type="text"
          id="UTM Campaign"
          value={utmCampaign}
          onChange={handleTextChange(setUtmCampaign)}
          placeholder="banner, {campaign_id}"
        />
      </div>
      <div className="utm__input-item">
        <label className="utm__input-label" htmlFor="UTM Term">
          UTM Term
        </label>
        <input
          className="utm__input-input"
          type="text"
          id="UTM Term"
          value={utmTerm}
          onChange={handleTextChange(setUtmTerm)}
          placeholder="kupit_velosiped,{keyword}"
        />
      </div>
      <div className="utm__input-item">
        <label className="utm__input-label" htmlFor="UTM Content">
          UTM Content
        </label>
        <input
          className="utm__input-input"
          type="text"
          id="UTM Content"
          value={utmContent}
          onChange={handleTextChange(setUtmContent)}
          placeholder="skidka_50,{phrase_id}"
        />
      </div>
      <div className={androidClassNames.itemClass}>
        <label className={androidClassNames.labelClass} htmlFor="UTM Android">
          UTM Android Metrika
        </label>
        <input
          className={androidClassNames.inputClass}
          type="checkbox"
          id="UTM Android"
          checked={utmAndroid}
          onChange={handleCheckboxChange(setUtmAndroid)}
        />
      </div>
      <div className={iocClassNames.itemClass}>
        <label className={iocClassNames.labelClass} htmlFor="UTM iOC">
          UTM iOC Metrika
        </label>
        <input
          className={iocClassNames.inputClass}
          type="checkbox"
          id="UTM iOC"
          checked={utmIOC}
          onChange={handleCheckboxChange(setUtmIOC)}
        />
      </div>
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

const IOSComponent = ({ initialURL, iosUrlError }) => {
  const [inputValue_IOS, setInputValue_IOS] = useState(initialURL);

  const handleInputChange = (event) => {
    setInputValue_IOS(event.target.value);
  };

  return (
    <>
    <input
    className={iosUrlError ? "ios-input input-error" : "ios-input"}
      type="text"
      placeholder="https://apps.apple.com/app/18362974"
      value={inputValue_IOS}
      onChange={handleInputChange}
    />
    {iosUrlError && (
      <span className="error-message-link">{iosUrlError}</span>
    )}
    </>
  );
};

const AndroidComponent = ({ initialURL, androidUrlError }) => {
  const [inputValue_android, setInputValue_android] = useState(initialURL);

  const handleInputChange = (event) => {
    setInputValue_android(event.target.value);
  };

  return (
    <>
    <input
    className={androidUrlError ? "android-input input-error" : "android-input"}
      type="text"
      placeholder="https://play.google.com/store/apps/details?id=18362974"
      value={inputValue_android}
      onChange={handleInputChange}
    />
    {androidUrlError && (
      <span className="error-message-link">{androidUrlError}</span>
    )}
    </>
  );
};

export default RedactingLink;
