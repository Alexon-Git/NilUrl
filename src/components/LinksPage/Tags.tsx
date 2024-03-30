import React, {forwardRef, MouseEvent, useCallback, useRef} from 'react';
import "../../styles/LinksPage/Tags.css"



interface tags{
    click: ((event: MouseEvent<HTMLButtonElement>) => void),
}

const Tags = (props:tags)  => {


    return (
        <div className="TagsContainer">
            <button className="TagsButtonContainer" onClick={props.click}>
                <svg className="TegsSvg" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M0 0h48v48H0z" fill="none"/>
                    <g id="Shopicon">
                        <g>
                            <polygon points="24,29.171 9.414,14.585 6.586,17.413 24,34.827 41.414,17.413 38.586,14.585 		"/>
                        </g>
                    </g>
                </svg>
                <div className="TegsText">Тэги</div>
            </button>
            <button className="AddTagButton">
                Добавить
            </button>
        </div>
    );
};

export default Tags;
