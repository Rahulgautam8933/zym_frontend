import React, { useState } from "react";
import { noTokenPostRequest } from "../Helpers/Helper";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoding] = useState(false);

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
    setLoding(true);
    noTokenPostRequest({ url, cred })
      .then((res) => {
        Cookies.set("zymToken", res?.data?.token);
        toast.success("user login successfully");
        setLoding(false);

        window.location.href = `/dashboard`;
      })
      .catch((err) => {
        console.log(err);
        setLoding(false);
        toast.error(err?.response?.data?.message);
      });
  };
  return (
    <>
      <div className="loginContainer">
        {loading ? (
          <div className="loading">
            <div class="spinner-border" role="status">
              <span class="sr-only"></span>
            </div>
          </div>
        ) : (
          ""
        )}
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
   
    </>
  );
}

export default Home;
