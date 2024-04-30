import React from 'react';
import "../../styles/LinksPage/SortButton.css"
const SortButton = () => {
    return (
        <div className="dropdown">
            <input type="checkbox" id="dropdown"/>
            <label htmlFor="dropdown" className="dropdown-btn">
                <img alt="img" src={process.env.PUBLIC_URL + "/TriPalochki.png"}/>
                <span className="SortWord">Сортировать</span>
                    <svg width="15px" height="15px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M0 0h48v48H0z" fill="none"/>
                        <g id="Shopicon">
                            <g>
                                <polygon points="24,29.171 9.414,14.585 6.586,17.413 24,34.827 41.414,17.413 38.586,14.585 		"/>
                            </g>
                        </g>
                    </svg>
            </label>

            <ul className="dropdown-content" role="menu">
                <li><a>Дата ↓</a></li>
                <li><a>Дата ↑</a></li>
                <li><a>По алфавиту ↓</a></li>
                <li><a>По алфавиту ↑</a></li>
            </ul>
        </div>
    );
};

export default SortButton;
