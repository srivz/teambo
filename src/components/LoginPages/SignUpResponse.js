import React from "react";
import { Link } from "react-router-dom";

export default function SignUpResponse() {
  return (
    <div id="main">
      <div class="msg-box text-center">
        <img
          class="w-50 "
          src="./images/Group 3.svg"
          alt=""
        />
        <h3 class="mt-5">
          Hi,{" "}
          <span class="blue">
            {JSON.parse(localStorage.getItem("currentUser"))}!{" "}
          </span>
        </h3>
        <h3>Thank you for signing up</h3>
        <p class="grey mt-4">
          You can start using your Teambo account once you got approval form the
          Manager of the company you selected
        </p>
        <Link to="/">
          <button
            type="button"
            class="btn btn-light shadow w-50 mb-5 bg-body rounded-4 mt-5">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}
