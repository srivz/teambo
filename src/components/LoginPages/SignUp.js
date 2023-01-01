import React, { useState } from "react";
import logo from "../../assets/images/Group 3.svg";
import "./Login.css";
import { auth, db } from "../../firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import Loader from "../Loader/Loader";
import Dropdown from 'react-bootstrap/Dropdown';

export default function Signup({userid}) {
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
  const [loading,setLoading]=useState(false)
  const handleChange = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setUser({ ...user, ...newInput });
  };
  const handleChangeLog = (event) => {
    let newInput1 = { [event.target.name]: event.target.value };
    setUserLog({ ...userLog, ...newInput1 });
  };
  const registerUser = async (currentUser) => {
    if (user.designation === "Manager") {
      set(ref(db, "/manager/" + currentUser.uid), {
        company: user.companyName,
        designation: user.designation,
        name: user.name,
        email: userLog.email,
        teammates: [],
        clients:[]
      }).then(() => (window.location.href = "/signUp/response"));
    } else {
      await set(
        ref(db, "/teammate/" + currentUser.email.split(".").join("_")),
        {
          company: user.companyName,
          designation: user.designation,
          name: user.name,
          email: userLog.email,
        }
      ).then(() => (window.location.href = "/signUp/response"));
    }
    setLoading(false)
  };

  const registerLogin = () => {
    createUserWithEmailAndPassword(auth, userLog.email, userLog.password)
      .then((cred) => {
        updateProfile(auth.currentUser, {
          photoURL: user.designation === "Manager" ? "Manager" : "Teammate",
          displayName: user.name,
        });
        registerUser(auth.currentUser);
      })
      .catch((err) => {
        setLoading(false);
        alert(err)});
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
        setLoading(true)
        localStorage.setItem("currentUser", JSON.stringify(user.name));
        registerLogin();
      } else {
        alert("Passwords does not match!!");
      }
    }
  };
  return (
    <>
    {
        loading ? <Loader /> : 
        <div className="login-container2">
          <div className="form-box1">
            <div className="img text-center">
              <img
                className="w-50"
                src={logo}
                alt=""
              />
            </div>
            <h4 className="mt-4 text-center mb-4 signup-para">Sign up a new Teambo account!</h4>
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
                      <Dropdown>
                        <Dropdown.Toggle
                          id="dropdown-basic"
                          className="w-100 client-dropdown company-dropdown"
                        >
                          {
                            user.companyName===""?"Select Company ":user.companyName
                          }
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="client-dropdown-menu company-dropdown-menu">
                                   <Dropdown.Item onClick={(e)=>{
                                    setUser((old)=>{
                                      return{...old,companyName:"The Madras Branding Company"}
                                    })
                                   }}>
                                  The Madras Branding Company
                                  </Dropdown.Item> 
                          <div className="add-new-input">
                              <button type="button" className="w-100">Add Company</button>
                          </div>          
                        </Dropdown.Menu>
                      </Dropdown>
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
                      {
                          userid === "teammate" ?
                           <>
                           <option value="Developer">Developer</option>
                            <option value="Digital Artist">Digital Artist</option>
                            <option value="Designer">Designer</option>
                            <option value="Editor">Editor</option>
                            <option value="Content writter">Content writter</option>
                            <option value="Client Manager">Client Manager</option>
                            <option value="Photographer">Photographer</option>
                            <option value="Animator">Animator</option>
                            </> 
                            :
                             <option value="Manager">Manager</option>
                      }
                      
                      
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
              <button
                type="submit"
                className="btn btn-primary bg-blue w-100 rounded-4 mt-4">
                Sign Up
              </button>
            </form>
          </div>
        </div>
    }
    
    </>
    
  );
}
