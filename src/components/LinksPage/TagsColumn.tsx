import React, {useRef, useState} from 'react';
import "../../styles/LinksPage/TagsLikeUl.css"
import {FilterProps} from "../../LogicComp/FilterProp";
const TagsColumn = () => {
    const [selectedTags,setSelectegTags] = useState(new Array(3).fill(false))
    const [ulShow,setUlShow] = useState(false)
    const refToUL = useRef<HTMLUListElement>(null)
    const refToStrelochka = useRef<SVGSVGElement>(null)
    const clickShowTags = () => {
        if(!ulShow){
            if(refToUL.current !=null) {
                refToUL.current.style.transition = "max-height 0.3s ease-in"
                refToUL.current.style.maxHeight = "347px"
            }
            if(refToStrelochka.current!=null){
                refToStrelochka.current.style.transition = "rotate 0.3s ease-in";
                refToStrelochka.current.style.rotate = "270deg";
            }
            setUlShow(true);
        }
        if(ulShow){
            if(refToUL.current !=null) {
                refToUL.current.style.transition = "max-height 0.3s ease-in"
                refToUL.current.style.maxHeight = "0px"
            }
            if(refToStrelochka.current!=null){
                refToStrelochka.current.style.transition = "rotate 0.3s ease-in";
                refToStrelochka.current.style.rotate = "90deg";
            }
            setUlShow(false)
        }
    }
    const clickLi = (ind:number) =>{
        let arr = [...selectedTags];
        arr[ind] == true ? arr[ind]=false : arr[ind]= true
        setSelectegTags(arr)
    }
    console.log(selectedTags)
    return (
        <div>
            <div className="MainContainerTagsUI" onClick={()=>{clickShowTags()}}>
                <svg style={{marginRight:"10px",marginLeft:"10px"}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12H2M14 4H2M11.3333 8H2" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Тэг
                <svg ref={refToStrelochka} style={{marginRight:"10px"}} className="SVGinPeriodTop" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.25939 0.128174C4.12502 0.128174 3.9875 0.181299 3.88437 0.284424C3.67812 0.490674 3.67812 0.828174 3.88437 1.03442L10.9437 8.0938L3.9875 15.05C3.78125 15.2563 3.78125 15.5938 3.9875 15.8C4.19375 16.0063 4.53125 16.0063 4.7375 15.8L12.0719 8.4688C12.2781 8.26255 12.2781 7.92505 12.0719 7.7188L4.6375 0.284424C4.53125 0.178174 4.39689 0.128174 4.25939 0.128174Z" fill="#2F2F2F"/>
                </svg>
            </div>
            <ul ref={refToUL} className="ULTagsColumn">
                {
                    FilterProps.map((value, index, array)=>
                    <li className="LiTagsColumn" onClick={()=>{clickLi(index)}}>
                        <div>
                        {value.nameS}
                        </div>
                        {selectedTags[index] && <div style={{marginRight:"10px"}}>+</div>}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default TagsColumn;
