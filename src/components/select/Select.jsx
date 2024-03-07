"use client";

import "./Select.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useState } from "react";

const Select = (props) => {
  const {
    label,
    value,
    type,
    valid,
    invalid,
    id,
    placeholder,
    required,
    onChangeValue,
    showPasswordButton,
    options,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleShow = () => {
    setShowPassword(!showPassword);
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="input-container">
      <label>{label}</label>
      <select
        className={`input-custom ${valid} ${invalid}`}
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option, key) => {
          return (
            <option key={key} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      {showPasswordButton && (
        <div onClick={handleShow} className="icon-input">
          {!showPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
    </div>
  );
};

export default Select;
