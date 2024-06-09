import React, { useRef, useState, useEffect } from 'react';
import "../../styles/LinksPage/TagsLikeUl.css";

const TagsColumn = ({ updateSelectedTags, links, selectedTags }) => {
  const [ulShow, setUlShow] = useState(false);
  const refToUL = useRef(null);
  const refToStrelochka = useRef(null);

  const clickShowTags = () => {
    if (!ulShow) {
      if (refToUL.current != null) {
        refToUL.current.style.transition = "max-height 0.3s ease-in";
        refToUL.current.style.maxHeight = "347px";
      }
      if (refToStrelochka.current != null) {
        refToStrelochka.current.style.transition = "rotate 0.3s ease-in";
        refToStrelochka.current.style.rotate = "270deg";
      }
      setUlShow(true);
    } else {
      if (refToUL.current != null) {
        refToUL.current.style.transition = "max-height 0.3s ease-in";
        refToUL.current.style.maxHeight = "0px";
      }
      if (refToStrelochka.current != null) {
        refToStrelochka.current.style.transition = "rotate 0.3s ease-in";
        refToStrelochka.current.style.rotate = "90deg";
      }
      setUlShow(false);
    }
  };

  const handleTagClick = (tag) => {
    updateSelectedTags(tag);
  };

  const uniqueTags = [...new Set(links.map(link => JSON.stringify({
    name: link.tagValue,
    svgColor: link.svgColor,
    backgrounds: link.backgrounds
  })))].map(tag => JSON.parse(tag));

  return (
    <div>
      <div className="MainContainerTagsUI" onClick={clickShowTags}>
        <svg style={{ marginRight: "10px", marginLeft: "10px" }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12H2M14 4H2M11.3333 8H2" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Тэг
        <svg ref={refToStrelochka} style={{ marginRight: "10px" }} className="SVGinPeriodTop" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.25939 0.128174C4.12502 0.128174 3.9875 0.181299 3.88437 0.284424C3.67812 0.490674 3.67812 0.828174 3.88437 1.03442L10.9437 8.0938L3.9875 15.05C3.78125 15.2563 3.78125 15.5938 3.9875 15.8C4.19375 16.0063 4.53125 16.0063 4.7375 15.8L12.0719 8.4688C12.2781 8.26255 12.2781 7.92505 12.0719 7.7188L4.6375 0.284424C4.53125 0.178174 4.39689 0.128174 4.25939 0.128174Z" fill="#2F2F2F"/>
        </svg>
      </div>
      <ul ref={refToUL} className="ULTagsColumn">
        {uniqueTags.map((tag, index) => (
          <li 
          key={index} 
          className="LiTagsColumn" 
          onClick={() => handleTagClick(tag)}
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "0 10px",
          }}
        >
          {/* Фон с градиентом */}
          {selectedTags.some(t => t.name === tag.name && t.svgColor === tag.svgColor && t.backgrounds === tag.backgrounds) && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  backgroundImage: `linear-gradient(to right, transparent, ${tag.backgrounds} 50%, transparent)`, // Градиент с прозрачными краями
                  animation: "wave 3s infinite", // Анимация для "волны"
                }}
              ></div>
            </div>
          )}
        
          {/* Текстовое содержимое */}
          <div
            style={{
              backgroundColor: tag.backgrounds,
              borderLeft: "10px solid transparent",
              borderRight: "14px solid transparent",
              borderRadius: "0px 6px 6px 0px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ color: tag.svgColor }}>{tag.name}</div>
          </div>
          
          {/* Дополнительный знак "+" */}
          {selectedTags.some(t => t.name === tag.name && t.svgColor === tag.svgColor && t.backgrounds === tag.backgrounds) && (
            <div style={{ marginRight: "12px" }}>+</div>
          )}
        </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsColumn;
