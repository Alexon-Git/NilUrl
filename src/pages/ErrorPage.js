import React from "react";
import "./errorPage.css";
import { Ampersand, Hashtag, Tilde, Triangle, Underscore } from "../components";

const ErrorPage = () => {
  const initialPositions = [
    { x: 200, y: 450 },
    { x: 100, y: 700 },
    { x: 90, y: 910 },
    { x: 350, y: 720 },
    { x: 400, y: 910 },
    { x: 600, y: 750 },
    { x: 800, y: 850 },
    { x: 1150, y: 450 },
    { x: 1340, y: 650 },
    { x: 1350, y: 910 },
    { x: 1090, y: 720 },
    { x: 1290, y: 100 },
    { x: 100, y: 100 },
    { x: 400, y: 250 },
    { x: 700, y: 100 },
    { x: 1000, y: 250 },
  ];

  const svgNames = [
    {
      component: <img src={Ampersand} alt="Ampersand" />,
      rotation: getRandomRotation(),
    },
    {
      component: <img src={Hashtag} alt="Hashtag" />,
      rotation: getRandomRotation(),
    },
    {
      component: <img src={Tilde} alt="Tilde" />,
      rotation: getRandomRotation(),
    },
    {
      component: <img src={Triangle} alt="Triangle" />,
      rotation: getRandomRotation(),
    },
    {
      component: <img src={Underscore} alt="Underscore" />,
      rotation: getRandomRotation(),
    },
  ];

  function getRandomRotation() {
    return Math.floor(Math.random() * 360);
  }

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  const shuffledPositions = shuffleArray(initialPositions);

  return (
    <div className="error-page wrapper">
      <div>
        {shuffledPositions.map((position, index) => (
          <div
            key={index}
            className="svg-wrapper"
            style={{
              position: "absolute",
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: `rotate(${
                svgNames[index % svgNames.length].rotation
              }deg)`,
            }}
          >
            {svgNames[index % svgNames.length].component}
          </div>
        ))}
        <div className="error-text">
          <h1 className="error-code">404</h1>
          <p className="error-message">Упс... страница не найдена</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
