import { useState } from "react";
import "./button.css";

export default function Button({
  children,
  className = "",
  onClick,
  operator,
}) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 300);
  };

  return (
    <button
      className={`btn ${className} ${isActive && "btn--active"} ${
        operator === children && "btn--active"
      }`}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
        onClick(children);
      }}
    >
      {children}
    </button>
  );
}
