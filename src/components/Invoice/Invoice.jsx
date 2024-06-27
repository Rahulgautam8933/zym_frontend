import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../../Helpers/Helper";

import "./Invoice.css";

const Invoice = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getRequest(`api/v1/product/${id}`)
      .then((res) => {
        setUserData(res?.data?.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <header>
        <img src="" alt="Logo" />
      </header>
      <div className="container">
        <div className="info_div">
          <div className="client-info">
            <div>
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </div>
            <div>
              <strong>Customer Name:</strong> {userData.customerName || "Ankit"}
            </div>
            <div>
              <strong>Mobile Number:</strong>{" "}
              {userData.mobileNumber || "9696112419"}
            </div>
            <div>
              <strong>Customer Address:</strong>{" "}
              {userData.address || "Engineering College Lucknow"}
            </div>
          </div>
          <div className="client-info" style={{ marginLeft: "100px" }}>
            <div>
              <strong>GST No:</strong> {userData.gstNumber || "09EKRPS4657C2ZH"}
            </div>
            <div>
              <strong>Gym Address:</strong>{" "}
              {userData.gymAddress ||
                "H.NO-96D 567/1 AHLADPUR BRIJ DHAM COLONY SITAPUR ROAD LUCKNOW"}
            </div>
            <div>
              <strong>Mobile Number:</strong>{" "}
              {userData.gymContact || "7007333077, 7703098127"}
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Service Name</th>
              <th>Quantity (Months)</th>
              <th>Advance Payment</th>
              <th>Discount</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Gym Membership</td>
              <td>6</td>
              <td>₹10000</td>
              <td>₹2000</td>
              <td>₹8000</td>
            </tr>
            {/* More rows as needed */}
          </tbody>
          <tfoot>
            <tr className="totals">
              <td colSpan="5">Total</td>
              <td>₹8000</td>
            </tr>
          </tfoot>
        </table>
        <div className="terms">
          <h3>Terms & Conditions</h3>
          <p>
            All services must be paid in advance. No refunds are allowed.
            Membership is non-transferable.
          </p>
        </div>
        <div className="signature">
          <div>
            <p>________________________</p>
            <p>Signature of Owner</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
