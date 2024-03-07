"use client";

import "./Input.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useState } from "react";

const Input = (props) => {
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
      <input
        type={inputType}
        className={`input-custom ${valid} ${invalid}`}
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
      />
      {showPasswordButton && (
        <div onClick={handleShow} className="icon-input">
          {!showPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
    </div>
  );
};

export default Input;
