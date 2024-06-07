import React, { useEffect, useRef, useState } from 'react';
import "./sortButtonGP.css";

interface SortingOption {
  label: string;
  value: number;
}

interface SortButtonGPProps {
  columns: SortingOption[];
}

const SortButtonGP2: React.FC<SortButtonGPProps> = ({ columns }) => {
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
    <div className="dropdownGraphLinks">
      <button className="ButtonToDrop" onClick={toggleDropdown}>
        <div className="buttonGPPDrop">
          <svg style={{ marginRight: "20px" }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_330_84)">
              <path d="M5.00065 3.99984V0.666504M11.6673 3.99984V0.666504M14.334 11.3332V14.3332H2.33398V12.3332M14.2427 5.6665H2.23532M0.333984 12.1665V12.3332H12.2673L12.3673 12.1665L12.5233 11.8392C13.7154 9.33364 14.334 6.59385 14.334 3.81917V2.33317H2.33398V3.75184C2.33401 6.54796 1.70588 9.30837 0.495984 11.8292L0.333984 12.1665Z" stroke="#2F2F2F" />
            </g>
            <defs>
              <clipPath id="clip0_330_84">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {selectedOption.label}
          <svg ref={arrowRef} className="SVGinPeriodTop" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.25939 0.128174C4.12502 0.128174 3.9875 0.181299 3.88437 0.284424C3.67812 0.490674 3.67812 0.828174 3.88437 1.03442L10.9437 8.0938L3.9875 15.05C3.78125 15.2563 3.78125 15.5938 3.9875 15.8C4.19375 16.0063 4.53125 16.0063 4.7375 15.8L12.0719 8.4688C12.2781 8.26255 12.2781 7.92505 12.0719 7.7188L4.6375 0.284424C4.53125 0.178174 4.39689 0.128174 4.25939 0.128174Z" fill="#2F2F2F" />
          </svg>
        </div>
      </button>
      <ul className="ULDP" ref={ulRef} style={{ transition: "max-height 0.3s ease-in", maxHeight: isDropdownOpen ? "347px" : "0px" }}>
        {columns.map((option, index) => (
          <li key={index} className="LIDP" onClick={() => handleOptionClick(option)}>
            <div>{option.label}</div>
            {selectedOption.value === option.value && (
              <div style={{ marginLeft: "auto", marginRight: "5px" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.25939 0.128174C4.12502 0.128174 3.9875 0.181299 3.88437 0.284424C3.67812 0.490674 3.67812 0.828174 3.88437 1.03442L10.9437 8.0938L3.9875 15.05C3.78125 15.2563 3.78125 15.5938 3.9875 15.8C4.19375 16.0063 4.53125 16.0063 4.7375 15.8L12.0719 8.4688C12.2781 8.26255 12.2781 7.92505 12.0719 7.7188L4.6375 0.284424C4.53125 0.178174 4.39689 0.128174 4.25939 0.128174Z" fill="#2F2F2F" />
                </svg>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortButtonGP2;