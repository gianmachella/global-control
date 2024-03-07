/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import "bootstrap/dist/css/bootstrap.css";

import {
  BsBarChartLineFill,
  BsBox2,
  BsBoxes,
  BsFillGearFill,
  BsPeopleFill,
} from "react-icons/bs";
import React, { useEffect, useState } from "react";

import Developer from "../../components/developer/Developer";
import Link from "next/link";
import { useLanguage } from "@/context/Language.context";

const SideMenu = (props) => {
  const { key, lan } = useLanguage();
  const { collapsed } = props;
  const [collapsedMenu, setCollapsedMenu] = useState(false);
  const [collapsedMenuLot, setCollapsedMenuLot] = useState(false);
  const [collapsedMenuShip, setCollapsedMenuShip] = useState(false);
  const [collapsedMenuCustomer, setCollapsedMenuCustomer] = useState(false);

  const handleShowMenu = (type) => {
    switch (type) {
      case "lot":
        setCollapsedMenuLot(!collapsedMenuLot);
        setCollapsedMenuCustomer(false);
        setCollapsedMenuShip(false);
        break;
      case "ship":
        setCollapsedMenuShip(!collapsedMenuShip);
        setCollapsedMenuCustomer(false);
        setCollapsedMenuLot(false);
        break;
      case "customer":
        setCollapsedMenuCustomer(!collapsedMenuCustomer);
        setCollapsedMenuShip(false);
        setCollapsedMenuLot(false);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (!collapsed) {
      setTimeout(() => {
        setCollapsedMenu(collapsed);
      }, 600);
    } else {
      setCollapsedMenu(collapsed);
    }
  }, [collapsed, key, lan]);

  return (
    <div
      className={
        collapsed
          ? "side-menu sidemenu-container-collapsed"
          : "side-menu sidemenu-container"
      }
    >
      <ul className="menu">
        <li className="item-menu-sidebar" onClick={() => handleShowMenu("lot")}>
          <BsBoxes className="icon-menu" />{" "}
          {!collapsedMenu && key && key.admin_sidemenu_item_lots}
        </li>
        <ul className={`submenu${collapsedMenuLot ? " submenu-active" : ""}`}>
          {" "}
          <Link className="text-item-menu" href="/admin/lot/create-lot">
            <li className="item-menu-sidebar">
              <BsBoxes className="icon-menu" />
              <span className="text-item-menu">
                {!collapsedMenu && key && key.admin_sidemenu_item_create_lot}
              </span>
            </li>
          </Link>
          <Link className="text-item-menu" href="/admin/lot/update-lot">
            <li className="item-menu-sidebar">
              {" "}
              <BsBoxes className="icon-menu" />
              {!collapsedMenu && key && key.admin_sidemenu_item_update_lot}
            </li>
          </Link>
        </ul>
        <li
          className="item-menu-sidebar"
          onClick={() => handleShowMenu("ship")}
        >
          <BsBox2 className="icon-menu" />
          {!collapsedMenu && key && key.admin_sidemenu_item_shipments}
        </li>
        <ul className={`submenu${collapsedMenuShip ? " submenu-active" : ""}`}>
          {" "}
          <Link
            className="text-item-menu"
            href="/admin/shipment/create-shipment"
          >
            <li className="item-menu-sidebar">
              <BsBox2 className="icon-menu" />
              {!collapsedMenu && key && key.admin_sidemenu_item_create_shipment}
            </li>
          </Link>
          <Link
            className="text-item-menu"
            href="/admin/shipment/consult-shipment"
          >
            <li className="item-menu-sidebar">
              {" "}
              <BsBox2 className="icon-menu" />
              {!collapsedMenu &&
                key &&
                key.admin_sidemenu_item_consult_shipment}
            </li>
          </Link>
        </ul>
        <li
          className="item-menu-sidebar"
          onClick={() => handleShowMenu("customer")}
        >
          <BsPeopleFill className="icon-menu" />
          {!collapsedMenu && key && key.admin_sidemenu_item_users}
        </li>
        <ul
          className={`submenu${collapsedMenuCustomer ? " submenu-active" : ""}`}
        >
          {" "}
          <Link
            className="text-item-menu"
            href="/admin/customer/create-customer"
          >
            <li className="item-menu-sidebar">
              <BsPeopleFill className="icon-menu" />
              {!collapsedMenu && key && key.admin_sidemenu_item_create_user}
            </li>
          </Link>
          <Link
            className="text-item-menu"
            href="/admin/customer/consult-customer"
          >
            <li className="item-menu-sidebar">
              {" "}
              <BsPeopleFill className="icon-menu" />
              {!collapsedMenu && key && key.admin_sidemenu_item_update_user}
            </li>
          </Link>
        </ul>
        <li className="item-menu-sidebar">
          <BsBarChartLineFill className="icon-menu" />
          {!collapsedMenu && key && key.admin_sidemenu_item_statistics}
        </li>
        <li className="item-menu-sidebar">
          <BsFillGearFill className="icon-menu" />
          {!collapsedMenu && key && key.admin_sidemenu_item_settings}
        </li>
      </ul>
      {!collapsedMenu && (
        <div className="mb-2 text-center">
          <p className="program-name">Global Control V-1.0</p>
          <Developer />
        </div>
      )}
    </div>
  );
};

export default SideMenu;
