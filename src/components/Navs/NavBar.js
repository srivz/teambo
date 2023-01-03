import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/images/Group 3.svg";

export default function NavBar({ user, name, role }) {
  return (
    <Container>
      <Row style={{ paddingTop: "1.5em" }}>
        <Col
          sm={6}
          md={6}
          style={{ marginTop: "1em" }}>
          <h5>
            <img
              className="w-25 m-lg-2"
              style={{ margin: ".5em" }}
              src={logo}
              alt="logo"
            />
            <span className="border-left"></span>
            <span
              className="blue letter-spacing"
              style={{ marginTop: ".5em", fontSize: "13px" }}>
              {user}
            </span>
          </h5>
        </Col>
        <Col
          sm={6}
          md={6}
          style={{ marginTop: "1em" }}>
          <h5 className="text-end">
            {name} <span className="grey h6">{role}</span>
            <span className="border-left"></span>
            <span
              onClick={() => {
                signOut(auth);
              }}
              className="blue pointer"
              style={{ marginTop: ".5em" }}>
              Log Out
            </span>
          </h5>
        </Col>
      </Row>
    </Container>
  );
}
