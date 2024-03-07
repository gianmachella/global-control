/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";

import Button from "@/components/button/Button";
import HeaderPage from "@/components/headerPage/HeaderPage";
import Image from "next/image";
import LotCard from "@/components/lotCard/LotCard";
import Select from "@/components/select/Select";
import axios from "axios";
import loading from "../../../../../public/images/logos/loading.gif";
import { useLanguage } from "@/context/Language.context";

const page = () => {
  const { lan, key } = useLanguage();
  const [lotData, setLotData] = useState(null);
  const [lotsList, setLotsList] = useState(null);
  const [lotId, setLotId] = useState("");
  const [lotsOptions, setLotsOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          <div className="col-md-3">
            <Select
              label={key.admin_page_create_lot_input_label_lot_number}
              placeholder={key.admin_page_update_lot_input_select_lot}
              value={lotId}
              onChangeValue={setLotId}
              options={lotsOptions}
            />
            <Button
              onClick={getLot}
              label={key.admin_page_update_lot_button_search}
            />
          </div>
          <div className="col-md-9"></div>
          <div className="col-md-7">
            {lotData && (
              <div className="mt-5">
                <LotCard data={lotData} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default page;
