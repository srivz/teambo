import React from "react";
import logo from "../../assets/images/Group 3.svg";
import "./Login.css";

export default function Signup() {
  return (
    <div className="container mt-5 login-container">
      <div className="form-box1">
        <div className="img text-center">
          <img
            className="w-50"
            src={logo}
            alt=""
          />
        </div>
        <h4 className="mt-3 text-center mb-3">Sign up a new Teambo account!</h4>
        <form>
          <div className="form-group mb-4 ">
            <div className="row">
              <div className="col-sm-6 col-md-6">
                <label htmlFor="name">Name</label>
                <input
                  className="form-control rounded-3"
                  id="name"
                  type="name"
                  name="name "
                  placeholder="Name"
                />
              </div>
              <div className="col-sm-6 col-md-6">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  name="Email "
                  placeholder="Email"
                />
              </div>
            </div>
          </div>
          <div className="form-group mb-4">
            <div className="row">
              <div className="col-sm-6 col-md-6">
                <label htmlFor="pwd">Company Name</label>
                <select
                  className="form-select"
                  aria-label="Default select example">
                  <option
                    selected
                    hidden>
                    Select Company
                  </option>
                  <option value={1}>The Madras branding Company</option>
                  <option value={2}>Brand Moustache</option>
                  <option value={3}>Little Show</option>
                  <option value={4}>Facebook</option>
                  <option
                    value={4}
                    className="add-new-button">
                    <button>Add new</button>
                  </option>
                </select>
              </div>
              <div className="col-sm-6 col-md-6">
                <label htmlFor="pwd">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          <div className="form-group mb-4">
            <div className="row">
              <div className="col-sm-6 col-md-6">
                <label htmlFor="pwd">Designation</label>
                <select
                  className="form-select"
                  aria-label="Default select example">
                  <option
                    selected
                    hidden>
                    Select Designation
                  </option>
                  <option value={1}>One</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                </select>
              </div>
              <div className="col-sm-6 col-md-6">
                <label htmlFor="pwd">Re-enter Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="Re-enter Password"
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            type="button"
            className="btn btn-primary bg-blue w-100 rounded-4 mt-4">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
