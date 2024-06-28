// import React from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  getRequest,
  postRequest,
  postRequestForImg,
  postRequestForImgUpdate,
} from "../../Helpers/Helper";

function EditData() {
  const navigator = useNavigate();
  const [result1, setResult1] = useState(false);
  const id = useParams();

  console.log("id", id);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    weight: "",
    amount: "",
    bilingDate: "",
    dob: "",
    height: "",
    pulse: "",
    duration: "",
    aadhaarNumber: "",
    advance: "",
  });

  console.log("formData", formData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `api/v1/product/${id?.id}`;
    const cred = {
      ...formData,
    };
    postRequestForImgUpdate({ url: url, cred: cred })
      .then((res) => {
        console.log(res);
        navigator("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRequest(`api/v1/product/${id?.id}`)
      .then((res) => {
        console.log("ewrewr", res?.data?.product);
        setFormData({
          name: res?.data?.product?.name,
          email: res?.data?.product?.email,
          contact: res?.data?.product?.contact,
          weight: res?.data?.product?.weight,
          amount: res?.data?.product?.amount,
          advance: res?.data?.product?.advance,
          bilingDate: res?.data?.product?.bilingDate,
          dob: res?.data?.product?.dob,
          height: res?.data?.product?.height,
          pulse: res?.data?.product?.pulse,
          duration: res?.data?.product?.duration,
          aadhaarNumber: res?.data?.product?.aadhaarNumber,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center">Add data</h2>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
              id="name"
            />
          </div>
          <div className="col-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
              id="email"
            />
          </div>
          <div className="col-6">
            <label htmlFor="contact" className="form-label">
              Contact
            </label>
            <input
              type="number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="form-control"
              id="contact"
              placeholder="Contact"
            />
          </div>
          <div className="col-6">
            <label htmlFor="aadhaarNumber" className="form-label">
              Aadhaar Number
            </label>
            <input
              type="number"
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              required
              className="form-control"
              id="aadhaarNumber"
              placeholder="Aadhaar Number"
            />
          </div>
          <div className="col-6">
            <label htmlFor="weight" className="form-label">
              Weight
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              className="form-control"
              id="weight"
              placeholder="Weight"
            />
          </div>
          <div className="col-6">
            <label htmlFor="height" className="form-label">
              Height
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
              className="form-control"
              id="height"
              placeholder="Height"
            />
          </div>
          <div className="col-6">
            <label htmlFor="pulse" className="form-label">
              Pulse
            </label>
            <input
              type="number"
              name="pulse"
              value={formData.pulse}
              onChange={handleChange}
              required
              className="form-control"
              id="pulse"
              placeholder="Pulse"
            />
          </div>
          <div className="col-6">
            <label htmlFor="duration" className="form-label">
              Duration
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="form-control"
              id="duration"
            >
              <option value="">Select Duration</option>
              <option value="30">1 Month</option>
              <option value="60">2 Months</option>
              <option value="90">3 Months</option>
              <option value="120">4 Months</option>
              <option value="150">5 Months</option>
              <option value="180">6 Months</option>
              <option value="210">7 Months</option>
              <option value="240">8 Months</option>
              <option value="270">9 Months</option>
              <option value="300">10 Months</option>
              <option value="330">11 Months</option>
              <option value="360">12 Months</option>
            </select>
          </div>
          <div className="col-6">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="form-control"
              id="amount"
              placeholder="Amount"
            />
          </div>
          <div className="col-6">
            <label htmlFor="advance" className="form-label">
              Advance Amount
            </label>
            <input
              type="number"
              name="advance"
              value={formData.advance}
              onChange={handleChange}
              required
              className="form-control"
              id="advance"
              placeholder="Advance Amount"
            />
          </div>
          <div className="col-6">
            <label htmlFor="bilingDate" className="form-label">
              Billing Date
            </label>
            <input
              type="date"
              name="bilingDate"
              value={formData.bilingDate}
              onChange={handleChange}
              required
              className="form-control"
              id="bilingDate"
              placeholder="Billing Date"
            />
          </div>
          <div className="col-6">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="form-control"
              id="dob"
              placeholder="Date of Birth"
            />
          </div>
          <div className="col-6">
            <label htmlFor="file" className="form-label">
              Upload File
            </label>
            <input
              type="file"
              name="aadhaarImage"
              onChange={handleChange}
              className="form-control"
              id="file"
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditData;
