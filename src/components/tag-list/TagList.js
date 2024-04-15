import React from "react";
import "./tagList.css";

const SvgButton = ({ background, svgColor, onClick }) => {
  return (
    <button
      className="svg-button"
      style={{ backgroundColor: background }}
      onClick={onClick}
    >
      <svg
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.4375 1.625H8.07283C8.71481 1.625 9.03585 1.625 9.33799 1.69753C9.60583 1.76183 9.86185 1.86789 10.0968 2.01182C10.3617 2.17415 10.5886 2.40115 11.0427 2.85515L15.9375 7.75M4.60608 7.79357H4.61483M6.32281 4.25H5.2625C3.79236 4.25 3.05729 4.25 2.49578 4.53611C2.00185 4.78778 1.60028 5.18935 1.34861 5.68328C1.0625 6.24479 1.0625 6.97986 1.0625 8.45V9.51032C1.0625 10.1523 1.0625 10.4733 1.13503 10.7755C1.19933 11.0433 1.30539 11.2993 1.44932 11.5343C1.61165 11.7991 1.83865 12.0261 2.29265 12.4802L5.09265 15.2802C6.1322 16.3197 6.65197 16.8395 7.25129 17.0342C7.77856 17.2055 8.34644 17.2055 8.87371 17.0342C9.473 16.8395 9.99284 16.3197 11.0323 15.2802L12.0927 14.2198C13.1322 13.1803 13.652 12.6605 13.8467 12.0612C14.018 11.5339 14.018 10.9661 13.8467 10.4388C13.652 9.8395 13.1322 9.31966 12.0927 8.28016L9.29266 5.48015C8.83863 5.02615 8.61165 4.79915 8.34679 4.63682C8.11185 4.49289 7.85583 4.38683 7.58799 4.32253C7.28585 4.25 6.96481 4.25 6.32281 4.25ZM5.04358 7.79357C5.04358 8.03516 4.84771 8.23107 4.60608 8.23107C4.36445 8.23107 4.16858 8.03516 4.16858 7.79357C4.16858 7.55195 4.36445 7.35607 4.60608 7.35607C4.84771 7.35607 5.04358 7.55195 5.04358 7.79357Z"
          stroke={svgColor}
          strokeWidth="1.28"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

const SvgButtonContainer = ({ onTagClick }) => {
  const backgrounds = [
    "rgba(213, 240, 219, 1)",
    "rgba(213, 235, 240, 1)",
    "rgba(255, 255, 143, 1)",
    "rgba(217, 213, 240, 1)",
    "rgba(250, 198, 198, 1)",
    "rgba(240, 213, 234, 1)",
    "rgba(92, 255, 92, 1)",
    "rgba(97, 97, 255, 1)",
    "rgba(252, 252, 0, 1)",
    "rgba(213, 158, 255, 1)",
    "rgba(255, 61, 61, 0.82)",
    "rgba(255, 105, 180, 1)",
    "rgba(0, 158, 0, 1)",
    "rgba(25, 25, 112, 1)",
    "rgba(255, 165, 0, 1)",
    "rgba(148, 0, 211, 1)",
    "rgba(179, 27, 27, 1)",
    "rgba(228, 0, 120, 1)"
  ];

  const svgColors = [
    "#63BD43",
    "#43A0BD",
    "#C2A500",
    "#7143BD",
    "#F53E3E",
    "#BD43AA",
    "#009E00",
    "#000075",
    "#666600",
    "#7400CC",
    "#650101",
    "#77125D",
    "#C6FFC6",
    "#D4E1F1",
    "#FFF5AD",
    "#E6E6FA",
    "#FFD2D2",
    "#FFE4E1"
  ];

  const handleButtonClick = (index, event) => {
    event.preventDefault();
    const background = backgrounds[index];
    const svgColor = svgColors[index];
    onTagClick({ color: background, svgColor: svgColor });
  };

  return (
    <div className={`svg-button-container`}>
      {backgrounds.map((background, index) => (
        <div
          key={index}
          onClick={(event) => handleButtonClick(index, event)}
        >
          <SvgButton
            background={background}
            svgColor={svgColors[index]}
            onClick={(event) => handleButtonClick(index, event)}
          />
        </div>
      ))}
    </div>
  );
};

export default SvgButtonContainer;
