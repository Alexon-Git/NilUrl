import React from "react";
import "./buttons.css";

function BuyButton({ children, onClick, ...props }) {
  return (
    <button className="loader" onClick={onClick} {...props}>
      <span>{children}</span>
    </button>
  );
}

export default BuyButton;
