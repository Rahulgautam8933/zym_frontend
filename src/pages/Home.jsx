import React, { useState } from "react";
import { noTokenPostRequest } from "../Helpers/Helper";
import Cookies from "js-cookie";

function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onchangeData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = (e) => {
    e.preventDefault();
    const url = `api/v1/login`;
    const cred = {
      ...formData,
    };
    noTokenPostRequest({ url, cred })
      .then((res) => {
        Cookies.set("zymToken", res?.data?.token);

        window.location.href = `/dashboard`;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="loginContainer">
        <div className="loginbox">
          <form onSubmit={login}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                onChange={onchangeData}
                value={formData?.email}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={onchangeData}
                value={formData?.password}
                class="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* <div
        className="anki"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "96vh",
          width: "100%",
        }}
      >
        <div
          class="container"
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", padding: "20px" }}
        >
          <div class="row">
            <div class="col-md-3">
              <div class="card">
                <div class="card-body">
                  <p style={{ color: "red", fontSize: "24px" }}>For Nursery</p>
                 
                  <button
                    class="button-64"
                    role="button"
                    onClick={() => navigator("/PrimaryClasses")}
                  >
                    <span class="text">Click To Enter</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card">
                <div class="card-body">
                  <p style={{ color: "red", fontSize: "24px" }}>
                    For LKG to UKG
                  </p>
                 
                  <button
                    class="button-64"
                    role="button"
                    onClick={() => navigator("/ukgLkg")}
                  >
                    <span class="text">Click To Enter</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card">
                <div class="card-body">
                  <p style={{ color: "red", fontSize: "24px" }}>
                    For 1st to 5th
                  </p>
                
                  <button
                    class="button-64"
                    role="button"
                    onClick={() => navigator("/secondryClsses")}
                  >
                    <span class="text">Click To Enter</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card">
                <div class="card-body">
                  <p style={{ color: "red", fontSize: "24px" }}>
                    For 6th to 8th
                  </p>
                 
                  <button
                    class="button-64"
                    role="button"
                    onClick={() => navigator("/sixToEight")}
                  >
                    <span class="text">Click To Enter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Home;
