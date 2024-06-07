import React, { useEffect, useRef, useState } from "react";
import "./sortButtonGP.css";

interface SortingOption {
  label: string;
  value: number;
}

interface SortButtonGPProps {
  columns: SortingOption[];
}

const SortButtonDev: React.FC<SortButtonGPProps> = ({ columns }) => {
  const [selectedOption, setSelectedOption] = useState(columns[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ulRef = useRef<HTMLUListElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (ulRef.current && arrowRef.current) {
      if (isDropdownOpen) {
        ulRef.current.style.maxHeight = "347px";
        arrowRef.current.style.transform = "rotate(270deg)";
      } else {
        ulRef.current.style.maxHeight = "0px";
        arrowRef.current.style.transform = "rotate(90deg)";
      }
    }
  }, [isDropdownOpen]);

  const handleOptionClick = (option: SortingOption) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="dropdownGraphLinksGP" style={{ transform: "translateY(4px)" }}>
      <button className="ButtonToDropGP" onClick={toggleDropdown}>
        <div className="buttonGPPDropGP">
          <svg
            width="30"
            height="30"
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
        </div>
      </button>
      <ul
        className="ULDPGP"
        ref={ulRef}
        style={{
          transition: "max-height 0.3s ease-in",
          maxHeight: isDropdownOpen ? "347px" : "0px",
        }}
      >
        {columns.map((option, index) => (
          <li
            key={index}
            className="LIDPGP"
            onClick={() => handleOptionClick(option)}
          >
            <div>{option.label}</div>
            {selectedOption.value === option.value && (
              <div style={{ marginLeft: "auto", marginRight: "5px" }}>
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
        ))}
      </ul>
    </div>
  );
};

export default SortButtonDev;
