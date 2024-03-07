/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";

import Button from "@/components/button/Button";
import HeaderPage from "@/components/headerPage/headerPage";
import Input from "@/components/input/Input";
import Select from "@/components/select/Select";
import axios from "axios";
import { useLanguage } from "@/context/Language.context";

const page = () => {
  const { key } = useLanguage();
  const [lotNumber, setLotNumber] = useState("");
  const [destination, setDestination] = useState("");
  const [conveyance, setConveyance] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const optionsConveyance = [
    {
      value: "a",
      label: key.admin_page_create_lot_input_conveyance_option_airplane,
    },
    {
      value: "m",
      label: key.admin_page_create_lot_input_conveyance_option_ship,
    },
  ];

  const optionsDestination = [
    { value: "vla", label: "Venezuela" },
    { value: "col", label: "Colombia" },
    { value: "ecu", label: "Ecuador" },
  ];

  const resetForm = () => {
    setLotNumber("");
    setDestination("");
    setConveyance("");
  };

  const handleSubmit = () => {
    let data = {
      lot_number: lotNumber,
      destination: destination,
      conveyance: conveyance,
      create_date: new Date(),
      status: "1",
      updated: new Date(),
    };
    axios
      .post("/api/lots", data)
      .then((response) => {
        console.log(response);
        resetForm();
        setShowAlert(true);
        setAlertMessage(key.admin_page_create_lot_alert_success);
        setAlertType("success");
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setShowAlert(true);
        setAlertMessage(key.admin_page_create_lot_alert_error);
        setAlertType("error");
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  return (
    <div>
      <HeaderPage title={key.admin_page_create_lot_title} />
      <form action="">
        {showAlert && (
          <div
            className={`alert alert-${
              alertType === "success" ? "success" : "danger"
            }`}
          >
            {alertMessage}
          </div>
        )}
        <div className="row">
          <div className="col-md-3">
            <Input
              label={key.admin_page_create_lot_input_label_lot_number}
              type="text"
              value={lotNumber}
              onChangeValue={setLotNumber}
              placeholder={
                key.admin_page_create_lot_input_placeholder_lot_number
              }
            />
          </div>
          <div className="col-md-3">
            <Select
              label={key.admin_page_create_lot_input_label_destination}
              type="text"
              value={destination}
              onChangeValue={setDestination}
              placeholder={
                key.admin_page_create_lot_input_placeholder_destination
              }
              options={optionsDestination}
            />
          </div>
          <div className="col-md-3">
            <Select
              label={key.admin_page_create_lot_input_label_conveyance}
              type="text"
              value={conveyance}
              onChangeValue={setConveyance}
              placeholder={
                key.admin_page_create_lot_input_placeholder_conveyance
              }
              options={optionsConveyance}
            />
          </div>
        </div>
        <div className="col-md-3 my-5">
          <Button
            className="primary"
            type="button"
            label={key.admin_page_create_lot_button_create}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default page;
