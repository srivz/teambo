import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Group 3.svg";
export default function SignUpResponse() {
  return (
    <div id="main" className="signup-res-container">
      <div className="msg-box text-center">
        <img
          className="w-50 mb-4"
          src={logo}
          alt=""
        />
        <h3 className="mt-5">
          Hi,{" "}
          <span className="blue mx-1">
            {JSON.parse(localStorage.getItem("currentUser"))}!{" "}
          </span>
        </h3>
        <h3>Thank you for signing up</h3>
        <p className="grey mt-4 signup-res-para">
          You can start using your Teambo account once you got approval form the
          Manager of the company you selected
        </p>
        <Link to="/">
          <button
            type="button"
            className="btn btn-light shadow w-50 mb-5 bg-body rounded-4 mt-3">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}
