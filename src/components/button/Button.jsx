"use client";

import React from "react";

const Button = (props) => {
  const { label, icon, onClick, type, style, disabled } = props;

  return (
    <button
      type={type || "submit"}
      className={`btn btn-${style || "primary"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {`${icon || ""} ${label}`}
    </button>
  );
};

export default Button;
