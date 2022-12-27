import React, { useState } from "react";
import logo from "../../assets/images/Group 3.svg";
import "./Login.css";
import { auth, db } from '../../firebase-config'
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { Link } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    companyName: "",
    designation: "",
  });
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setUser({ ...user, ...newInput });
  };
  const handleChangeLog = (event) => {
    let newInput1 = { [event.target.name]: event.target.value };
    setUserLog({ ...userLog, ...newInput1 });
  };
  const registerUser = (currentUser) => {
    if (user.designation === "Manager") {
      set(ref(db, "/manager/" + currentUser.uid), {
        company: user.companyName,
        designation: user.designation,
        name: user.name,
        email: userLog.email,
        teammates: [],
      });
    } else {
      set(ref(db, "/teammate/" + currentUser.uid), {
        company: user.companyName,
        designation: user.designation,
        name: user.name,
        email: userLog.email,
      });
    }
  };

  const registerLogin = () => {
    createUserWithEmailAndPassword(auth, userLog.email, userLog.password)
      .then((cred) => {
        updateProfile(auth.currentUser, {
          displayName: user.designation === "Manager" ? "manager" : "teammate",
        });
        registerUser(auth.currentUser);
      })
      .catch((err) => alert(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      user.name === "" ||
      user.companyName === "" ||
      user.designation === ""
    ) {
      alert("Fill the fields");
    } else if (userLog.password.length < 6) {
      alert("Password should be atleast 6 characters!!!");
    } else {
      if (userLog.password === userLog.confirmPassword) {
        registerLogin();
      } else {
        alert("Passwords does not match!!");
      }
    }
  };
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
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4 ">
            <div className="row">
              <div className="col-sm-6 col-md-6">
                <label htmlFor="name">Name</label>
                <input
                  className="form-control rounded-3"
                  id="name"
                  type="name"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6 col-md-6">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChangeLog}
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
                  aria-label="Default select example"
                  name="companyName"
                  onChange={handleChange}>
                  <option
                    selected
                    hidden>
                    Select Company
                  </option>
                  <option value="The Madras branding Company">
                    The Madras branding Company
                  </option>
                  <option value="Brand Moustache">Brand Moustache</option>
                  <option value="Little Show">Little Show</option>
                  <option value="Facebook">Facebook</option>
                </select>
              </div>
              <div className="col-sm-6 col-md-6">
                <label htmlFor="pwd">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="Password"
                  name="password"
                  onChange={handleChangeLog}
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
                  aria-label="Default select example"
                  name="designation"
                  onChange={handleChange}>
                  <option
                    selected
                    hidden>
                    Select Designation
                  </option>
                  <option value="Manager">Manager</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Content writter">Content writter</option>
                  <option value="Photographer">Photographer</option>
                  <option value="Animator">Animator</option>
                </select>
              </div>
              <div className="col-sm-6 col-md-6">
                <label htmlFor="pwd">Re-enter Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="Re-enter Password"
                  name="confirmPassword"
                  onChange={handleChangeLog}
                />
              </div>
            </div>
          </div>
          <Link to="/signUp/response">
            <button
              type="submit"
              className="btn btn-primary bg-blue w-100 rounded-4 mt-4">
              Sign Up
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
