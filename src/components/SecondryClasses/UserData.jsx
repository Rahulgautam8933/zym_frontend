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
      <h2 className="text-center">Details</h2>

      <div className="rjg" style={{ width: "80%", margin: "1rem auto" }}>
        <div className="result1container" id="printinvice21">
          <p>name: {userData?.name}</p>
          <p>email: {userData?.email}</p>
          <p>contact: {userData?.contact}</p>
          <p> weight: {userData?.weight}</p>
          <p>amount: {userData?.amount}</p>
          <p>bilingDate: {userData?.bilingDate}</p>
          <p>dob: {userData?.dob}</p> <p> height: {userData?.height}</p>
          <p>pulse: {userData?.pulse}</p>
          <p>duration: {userData?.duration}</p>
          <p>aadhaarNumber: {userData?.aadhaarNumber}</p>
          <p>
            <img src={userData?.aadhaarImage?.url} alt="img" />
          </p>
        </div>
      </div>
    </>
  );
};

export default UserData;
