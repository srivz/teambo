import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/images/Group 3.svg";
import rect from "../../assets/images/Rectangle 4.svg";
import Icon_feather_check from "../../assets/images/Icon feather-check.svg";
import { Link } from "react-router-dom";

export default function LoginHome() {
  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);

  return (
    <div id="main">
      <Container className="home-container">
        <Col
          sm="6"
          md="6"
          className="text-center">
          <img
            className="w-30"
            src={logo}
            alt=""
            width={285}
          />
          <h6 style={{ marginTop: "1.2em" }}>Welcome to Teambo,</h6>
          <h6 style={{ marginBottom: "2em" }}>
            let's get the works done right.
          </h6>
          <Row style={{ marginBottom: "1.5em" }}>
            <Link to="/signup/manager">
              <Button
                variant="light"
                type="button"
                className="home-buttons">
                <img
                  src={rect}
                  alt=""
                  width={30}
                  style={{ marginRight: "20px" }}
                />{" "}
                Manager Signup
              </Button>
            </Link>
          </Row>
          <Row>
            <Link to="/signup/teammate">
              <Button
                variant="light"
                type="button"
                className="home-buttons">
                <img
                  src={Icon_feather_check}
                  alt=""
                  width={30}
                  style={{ marginRight: "20px" }}
                />{" "}
                Teammate Signup
              </Button>
            </Link>
            <h6
              style={{ marginTop: "2em" }}
              className="signup-h6">
              Already have an account?{" "}
              <Link
                to="/"
                className="signuplink">
                <span
                  className="blue"
                  style={{ marginLeft: "5px" }}>
                  Login
                </span>
              </Link>
            </h6>
          </Row>
        </Col>
      </Container>
    </div>
  );
}
