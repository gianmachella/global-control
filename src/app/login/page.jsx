"use client";

import "bootstrap/dist/css/bootstrap.css";

import { IoEye, IoEyeOff } from "react-icons/io5";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/logos/logo-hor.png";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-default shadow-lg rounded mt-5">
            <div className="card-header">
              <Image
                src={logo}
                alt="global-control-logo"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="card-body p-5">
              <div className="p-5">
                <div className="input-group mb-5">
                  <span className="input-group-text" id="basic-addon1">
                    @
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="input-group mb-5">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                  />
                  <button
                    onClick={handleShow}
                    className="input-group-text"
                    id="basic-addon1"
                  >
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>
              </div>
              <div className="text-center">
                <button type="button" class="btn btn-primary">
                  Login
                </button>
              </div>
              <div className="text-center mt-5">
                <div className="container text-center mt-5">
                  <span className="text-muted">
                    © 2024 Global Control. All rights reserved.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
