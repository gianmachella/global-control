import "./LotCard.css";
import "jspdf-autotable";

import React, { useEffect, useRef, useState } from "react";

import QRCode from "qrcode.react";
import Select from "../select/Select";
import jsPDF from "jspdf";
import { useLanguage } from "@/context/Language.context";

const LotCard = (props) => {
  const { data } = props;
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

  useEffect(() => {
    console.log(lan);
  }, [lan]);

  return (
    <div>
      <div className="card my-5">
        <div className="card-header">
          <h3 className="card-title">{`${key.admin_page_update_lot} - ${data.lot_number}`}</h3>
          <p className="date-create">{`${key.admin_text_created_date}: ${data.create_date}`}</p>
        </div>
        <div className="row card-body">
          <div className="col-md-7">
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
            <p>{`${key.admin_text_created_updated}: ${data.updated}`}</p>
            <p>{`${key.admin_text_created_status}: ${
              data.status === "1"
                ? `${key.admin_text_created_status_received_on_warehouse}`
                : data.destination === "2"
                ? `${key.admin_text_created_status_on_USA_transit}`
                : data.destination === "3"
                ? `${
                    data.conveyance === "m"
                      ? key.admin_text_created_status_on_travel_on_ship
                      : key.admin_text_created_status_on_travel_on_airplane
                  }`
                : data.destination === "4"
                ? `${key.admin_text_created_status_on_aduanas}`
                : data.destination === "5"
                ? `${key.admin_text_created_status_on_final_transit}`
                : ""
            }`}</p>
            <Select
              value={status}
              onChangeValue={setStatus}
              label={key.admin_text_created_status}
              options={statusOptions}
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
  );
};

export default LotCard;
