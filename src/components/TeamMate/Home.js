import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { onChildChanged, onValue, ref, update } from "firebase/database";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { auth, db } from "../../firebase-config";
import Loader from "../Loader/Loader";
import NavBar from "../Navs/NavBar";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [taskSelected, setTaskSelected] = useState();
  const [once, setOnce] = useState(true);
  const [teammate, setTeammate] = useState({});
  const [id, setId] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (once) {
        setLoading(true);
        let id = user.email.split(".");
        let newId = id.join("_");
        onValue(ref(db, `teammate/${newId}`), (snapshot) => {
          if (snapshot.exists()) {
            setTeammate(snapshot.val());
            setId(newId);
          } else {
            setLoading(false);
            console.log("No data available");
          }
        });
        setOnce(false);
        setLoading(false);
      }
    } else {
      setLoading(true);
      window.location.href = "/";
    }
  });


  onChildChanged(ref(db, `/teammate/`), () => {
    setLoading(true);
    window.location.reload();
  });
  const playTask = (e, index, length) => {
    setLoading(true);
    update(ref(db, `teammate/${id}/tasks/${index}/updates/${length - 1}`), {
      status: "On Going",
    });
  };
  const pauseTask = (e, index, length) => {
    setLoading(true);
    update(ref(db, `teammate/${id}/tasks/${index}/updates/${length - 1}`), {
      status: "Paused",
    });
  };
  const completeTask = (e, index, length) => {
    setLoading(true);
    update(ref(db, `teammate/${id}/tasks/${index}/updates/${length - 1}`), {
      status: "Done",
    });
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                              height: "70px",
                            }}>
                            <TableCell
                              align="center"
                              style={{
                                fontFamily: "rockwen",
                                fontWeight: "bold",
                              }}>
                              Client
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontFamily: "rockwen",
                                fontWeight: "bold",
                              }}>
                              Task
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontFamily: "rockwen",
                                fontWeight: "bold",
                              }}>
                              Date
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontFamily: "rockwen",
                                fontWeight: "bold",
                              }}>
                              Time
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontFamily: "rockwen",
                                fontWeight: "bold",
                              }}>
                              Corrections
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontFamily: "rockwen",
                                fontWeight: "bold",
                              }}>
                              Status
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontFamily: "rockwen",
                                fontWeight: "bold",
                              }}>
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
                              return taskSelected !== index ? (
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
                                    <TableCell
                                      onClick={() => {
                                        setTaskSelected(index);
                                      }}
                                      style={{
                                        fontFamily: "rockwen",
                                      }}
                                      align="center">
                                      {info.client}
                                    </TableCell>
                                    <TableCell
                                      onClick={() => {
                                        setTaskSelected(index);
                                      }}
                                      style={{
                                        fontFamily: "rockwen",
                                      }}
                                      align="center">
                                      {info.task}
                                    </TableCell>
                                    {info.updates
                                      .sort((a, b) =>
                                        a.corrections > b.corrections ? 1 : -1
                                      )
                                      .filter((info2, index) => index === 0)
                                      .map((info2) => {
                                        return (
                                          <>
                                            <TableCell
                                              onClick={() => {
                                                setTaskSelected(index);
                                              }}
                                              style={{
                                                fontFamily: "rockwen",
                                              }}
                                              align="center">
                                              {
                                                info.updates[
                                                  info.updates.length - 1
                                                ].date
                                              }
                                            </TableCell>
                                            <TableCell
                                              onClick={() => {
                                                setTaskSelected(index);
                                              }}
                                              style={{
                                                fontFamily: "rockwen",
                                              }}
                                              align="center">
                                              {
                                                info.updates[
                                                  info.updates.length - 1
                                                ].time
                                              }
                                            </TableCell>
                                            <TableCell
                                              onClick={() => {
                                                setTaskSelected(index);
                                              }}
                                              style={{
                                                fontFamily: "rockwen",
                                              }}
                                              align="center">
                                              +
                                              {
                                                info.updates[
                                                  info.updates.length - 1
                                                ].corrections
                                              }
                                            </TableCell>
                                            <TableCell
                                              onClick={() => {
                                                setTaskSelected(index);
                                              }}
                                              align="center"
                                              style={
                                                (info.updates[
                                                  info.updates.length - 1
                                                ].status === "Done" && {
                                                  color: "#000000",
                                                  fontFamily: "rockwen",
                                                  fontWeight: "bold",
                                                }) ||
                                                (info.updates[
                                                  info.updates.length - 1
                                                ].status === "On Going" && {
                                                  color: "#24A43A",
                                                  fontFamily: "rockwen",
                                                  fontWeight: "bold",
                                                }) ||
                                                (info.updates[
                                                  info.updates.length - 1
                                                ].status === "Paused" && {
                                                  color: "#2972B2",
                                                  fontFamily: "rockwen",
                                                  fontWeight: "bold",
                                                }) ||
                                                (info.updates[
                                                  info.updates.length - 1
                                                ].status === "Assigned" && {
                                                  color: "#D1AE00",
                                                  fontFamily: "rockwen",
                                                  fontWeight: "bold",
                                                })
                                              }>
                                              {
                                                info.updates[
                                                  info.updates.length - 1
                                                ].status
                                              }
                                            </TableCell>
                                            <TableCell align="center">
                                              <FontAwesomeIcon
                                                icon="fa-solid fa-circle-play"
                                                size="lg"
                                                style={{
                                                  display:
                                                    info.updates[0].status ===
                                                    "Done"
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
                                                    info.updates.length
                                                  );
                                                }}
                                              />
                                              <FontAwesomeIcon
                                                icon="fa-solid fa-circle-pause"
                                                size="lg"
                                                style={{
                                                  display:
                                                    info.updates[0].status ===
                                                    "Done"
                                                      ? "none"
                                                      : "",
                                                  margin: ".5em",
                                                  cursor: "pointer",
                                                }}
                                                onClick={(e) => {
                                                  pauseTask(
                                                    e,
                                                    index,
                                                    info.updates.length
                                                  );
                                                }}
                                              />
                                              <FontAwesomeIcon
                                                icon="fa-solid fa-circle-check"
                                                size="lg"
                                                style={{
                                                  display:
                                                    info.updates[0].status ===
                                                    "Done"
                                                      ? "none"
                                                      : "",
                                                  margin: ".5em",
                                                  cursor: "pointer",
                                                }}
                                                onClick={(e) => {
                                                  completeTask(
                                                    e,
                                                    index,
                                                    info.updates.length
                                                  );
                                                }}
                                              />
                                            </TableCell>
                                          </>
                                        );
                                      })}
                                  </TableRow>
                                </>
                              ) : (
                                <TableRow
                                  key={index}
                                  style={{
                                    backgroundColor:
                                      info.updates[info.updates.length - 1]
                                        .status !== "Done"
                                        ? "#fff"
                                        : "#f9fbff",
                                  }}
                                  className="box-shadow">
                                  <TableCell
                                    style={{
                                      fontFamily: "rockwen",
                                    }}
                                    onClick={() => {
                                      setTaskSelected(null);
                                    }}
                                    align="center">
                                    {info.client}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontFamily: "rockwen",
                                    }}
                                    onClick={() => {
                                      setTaskSelected(null);
                                    }}
                                    align="center">
                                    {info.task}
                                    <br />
                                    <br />
                                    <p>{info.description}</p>
                                  </TableCell>
                                  <TableCell
                                    onClick={() => {
                                      setTaskSelected(null);
                                    }}
                                    style={{
                                      fontFamily: "rockwen",
                                    }}
                                    align="center">
                                    {info.updates
                                      .sort((a, b) =>
                                        a.corrections > b.corrections ? -1 : 1
                                      )
                                      .map((info2) => {
                                        return (
                                          <p>
                                            {info2.date}
                                            <br />
                                          </p>
                                        );
                                      })}
                                  </TableCell>
                                  <TableCell
                                    onClick={() => {
                                      setTaskSelected(null);
                                    }}
                                    style={{
                                      fontFamily: "rockwen",
                                    }}
                                    align="center">
                                    {info.updates
                                      .sort((a, b) =>
                                        a.corrections > b.corrections ? -1 : 1
                                      )
                                      .map((info2) => {
                                        return (
                                          <p>
                                            {info2.time}
                                            <br />
                                          </p>
                                        );
                                      })}
                                  </TableCell>
                                  <TableCell
                                    onClick={() => {
                                      setTaskSelected(null);
                                    }}
                                    style={{
                                      fontFamily: "rockwen",
                                    }}
                                    align="center">
                                    {info.updates
                                      .sort((a, b) =>
                                        a.corrections > b.corrections ? -1 : 1
                                      )
                                      .map((info2) => {
                                        return (
                                          <p>
                                            {info2.corrections === "0"
                                              ? info2.corrections
                                              : "+" + info2.corrections}
                                            <br />
                                          </p>
                                        );
                                      })}
                                  </TableCell>
                                  <TableCell
                                    onClick={() => {
                                      setTaskSelected(null);
                                    }}
                                    style={{
                                      fontFamily: "rockwen",
                                    }}
                                    align="center">
                                    {info.updates
                                      .sort((a, b) =>
                                        a.corrections > b.corrections ? -1 : 1
                                      )
                                      .map((info2) => {
                                        return (
                                          <p
                                            style={
                                              (info2.status === "Done" && {
                                                color: "#000000",
                                                fontWeight: "bold",
                                              }) ||
                                              (info2.status === "On Going" && {
                                                color: "#24A43A",
                                                fontWeight: "bold",
                                              }) ||
                                              (info2.status === "Paused" && {
                                                color: "#2972B2",
                                                fontWeight: "bold",
                                              }) ||
                                              (info2.status === "Assigned" && {
                                                color: "#D1AE00",
                                                fontWeight: "bold",
                                              })
                                            }>
                                            {info2.status}
                                            <br />
                                          </p>
                                        );
                                      })}
                                  </TableCell>
                                  <TableCell align="center">
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-circle-play"
                                      size="lg"
                                      style={{
                                        display:
                                          info.updates[0].status === "Done"
                                            ? "none"
                                            : "",
                                        margin: ".5em",
                                        cursor: "pointer",
                                      }}
                                      color="green"
                                      onClick={(e) => {
                                        playTask(e, index, info.updates.length);
                                      }}
                                    />
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-circle-pause"
                                      size="lg"
                                      style={{
                                        display:
                                          info.updates[0].status === "Done"
                                            ? "none"
                                            : "",
                                        margin: ".5em",
                                        cursor: "pointer",
                                      }}
                                      onClick={(e) => {
                                        pauseTask(
                                          e,
                                          index,
                                          info.updates.length
                                        );
                                      }}
                                    />
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-circle-check"
                                      size="lg"
                                      style={{
                                        display:
                                          info.updates[0].status === "Done"
                                            ? "none"
                                            : "",
                                        margin: ".5em",
                                        cursor: "pointer",
                                      }}
                                      onClick={(e) => {
                                        completeTask(
                                          e,
                                          index,
                                          info.updates.length
                                        );
                                      }}
                                    />
                                  </TableCell>{" "}
                                </TableRow>
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
      )}
    </>
  );
}
