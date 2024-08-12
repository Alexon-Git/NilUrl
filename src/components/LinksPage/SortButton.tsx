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
                <li><a>Дата</a> <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)matrix(1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 4V20M12 4L8 8M12 4L16 8" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></li>
                <li><a>Дата</a> <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 4V20M12 4L8 8M12 4L16 8" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></li>
                <li><a>По алфавиту ↓</a></li>
                <li><a>По алфавиту ↑</a></li>
            </ul>
        </div>
    );
};

export default SortButton;
