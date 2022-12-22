import React from "react";
import logo from "../../assets/images/Group 3.svg";
export default function Signup() {
  return (
    <div id="main text-center">
      <div className="container mt-5 ">
        <div className="form-box1 ">
          <div className="img text-center">
            <img
              className="w-50"
              src={logo}
              alt=""
            />
          </div>
          <h4 className="mt-3 text-center mb-3 fw-bold">
            Sign up a new Teambo account!
          </h4>
          <form>
            <div className="form-group mb-4 ">
              <div className="row">
                <div className="col-sm-6 col-md-6">
                  <label
                    htmlFor="name"
                    className="fw-bold">
                    {" "}
                    Name
                  </label>
                  <input
                    className="form-control rounded-3"
                    id="name"
                    type="name"
                    name="name "
                    placeholder="Name"
                  />
                </div>
                <div className="col-sm-6 col-md-6">
                  <label
                    htmlFor="email"
                    className="fw-bold">
                    Email
                  </label>
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
                  <label
                    htmlFor="pwd"
                    className="fw-bold">
                    Company Name
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example">
                    <option selected>Select Company</option>
                    <option value={1}>The Madras branding Company</option>
                    <option value={2}>Brand Moustache</option>
                    <option value={3}>Little Show</option>
                    <option value={4}>Facebook</option>
                  </select>
                </div>
                <div className="col-sm-6 col-md-6">
                  <label
                    htmlFor="pwd"
                    className="fw-bold">
                    Password:
                  </label>
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
                  <label
                    htmlFor="pwd"
                    className="fw-bold">
                    Designation
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example">
                    <option selected>Select Designation</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                  </select>
                </div>
                <div className="col-sm-6 col-md-6">
                  <label
                    htmlFor="pwd"
                    className="fw-bold">
                    Re-enter Password:
                  </label>
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
              type="button"
              className="btn btn-primary bg-blue w-100 rounded-4 mt-4">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
