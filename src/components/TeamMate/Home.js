import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref, update } from "firebase/database";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { auth, db } from "../../firebase-config";
import Loader from "../Loader/Loader";
import NavBar from "../Navs/NavBar";

export default function Home() {
  const [once, setOnce] = useState(true);
  const [teammate, setTeammate] = useState({});
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      let id = user.email.split(".");
      let newId = id.join("_");
      if (once) {
        setLoading(true)
        onValue(ref(db, `teammate/${newId}`), (snapshot) => {
          if (snapshot.exists()) {
            setTeammate(snapshot.val());
            setId(newId);
            setLoading(false)
          } else {
            setLoading(false)
            console.log("No data available");
          }
        });
        setOnce(false);
      }
    } else {
      setLoading(false);
      window.location.href = "/";
    }
  });

  const playTask = (e, index, length) => {
    update(ref(db, `teammate/${id}/tasks/${index}/updates/${length - 1}`), {
      status: "On Going",
    });
  };
  const pauseTask = (e, index, length) => {
    update(ref(db, `teammate/${id}/tasks/${index}/updates/${length - 1}`), {
      status: "Paused",
    });
  };
  const completeTask = (e, index, length) => {
    update(ref(db, `teammate/${id}/tasks/${index}/updates/${length - 1}`), {
      status: "Done",
    });
  };

  return (
    <>
    {
        loading ? <Loader /> : <div id="main">
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

                          {!teammate.tasks ? (
                            <TableRow
                              colSpan={7}
                              align="center">
                              No tasks right now
                            </TableRow>
                          ) : (
                            teammate.tasks.map((info, index) => {

                              return (
                                <>
                                  <TableRow
                                    style={{
                                      backgroundColor:
                                        info.updates[info.updates.length - 1]
                                          .status !== "Done"
                                          ? "#fff"
                                          : "#f9fbff",
                                      height: "70px",
                                    }}
                                    className="box-shadow"
                                    key={index}>
                                    <TableCell align="center">
                                      {info.client}
                                    </TableCell>
                                    <TableCell align="center">
                                      {info.task}
                                    </TableCell>
                                    {info?.updates ? (
                                      <>
                                        <TableCell align="center">
                                          {
                                            info.updates[info.updates.length - 1]
                                              .date
                                          }
                                        </TableCell>
                                        <TableCell align="center">
                                          {
                                            info.updates[info.updates.length - 1]
                                              .time
                                          }
                                        </TableCell>
                                        <TableCell align="center">
                                          +
                                          {
                                            info.updates[info.updates.length - 1]
                                              .corrections
                                          }
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          style={
                                            (info.updates[info.updates.length - 1]
                                              .status === "Done" && {
                                              color: "#000000",
                                              fontWeight: "bold",
                                            }) ||
                                            (info.updates[info.updates.length - 1]
                                              .status === "On Going" && {
                                              color: "#24A43A",
                                              fontWeight: "bold",
                                            }) ||
                                            (info.updates[info.updates.length - 1]
                                              .status === "Paused" && {
                                              color: "#2972B2",
                                              fontWeight: "bold",
                                            }) ||
                                            (info.updates[info.updates.length - 1]
                                              .status === "Assigned" && {
                                              color: "#D1AE00",
                                              fontWeight: "bold",
                                            })
                                          }>
                                          {
                                            info.updates[info.updates.length - 1]
                                              .status
                                          }
                                        </TableCell>
                                        <TableCell align="center">
                                          <FontAwesomeIcon
                                            icon="fa-solid fa-circle-play"
                                            size="lg"
                                            style={{
                                              pointerEvents:
                                                info.updates[
                                                  info.updates.length - 1
                                                ].status === "Done"
                                                  ? "none"
                                                  : "",
                                              margin: ".5em",
                                              cursor: "pointer",
                                            }}
                                            color="green"
                                            onClick={(e) => {
                                              playTask(
                                                e,
                                                index,
                                                info.updates?.length
                                              );
                                            }}
                                          />
                                          <FontAwesomeIcon
                                            icon="fa-solid fa-circle-pause"
                                            size="lg"
                                            style={{
                                              pointerEvents:
                                                info.updates[
                                                  info.updates.length - 1
                                                ].status === "Done"
                                                  ? "none"
                                                  : "",
                                              margin: ".5em",
                                              cursor: "pointer",
                                            }}
                                            onClick={(e) => {
                                              pauseTask(
                                                e,
                                                index,
                                                info.updates?.length
                                              );
                                            }}
                                          />
                                          <FontAwesomeIcon
                                            icon="fa-solid fa-circle-check"
                                            size="lg"
                                            style={{
                                              margin: ".5em",
                                              cursor: "pointer",
                                            }}
                                            onClick={(e) => {
                                              completeTask(
                                                e,
                                                index,
                                                info.updates?.length
                                              );
                                            }}
                                          />
                                        </TableCell>
                                      </>
                                    ) : (
                                      <>
                                        <TableCell align="center">
                                          Not Available
                                        </TableCell>
                                        <TableCell align="center">
                                          Not Available
                                        </TableCell>
                                        <TableCell align="center">
                                          Not Available
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          style={{
                                            color: "#24a43a",
                                            fontWeight: "bold",
                                          }}>
                                          Not Available
                                        </TableCell>
                                      </>
                                    )}
                                  </TableRow>
                                </>
                              );
                            })
                          )}
                        </TableBody>
                      </Table>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Container>
        </div>
    }
    </>
    
  );
}
