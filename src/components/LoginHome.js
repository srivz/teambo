import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import logo from "../assets/images/Group 3.svg";
import image1 from "../assets/images/Group 8.png";
import rect from "../assets/images/Rectangle 4.svg";
import Icon_feather_check from "../assets/images/Icon feather-check.svg";
import { Link } from "react-router-dom";
export default function LoginHome() {
  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);

  return (
    <div id="main">
      <Container style={{ padding: "3em" }}>
        <Row style={{ padding: "3em" }}>
          <Col
            sm="6"
            md="6"
            className="">
            <img
              className="w-100"
              src={image1}
              alt=""
            />
          </Col>
          <Col
            sm="6"
            md="6"
            className="text-center">
            <img
              className="w-75 "
              src={logo}
              alt=""
            />
            <h6 style={{ marginTop: "1em" }}>Welcome to Teambo,</h6>
            <h6 style={{ marginBottom: "3em" }}>
              let's get the works done right.
            </h6>
            <Row style={{ marginBottom: "1.5em" }}>
              <Link to="/manager/login">
                <Button
                  variant="light"
                  type="button"
                  className="w-75">
                  <img
                    src={rect}
                    alt=""
                  />{" "}
                  Manager Login
                </Button>
              </Link>
            </Row>
            <Row>
              <Link to="/teamMate/login">
                <Button
                  variant="light"
                  type="button"
                  className="w-75">
                  <img
                    src={Icon_feather_check}
                    alt=""
                  />{" "}
                  Teammate Login
                </Button>
              </Link>
            </Row>
            <h6 style={{ marginTop: "1.5em" }}>
              Don't have an account?{" "}
              <Link
                to="/signUp"
                className="signuplink">
                <span className="blue">Signup</span>
              </Link>
            </h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
