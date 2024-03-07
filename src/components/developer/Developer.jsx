import "./Developer.css";

import Image from "next/image";
import React from "react";
import icon from "../../../public/images/logos/icon.png";

const Developer = () => {
  return (
    <a
      target="_black"
      href="https://innovatechdesignhub.com"
      className="developer-container mb-2"
    >
      <p className="text-dev">Developed by</p>
      <Image src={icon} alt="" width="20" height="20" />
      <p className="text-dev">Innova Tech Design</p>
    </a>
  );
};

export default Developer;
