"use client";

import React from "react";

const Button = (props) => {
  const { label, icon, onClick, type, style } = props;

  return (
    <button
      type={type || "submit"}
      className={`btn btn-${style || "primary"}`}
      onClick={onClick}
    >
      {`${icon || ""} ${label}`}
    </button>
  );
};

export default Button;
