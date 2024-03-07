/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa6";
import React, { useEffect, useState } from "react";

import Button from "@/components/button/Button";
import HeaderPage from "@/components/headerPage/HeaderPage";
import Image from "next/image";
import Link from "next/link";
import LotCard from "@/components/lotCard/LotCard";
import Select from "@/components/select/Select";
import axios from "axios";
import boxs from "../../../../../public/images/utilities/boxs.png";
import loading from "../../../../../public/images/logos/loading.gif";
import { useLanguage } from "@/context/Language.context";

const page = () => {
  const { lan, key } = useLanguage();
  const [lotData, setLotData] = useState(null);
  const [lotsList, setLotsList] = useState(null);
  const [lotId, setLotId] = useState(null);
  const [lotsOptions, setLotsOptions] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showShipment, setShowShipment] = useState(false);

  const configureOptions = (data) => {
    data.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));

    let options = [];
    data.forEach((element) => {
      options.push({ value: element.id, label: element.lot_number });
    });
    setLotsOptions(options);
  };

  const getLot = () => {
    setIsLoading(true);
    axios.get(`/api/lots/${lotId}`).then((response) => {
      setLotData(response.data);
      setIsLoading(false);
    });
  };

  const getLots = () => {
    setIsLoading(true);
    axios.get("/api/lots").then((response) => {
      setLotsList(response.data);
      configureOptions(response.data);
      setIsLoading(false);
    });
  };

  const handleSubmit = (data) => {
    axios
      .put(`/api/lots/${data.id}`, data)
      .then((res) => {
        setShowAlert(true);
        setIsLoading(false);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLots();
  }, [key, lan]);

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <Image width="100" src={loading} alt="Loading" />
        </div>
      ) : (
        <div className="row">
          <HeaderPage title={key.admin_page_update_lot_title} />
          <div className="update-container">
            <div className="col-md-5 my-2">
              <Select
                label={key.admin_page_create_lot_input_label_lot_number}
                placeholder={key.admin_page_update_lot_input_select_lot}
                value={lotId}
                onChangeValue={setLotId}
                options={lotsOptions}
                className="mr-3"
              />
              <Button
                onClick={getLot}
                disabled={!lotId}
                label={key.admin_page_update_lot_button_search}
              />
              {lotData && (
                <>
                  <h6 className="col-md-12 mt-3 d-flex">
                    Envios cargados en el lote:
                    {showShipment ? (
                      <div
                        className="mx-3 d-fex justify-content-center align-items-center"
                        onClick={() => setShowShipment(false)}
                      >
                        <FaEyeSlash />
                        <p className="text-shipment-card">Ocultar</p>
                      </div>
                    ) : (
                      <div
                        className="mx-3 d-flex justify-content-center align-items-center"
                        onClick={() => setShowShipment(true)}
                      >
                        <FaEye />
                        <p className="text-shipment-card">Ver</p>
                      </div>
                    )}
                  </h6>
                  {showShipment && (
                    <div className="row">
                      {lotData &&
                        JSON.parse(lotData.shipments).map((shipment, index) => (
                          <Link
                            href={`/admin/shipment/${shipment.number}`}
                            key={index}
                            className="col-md-6 shipment-box"
                          >
                            <div className="card m-2 p-3">
                              <div className="row ">
                                <div className="col-md-8">
                                  <h6 className="title-shipment-card">{`Numero: ${shipment.number}`}</h6>
                                  <p className="text-shipment-card">{`Volumen: ${shipment.volume}`}</p>
                                  <p className="text-shipment-card">{`Cajas: ${shipment.cajas}`}</p>
                                </div>
                                <div className="col-md-4 p-0">
                                  <Image width="70" src={boxs} alt="Boxs" />
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="col-md-6">
              {lotData && (
                <div className="">
                  <LotCard
                    update={handleSubmit}
                    showAlert={showAlert}
                    isLoading={isLoading}
                    data={lotData}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
