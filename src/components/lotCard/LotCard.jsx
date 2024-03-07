import "./LotCard.css";
import "jspdf-autotable";

import React, { useEffect, useRef, useState } from "react";

import Button from "../button/Button";
import Image from "next/image";
import QRCode from "qrcode.react";
import Select from "../select/Select";
import jsPDF from "jspdf";
import loading from "../../../public/images/logos/loading.gif";
import { useLanguage } from "@/context/Language.context";

const LotCard = (props) => {
  const { data, update, showAlert, isLoading } = props;
  const qrCodeRef = useRef(null);
  const { key } = useLanguage();
  const { lan } = useLanguage();
  const [status, setStatus] = useState(data.status);
  const [statusOptions, setStatusOptions] = useState([
    {
      value: "1",
      label: key.admin_text_created_status_received_on_warehouse,
    },
    {
      value: "2",
      label: key.admin_text_created_status_on_USA_transit,
    },
    {
      value: "3",
      label: key.admin_text_created_status_on_travel_on_ship,
    },
    {
      value: "4",
      label: key.admin_text_created_status_on_aduanas,
    },
    {
      value: "5",
      label: key.admin_text_created_status_on_final_transit,
    },
  ]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const qrCodeCanvas = qrCodeRef.current.children[0];
    const qrCodeDataURL = qrCodeCanvas.toDataURL("image/png");

    doc.text(`Número de lote: ${data.lot_number}`, 10, 10);
    doc.text(`Destino: ${data.destination}`, 10, 20);
    doc.text(`Transporte: ${data.conveyance}`, 10, 30);
    doc.text(`Fecha de creacion: ${data.create_date}`, 10, 40);

    doc.addImage(qrCodeDataURL, "PNG", 10, 50, 50, 50);

    doc.save(`lote_${data.lot_number}.pdf`);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const handleUpdate = () => {
    let dataUpdated = {
      status: status,
      lot_number: data.lot_number,
      destination: data.destination,
      conveyance: data.conveyance,
      create_date: data.create_date,
      shipments: data.shipments,
      updated: new Date(),
      id: data.id,
    };

    update(dataUpdated);
  };

  useEffect(() => {}, [lan]);

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <Image width="100" src={loading} alt="loading" />
        </div>
      ) : (
        <div className="row">
          {showAlert && (
            <div className="col-md-8">
              <div className="alert alert-success" role="alert">
                {key.admin_page_updated_lot_alert_success}
              </div>
            </div>
          )}
          <div className="card my-5">
            <div className="card-header">
              <h3 className="card-title">{`${key.admin_page_update_lot} - ${data.lot_number}`}</h3>
              <p className="date-create">{`${
                key.admin_text_created_date
              }: ${formatDate(data.create_date)}`}</p>
            </div>
            <div className="row card-body">
              <div className="col-md-7">
                <Select
                  value={status}
                  onChangeValue={setStatus}
                  label={key.admin_text_created_status}
                  options={statusOptions}
                />
                <p>{`${key.admin_page_create_lot_input_label_destination}: ${
                  data.destination === "vla"
                    ? "Venezuela"
                    : data.destination === "col"
                    ? "Colombia"
                    : data.destination === "ecu"
                    ? "Ecuador"
                    : ""
                }`}</p>
                <p>{`${key.admin_page_create_lot_input_label_conveyance}: ${
                  data.conveyance === "a"
                    ? `${key.admin_page_create_lot_input_conveyance_option_airplane}`
                    : `${key.admin_page_create_lot_input_conveyance_option_ship}`
                }`}</p>
                <p>{`${key.admin_text_created_updated}: ${formatDate(
                  data.updated
                )}`}</p>
                <p>
                  {`${key.admin_text_update_volume}: ${
                    data.volume ? data.volume : 0
                  } In`}
                  <sup>&#179;</sup>
                </p>
                <Button
                  label={key.admin_page_update_lot_title}
                  onClick={handleUpdate}
                />
              </div>
              <div className="col-md-5">
                <div ref={qrCodeRef} className="text-center">
                  <QRCode value={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LotCard;
