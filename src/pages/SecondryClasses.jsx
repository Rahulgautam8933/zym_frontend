import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaUserEdit, FaWhatsapp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { Modal, Button } from "react-bootstrap";
import * as XLSX from "xlsx";
import axios from "axios";
import { getRequest } from "../Helpers/Helper";
const SecondryClasses = () => {
  const navigator = useNavigate();
  const [getData, setGedata] = useState([]);

  const [daysLeftData, setDaysLeftData] = useState([]);
  const [birthdayData, setBirtdayData] = useState([]);

  const [updateStatus, setUpdateStatus] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [userNumber, setUserNumber] = useState("");

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    mobileNumber: "",
    message: "",
  });

  const [modalShow, setModalShow] = React.useState(false);

  const sendMessage = (number) => {
    setFormData({ mobileNumber: number, message: "" });
    setModalShow(true);
    setUserNumber(number);
  };

  const onchangepage = () => {
    if (currentPage <= 2) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const user = query;
    getRequest(`api/v1/products1?page=${currentPage}&searchQuery=${query}`)
      .then((res) => {
        setGedata(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("gffdgdfg", error);
        navigator("/");
      });
    getRequest(`api/v1/days-left`)
      .then((res) => {
        console.log("res data", res);
        setDaysLeftData(res?.data?.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    getRequest(`api/v1/birthday`)
      .then((res) => {
        console.log("res setBirtdayData", res?.data?.todaysBirthdays);
        setBirtdayData(res?.data?.todaysBirthdays);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateStatus, currentPage, query]);

  const handleEdit = (id) => {
    // Handle edit logic with the ID

    navigator(`/secondryClsses/updateData/${id}`);
  };

  const handleUser = (id) => {
    // Handle edit logic with the ID

    navigator(`/secondryClsses/userData/${id}`);

    console.log("Edit button clicked for ID:", id);
  };
  const handleUser1 = (id) => {
    // Handle edit logic with the ID

    navigator(`/secondryClsses/invoice/${id}`);

    console.log("Edit button clicked for ID:", id);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const onSubmitMessage = () => {
    if (message.length > 0) {
      // Construct WhatsApp URL
      let number = userNumber.replace(/[^\w\s]/gi, "").replace(/ /g, "");
      let url = `https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(
        message
      )}&app_absent=${0}`;
      window.open(url);
      setModalShow(false);
      setUserNumber(""); // Reset user number
      setMessage(""); // Reset message
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}api/v1/product/${deleteId}`
      );
      console.log("Deleting item with ID:", res);
      setUpdateStatus((prev) => !prev);
      setShowDeleteModal(false);
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  const downloadExcelData = () => {
    const ws = XLSX.utils.json_to_sheet(getData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };

  const dataSource = getData;

  const columns = [
    {
      title: "S. No.",
      dataIndex: "serial",
      key: "serial",
      // render: (text, record, index) => index + 1,
      render: (text, record, index) =>
        (currentPage - 1) * itemsPerPage + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "dob",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "rollNumber",
      sorter: (a, b) => a.rollNumber - b.rollNumber,
    },

    {
      title: "duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "daysLeft",
      dataIndex: "daysLeft",
      key: "daysLeft",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="d-flex g-2">
          <button
            className="btn btn-primary mx-1"
            onClick={() => handleUser(record._id)}
          >
            <FaEye />
          </button>
          <button
            className="btn btn-primary mx-1"
            onClick={() => handleUser1(record._id)}
          >
            Invoice
          </button>
          <button
            className="btn btn-secondary mx-1"
            onClick={() => handleEdit(record._id)}
          >
            <FaUserEdit />
          </button>
          <button
            style={{
              backgroundColor: "#25d366",
              fontWeight: "bolder",
            }}
            onClick={() => sendMessage(record?.contact)}
            className="btn h3 "
          >
            <FaWhatsapp />
          </button>
          <button
            className="btn btn-danger mx-1"
            onClick={() => handleDelete(record._id)}
          >
            <MdDelete />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send WhatsApp Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Mobile Number: {userNumber}</p>

          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => setMessage(e.target.value)}
          >
            <option selected>Open this select menu</option>
            <option
              value="
          Thank you for visiting Roshni Opticals!
        Feel free to contact us 9616917142, 7985798138"
            >
              Thank you for visiting Roshni Opticals! Feel free to contact
            </option>
            <option
              value="Dear Sir/Maa'm,
        Your order is ready for pickup. Kindly collect it at your earliest convenience. 
        Have questions? Let us know. Thanks!"
            >
              Dear Sir/Maa'm, Your order is ready for pickup. Kindly
            </option>
            <option value="🎁 Happy Birthday to our amazing customer! Your support means the world to us. Wishing you a day as fabulous as our latest eyewear collection! 🕶🎉 from Roshni Opticals">
              🎁 Happy Birthday to our amazing customer! Your support means the
            </option>
            <option value="Happy Holi from Roshni Opticals! 🎉🌈 May your life be filled with vibrant colors and joyous moments. Have a wonderful and safe celebration!">
              Happy Holi from Roshni Opticals! 🎉🌈 May
            </option>
          </select>

          <textarea
            className="form-control my-4"
            rows="5"
            cols="50"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSubmitMessage}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row">
        <div className="col">
          <div className="birthday row">
            {birthdayData?.map((item) => {
              return (
                <>
                  <div className="d-flex col">
                    <div
                      style={{ width: "250px" }}
                      class="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>{item?.name}</strong> today`s birthday is{" "}
                      {item?.name}
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      ></button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="col">
          <div className="daysLeft row">
            {daysLeftData?.map((item) => {
              return (
                <>
                  <div className="d-flex col">
                    <div
                      style={{ width: "250px" }}
                      class="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>{item?.name}</strong>
                      {item?.daysLeft == 0 ? (
                        <p>{item?.daysLeft} Subscription ended</p>
                      ) : (
                        <p>{item?.daysLeft} days left to end Subscription</p>
                      )}
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      ></button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="container my-4">
        <div className="row my-4">
          <div className="col">
            <input
              className="form-control"
              id="rearchinput"
              type="text"
              placeholder="search......"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="col text-end">
            <Link to="/addData" className="btn btn-primary">
              + Add Student Data
            </Link>
          </div>
          <div className="col text-end">
            <button
              onClick={() => setCurrentPage(1)}
              className="btn btn-primary"
            >
              Reset
            </button>
          </div>

          <div className="col">
            <button className="btn btn-dark" onClick={downloadExcelData}>
              download
            </button>
          </div>
        </div>

        {loading ? (
          <div className="spiner1">
            <div class="spinner-border " role="status">
              <span class="sr-only text-center"></span>
            </div>
          </div>
        ) : (
      <div style={{ width: "100%", overflowX: "auto" }}>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
        )}
      </div>

      <div className="d-flex container  text-center gap-5 justify-content-evenly align-items-center">
        <p className="h4" style={{ cursor: "pointer" }} onClick={onchangepage}>
          previous
        </p>
        <p className="h6">{currentPage}</p>
        <p
          className="h4"
          style={{ cursor: "pointer" }}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </p>
      </div>

      <Modal
        title="Confirm Delete"
        visible={showDeleteModal}
        onOk={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </>
  );
};

export default SecondryClasses;
