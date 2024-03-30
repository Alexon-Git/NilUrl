import React, {useState} from 'react';
import "../../styles/MainPage/arrow.css"

interface clickPropInt{
    clickProp: (int:number) => void
    id:number
}

const Arrow:React.FC<clickPropInt> = ({clickProp,id}:clickPropInt) => {
    const key1 = id;

    const [deg,setDeg] = useState(true)
    interface clickInt{
        (event:React.MouseEvent<HTMLDivElement,MouseEvent>) : void
    }
    const click:clickInt = (event) =>{
        if(event.target instanceof HTMLElement){
            if(deg == false){
                event.target.style.transform = "rotate(45deg)"
                setDeg(true)

            }
            else{
                event.target.style.transform = "rotate(225deg)"
                setDeg(false)
            }
        }
        clickProp(key1);
    }
    return (
        <div className="arrowMainContainer" onClick={event => {click(event)}}>

        </div>
    );
};

export default Arrow;
