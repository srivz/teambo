import React, { useState } from "react";
import "./Login.css";
import { auth } from "../../firebase-config";
import Loader from "../Loader/Loader";
import image1 from "../../assets/images/Group 8.png";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
    const [userLog, setUserLog] = useState({
        email: "",
    });

    const [loading, setLoading] = useState(false);
    const handleChangeLog = (event) => {
        let newInput1 = { [event.target.name]: event.target.value };
        setUserLog({ ...userLog, ...newInput1 });
    };

    const registerLogin = () => {
        sendPasswordResetEmail(auth, userLog.email)
            .then(() => {
                alert("Password reset email sent!");
                window.location.href = "/";
            })
            .catch((error) => {
                setLoading(false)
                if (error === "Firebase: Error (auth/user-not-found).")
                    alert("USER NOT FOUND");
            });
    };

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        if (userLog.email === "") {
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
                            <h3>Forgot Password?</h3>
                            <h6>Enter the email id associated<br />with your Teambo account</h6>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-4">
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
                            <button
                                type="Submit"
                                className="btn btn-primary bg-blue w-100 rounded-4 login-button2"
                                style={{ background: "#3975EA", marginTop: "1em" }}>
                                Send Link
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
