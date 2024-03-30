import React, {FunctionComponent, MouseEvent, useCallback} from 'react';
import "../../styles/LinksPage/buttonCheck.css"

interface bttn {
    num:number,
    click: ((qwe:number,event: MouseEvent<HTMLButtonElement>) => void),
    name:string
}
const ButtonCheck = (props:bttn) => {


    const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        props.click(props.num,event)
    };

    return (
        <div className="ButtonPlusTextFilterContainer">
            <button className="buttonCheck" onClick={onButtonClick}></button>
            <div className="FilterTagName">{props.name}</div>
        </div>
    );
};

export default ButtonCheck;
