import React, { useState } from "react";
import "./pricesBlock.css";
import { BackImage, Privilege, BuyButton, Slider } from "../../components";
import { useNavigate } from "react-router-dom";
import { MAINPAGE_ROUTE } from "../../LogicComp/utils/Const";

const PricesBlock = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState([false, false, false]);

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

  const priceBlocks = [
    {
      title: "Бесплатно",
      description: "Для хобби и побочных проектов",
      price: "0 ₽",
      advantages: [
        "25 ссылок в месяц",
        "5 тыс. отслеживаемых кликов в месяц",
        "30 дней сохранения аналитики",
      ],
    },
    {
      title: "Профессиональный",
      description: "Для стартапов и малого бизнеса",
      price: "1 999 ₽",
      annualPayment: " /месяц",
      secondDescription: "Оплачивается ежегодно",
      advantages: [
        "1000 ссылок в месяц",
        "50 тыс. отслеживаемых кликов в месяц",
        "Сохранение аналитики в течение 1 года",
        "10 пользовательских доменов",
        "5 пользователей",
      ],
    },
    {
      title: "Бизнес",
      description: "Для более крупных команд",
      price: "4 999 ₽",
      annualPayment: " /месяц",
      secondDescription: "Оплачивается ежегодно",
      advantages: [
        "5000 ссылок в месяц",
        "250 тыс. отслеживаемых кликов в месяц",
        "Сохранение аналитики в течение 2 лет",
        "20 пользовательских доменов",
        "15 пользователей",
        "Повышенная поддержка",
        "Индивидуальный брендинг",
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
        <Slider initialRegisteredUsers={11000} />
        <div className="prices__block">
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
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Купить подписку
                </BuyButton>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PricesBlock;
