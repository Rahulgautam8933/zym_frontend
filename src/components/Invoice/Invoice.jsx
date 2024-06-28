import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../../Helpers/Helper";

import "./Invoice.css";

import { useReactToPrint } from "react-to-print";

const Invoice = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",

    removeAfterPrint: true,
  });

  useEffect(() => {
    getRequest(`api/v1/product/${id}`)
      .then((res) => {
        console.log("res", res?.data?.product);
        setUserData(res?.data?.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <div>
        <button
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
        >
          print
        </button>
      </div>
      <div ref={contentToPrint}>
        <header>
          <img src="" alt="Logo" />
        </header>
        <div style={{ width: "90%", margin: "auto" }} className="">
          <div className="info_div">
            <div className="client-info">
              <div>
                {/* <strong>Date:</strong> {new Date().toLocaleDateString()} */}
                <strong>Date:</strong> {userData?.bilingDate}
              </div>
              <div>
                <strong>Customer Name:</strong> {userData?.name}
              </div>
              <div>
                <strong>Mobile Number:</strong> {userData?.contact}
              </div>
              <div>
                <strong>Customer Address:</strong>{" "}
                {userData?.address || "Engineering College Lucknow"}
              </div>
            </div>
            <div className="client-info" style={{ marginLeft: "100px" }}>
              <div>
                <strong>GST No:</strong>{" "}
                {userData?.gstNumber || "09EKRPS4657C2ZH"}
              </div>
              <div>
                <strong>Gym Address:</strong> "H.NO-96D 567/1 AHLADPUR BRIJ DHAM
                COLONY SITAPUR ROAD LUCKNOW"
              </div>
              <div>
                <strong>Mobile Number:</strong> 7007333077, 7703098127
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Service Name</th>
                <th>Quantity (Months)</th>
                <th>Price</th>
                <th>Advance Payment</th>
                <th>Discount</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Gym Membership</td>
                <td>{userData?.duration / 30}</td>
                <td>₹{userData?.amount ? userData?.amount : 0}</td>
                <td>₹{userData?.advance ? userData?.advance : 0}</td>
                <td>₹{userData?.discount ? userData?.discount : 0}</td>
                <td>₹{userData?.subtotal ? userData?.subtotal : 0}</td>
              </tr>
              {/* More rows as needed */}
            </tbody>
            <tfoot>
              <tr className="totals">
                <td colSpan="6">Total</td>
                <td>₹{userData?.subtotal ? userData?.subtotal : 0}</td>
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
    </>
  );
};

export default Invoice;
