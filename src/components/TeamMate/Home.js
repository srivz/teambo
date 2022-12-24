import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { auth } from "../../firebase-config";
import NavBar from "../Navs/NavBar";

export default function Home() {
  let done = 0;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // localStorage.setItem("currentUserDetails", JSON.stringify({ user }));
    } else {
      window.location.href = "/";
    }
  });

  return (
    <div id="main">
      <NavBar
        user="TEAMMATE"
        name="Feri Abishek"
        role="Video Editor / Graphic Designer"
      />
      <Container>
        <Container>
          <Row>
            <Col style={{ marginTop: "1em" }}>
              <Row>
                <Col
                  sm="6"
                  md="6"
                  style={{ marginTop: "1em" }}>
                  <h5 className="blue">Feri Abishek</h5>
                  <h6>Video Editor / Graphic Designer</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table
                    style={{
                      borderCollapse: "separate",
                      borderSpacing: "0 20px",
                    }}
                    className="table table-sm">
                    <TableHead>
                      <TableRow
                        style={{
                          backgroundColor: done === 0 ? "#fff" : "#f9fbff",
                          height: "70px",
                        }}>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}>
                          Client
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}>
                          Task
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}>
                          Date
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}>
                          Time
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}>
                          Corrections
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}>
                          Status
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        style={{
                          backgroundColor: done === 0 ? "#fff" : "#f9fbff",
                          height: "70px",
                        }}
                        className="box-shadow">
                        <TableCell align="center">Chaicup</TableCell>
                        <TableCell align="center">Website UI</TableCell>
                        <TableCell align="center">Jan,21 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">+6</TableCell>
                        <TableCell
                          align="center"
                          style={{ color: "#24a43a", fontWeight: "bold" }}>
                          On Going
                        </TableCell>
                        <TableCell align="center">
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-play"
                            size="lg"
                            style={{ margin: ".5em" }}
                            color="green"
                          />
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-pause"
                            size="lg"
                            style={{ margin: ".5em" }}
                          />
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-check"
                            size="lg"
                            style={{ margin: ".5em" }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        style={{
                          backgroundColor: done === 0 ? "#fff" : "#f9fbff",
                          height: "70px",
                        }}
                        className="box-shadow">
                        <TableCell align="center">Teabon</TableCell>
                        <TableCell align="center">Menu</TableCell>
                        <TableCell align="center">Jan,19 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">0</TableCell>
                        <TableCell
                          align="center"
                          style={{ color: "#d1ae00", fontWeight: "bold" }}>
                          Assigned
                        </TableCell>
                        <TableCell align="center">
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-play"
                            size="lg"
                            style={{ margin: ".5em" }}
                            color="green"
                          />
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-pause"
                            size="lg"
                            style={{ margin: ".5em" }}
                          />
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-check"
                            size="lg"
                            style={{ margin: ".5em" }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        style={{
                          backgroundColor: done === 0 ? "#fff" : "#f9fbff",
                          height: "70px",
                        }}
                        className="box-shadow">
                        <TableCell align="center">TVS</TableCell>
                        <TableCell align="center">Instagram ad Video</TableCell>
                        <TableCell align="center">Jan,18 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">+2</TableCell>
                        <TableCell
                          align="center"
                          style={{ color: "#3975ea", fontWeight: "bold" }}>
                          Paused
                        </TableCell>
                        <TableCell align="center">
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-play"
                            size="lg"
                            style={{ margin: ".5em" }}
                            color="green"
                          />
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-pause"
                            size="lg"
                            style={{ margin: ".5em" }}
                          />
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-check"
                            size="lg"
                            style={{ margin: ".5em" }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow
                        style={{
                          backgroundColor: done === 0 ? "#fff" : "#f9fbff",
                          height: "70px",
                        }}
                        className="box-shadow">
                        <TableCell align="center">TVS</TableCell>
                        <TableCell align="center">banner design</TableCell>
                        <TableCell align="center">Jan,15 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">+2</TableCell>
                        <TableCell
                          style={{ fontWeight: "bold" }}
                          align="center">
                          Done
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                      <TableRow
                        style={{
                          backgroundColor: done === 0 ? "#fff" : "#f9fbff",
                          height: "70px",
                        }}
                        className="box-shadow">
                        <TableCell align="center">TVS</TableCell>
                        <TableCell align="center">banner design</TableCell>
                        <TableCell align="center">Jan,15 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">+2</TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}>
                          Done
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                      <TableRow
                        style={{
                          backgroundColor: done === 0 ? "#fff" : "#f9fbff",
                          height: "70px",
                        }}
                        className="box-shadow">
                        <TableCell align="center">TVS</TableCell>
                        <TableCell align="center">banner design</TableCell>
                        <TableCell align="center">Jan,15 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">+2</TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}>
                          Done
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                      <TableRow
                        style={{
                          backgroundColor: done === 0 ? "#fff" : "#f9fbff",
                          height: "70px",
                        }}
                        className="box-shadow">
                        <TableCell align="center">TVS</TableCell>
                        <TableCell align="center">banner design</TableCell>
                        <TableCell align="center">Jan,15 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">+2</TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}>
                          Done
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                      <TableRow
                        style={{
                          backgroundColor: done === 0 ? "#fff" : "#f9fbff",
                          height: "70px",
                        }}
                        className="box-shadow">
                        <TableCell align="center">TVS</TableCell>
                        <TableCell align="center">banner design</TableCell>
                        <TableCell align="center">Jan,15 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">+2</TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}>
                          Done
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
