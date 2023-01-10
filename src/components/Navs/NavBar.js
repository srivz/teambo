import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/images/Group 3.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBar({ user, user2, name, role }) {
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
            <a style={user !== 'MANAGER' ? {
              display: "none",
            } : user2 === "ANALYTICS" ? { backgroundColor: "#3975ea", color: "white" } : {}} href={user2 === "ANALYTICS" ? "/manager/home/list" : "/manager/analytics"} >
              <span style={{
                marginLeft: "1.5em",
                border: "2px black"
              }}>
                <Button
                  variant="light"
                  style={{ border: "2px solid #ebebeb", backgroundColor: "white", borderRadius: "15px" }}
                >
                  <FontAwesomeIcon icon="fa-solid fa-chart-line" />
                </Button></span></a>
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
