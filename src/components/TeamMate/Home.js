import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { auth, db } from "../../firebase-config";
import NavBar from "../Navs/NavBar";

export default function Home() {
  let done = 0;
  const [once, setOnce] = useState(true);
  const [teammate, setTeammate] = useState({});

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (once) {
        onValue(ref(db, `teammate/${user.uid}`), (snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            setTeammate(snapshot.val());
          } else {
            console.log("No data available");
          }
        });
        setOnce(false);
      }
    } else {
      window.location.href = "/";
    }
  });

  return (
    <div id="main">
      <NavBar
        user="TEAMMATE"
        name={teammate.name}
        role={teammate.designation}
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
                  <h5 className="blue">{teammate.name}</h5>
                  <h6>{teammate.designation}</h6>
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
                      {/* {teammate.tasks 
                        // .filter((info) => id !== 0)
                        // .sort((a, b) => (a.dateJoined > b.dateJoined ? -1 : 1))
                        // .map((info, id) => {
                      //   return (*/}
                      <TableRow
                        // key={id}
                        style={{
                          backgroundColor: done === 0 ? "#fff" : "#f9fbff",
                          height: "70px",
                        }}
                        className="box-shadow">
                        <TableCell align="center">
                          {/* {info.client} */}ctrf
                        </TableCell>
                        <TableCell align="center">
                          add title
                          {/* {info.task} */}
                        </TableCell>
                        {/* {info.updates 
                                // .filter((info) => id !== 0)
                                // .sort((a, b) => (a.dateJoined > b.dateJoined ? -1 : 1))
                                // .map((info1, id1) => {
                                //   return (*/}
                        <span
                        // key={id1}
                        >
                          <TableCell align="center">
                            12/12/12
                            {/* {info1.date} */}
                          </TableCell>
                          <TableCell align="center">
                            45:23:45
                            {/* {info1.time} */}
                          </TableCell>
                          <TableCell align="center">
                            +7
                            {/* +{info1.corrections} */}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              color: "#24a43a",
                              fontWeight: "bold",
                            }}>
                            {/* {info1.status} */}Done
                          </TableCell>
                        </span>
                        {/* ); })} */}
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
                      {/* );})} */}
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
