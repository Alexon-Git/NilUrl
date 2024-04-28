import React, {EventHandler, MouseEvent, useCallback, useRef, useState} from 'react';
import "../../styles/LinksPage/Filer.css"
import Tags from "./Tags";
import {FilterProps} from "../../LogicComp/FilterProp";
import ButtonCheck from "./buttonCheck";



const Filter = () => {
    const [checkedState, setCheckedState] = useState(
        new Array(FilterProps.length).fill(false) // переделать, сделать как снизу useState, его передать в фильтры.
    );

    const [arrayOfTags,setArrayOfTegs] = useState(
        FilterProps
    )
    const [hide,setHide] = useState(false)
    const revertState = (ind:number) => {
        let obj = checkedState;
        if(obj[ind] === false){
            obj[ind] = true;
        }else{
            obj[ind] = false;
        }
        setCheckedState(obj);
    }

    const Obertka = (ind:number,event: MouseEvent<HTMLButtonElement>) => {
        if (event.target instanceof HTMLElement){
            if(checkedState[ind] === true){
                event.target.style.backgroundColor = "white"
                revertState(ind);
            }

            else{
                event.target.style.backgroundColor = "black"
                revertState(ind);
            }
        }
    }

    const tegsList:any = useRef(null);

    const hideTags = (event:MouseEvent<HTMLButtonElement>) =>{
        if(tegsList !== null){
            if(hide===false){
                tegsList.current.style.display = "none"
                setHide(true)
            }

            else{
                tegsList.current.style.display = "block"
                setHide(false)
            }
        }
    }

    return (
        <div className="Filter">
            <div className="name">
                Фильтр
            </div>
            <div className="searchBlock">
                    <img
                        src={process.env.PUBLIC_URL + "/Lupa.svg"}
                        alt="triangle with all three sides equal"
                        className="svgLupa"
                         />

                <input
                    className="SearchStyle"
                    key="search-bar"
                    placeholder={"Поиск..."}
                />
            </div>
            <hr className="hrForFilter"></hr>
            <div className="TagsMainContainer">
                <Tags click={hideTags}/>
            </div>
            <div className="TagsDropListMainContainer" ref={tegsList}>
                {FilterProps.map((prop,index)=>
                    <div className="TagsDropContainer">
                        <div className="checkboxAndName">
                            <div className="fieldGroup">
                                <ButtonCheck num={index} click={Obertka} name={prop.nameS}/>
                            </div>
                            <div className="checkboxName"></div>
                        </div>
                        <div className="ClickCount">1</div>
                    </div>
                )}
            </div>


        </div>
    );
};

export default Filter;
