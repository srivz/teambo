import React, { useState } from "react";
import logo from "../../assets/images/Group 3.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config";

export default function LoginTeam({ text, user, name, role }) {
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
  });




  const handleChangeLog = (event) => {
    let newInput1 = { [event.target.name]: event.target.value };
    setUserLog({ ...userLog, ...newInput1 });
  };

  const registerLogin = () => {
    signInWithEmailAndPassword(auth, userLog.email, userLog.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        if (user.displayName === 'Manager') {
          window.location.href = "/manager/home"
        } else {
          window.location.href = "/teammate/home"
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    if (userLog.email === "" || userLog.password === "") {
      alert("Fill the fields");
    } else {
      registerLogin();
    }
  };



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
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2 ">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              id="email"
              type="email"
              name="email"
              onChange={handleChangeLog}
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
              name="password"
              onChange={handleChangeLog}
            />
            <p className="mt-3 blue">Forgot your password?</p>
          </div>
            <button
            type="Submit"
              className="btn btn-primary bg-blue w-100 rounded-4"
              style={{ background: "#3975EA" }}>
              Log in
          </button>
          <h6 className="text-center mt-1">or</h6>
          <button
            onClick={() => {
              window.location.href =
                "https://mail.google.com/mail/?tab=rm&ogbl";
            }}
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
