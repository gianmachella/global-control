/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";

import Button from "@/components/button/Button";
import HeaderPage from "@/components/headerPage/HeaderPage";
import Image from "next/image";
import Input from "@/components/input/Input";
import Select from "@/components/select/Select";
import axios from "axios";
import loading from "../../../../../public/images/logos/loading.gif";

const page = () => {
  const [showDestinationForm, setShowDestinationForm] = useState(false);
  const [destination, setDestination] = useState("");
  const [destinationData, setDestinationData] = useState([]);
  const [sizeBox, setSizeBox] = useState("");
  const [weingt, setWeingt] = useState("");
  const [volumeBox, setVolumeBox] = useState("");
  const [boxList, setBoxList] = useState([]);
  const [lotNumber, setLotNumber] = useState("");
  const [shipmentNumber, setShipmentNumber] = useState("");
  const [conveyance, setConveyance] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameRecibe, setNameRecibe] = useState("");
  const [lastNameRecibe, setLastNameRecibe] = useState("");
  const [phoneRecibe, setPhoneRecibe] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [personalitySize, setPersonalitySize] = useState("");
  const [personalityVolume, setPersonalityVolume] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shoAlert, setShowAlert] = useState(false);
  const [sizeBoxOptions, setSizeBoxOptions] = useState([
    { value: "17X11X11 - Small", label: "17X11X11 - Small", volume: 2.84 },
    { value: "12X12X16 - Small", label: "12X12X16 - Small", volume: 1.33 },
    { value: "21X15X16 - Medium", label: "21X15X15 - Medium", volume: 2.92 },
    { value: "18X18X16 - Medium", label: "18X18X16 - Medium", volume: 3 },
    { value: "27X15X16 - Large", label: "27X15X16 - Large", volume: 3.75 },
    { value: "18X18X24 - Large", label: "18X18X24 - Large", volume: 4.5 },
    {
      value: "24X20X21 - ExtraLarge",
      label: "24X20X21 - ExtraLarge",
      volume: 5.83,
    },
    {
      value: "22X22X21 - ExtraLarge",
      label: "22X22X21 - ExtraLarge",
      volume: 5.88,
    },
    { value: "personality", label: "Tamaño personalizado" },
  ]);

  const getVolume = (size) => {
    switch (size) {
      case "17X11X11 - Small":
        return 2.4;
        break;
      case "12X12X16 - Small":
        return 1.33;
        break;
      case "21X15X16 - Medium":
        return 2.92;
        break;
      case "18X18X16 - Medium":
        return 3;
        break;
      case "27X15X16 - Large":
        return 3.75;
        break;
      case "18X18X24 - Large":
        return 4.5;
        break;
      case "24X20X21 - ExtraLarge":
        return 5.83;
        break;
      case "22X22X21 - ExtraLarge":
        return 5.88;
        break;

      default:
        break;
    }
  };

  const resetForm = () => {
    setLotNumber("");
    setShipmentNumber("");
    setConveyance("");
    setEmail("");
    setName("");
    setLastName("");
    setPhone("");
    setNameRecibe("");
    setLastNameRecibe("");
    setPhoneRecibe("");
    setCountry("");
    setState("");
    setCity("");
    setAddress("");
    setBoxList([]);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    let data = {
      lot_number: lotNumber,
      shipment_number: shipmentNumber,
      conveyance: conveyance,
      boxes: boxList,
      email: email,
      name: name,
      lastName: lastName,
      phone: phone,
      destination: destination,
      status: "1",
      date_created: new Date(),
      date_updated: new Date(),
      send_to_data: {
        name: nameRecibe,
        lastName: lastNameRecibe,
        phone: phoneRecibe,
        country: country,
        state: state,
        city: city,
        address: address,
      },
    };
    axios
      .post("api/shipment", data)
      .then((res) => {
        console.log(res);
        resetForm();
        setIsLoading(false);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddBox = () => {
    setBoxList([
      ...boxList,
      { size: sizeBox || personalitySize, weigh: weingt },
    ]);
    setSizeBox("");
    setWeingt("");
  };

  const handleClick = () => {
    setShowDestinationForm(true);
  };

  const getTotalVolume = () => {
    let total = 0;
    boxList.forEach((box) => {
      total += getVolume(box.size);
    });
    return total;
  };

  const getTotalWeigh = () => {
    let total = 0;
    boxList.forEach((box) => {
      total += Number(box.weigh);
    });
    return total;
  };

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <Image src={loading} alt="loading" />
        </div>
      ) : (
        <div>
          <HeaderPage title="Crear Envio" />
          {shoAlert && (
            <div className="alert alert-success" role="alert">
              Envio creado correctamente
            </div>
          )}
          <div className="card m-4">
            <div className="card-header">Datos de envio</div>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-3">
                  <Select
                    label="Lote"
                    placeholder="Seleccione un lote"
                    value={lotNumber}
                    onChangeValue={setLotNumber}
                    options={[]}
                  />
                </div>
                <div className="col-md-3">
                  <Input
                    label="Numero de envio"
                    placeholder="Ingresa un numero de envio"
                    value={shipmentNumber}
                    onChangeValue={setShipmentNumber}
                  />
                </div>
                <div className="col-md-3">
                  <Select
                    label="Destino"
                    placeholder="Selecciona un destino"
                    value={destination}
                    onChangeValue={setDestination}
                    options={[]}
                  />
                </div>
                <div className="col-md-3">
                  <Select
                    label="Medio de Transporte"
                    placeholder="Ingresa un medio de transporte"
                    value={conveyance}
                    onChangeValue={setConveyance}
                    options={[]}
                  />
                </div>
                <div className="col-md-3">
                  <Select
                    label="Tamaño de caja"
                    placeholder="Selecciona un tamaño"
                    options={sizeBoxOptions}
                    value={sizeBox}
                    onChangeValue={setSizeBox}
                  />
                </div>
                <div className="col-md-3">
                  <Input
                    label="Peso de caja "
                    placeholder="(Opcional)"
                    value={weingt}
                    onChangeValue={setWeingt}
                  />
                </div>
                {sizeBox === "personality" && (
                  <>
                    <div className="col-md-3">
                      <Input
                        label="Tamaño personalizado de caja "
                        placeholder="Tamaño de caja"
                        value={personalitySize}
                        onChangeValue={setPersonalitySize}
                      />
                    </div>
                    <div className="col-md-3">
                      <Input
                        label="Volumen personalizado de caja "
                        placeholder="Volumen de caja"
                        value={personalityVolume}
                        onChangeValue={setPersonalityVolume}
                      />
                    </div>
                  </>
                )}
                <div className="button-add col-md-2">
                  <Button
                    onClick={handleAddBox}
                    label="+ Agregar Caja"
                    disabled={!sizeBox || weingt === ""}
                  />
                </div>
                <div className="col-md-5">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Tamaño</th>
                        <th scope="col">Peso</th>
                        <th scope="col">Volumen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boxList.map((box, index) => (
                        <tr key={index}>
                          <td>{box.size}</td>
                          <td>{box.weigh}lbs</td>
                          <td>
                            {getVolume(box.size)} ft<sup>&#179;</sup>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-4 m-4">
                  <h6>Total de peso: {getTotalWeigh()}lbs</h6>
                  <h6>
                    Total de volumen: {getTotalVolume()}ft<sup>&#179;</sup>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="card m-4">
            <div className="card-header">Datos de destino</div>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-3">
                  <Input
                    label="Email"
                    placeholder="Ingresa el email del cliente"
                    value={email}
                    onChangeValue={setEmail}
                  />
                </div>
                <div className="col-md-3">
                  <Input
                    label="Nombre"
                    placeholder="Ingresa el nombre del cliente"
                    value={name}
                    onChangeValue={setName}
                  />
                </div>
                <div className="col-md-3">
                  <Input
                    label="Apellido"
                    placeholder="Ingresa el apellido del cliente"
                    value={lastName}
                    onChangeValue={setLastName}
                  />
                </div>
                <div className="col-md-3">
                  <Input
                    label="Numero de telefono"
                    placeholder="Ingresa el numero de telefono del cliente"
                    value={phone}
                    onChangeValue={setPhone}
                  />
                </div>
                <div className="col-md-3">
                  <Select
                    label="Destino"
                    placeholder="Selecciona un destino"
                    value={destinationData}
                    onChangeValue={() => {
                      setDestinationData();
                      handleClick();
                    }}
                    options={[]}
                  />
                </div>
                <div className="button-add col-md-2">
                  <Button label="+ Agregar" onClick={handleClick} />
                </div>
                <div className="col-md-7"></div>
                {showDestinationForm && (
                  <>
                    <div className="col-md-3">
                      <Input
                        label="Nombre de quien recibe"
                        placeholder="Ingresa el nombre de quien recibe"
                        value={nameRecibe}
                        onChangeValue={setNameRecibe}
                      />
                    </div>
                    <div className="col-md-3">
                      <Input
                        label="Apellido de quien recibe"
                        placeholder="Ingresa el apellido de quien recibe"
                        value={lastNameRecibe}
                        onChangeValue={setLastNameRecibe}
                      />
                    </div>
                    <div className="col-md-3">
                      <Input
                        label="Telefono de quien recibe"
                        placeholder="Ingresa el telefono de quien recibe"
                        value={phoneRecibe}
                        onChangeValue={setPhoneRecibe}
                      />
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
                      <Select
                        label="Pais"
                        placeholder="Selecciona el pais"
                        options={[]}
                        value={country}
                        onChangeValue={setCountry}
                      />
                    </div>
                    <div className="col-md-3">
                      <Select
                        label="Estado/Provincia"
                        placeholder="Selecciona el estado/provincia"
                        options={[]}
                        value={state}
                        onChangeValue={setState}
                      />
                    </div>
                    <div className="col-md-3">
                      <Select
                        label="Ciudad"
                        placeholder="Selecciona la ciudad"
                        options={[]}
                        value={city}
                        onChangeValue={setCity}
                      />
                    </div>
                    <div className="col-md-9">
                      <Input
                        label="Direccion"
                        placeholder="Ingresa la direcion de destino"
                        value={address}
                        onChangeValue={setAddress}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
