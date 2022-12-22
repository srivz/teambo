import React from "react";
import logo from "../../assets/images/Group 3.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";

export default function LoginTeam({ text }) {
  return (
    <div className="container mt-5 login-container">
      <div className="form-box">
        <div className="img text-center">
          <img
            className="w-75"
            src={logo}
            alt=""
          />
        </div>
        <h5 className="mt-3 text-center">Let's start {text}!</h5>
        <form>
          <div className="form-group mb-2 ">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              id="email"
              type="email"
              name="Email "
              placeholder="Email"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Password"
            />
            <p className="mt-3 blue">Forgot your password?</p>
          </div>
          <button
            type="button"
            className="btn btn-primary bg-blue w-100 rounded-4"
            style={{ background: "#3975EA" }}>
            Log in
          </button>
          <h6 className="text-center mt-1">or</h6>
          <button
            type="button"
            className="btn btn-light w-100 rounded-4 login-button">
            <FontAwesomeIcon
              icon="fa-brands fa-google"
              style={{ paddingRight: ".4em", fontSize: "20px" }}
            />{" "}
            Continue with google
          </button>
        </form>
      </div>
    </div>
  );
}
