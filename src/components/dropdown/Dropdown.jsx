"use client";

import "./Dropdown.css";

import React, { useEffect, useState } from "react";

import { FiCircle } from "react-icons/fi";

const Dropdown = ({ buttonText, buttonIcon, items, className, type }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    item();
    setIsOpen(false);
  };

  return (
    <div className={`dropdown ${className}`}>
      <button
        className="btn btn-secondary dropdown-toggle bg-transparent border-0"
        type="button"
        onClick={handleToggle}
        style={{ boxShadow: "none" }} // Eliminamos la sombra del botón
      >
        {buttonIcon &&
          React.cloneElement(buttonIcon, {
            className: "mr-1",
            color: "black",
            fontSize: "1.5rem",
          })}
        {buttonText}
      </button>
      <div className={`box-dropdown dropdown-menu${isOpen ? " show" : ""}`}>
        {type === "menu" && (
          <>
            {items.map((item, index) => (
              <button
                key={index}
                className="dropdown-item"
                type="button"
                onClick={() => handleItemClick(item.action)}
              >
                {item.label}
              </button>
            ))}
          </>
        )}
        {type === "language" && (
          <>
            {items.map((item, index) => (
              <button
                key={index}
                className="dropdown-item"
                type="button"
                onClick={() => handleItemClick(item.action)}
              >
                {item.label}
              </button>
            ))}
          </>
        )}
        {type === "message" && (
          <>
            {items.map((item, index) => (
              <div key={index}>
                <p className="m-0 dropdown-item">
                  {item.user} - {item.subject}
                </p>
              </div>
            ))}
          </>
        )}
        {type === "notify" && (
          <>
            {items.map((item, index) => (
              <div key={index}>
                <p className="m-0 dropdown-item">
                  <FiCircle className="icon-notify" /> - {item.notify}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
