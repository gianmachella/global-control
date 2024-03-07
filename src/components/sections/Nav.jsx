"use client";

import "./Sections.css";
import {} from "react";
import "bootstrap/dist/css/bootstrap.css";

import { BiBell, BiMenu, BiMessageDots, BiUserCircle } from "react-icons/bi";

import Dropdown from "../../components/dropdown/Dropdown";
import { FaLanguage } from "react-icons/fa6";
import Image from "next/image";
import logo from "../../../public/images/logos/logo-hor.png";
import { useLanguage } from "@/context/Language.context";

const Nav = (props) => {
  const { collapse } = props;

  const { lan, setLanguage, key } = useLanguage();

  const languages = [
    {
      label: "English",
      action: () => setLanguage("en"),
    },
    {
      label: "Español",
      action: () => setLanguage("es"),
    },
  ];

  const userMenu = [
    {
      label: key.admin_nav_item_settings,
      action: () => console.log("Settings"),
    },
    {
      label: key.admin_nav_item_profile,
      action: () => console.log("Profile"),
    },
    {
      label: key.admin_nav_item_logout,
      action: () => console.log("Logout"),
    },
  ];

  const messages = [
    {
      user: "John Doe",
      subject: "Message 1",
    },
    {
      user: "Jane Doe",
      subject: "Message 2",
    },
  ];

  const notifications = [
    {
      notify: "Notification 1",
    },
    {
      notify: "Notification 2",
    },
  ];

  return (
    <>
      <nav className="row nav-container navbar navbar-light bg-light shadow p-3 mb-5 bg-white rounded">
        <div className="col-md-12 d-flex flex-row justify-content-between">
          <div className="left-side-nav">
            <Image src={logo} width="150" height="50" className="m-0" alt="" />
            <div onClick={collapse}>
              <BiMenu className="icon-menu-collapse " />
            </div>
          </div>
          <div className="menu-nav d-flex flex-row justify-content-around">
            <Dropdown
              buttonIcon={<FaLanguage />}
              items={languages}
              className="transparent-dropdown"
              type={"language"}
            />
            <Dropdown
              buttonIcon={<BiMessageDots />}
              items={messages}
              className="transparent-dropdown"
              type={"message"}
            />
            <Dropdown
              buttonIcon={<BiBell />}
              items={notifications}
              className="transparent-dropdown"
              type={"notify"}
            />
            <div className="d-flex d-flex-row justify-content-around">
              <Dropdown
                buttonIcon={<BiUserCircle />}
                type="menu"
                items={userMenu}
                className="transparent-dropdown"
              />
              <p className="mt-1">John Doe</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
