import React, { useState, useEffect } from "react";
import "./pricesBlock.css";
import { BackImage, Privilege, BuyButton, Slider, FreeButton } from "../../components";
import { useNavigate } from "react-router-dom";
import AlertPopup from "../popups/AlertPopup";
import { MAINPAGE_ROUTE, LOGINPAGE_ROUTE } from "../../LogicComp/utils/Const";

const PricesBlock = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState([false, false, false]);
  const [registeredUsers, setRegisteredUsers] = useState(0);
  const [popupMessage, setPopupMessage] = useState(""); 
  const [isAlertPopupVisible, setAlertPopupVisibility] = useState(false); 

  useEffect(() => {
    fetch('https://nilurl.ru:8000/get_users_count.php')
      .then(response => response.json())
      .then(data => setRegisteredUsers(data.user_count))
      .catch(error => console.error('Error fetching user count:', error));
  }, []);

  const handleMouseEnter = (index) => {
    const updatedHovered = [...isHovered];
    updatedHovered[index] = true;
    setIsHovered(updatedHovered);
  };

  const handleMouseLeave = (index) => {
    const updatedHovered = [...isHovered];
    updatedHovered[index] = false;
    setIsHovered(updatedHovered);
  };

  const handleFreeButtonClick = () => {
    navigate(LOGINPAGE_ROUTE);
  };

  const handleClosePopup = () => {
    setAlertPopupVisibility(false);
    setPopupMessage("");
  };

  const handleBuyButtonClick = () => {
    setPopupMessage("Функция оплаты отключена на данный момент, воспользуйтесь бесплатной подпиской.");
    setAlertPopupVisibility(true);
  };

  const priceBlocks = [
    {
      title: "Базовый",
      description: "Для стартапов и малого бизнеса",
      price: "290 ₽",
      annualPayment: " /месяц",
      advantages: [
        "100 ссылок в месяц",
        "20 генераций QR кодов",
        "Сохранение статистики в течение 1 года",
        "Статистика по переходам",
        "Статистика по устройствам",
        "Статистика по ОС",
        "5 замен длинных ссылок",
        "Отображение статистики за 1 месяц",
      ],
    },
    {
      title: "Профессиональный",
      description: "Для более крупных команд",
      price: "790 ₽",
      annualPayment: " /месяц",
      advantages: [
        "1000 ссылок в месяц",
        "200 генераций QR кодов",
        "Сохранение статистики в течение 1 года",
        "Статистика по переходам",
        "Статистика по устройствам",
        "Статистика по ОС",
        "50 замен длинных ссылок",
        "Отображение статистики за 1 год",
        "Редиректы в зависимости от ОС",
        "Выгрузка статистики в csv формат",
        "Статистика по ГЕО локации",
        "10 брендированых ссылок",
      ],
    },
  ];

  const FreeBlocks = [
    {
      title: "Бесплатный",
      description: "Для хобби и побочных проектов",
      price: "0 ₽",
      advantages: [
        "10 ссылок в месяц",
        "2 генерации QR кода",
        "Сохранение статистики в течение 30 дней",
        "Статистика по переходам",
      ],
    },
  ];

  return (
    <div className="background">
      <main className="prices wrapper">
        <span className="button__back">
          <img
            src={BackImage}
            alt="Назад"
            onClick={() => {
              navigate(MAINPAGE_ROUTE);
            }}
          />
        </span>
        <div className="prices__title">
          <span className="gradient__text">Сверхдоступные</span>
          <span className="black__text">цены</span>
        </div>
        <Slider initialRegisteredUsers={registeredUsers} />
        <div className="prices__block">
          {FreeBlocks.map((block, index) => (
            <div className="prices__block-item" key={index}>
              <p className="block__item__title">{block.title}</p>
              <p className="block__item__description">{block.description}</p>
              <div className="block__item__price">
                <p className="price">{block.price}</p>
                {block.annualPayment && (
                  <p className="monthly">{block.annualPayment}</p>
                )}
              </div>
              <p className="block__item__description">
                {block.secondDescription}
              </p>
              {block.advantages && (
                <div className="block__item__privilege">
                  {block.advantages.map((advantage, idx) => (
                    <div className="block__item__privilege-item" key={idx}>
                      <span className="prices__svg">
                        <img src={Privilege} alt="Преимущества:" />
                      </span>
                      <p>{advantage}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="button__wrapper">
                <FreeButton
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  onClick={handleFreeButtonClick}
                >
                  Купить подписку
                </FreeButton>
              </div>
            </div>
          ))}
          {priceBlocks.map((block, index) => (
            <div className="prices__block-item" key={index}>
              <p className="block__item__title">{block.title}</p>
              <p className="block__item__description">{block.description}</p>
              <div className="block__item__price">
                <p className="price">{block.price}</p>
                {block.annualPayment && (
                  <p className="monthly">{block.annualPayment}</p>
                )}
              </div>
              <p className="block__item__description">
                {block.secondDescription}
              </p>
              {block.advantages && (
                <div className="block__item__privilege">
                  {block.advantages.map((advantage, idx) => (
                    <div className="block__item__privilege-item" key={idx}>
                      <span className="prices__svg">
                        <img src={Privilege} alt="Преимущества:" />
                      </span>
                      <p>{advantage}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="button__wrapper">
                <BuyButton
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  onClick={handleBuyButtonClick}
                >
                  Купить подписку
                </BuyButton>
              </div>
            </div>
          ))}
        </div>
      </main>
      {isAlertPopupVisible && (
        <AlertPopup onClose={handleClosePopup} message={popupMessage} />
      )}
    </div>
  );
};

export default PricesBlock;
