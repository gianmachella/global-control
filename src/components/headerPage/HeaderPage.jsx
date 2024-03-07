import "./HeaderPage.css";

import React from "react";

const HeaderPage = (props) => {
  const { title } = props;
  return (
    <div className="headerpage-container">
      <h3 className="headerpage-title">{title}</h3>
      <hr />
    </div>
  );
};

export default HeaderPage;
