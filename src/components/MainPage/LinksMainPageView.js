import React, { useState, useEffect } from 'react';
import "../../styles/MainPage/LinksMainPageView.css";
import LinksMap from "./LinksMap";

// Assuming this is the initial set of links
const initialLinks = [
    { imageURL: "/NILLogo.png", path: "https://nilurl.ru/n-login", clicksCount: -1, text: "Вход в NilUrl" },
    { imageURL: "/NILLogo.png", path: "https://nilurl.ru/n-registration", clicksCount: -1, text: "" },
    { imageURL: "/NILLogo.png", path: "", clicksCount: -1, text: "" },
    { imageURL: "/NILLogo.png", path: "", clicksCount: -1, text: "" }
];

const text = ["Вход в NilUrl", "Регистрация в NilUrl", "Информация о подписках","Часто задаваемые вопросы"];
    const values = [ "","https://nilurl.ru/n-registration", "https://nilurl.ru/n-price", "https://nilurl.ru/n-faq","Зарегистрируйтесь и создавайте свои ссылки"];

const LinksMainPageView = () => {
    const [arr, setArr] = useState(initialLinks);
    const [inputValue, setInputValue] = useState(initialLinks[1].path);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [clickData, setClickData] = useState({});

    useEffect(() => {
        // Fetch click counts once when the component mounts
        const fetchClickCounts = async () => {
            try {
                const response = await fetch('https://nilurl.ru:8000/getClicks.php');
                const data = await response.json();
                console.log('Fetched data:', data); // Log data for verification
                setClickData(data);

                // Update the initial link's click count with the fetched data
                const initialPathKey = initialLinks[0].path.split('/').pop();
                if (initialPathKey && data[initialPathKey]) {
                    setArr(prevArr => {
                        const updatedArr = [...prevArr];
                        updatedArr[0].clicksCount = data[initialPathKey] || -1;
                        return updatedArr;
                    });
                }
            } catch (error) {
                console.error('Error fetching click counts:', error);
            }
        };

        fetchClickCounts();
    }, []);

    const click = () => {
        if (clickCount < 3) {
            const nextIndex = (currentIndex + 1) % values.length;
            const nextPath = values[nextIndex];
            const nextPath_input = values[nextIndex+1];
            const pathKey = nextPath.split('/').pop();
            const newClickCount = clickData[pathKey] || -1;
    
            // Set the input value to the next URL before updating the arr state
            setInputValue(nextPath_input); 
    
            setArr(prevArr => {
                const newArr = [...prevArr];
                newArr[clickCount + 1] = {
                    imageURL: "/NILLogo.png",
                    path: nextPath,
                    clicksCount: newClickCount,
                    text: text[nextIndex]
                };
                return newArr;
            });
    
            setCurrentIndex(nextIndex);
            setClickCount(prev => prev + 1);
        } else if (clickCount === 3) {
            window.location.href = "https://nilurl.ru/registration";
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

