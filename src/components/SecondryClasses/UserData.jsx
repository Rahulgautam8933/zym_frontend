import React, { useEffect, useState } from "react";
import logo1 from "../../assets/logo.png";
import logo2 from "../../assets/iso.jpeg";
import axios from "axios";
import logo from "../../assets/logo.png";
import { useParams } from "react-router-dom";

import pass from "../../assets/pass.png";
import fail from "../../assets/fail.png";
import { getRequest } from "../../Helpers/Helper";

const UserData = () => {
  const printResult = (event) => {
    let printContents = document.getElementById("printinvice21").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    event.preventDefault();
    window.print();
    document.body.innerHTML = originalContents;
    // return false;
  };

  const id = useParams();

  const [userData, setUserData] = useState([]);

  console.log("userData", userData);

  useEffect(() => {
    getRequest(`api/v1/product/${id?.id}`)
      .then((res) => {
        console.log("ewrewr", res?.data?.product);
        setUserData(res?.data?.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // English

  return (
    <>
      <button className="btn btn-secondary m-4">Back</button>
      <button className="btn btn-secondary m-4" onClick={printResult}>
        Print
      </button>

      <div id="printinvice21" className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-4 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-">
              <img
                className="mt-5"
                width="200px"
                src={userData?.aadhaarImage?.url}
                alt="Profile"
              />
              <span className="text-black-50">1458754785</span>
              <span className="border px-3 p-1 add-experience">
                <i className="fa fa-plus"></i>&nbsp;Download Adhaar
              </span>{" "}
            </div>
          </div>
          <div className="col-md-8 border-right">
            <div className="p-3 py-">
              <div className="d-flex justify-content-between align-items-center experience">
                <span>
                  {" "}
                  <h4>User Details</h4>
                </span>
                <span className="border px-3 p-1 add-experience">
                  <i className="fa fa-plus"></i>&nbsp;Edit
                </span>
              </div>
            </div>
            <div className="p-3 py-">
              {/* <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-center">User Details</h4>
            </div> */}
              <div className="row mt-2">
                <div className="col-md-6">
                  <h2 className="labels" style={{ fontSize: "18px" }}>
                    Name:{" "}
                    <span style={{ fontSize: "16px", fontWeight: "400" }}>
                      {" "}
                      {userData?.name}
                    </span>
                  </h2>
                </div>
                <div className="col-md-6">
                  <h2 className="labels" style={{ fontSize: "18px" }}>
                    Email:{" "}
                    <span style={{ fontSize: "16px", fontWeight: "400" }}>
                      {" "}
                      {userData?.email}
                    </span>
                  </h2>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <h2 className="labels" style={{ fontSize: "18px" }}>
                    Contact:{" "}
                    <span style={{ fontSize: "16px", fontWeight: "400" }}>
                      {" "}
                      {userData?.contact}
                    </span>
                  </h2>
                </div>
                <div className="col-md-6">
                  <h2 className="labels" style={{ fontSize: "18px" }}>
                    Aadhaar:{" "}
                    <span style={{ fontSize: "16px", fontWeight: "400" }}>
                      {" "}
                      {userData?.aadhaarNumber}
                    </span>
                  </h2>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <h2 className="labels" style={{ fontSize: "18px" }}>
                    Wieght:{" "}
                    <span style={{ fontSize: "16px", fontWeight: "400" }}>
                      {" "}
                      {userData?.weight}
                    </span>
                  </h2>
                </div>
                <div className="col-md-6">
                  <h2 className="labels" style={{ fontSize: "18px" }}>
                    Hieght:{" "}
                    <span style={{ fontSize: "16px", fontWeight: "400" }}>
                      {" "}
                      {userData?.height}
                    </span>
                  </h2>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <h2 className="labels" style={{ fontSize: "18px" }}>
                    Pulse:{" "}
                    <span style={{ fontSize: "16px", fontWeight: "400" }}>
                      {" "}
                      {userData?.pulse}
                    </span>
                  </h2>
                </div>
                <div className="col-md-6">
                  <h2 className="labels" style={{ fontSize: "18px" }}>
                    Duration:{" "}
                    <span style={{ fontSize: "16px", fontWeight: "400" }}>
                      {" "}
                      {userData?.duration}
                    </span>
                  </h2>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <h2 className="labels" style={{ fontSize: "18px" }}>
                    Ammount:{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "green",
                      }}
                    >
                      {" "}
                      {userData?.amount} <span>₹</span>
                    </span>
                  </h2>
                </div>
                <div className="col-md-6">
                  <h2 className="labels" style={{ fontSize: "18px" }}>
                    Billing Date:{" "}
                    <span style={{ fontSize: "16px", fontWeight: "400" }}>
                      {" "}
                      {userData?.bilingDate}
                    </span>
                  </h2>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <h2 className="labels" style={{ fontSize: "18px" }}>
                    Dob:{" "}
                    <span style={{ fontSize: "16px", fontWeight: "400" }}>
                      {" "}
                      {userData?.dob}
                    </span>
                  </h2>
                </div>
              </div>
              <div className="row mt-4 text-center">
                <div className="col-md-12">
                  <span
                    onClick={printResult}
                    className="border px-3 p-1 add-experience"
                  >
                    <i className="fa fa-plus"></i>&nbsp;Print Details
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-md-4">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center experience">
              <span>Edit Experience</span>
              <span className="border px-3 p-1 add-experience">
                <i className="fa fa-plus"></i>&nbsp;Edit
              </span>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default UserData;
