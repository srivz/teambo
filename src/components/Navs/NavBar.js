import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/images/Group 3.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Attendance from "../Manager/Attendance";

export default function NavBar({ user, user2, name, role }) {
  const [modalShow, setModalShow] = useState(false);
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
            <a
              style={user !== 'MANAGER' ? { display: "none", } : {}}
              href={user2 === "ANALYTICS" ? "/manager/home/list" : "/manager/analytics"} >
              <span style={{
                marginLeft: "1.5em",
                border: "2px black"
              }}>
                <Button
                  variant="light"
                  style={user2 === "ANALYTICS" ? { border: "2px solid #ebebeb", backgroundColor: "#3975ea", color: "white", borderRadius: "15px" } : { border: "2px solid #ebebeb", backgroundColor: "white", borderRadius: "15px" }}
                >
                  <FontAwesomeIcon icon="fa-solid fa-chart-line" />
                </Button>
              </span>
            </a>
            <span style={user !== 'MANAGER' ? {
              display: "none",
              marginLeft: "1.5em",
              border: "2px black"
            } : {
              marginLeft: "1.5em",
              border: "2px black"
            }}>
              <Button onClick={() => setModalShow(true)}
                variant="light"
                style={{ border: "2px solid #ebebeb", backgroundColor: "white", color: "#3975ea", borderRadius: "15px" }}
              >
                <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
              </Button>
              <Attendance
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
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
