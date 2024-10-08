import React, { useEffect, useRef, useState } from "react";
import "../../styles/LinksPage/SortNew.css";

interface SortNewProps {
  sortLinks: (option: number) => void;
}

const SortNew: React.FC<SortNewProps> = ({ sortLinks }) => {
  useEffect(() => {
    clickToGalki(1);
  }, []);
  const refToUL = useRef<HTMLUListElement>(null);
  const refToStrelochka = useRef<SVGSVGElement>(null);
  const [flagsToGalka, setFlagToGalka] = useState(new Array(6).fill(null));
  const [isDrop, setIsDrop] = useState(false);
  const [rule, setRule] = useState(false);
  const [period, setPeriod] = useState("Сортировать");
  const clickToGalki = (prop: number) => {
    let arr = new Array(6).fill(null);
    arr.map((value, index) => {
      if (index == prop) arr[index] = true;
    });

    setFlagToGalka(arr);
    sortLinks(prop);
  };
  const clickShowUL = () => {
    if (!isDrop) {
        if (refToUL.current) {
            const ulElement = refToUL.current;
            ulElement.style.transition = "max-height 0.3s ease-in, border 0.3s ease-in";
            ulElement.style.maxHeight = "347px";
            ulElement.style.border = "1px solid #e5e7eb";
        }
        if (refToStrelochka.current) {
            const strelochkaElement = refToStrelochka.current;
            strelochkaElement.style.transition = "rotate 0.3s ease-in";
            strelochkaElement.style.rotate = "270deg";
        }
        setIsDrop(true);
    } else {
        if (refToUL.current) {
            const ulElement = refToUL.current;
            ulElement.style.transition = "max-height 0.3s ease-in, border 0.3s ease-in";
            ulElement.style.maxHeight = "0px";
            ulElement.style.border = "none";
        }
        if (refToStrelochka.current) {
            const strelochkaElement = refToStrelochka.current;
            strelochkaElement.style.transition = "rotate 0.3s ease-in";
            strelochkaElement.style.rotate = "90deg";
        }
        setIsDrop(false);
    }
  };
  return (
    <div className="button-sort-container">
    <div className="dropdownGraphLinks">
      <button
        className="ButtonToDrop"
        onClick={(e) => {
          clickShowUL();
        }}
      >
        <div className="buttonGPPDrop">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 16L13 16"
              stroke="#1C274C"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M6 11H13"
              stroke="#1C274C"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M8 6L13 6"
              stroke="#1C274C"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M17 4L17 20L20 16"
              stroke="#1C274C"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {period}
          <svg
            ref={refToStrelochka}
            className="SVGinPeriodTop"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.25939 0.128174C4.12502 0.128174 3.9875 0.181299 3.88437 0.284424C3.67812 0.490674 3.67812 0.828174 3.88437 1.03442L10.9437 8.0938L3.9875 15.05C3.78125 15.2563 3.78125 15.5938 3.9875 15.8C4.19375 16.0063 4.53125 16.0063 4.7375 15.8L12.0719 8.4688C12.2781 8.26255 12.2781 7.92505 12.0719 7.7188L4.6375 0.284424C4.53125 0.178174 4.39689 0.128174 4.25939 0.128174Z"
              fill="#2F2F2F"
            />
          </svg>
        </div>
      </button>
      </div>
      <ul className="ULDP" ref={refToUL}>
        <li
          className="LIDP"
          onClick={(e) => {
            setPeriod("Дата ↓");
            clickToGalki(0);
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            Дата 
            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#030303" strokeWidth="4.8">
                    <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
            </svg>
        </div>
          {flagsToGalka[0] && (
            <div style={{ marginLeft: "auto" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25939 0.128174C4.12502 0.128174 3.9875 0.181299 3.88437 0.284424C3.67812 0.490674 3.67812 0.828174 3.88437 1.03442L10.9437 8.0938L3.9875 15.05C3.78125 15.2563 3.78125 15.5938 3.9875 15.8C4.19375 16.0063 4.53125 16.0063 4.7375 15.8L12.0719 8.4688C12.2781 8.26255 12.2781 7.92505 12.0719 7.7188L4.6375 0.284424C4.53125 0.178174 4.39689 0.128174 4.25939 0.128174Z"
                  fill="#2F2F2F"
                />
              </svg>
            </div>
          )}
        </li>
        <li
          className="LIDP"
          onClick={(e) => {
            setPeriod("Дата ↑");
            clickToGalki(1);
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            Дата{" "}
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 24.00 24.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#030303"
                stroke-width="4.8"
              >
                {" "}
                <path
                  d="M12 6V18M12 6L7 11M12 6L17 11"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12 6V18M12 6L7 11M12 6L17 11"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          {flagsToGalka[1] && (
            <div style={{ marginLeft: "auto" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25939 0.128174C4.12502 0.128174 3.9875 0.181299 3.88437 0.284424C3.67812 0.490674 3.67812 0.828174 3.88437 1.03442L10.9437 8.0938L3.9875 15.05C3.78125 15.2563 3.78125 15.5938 3.9875 15.8C4.19375 16.0063 4.53125 16.0063 4.7375 15.8L12.0719 8.4688C12.2781 8.26255 12.2781 7.92505 12.0719 7.7188L4.6375 0.284424C4.53125 0.178174 4.39689 0.128174 4.25939 0.128174Z"
                  fill="#2F2F2F"
                />
              </svg>
            </div>
          )}
        </li>
        <li
          className="LIDP"
          onClick={(e) => {
            setPeriod("По алфавиту ↓");
            clickToGalki(2);
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            По алфавиту{" "}
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 24.00 24.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(180)"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#030303"
                stroke-width="4.8"
              >
                {" "}
                <path
                  d="M12 6V18M12 6L7 11M12 6L17 11"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12 6V18M12 6L7 11M12 6L17 11"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          {flagsToGalka[2] && (
            <div style={{ marginLeft: "auto" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25939 0.128174C4.12502 0.128174 3.9875 0.181299 3.88437 0.284424C3.67812 0.490674 3.67812 0.828174 3.88437 1.03442L10.9437 8.0938L3.9875 15.05C3.78125 15.2563 3.78125 15.5938 3.9875 15.8C4.19375 16.0063 4.53125 16.0063 4.7375 15.8L12.0719 8.4688C12.2781 8.26255 12.2781 7.92505 12.0719 7.7188L4.6375 0.284424C4.53125 0.178174 4.39689 0.128174 4.25939 0.128174Z"
                  fill="#2F2F2F"
                />
              </svg>
            </div>
          )}
        </li>
        <li
          className="LIDP"
          onClick={(e) => {
            setPeriod("По алфавиту ↑");
            clickToGalki(3);
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            По алфавиту{" "}
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 24.00 24.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#030303"
                stroke-width="4.8"
              >
                {" "}
                <path
                  d="M12 6V18M12 6L7 11M12 6L17 11"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12 6V18M12 6L7 11M12 6L17 11"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          {flagsToGalka[3] && (
            <div style={{ marginLeft: "auto" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25939 0.128174C4.12502 0.128174 3.9875 0.181299 3.88437 0.284424C3.67812 0.490674 3.67812 0.828174 3.88437 1.03442L10.9437 8.0938L3.9875 15.05C3.78125 15.2563 3.78125 15.5938 3.9875 15.8C4.19375 16.0063 4.53125 16.0063 4.7375 15.8L12.0719 8.4688C12.2781 8.26255 12.2781 7.92505 12.0719 7.7188L4.6375 0.284424C4.53125 0.178174 4.39689 0.128174 4.25939 0.128174Z"
                  fill="#2F2F2F"
                />
              </svg>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SortNew;
