// import React from "react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { postRequest, postRequestForImg } from "../../Helpers/Helper";

function AddData() {
  const navigator = useNavigate();
  const [result1, setResult1] = useState(false);
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
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `api/v1/admin/product/new`;
    const cred = {
      ...formData,
    };

    postRequestForImg({ url: url, cred: cred })
      .then((res) => {
        console.log(res);
        navigator("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center">Add data</h2>

        {/* <form onSubmit={handleSubmit} class="row g-3">
          <div class="col-6">
            <label for="inputEmail4" class="form-label">
              name
            </label>
            <input type="text" required class="form-control" id="inputEmail4" />
          </div>
          <div class="col-6">
            <label for="inputPassword4" class="form-label">
              email
            </label>
            <input
              type="email"
              required
              class="form-control"
              id="inputPassword4"
            />
          </div>
          <div class="col-6">
            <label for="inputAddress" class="form-label">
              contact
            </label>
            <input
              type="Number"
              class="form-control"
              id="inputAddress"
              required
              placeholder="contact"
            />
          </div>
          <div class="col-6">
            <label for="aadhaarNumber" class="form-label">
              aadhaarNumber
            </label>
            <input
              type="Number"
              class="form-control"
              required
              id="aadhaarNumber"
              placeholder="aadhaarNumber"
            />
          </div>
          <div class="col-6">
            <label for="inputAddress1" class="form-label">
              weight
            </label>
            <input
              type="Number"
              class="form-control"
              id="inputAddress1"
              required
              placeholder="weight"
            />
          </div>
          <div class="col-6">
            <label for="height" class="form-label">
              height
            </label>
            <input
              type="Number"
              class="form-control"
              id="height"
              required
              placeholder="height"
            />
          </div>
          <div class="col-6">
            <label for="pulse" class="form-label">
              pulse
            </label>
            <input
              type="Number"
              class="form-control"
              id="pulse"
              required
              placeholder="pulse"
            />
          </div>
          <div class="col-6">
            <label for="duration" class="form-label">
              duration
            </label>
            <input
              type="Number"
              class="form-control"
              id="duration"
              required
              placeholder="duration"
            />
          </div>
          <div class="col-6">
            <label for="amount" class="form-label">
              amount
            </label>
            <input
              type="Number"
              class="form-control"
              id="amount"
              required
              placeholder="amount"
            />
          </div>
          <div class="col-6">
            <label for="bilingDate" class="form-label">
              bilingDate
            </label>
            <input
              type="date"
              class="form-control"
              id="amobilingDateunt"
              placeholder="bilingDate"
              required
            />
          </div>
          <div class="col-6">
            <label for="dob" class="form-label">
              dob
            </label>
            <input
              type="date"
              class="form-control"
              id="dob"
              placeholder="dob"
              required
            />
          </div>
          <div class="col-6">
            <label for="dob" class="form-label">
              dob
            </label>
            <input
              type="file"
              class="form-control"
              id="dob"
              placeholder="dob"
              required
            />
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-primary">
              Add
            </button>
          </div>
        </form> */}

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
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="form-control"
              id="duration"
              placeholder="Duration"
            />
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
              required
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

export default AddData;
