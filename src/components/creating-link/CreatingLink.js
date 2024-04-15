import React, { useState, useRef, useEffect } from "react";
import "./creatingLink.css";
import CryptoJS from "crypto-js";
import {
  FAQ,
  Toggle,
  DateCalendar,
  TagList,
} from "../../components";

const CreatingLink = () => {
  const [toggles, setToggles] = useState([
    {
      id: "comment",
      title: "Комментарий",
      checked: false,
      info: <CommentComponent />,
    },
    { id: "utm", title: "UTM-метка", checked: false, info: <UTMInputs /> },
    {
      id: "date",
      title: "Дата окончания",
      checked: false,
      info: <DateCalendar />,
    },
    {
      id: "ios",
      title: "iOS Targeting",
      checked: false,
      info: <IOSComponent />,
    },
    {
      id: "android",
      title: "Android Targeting",
      checked: false,
      info: <AndroidComponent />,
    },
  ]);

  const handleToggle = (id) => {
    setToggles((prevToggles) => {
      const newToggles = prevToggles.map((toggle) =>
        toggle.id === id ? { ...toggle, checked: !toggle.checked } : toggle
      );
      return newToggles;
    });
  };

  const handleMouseOver = () => {
    console.log("Показать подсказку");
  };

  const handleMouseOut = () => {
    console.log("Скрыть подсказку");
  };

  const handleCreateLink = () => {
    console.log("Создать ссылку");
  };

  const handleCreateLinkKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCreateLink();
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [inputText, setInputText] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleLongUrlChange = (event) => {
    setInputText(event.target.value);
  };

  const generateShortUrl = () => {
    const hash = CryptoJS.SHA256(inputText).toString();
    const shortId = hash.substring(0, 5);
    const randomShortId = Array.from(shortId)
      .map((char) => {
        const randomCase =
          Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase();
        return randomCase;
      })
      .join("");
    const url = `https://nil-url/${randomShortId}.ru`;
    setShortUrl(url);
  };


  const [tagColors, setTagColors] = useState({
    svgColor: "black",
    color: "transparent"
  });




  return (
    <div className="overlay" onClick={() => {}}>
      <div className="creating__link">
        <div className="creating__link__header">
          <span className="header__svg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 15H4.2C3.07989 15 2.51984 15 2.09202 14.782C1.71569 14.5903 1.40973 14.2843 1.21799 13.908C1 13.4802 1 12.9201 1 11.8V4.2C1 3.0799 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.0799 1 4.2 1H15.8C16.9201 1 17.4802 1 17.908 1.21799C18.2843 1.40973 18.5903 1.71569 18.782 2.09202C19 2.51984 19 3.0799 19 4.2V8M1 5H19M16 17V11M19 14.0008L13 14"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                className="input"
                type="text"
                placeholder="https://app.dub.co/aleksandr-vysochenko"
                value={inputText}
                onChange={handleLongUrlChange}
              />
            </div>
          </div>
          <div className="link__input">
            <div className="link__input-title">Короткая ссылка</div>
            <div className="input__container">
              <span className="svg__infinity" onClick={generateShortUrl}>
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
                    stroke-opacity="0.5"
                  />
                  <path
                    d="M19.25 17.5C19.25 19.9162 17.2912 21.875 14.875 21.875H13.125C10.7088 21.875 8.75 19.9162 8.75 17.5C8.75 15.0838 10.7088 13.125 13.125 13.125H13.5625M15.75 17.5C15.75 15.0838 17.7088 13.125 20.125 13.125H21.875C24.2912 13.125 26.25 15.0838 26.25 17.5C26.25 19.9162 24.2912 21.875 21.875 21.875H21.4375"
                    stroke="black"
                    stroke-width="1.28"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
              <input
                className="input"
                type="text"
                placeholder="https://nil-url/Ffv3cv.ru"
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
                style={{ backgroundColor: tagColors.color, borderLeft: "1px solid transparent", borderRight: "1px solid rgba(154, 154, 154, 0.5)", borderRadius: "6px 0 0 6px"}}
              >
                <svg
                  className="input__svg"
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ boxSizing: "content-box"}}
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
                className="input png"
                type="text"
                placeholder="Название тега"
                value={() => {}}
                onChange={() => {}}
              />
              <div className="input__icon right-image">
                {" "}
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L7 7L13 1"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
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
                    ></img>
                  </span>
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
      </div>
    </div>
  );
};

const CommentComponent = () => {
  const textAreaRef = useRef(null);
  const [val, setVal] = useState("");
  const handleChange = (e) => {
    setVal(e.target.value);
  };

  useEffect(() => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [val]);

  return (
    <div className="w-screen min-h-screen bg-neutral-950 flex justify-center items-center">
      <div className="text-neutral-200 bg-neutral-800 p-2 w-full max-w-[30rem] rounded flex flex-col space-y-2">
        <textarea
          className="p-1 bg-neutral-700 outline-none rounded border border-gray-300 custom-textarea text-neutral-300"
          placeholder="Добавить комментарий"
          value={val}
          onChange={handleChange}
          rows="2"
          ref={textAreaRef}
        ></textarea>
      </div>
    </div>
  );
};

const UTMInputs = () => {
  const [inputs, setInputs] = useState([
    { id: "Referral", title: "Referral", checked: false, inputType: "text" },
    {
      id: "UTM Source",
      title: "UTM Source",
      checked: false,
      inputType: "text",
    },
    {
      id: "UTM Medium",
      title: "UTM Medium",
      checked: false,
      inputType: "text",
    },
    {
      id: "UTM Campaign",
      title: "UTM Campaign",
      checked: false,
      inputType: "text",
    },
    { id: "UTM Term", title: "UTM Term", checked: false, inputType: "text" },
    {
      id: "UTM Content",
      title: "UTM Content",
      checked: false,
      inputType: "text",
    },
  ]);

  const handleInputChange = (id) => {
    setInputs((prevInputs) => {
      const newInputs = prevInputs.map((input) =>
        input.id === id ? { ...input, checked: !input.checked } : input
      );
      return newInputs;
    });
  };

  return (
    <div className="utm__input">
      {inputs.map((input) => (
        <div className="utm__input-item" key={input.id}>
          <label className="utm__input-label" htmlFor={input.id}>
            {input.title}
          </label>
          <input
            className="utm__input-input"
            type={input.inputType}
            id={input.id}
            checked={input.checked}
            onChange={() => handleInputChange(input.id)}
            placeholder="https://nil-url/Ffv3cv.ru"
          />
        </div>
      ))}
    </div>
  );
};

const IOSComponent = () => {
  return (
    <input
      className="ios__android-input"
      type="text"
      placeholder="https://apps.apple.com/app/18362974"
      value=""
      onChange={() => {}}
    />
  );
};

const AndroidComponent = () => {
  return (
    <input
      className="ios__android-input"
      type="text"
      placeholder="https://play.google.com/store/apps/details?id=18362974"
      value=""
      onChange={() => {}}
    />
  );
};

export default CreatingLink;
