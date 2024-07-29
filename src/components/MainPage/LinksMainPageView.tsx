import React, { useState } from 'react';
import "../../styles/MainPage/LinksMainPageView.css"
import { LinksIntMap, LinksPropTest } from "../../LogicComp/LinksIntMap";
import LinksMap from "./LinksMap";

const LinksMainPageView = () => {
    const [arr, setArr] = useState(LinksPropTest);
    const [inputValue, setInputValue] = useState("https://nilurl.ru/login_page");
    const text = ["Вход в NilUrl", "Регистрация в NilUrl", "Информация о действующих подписках"];
    const values = ["Зарегистрируйтесь и создавайте свои ссылки", "https://nilurl.ru/registration_page", "https://nilurl.ru/price_page"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [clickCount, setClickCount] = useState(0);

    const fetchClickCounts = async () => {
        try {
            const response = await fetch('https://nilurl.ru:8000/getClicks.php');
            const data = await response.json();
            console.log('Fetched data:', data); // Логируем данные для проверки
            return data;
        } catch (error) {
            console.error('Error fetching click counts:', error);
            return {};
        }
    };

    const click = async () => {
        if (clickCount < 4) {
            const clickData = await fetchClickCounts();
            const arrTemp = [...arr];
            const obj: LinksIntMap = {
                imageURL: "/NILLogo.png",
                path: inputValue,
                clicksCount: -1,
                text: text[currentIndex]
            };

            arrTemp.splice(1, 0, obj);
            arrTemp.pop();

            // Update the clicksCount for each URL
            const updatedArr = arrTemp.map(el => {
                const pathKey = el.path.split('/').pop();
                return {
                    ...el,
                    clicksCount: pathKey && clickData[pathKey] ? clickData[pathKey] : -1
                };
            });
            setArr(updatedArr);

            // Update input value to the next in the list
            const nextIndex = (currentIndex + 1) % values.length;
            setInputValue(values[nextIndex]);
            setCurrentIndex(nextIndex);

            setClickCount(prev => prev + 1);

            // Check if it's the 4th click and navigate to /price
            if (clickCount === 3) {
                window.location.href = "https://nilurl.ru/registration";
            }
        }
    };

    return (
        <div>
            <div className="InputForLinksMP">
                <svg className="svgLinksMP" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.50033 16.1666H5.83366C4.72859 16.1666 3.66878 15.7277 2.88738 14.9463C2.10598 14.1649 1.66699 13.105 1.66699 12C1.66699 10.8949 2.10598 9.8351 2.88738 9.0537C3.66878 8.2723 4.72859 7.83331 5.83366 7.83331H7.50033" stroke="#9CA3AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12.5 7.83331H14.1667C15.2717 7.83331 16.3315 8.2723 17.1129 9.0537C17.8943 9.8351 18.3333 10.8949 18.3333 12C18.3333 13.105 17.8943 14.1649 17.1129 14.9463C16.3315 15.7277 15.2717 16.1666 14.1667 16.1666H12.5" stroke="#9CA3AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.66699 12H13.3337" stroke="#9CA3AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <input value={inputValue} className="InputLinksMP" readOnly />
                <button onClick={click} className="VvodMPLinks">
                    <svg style={{ width: "100%" }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.00033 6.66669L2.66699 10L6.00033 13.3334" stroke="#9CA3AF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.3337 2.66669V7.33335C13.3337 8.0406 13.0527 8.71888 12.5526 9.21897C12.0525 9.71907 11.3742 10 10.667 10H2.66699" stroke="#9CA3AF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <div>
                {arr.map((el, index) => (
                    <LinksMap key={index} path={el.path} imageURL={el.imageURL} clicks={el.clicksCount} text={el.text} />
                ))}
            </div>
            <div className="InfoMapLinks">
                Хотите запросить свои ссылки,
                отредактировать их или посмотреть их аналитику?
                Создайте бесплатную учетную запись на NilUrl
            </div>
        </div>
    );
};

export default LinksMainPageView;

