import React, { useState } from "react";
import logo from "../../assets/images/Group 3.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import Loader from "../Loader/Loader";
import image1 from "../../assets/images/Group 8.png";
import { Link } from "react-router-dom";

export default function LoginTeam({ text, user, name, role }) {
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChangeLog = (event) => {
    let newInput1 = { [event.target.name]: event.target.value };
    setUserLog({ ...userLog, ...newInput1 });
  };

  const registerLogin = () => {
    signInWithEmailAndPassword(auth, userLog.email, userLog.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.photoURL === "Manager") {
          window.location.href = "/manager/home";
        } else {
          window.location.href = "/teammate/home";
        }
      })
      .catch((error) => {
        setLoading(false)
        alert(error.message)
      });
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    if (userLog.email === "" || userLog.password === "") {
      setLoading(false);
      alert("Fill the fields");
    } else {
      registerLogin();
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="login-container">
          <div
            className="logo-container">
            <img
              className="w-100"
              src={image1}
              alt="logo"
            />
          </div>
          <div className="form-box">
            <div className="img text-center">
              <img
                className="w-75"
                src={logo}
                alt=""
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-5">
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
                  <Link to={"/forgotPassword"}
                    className="signuplink"><p className="mt-3 blue pointer">Forgot your password?</p></Link>
              </div>
              <button
                type="Submit"
                className="btn btn-primary bg-blue w-100 rounded-4 login-button2"
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
            <h6
              style={{ marginTop: "2em" }}
              className="signup-h6">
              Don't have an account?{" "}
              <Link
                to="/signUp/select"
                className="signuplink">
                <span
                  className="blue"
                  style={{ marginLeft: "5px" }}>
                  Signup
                </span>
              </Link>
            </h6>
          </div>
        </div>
      )}
    </>
  );
          }
