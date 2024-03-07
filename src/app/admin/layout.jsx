"use client";

import "bootstrap/dist/css/bootstrap.css";
import "../../components/sections/Sections.css";

import React, { useState } from "react";

import Nav from "@/components/sections/Nav";
import SideMenu from "@/components/sections/SideMenu";

const Layout = ({ children }) => {
  const [isColapsed, setIsColapsed] = useState(false);
  const logout = () => {
    console.log("Logout");
  };

  const handleColapsed = () => {
    console.log(isColapsed);
    setIsColapsed(!isColapsed);
  };
  return (
    <>
      <div className="header">
        <Nav collapse={handleColapsed} logout={logout} />
      </div>
      <div className="sidemenu-and-content">
        <div className="sidemenu">
          <SideMenu collapsed={isColapsed} />
        </div>
        <div className={`${isColapsed ? "content-collapsed" : "content"} p-3`}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
