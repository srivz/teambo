import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Dropdown from 'react-bootstrap/Dropdown';
import { onAuthStateChanged } from "firebase/auth";
import {
  onChildChanged,
  onValue,
  ref,
  remove,
  update,
} from "firebase/database";
import React, { useState } from "react";
import { Badge, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { auth, db } from "../../firebase-config";
import Loader from "../Loader/Loader";
import NavBar from "../Navs/NavBar";
import pause from '../../assets/images/pause.svg'
import paused from '../../assets/images/paused.svg'
import play from '../../assets/images/play.svg'
import played from '../../assets/images/played.svg'
import tick from '../../assets/images/tick.svg'


export default function Home() {
   var today = new Date();
  const [loading, setLoading] = useState(true);
  const [taskSelected, setTaskSelected] = useState();
  const [once, setOnce] = useState(true);
  const [once2, setOnce2] = useState(true);
  const [teammate, setTeammate] = useState({});
  const [id, setId] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            setLoading(false);
          } else {
            setLoading(false);
            console.log("No data available");
          }
        });
        setOnce(false);

      }
    } else {
      window.location.href = "/";
    }
  });

  const acceptChange = (managerId, managerTeam) => {
    if (managerTeam === undefined) {
      update(ref(db, `manager/${managerId}/`), { teammates: [id] });
      remove(ref(db, `teammate/${id}/requests/`));
      setLoading(false);
    } else {
      let newArr = [];
      let exists = false;
      managerTeam.forEach((element) => {
        if (element === id) {
          exists = true;
        }
        newArr.push(element);
      });
      if (exists) {
        alert("Already requested !");
        setLoading(false);
      } else {
        let newArr2 = [...newArr, id];
        update(ref(db, `manager/${managerId}/`), { teammates: newArr2 });
        remove(ref(db, `teammate/${id}/requests/`));
        setLoading(false);
      }
    }
  };
  const accept = (managerId) => {
    setLoading(true);
    if (once2) {
      onValue(ref(db, `manager/${managerId}`), (snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          acceptChange(managerId, data.teammates);
        } else {
          alert("No manager found");
          setLoading(false);
        }
      });
      setOnce2(false)
    }
    setLoading(false);
  };

  const reject = (index) => {
    remove(ref(db, `teammate/${id}/requests/${index}`));
  };

  onChildChanged(ref(db, `/teammate/${id}`), () => {
    window.location.reload();
  });

  const playTask = (e, index, length) => {
   var timeInMs=today.getTime();
   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    teammate.tasks.forEach((task,i)=>{
     if(i===index){
      update(ref(db, `teammate/${id}/tasks/${index}/updates/${length - 1}`), {
      status: "On Going",
      startTime:time,
      startTimeInMs:timeInMs,
    });
     }
     else if(task.updates[task.updates.length-1].status==='On Going'){
     update(ref(db, `teammate/${id}/tasks/${i}/updates/${task.updates.length - 1}`), {
     status: "Paused",
     });
     }
    })
  };

  function getHourFormatFromMilliSeconds(millisec) {
    var seconds = (millisec / 1000).toFixed(0);
    var minutes = Math.floor(Number(seconds) / 60).toString();
    let hours;
    if (Number(minutes) > 59) {
      hours = Math.floor(Number(minutes) / 60);
      hours = (hours >= 10) ? hours : "0" + hours;
      minutes = (Number(minutes) - (hours * 60)).toString();
      minutes = (Number(minutes) >= 10) ? minutes : "0" + minutes;
    }
    seconds = Math.floor(Number(seconds) % 60).toString();
    seconds = (Number(seconds) >= 10) ? seconds : "0" + seconds;
    if (!hours) {
      hours = "00";
    }
    if (!minutes) {
      minutes = "00";
    }
    if (!seconds) {
      seconds = "00";
    }
      return hours + ":" + minutes + ":" + seconds;
  }

  const pauseTask = (e, index, length) => {
    var timeInMs = today.getTime();
    var stTime =
      teammate.tasks[index].updates[teammate.tasks[index].updates.length - 1].startTimeInMs;
    var totTime=(timeInMs-stTime);
    if(teammate.tasks[index].updates[teammate.tasks[index].updates.length - 1].totalTimeInMs){
      totTime = totTime+teammate.tasks[index].updates[teammate.tasks[index].updates.length - 1].totalTimeInMs;
      console.log(totTime);
    }
    var timeGapInMs=totTime;
    var timeGap = getHourFormatFromMilliSeconds(totTime)
    update(ref(db, `teammate/${id}/tasks/${index}/updates/${length - 1}`), {
      status: "Paused",
      totalTime:timeGap,
      totalTimeInMs:timeGapInMs
    });

  };

  const completeTask = (e, index, length) => {
    update(ref(db, `teammate/${id}/tasks/${index}/updates/${length - 1}`), {
      status: "Done",
      totalTimeInMs: 0,
      startTime: null,
      startTimeInMs: null,
      endDate:
        String(today.getDate()).padStart(2, "0") +
        "/" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "/" +
        today.getFullYear(),
      endTime:
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
    });

  };

  const dateFormatChange = (date) => {
    if (date === "--") { return "--"; }
    let givenDate = date.split("/");
    let months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let dateMonth = months[parseInt(givenDate[1])];
    return dateMonth + "," + givenDate[0] + " " + givenDate[2];
  }
  const timeFormatChange = (time) => {
    if (time === "--") { return "--"; }
    let givenTime = time.split(":");
    if (parseInt(givenTime[0]) === 0) {
      return "12:" + givenTime[1] + " am";
    } else if (parseInt(givenTime[0]) > 12) {
      let hour = (parseInt(givenTime[0]) % 12) > 9 ? (parseInt(givenTime[0]) % 12) : "0" + String(parseInt(givenTime[0]) % 12);
      let minute = (parseInt(givenTime[1])) > 9 ? (parseInt(givenTime[1])) : "0" + String(givenTime[1]);

      return hour + ":" + minute + " pm";
    } else if (parseInt(givenTime[0]) < 13) {
      let hour = (parseInt(givenTime[0])) > 9 ? (parseInt(givenTime[0])) : "0" + String(givenTime[0]);
      let minute = (parseInt(givenTime[1])) > 9 ? (parseInt(givenTime[1])) : "0" + String(givenTime[1]);

      return hour + ":" + minute + " am";
    }
  }

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
            <Offcanvas
              show={show}
              onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Requests</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {!teammate.requests ? (
                  <Row
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.55) 0px 1px 3px",
                      margin: ".5em",
                      color: "black",
                      padding: "1em",
                      fontFamily: "rockwen",
                      border: "2px black",
                    }}
                    align="center">
                    No Requests Available
                  </Row>
                ) : (
                  teammate.requests.map((info, index) => {
                    return (
                      <>
                        <Row
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.55) 0px 1px 3px",
                            margin: ".5em",
                            color: "black",
                            padding: "1em",
                            fontFamily: "rockwen",
                            border: "2px black",
                          }}
                          key={index}>
                          <Col
                            md={8}
                            sm={8}>
                            {info.managerName}
                          </Col>
                          <Col
                            md={1}
                            sm={1}>
                            <Badge
                              as="button"
                              onClick={() => {
                                reject(index);
                              }}
                              style={{
                                padding: ".25em",
                                color: "black",
                                fontFamily: "rockwen",
                                fontWeight: "bold",
                                borderRadius: "25px",
                              }}
                              bg="light">
                              R
                            </Badge>
                          </Col>
                          <Col
                            md={1}
                            sm={1}>
                            <Badge
                              as="button"
                              onClick={() => {
                                accept(info.managerId);
                              }}
                              style={{
                                padding: ".25em",
                                color: "black",
                                fontFamily: "rockwen",
                                fontWeight: "bold",
                                borderRadius: "25px",
                              }}
                              bg="light">
                              A
                            </Badge>
                          </Col>
                        </Row>
                        <br />
                      </>
                    );
                  })
                )}
              </Offcanvas.Body>
            </Offcanvas>
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

                    <Col
                      sm="6"
                      md="6"
                        style={{ marginTop: "1em", display: "flex", justifyContent: "flex-end", alignItems: "center" }} className="text- end">
                        <Dropdown >
                          <Dropdown.Toggle
                            id="dropdown-basic"
                            className="client-dropdown"
                            style={{
                              width: "140px", marginRight: "20px", border: "1px solid #D8D8D8"
                            }}
                          >
                            All
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="w-100 client-dropdown-menu">
                            <Dropdown.Item>
                              All
                            </Dropdown.Item> <Dropdown.Item>
                              On Going
                            </Dropdown.Item> <Dropdown.Item>
                              Assigned
                            </Dropdown.Item> <Dropdown.Item>
                              Paused
                            </Dropdown.Item> <Dropdown.Item>
                              Completed
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      <Badge
                        as="button"
                        onClick={handleShow}
                        style={{
                          color: "black",
                          fontFamily: "rockwen",
                          fontWeight: "bold",
                          borderRadius: "25px",
                        }}
                        bg="light">

                        {!teammate.requests ? 0 : teammate.requests.length}
                      </Badge>

                      </Col>

                  </Row>
                  <Row className="curve-box-homelist">
                    <Col className="overflow-set-auto table-height2">
                      <Table
                        style={{
                            borderCollapse: "separate",
                            borderSpacing: "0 20px",
                        }}
                        className="table table-sm table-height2">
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
                                }}
                              >

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
                            teammate.tasks
                            .map((info, index) => {
                              return taskSelected !== index ? (
                                <>
                                  <TableRow
                                    style={{
                                      backgroundColor:
                                        info.updates[info.updates.length - 1]
                                          .status !== "Done"
                                          ? "#fff"
                                          : "#f1f4fb",
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
                                      align="center" className="tablecell">
                                      {info.client}
                                    </TableCell>
                                    <TableCell
                                      onClick={() => {
                                        setTaskSelected(index);
                                      }}
                                      style={{
                                        fontFamily: "rockwen",
                                      }}
                                      align="center" className="tablecell">
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
                                              align="center" className="tablecell">
                                              {
                                                dateFormatChange(info.updates[
                                                  info.updates.length - 1
                                                ].deadlineDate)
                                              }
                                            </TableCell>
                                            <TableCell
                                              onClick={() => {
                                                setTaskSelected(index);
                                              }}
                                              style={{
                                                fontFamily: "rockwen",
                                              }}
                                              align="center" className="tablecell">
                                              {
                                                timeFormatChange(info.updates[
                                                  info.updates.length - 1
                                                ].deadlineTime)
                                              }

                                            </TableCell>
                                            <TableCell
                                              onClick={() => {
                                                setTaskSelected(index);
                                              }}
                                              style={{
                                                fontFamily: "rockwen",
                                              }}
                                              align="center" className="tablecell">
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
                                              className="tablecell"
                                              style={
                                                info.updates[
                                                  info.updates.length - 1
                                                ].status === "Done" ? {
                                                  color: "#000000",
                                                  fontFamily: "rockwen",
                                                  fontWeight: "bold",
                                                } :
                                                  info.updates[
                                                  info.updates.length - 1
                                                  ].status === "On Going" ? {
                                                  color: "#24A43A",
                                                  fontFamily: "rockwen",
                                                  fontWeight: "bold",
                                                  } :
                                                    info.updates[
                                                  info.updates.length - 1
                                                    ].status === "Paused" ? {
                                                  color: "#2972B2",
                                                  fontFamily: "rockwen",
                                                  fontWeight: "bold",
                                                    } :
                                                      {
                                                  color: "#D1AE00",
                                                  fontFamily: "rockwen",
                                                  fontWeight: "bold",
                                                      }
                                              }>
                                              {info.updates[
                                                info.updates.length - 1
                                              ].status === "Done" ? (
                                                <FontAwesomeIcon
                                                  icon="fa-solid fa-circle-check"
                                                  size="2xl"
                                                  style={{
                                                    color: "blue",
                                                    margin: ".5em",
                                                  }}
                                                />
                                              ) : (
                                                info.updates[
                                                  info.updates.length - 1
                                                ].status
                                              )}
                                            </TableCell>
                                            <TableCell
                                              onClick={() => {
                                                setTaskSelected(index);
                                              }}
                                              className="tablecell"
                                              align="center">
                                              <img
                                                src={
                                                  info.updates[
                                                    info.updates.length - 1
                                                  ].status === "On Going"
                                                    ? paused
                                                    : pause
                                                }
                                                alt="play"
                                                width={30}
                                                onClick={(e) => {
                                                  playTask(
                                                    e,
                                                    index,
                                                    info.updates.length
                                                  );
                                                }}
                                                style={{
                                                  display:
                                                    info.updates[
                                                      info.updates.length - 1
                                                    ].status === "Done"
                                                      ? "none"
                                                      : "",
                                                  margin: ".5em",
                                                  cursor: "pointer",
                                                }}
                                              />
                                              <img
                                                src={
                                                  info.updates[
                                                    info.updates.length - 1
                                                  ].status === "Paused"
                                                    ? played
                                                    : play
                                                }
                                                alt="pause"
                                                width={30}
                                                onClick={(e) => {
                                                  pauseTask(
                                                    e,
                                                    index,
                                                    info.updates.length
                                                  );
                                                }}
                                                style={{
                                                  display:
                                                    info.updates[
                                                      info.updates.length - 1
                                                    ].status === "Done"
                                                      ? "none"
                                                      : "",
                                                  margin: ".5em",
                                                  cursor: "pointer",
                                                }}
                                              />
                                              <img
                                                src={tick}
                                                alt="done"
                                                width={30}
                                                onClick={(e) => {
                                                  completeTask(
                                                    e,
                                                    index,
                                                    info.updates.length
                                                  );
                                                }}
                                                style={{
                                                  display:
                                                    info.updates[
                                                      info.updates.length - 1
                                                    ].status === "Done"
                                                      ? "none"
                                                      : "",
                                                  margin: ".5em",
                                                  cursor: "pointer",
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
                                        : "#f1f4fb",
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
                                      width: "150px",
                                      fontFamily: "rockwen",
                                    }}
                                    onClick={() => {
                                      setTaskSelected(null);
                                    }}
                                    align="center">
                                    {info.task}
                                    <br />
                                    <br />
                                    <p
                                        style={{
                                        fontSize: "smaller",
                                      }}>
                                        {info.updates[
                                          info.updates.length - 1
                                        ].description}
                                    </p>
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
                                            {dateFormatChange(info2.deadlineDate)}
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
                                            {timeFormatChange(info2.deadlineTime)}
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
                                              info.updates[
                                                info.updates.length - 1
                                              ].status === "Done" ? {
                                                color: "#000000",
                                                  fontFamily: "rockwen",
                                                fontWeight: "bold",
                                              } :
                                                info.updates[
                                                  info.updates.length - 1
                                                ].status === "On Going" ? {
                                                  color: "#24A43A",
                                                    fontFamily: "rockwen",
                                                    fontWeight: "bold",
                                                } :
                                                  info.updates[
                                                    info.updates.length - 1
                                                  ].status === "Paused" ? {
                                                    color: "#2972B2",
                                                      fontFamily: "rockwen",
                                                      fontWeight: "bold",
                                                  } :
                                                    {
                                                      color: "#D1AE00",
                                                      fontFamily: "rockwen",
                                                      fontWeight: "bold",
                                                    }
                                            }>
                                            {info2.status}
                                            <br />
                                          </p>
                                        );
                                      })}
                                  </TableCell>
                                  <TableCell
                                    onClick={() => {
                                      setTaskSelected(null);
                                    }}
                                    align="center">
                                    <img
                                      src={
                                        info.updates[0].status === "On Going"
                                          ? paused
                                          : pause
                                      }
                                      alt="play"
                                      width={30}
                                      onClick={(e) => {
                                        playTask(e, index, info.updates.length);
                                      }}
                                      style={{
                                        display:
                                          info.updates[0].status === "Done"
                                            ? "none"
                                            : "",
                                        margin: ".5em",
                                        cursor: "pointer",
                                      }}
                                    />
                                    <img
                                      src={
                                        info.updates[0].status === "Paused"
                                          ? played
                                          : play
                                      }
                                      alt="pause"
                                      width={30}
                                      onClick={(e) => {
                                        pauseTask(
                                          e,
                                          index,
                                          info.updates.length
                                        );
                                      }}
                                      style={{
                                        display:
                                          info.updates[0].status === "Done"
                                            ? "none"
                                            : "",
                                        margin: ".5em",
                                        cursor: "pointer",
                                      }}
                                    />
                                    <img
                                      src={tick}
                                      alt="done"
                                      width={30}
                                      onClick={(e) => {
                                        completeTask(
                                          e,
                                          index,
                                          info.updates.length
                                        );
                                      }}
                                      style={{
                                        display:
                                          info.updates[0].status === "Done"
                                            ? "none"
                                            : "",
                                        margin: ".5em",
                                        cursor: "pointer",
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
