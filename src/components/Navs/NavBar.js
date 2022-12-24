import { signOut } from "firebase/auth";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/images/Group 3.svg";
import { auth } from "../../firebase-config";

export default function NavBar({ user, name, role }) {
  return (
    <Container>
      <Row style={{ marginTop: "1em" }}>
        <Col
          sm={6}
          md={6}
          style={{ marginTop: "1em" }}>
          <h5>
            <img
              class="w-25 m-lg-2"
              style={{ margin: ".5em" }}
              src={logo}
              alt=""
            />
            <span class="border-left"></span>
            <span
              class="blue letter-spacing"
              style={{ marginTop: ".5em" }}>
              {user}
            </span>
          </h5>
        </Col>
        <Col
          sm={6}
          md={6}
          style={{ marginTop: "1em" }}>
          <h5 class="text-end">
            {name} <span class="grey h6">{role}</span>
            <span class="border-left"></span>
            <span
              onClick={() => {
                signOut(auth);
              }}
              class="blue"
              style={{ marginTop: ".5em" }}>
              Log Out
            </span>
          </h5>
        </Col>
      </Row>
    </Container>
  );
}
