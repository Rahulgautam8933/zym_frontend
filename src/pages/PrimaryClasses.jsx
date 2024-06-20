import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import * as XLSX from "xlsx";
import axios from "axios";
const PrimaryClasses = () => {
  const navigator = useNavigate();
  const [getData, setGedata] = useState([]);

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const [itemsPerPage] = useState(10);

  const [formData, setFormData] = useState({
    mobileNumber: "",
    message: "",
  });

  const [modalShow, setModalShow] = React.useState(false);

  const [message, setMessage] = useState("");

  const [userNumber, setUserNumber] = useState("");

  const onchangepage = () => {
    if (currentPage <= 2) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const getdata = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/getdata?page=${currentPage}&searchQuery=${query}`
      );
      setGedata(res?.data?.data);
      setLoading(false);
      console.log(res?.data?.data);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getdata(currentPage);
  }, [currentPage, query]);

  const handleEdit = (id) => {
    // Handle edit logic with the ID

    navigator(`/PrimaryClasses/updateData/${id}`);

    console.log("Edit button clicked for ID:", id);
  };

  const sendMessage = (number) => {
    setFormData({ mobileNumber: number, message: "" });
    setModalShow(true);
    setUserNumber(number);
  };

  const handleUser = (id) => {
    // Handle edit logic with the ID

    navigator(`/PrimaryClasses/userData/${id}`);

    console.log("Edit button clicked for ID:", id);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // delete
  const handleDeleteConfirm = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/deleteuser/${deleteId}`
      );
      console.log("Deleting item with ID:", res);
      setShowDeleteModal(false);
      getdata();
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  // download data

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
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "fatherName",
      dataIndex: "fatherName",
      key: "fatherName",
    },
    {
      title: "Mother`s Name",
      dataIndex: "motherName",
      key: "motherName",
    },
    {
      title: "Class Section",
      dataIndex: "classSection",
      key: "classSection",
    },
    {
      title: "rollNumber",
      dataIndex: "rollNumber",
      key: "rollNumber",
      sorter: (a, b) => a.rollNumber - b.rollNumber,
    },
    {
      title: "Mobile Number",
      dataIndex: "mbl",
      key: "mbl",
    },
    {
      title: "dob",
      dataIndex: "dob",
      key: "dob",
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
            onClick={() => sendMessage(record?.number)}
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

      <div className="container my-4">
        <h1>Nursery</h1>
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
            <Link to="/PrimaryClasses/addData" className="btn btn-primary">
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
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        )}
      </div>

      <div className="container  text-center d-flex gap-5 justify-content-evenly align-items-center">
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

export default PrimaryClasses;
