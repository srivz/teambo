import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";

export default function HomeList(props) {
  var today = new Date();
  const [selected, setSelected] = useState(null);
  const [newTask, setNewTask] = useState({
    client: "",
    task: "",
    priority: "",
    tasknumber: "",
    description: "",
    updates: {
      0: {
        date:
          String(today.getDate()).padStart(2, "0") +
          "/" +
          String(today.getMonth() + 1).padStart(2, "0") +
          "/" +
          today.getFullYear(),
        time:
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds(),
        corrections: "0",
        status: "Assigned",
      },
    },
  });
  function handleViewChange() {
    props.onChange(false);
  }
  const handleChange = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setNewTask({ ...newTask, ...newInput });
  };
  const handleNewTask = async (id, tasknumber) => {
    newTask.priority = tasknumber;
    newTask.tasknumber = tasknumber;
    await props.addTask(newTask, id, tasknumber);
    await window.location.reload();
  };
  const handleDeleteTask = (id, index) => {
    props.deleteTask(id, index);
  };

  //For the correct updates we need to have a separate list with priority:index separately
  // For up temp=priority[i+1] priority[i+1]:priority[i] priority[i]:temp
  // For down temp=priority[i-1] priority[i-1]:priority[i] priority[i]:temp
  // OR
  // For up we can retrive data of next index and put it in current && get values from the table put it in next index.
  // For down we can retrive data of previous index and put it in current && get values from the table put it in previous index.
  // Main issue if index==0 then index-1=-1. a new dataset is created in -1 and affecting map function.
  const handleUpTask = (ida, priority, tasknumber, total) => {
    if (priority + 1 !== total && tasknumber + 1 !== total) {
      // props.UpTask(ida, priority, tasknumber);
      console.log("increase priority");
    } else {
      alert("It has the highest proiority");
    }
  };
  const handleDownTask = (ida, priority, tasknumber) => {
    if (priority !== 0 && tasknumber > 0) {
      // props.DownTask(ida, priority, tasknumber);
      console.log("decrease priority");
    } else {
      alert("It has the least proiority");
    }
  };
  return (
    <div id="main">
      <Container>
        <Row>
          <Col
            sm={3}
            md={3}
            style={{ marginTop: "1em" }}>
            <div className="task-box">
              <h4 className="blue">Teammate Tasks</h4>
              <input
                className="rounded-2 w-100"
                style={{
                  marginTop: "1em",
                  padding: ".25em",
                  borderRadius: "25px",
                  border: "2px solid #e8e7e7",
                  paddingLeft: "20px",
                }}
                type="search"
                name="search"
                id="search"
                placeholder="Search"
              />
              <Table
                style={{
                  borderCollapse: "separate",
                  borderSpacing: "0 20px",
                }}>
                <TableHead>
                  <TableRow>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!props.team ? (
                    <TableRow
                      colSpan={7}
                      align="center">
                      No teammate right now
                    </TableRow>
                  ) : (
                    props.team.map((info) => {
                      return (
                        <TableRow
                          key={info.teammate}
                          className="box-shadow"
                          onClick={() => setSelected(info.teammate)}>
                          <TableCell
                            style={{
                              backgroundColor:
                                selected === info.teammate
                                  ? "#e2ecff"
                                  : "#f9fbff",
                              height: "fit-content",
                              borderRadius: "5px",
                              paddingTop: ".5em",
                              paddingBottom: "0em",
                            }}>
                            <h5>{info.data.name}</h5>
                            <p className="grey">{info.data.designation}</p>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </Col>
          <Col
            sm={9}
            md={9}
            style={{ marginTop: "1em" }}>
            {!selected ? (
              <Row
                colSpan={7}
                align="center">
                Select a teammate
              </Row>
            ) : (
              props.team
                .filter((info) => info.teammate === selected)
                .map((info) => {
                  return selected ? (
                    <Row>
                      <Col
                        sm={6}
                        md={6}
                        style={{ marginTop: "1em" }}>
                        <h5 className="blue">{info.data.name}</h5>
                        <h6>{info.data.designation}</h6>
                      </Col>
                      <Col
                        sm={6}
                        md={6}
                        style={{ marginTop: "1em" }}
                        className="text-end">
                        <div>
                          <FontAwesomeIcon
                            icon="fa-solid fa-list"
                            color="#5f8fee"
                            style={{ paddingRight: "1em" }}
                          />

                          <FontAwesomeIcon
                            onClick={() => {
                              handleViewChange();
                            }}
                            icon="fa-solid fa-grip "
                            style={{ paddingRight: "1em" }}
                          />
                          <OverlayTrigger
                            trigger="click"
                            key="bottom"
                            placement="bottom"
                            rootClose
                            overlay={
                              <div
                                className="bg-white"
                                style={{
                                  padding: "1em",
                                  marginTop: "10px",
                                  marginLeft: "-50px",
                                  width: "400px",
                                  boxShadow: "rgba(0, 0, 0, 0.15) 1px 3px 5px",
                                }}>
                                <h5 className="blue">{info.data.name}</h5>
                                <h6>{info.data.designation}</h6>
                                <Form.Group
                                  as={Row}
                                  className="mb-3"
                                  controlId="formPlaintext1">
                                  <Form.Label
                                    column
                                    sm="4"
                                    md="4">
                                    Client
                                  </Form.Label>
                                  <Col sm="7">
                                    <Form.Control
                                      type="text"
                                      name="client"
                                      onChange={handleChange}
                                    />
                                  </Col>
                                </Form.Group>
                                <Form.Group
                                  as={Row}
                                  className="mb-3"
                                  controlId="formPlaintext2">
                                  <Form.Label
                                    column
                                    md="4"
                                    sm="4">
                                    Task
                                  </Form.Label>
                                  <Col sm="7">
                                    <Form.Control
                                      type="text"
                                      name="task"
                                      onChange={handleChange}
                                    />
                                  </Col>
                                </Form.Group>
                                <Form.Group
                                  as={Row}
                                  className="mb-3"
                                  controlId="formPlaintext3">
                                  <Form.Label
                                    column
                                    md="4"
                                    sm="4">
                                    Description
                                  </Form.Label>
                                  <Col sm="7">
                                    <Form.Control
                                      as="textarea"
                                      name="description"
                                      onChange={handleChange}
                                    />
                                  </Col>
                                </Form.Group>
                                <div
                                  className="d-grid gap-2"
                                  style={{
                                    marginBottom: ".5em",
                                  }}>
                                  <Button
                                    variant="primary"
                                    onClick={() => {
                                      handleNewTask(
                                        info.teammate,
                                        info.data.tasks !== undefined
                                          ? info.data.tasks.length
                                          : 0
                                      );
                                    }}
                                    style={{
                                      textAlign: "center",
                                    }}
                                    block>
                                    Assign
                                  </Button>
                                </div>
                              </div>
                            }>
                            <Button
                              type="Button"
                              variant="light"
                              className="bg-white box-shadow rounded-4">
                              <FontAwesomeIcon
                                icon="fa-regular fa-square-plus"
                                style={{ paddingRight: ".5em" }}
                              />
                              New Task
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <></>
                  );
                })
            )}

            <Row>
              <Col>
                <Table
                  style={{
                    borderCollapse: "separate",
                    borderSpacing: "0 10px",
                  }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Client</TableCell>
                      <TableCell align="center">Task</TableCell>
                      <TableCell align="center">Date</TableCell>
                      <TableCell align="center">Time</TableCell>
                      <TableCell align="center">Corrections</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Action</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="curve-box-homelist">
                    {props.team
                      .filter((info) => info.teammate === selected)
                      .map((info) => {
                        return (
                          <>
                            {!info.data.tasks ? (
                              <TableRow
                                colSpan={7}
                                align="center">
                                No tasks assigned
                              </TableRow>
                            ) : (
                              info.data.tasks
                                .sort((a, b) =>
                                  a.priority > b.priority ? 1 : -1
                                )
                                .map((info1, index) => {
                                  return (
                                    <TableRow
                                      key={info1}
                                      style={{
                                        // backgroundColor:
                                        //   done === 0 ? "#fff" : "#f9fbff",
                                        height: "70px",
                                      }}
                                      className="box-shadow">
                                      <TableCell align="center">
                                        {info1.tasknumber}
                                        {info1.client}
                                      </TableCell>
                                      <TableCell align="center">
                                        {info1.priority}
                                        {info1.task}
                                      </TableCell>
                                      {info1.updates
                                        .sort((a, b) =>
                                          a.corrections > b.corrections ? -1 : 1
                                        )
                                        .map((info2, id2) => {
                                          return id2 === 0 ? (
                                            <>
                                              <TableCell align="center">
                                                {info2.date}
                                              </TableCell>
                                              <TableCell align="center">
                                                {info2.time}
                                              </TableCell>
                                              <TableCell align="center">
                                                {info2.corrections === "0"
                                                  ? info2.corrections
                                                  : "+" + info2.corrections}
                                              </TableCell>
                                              <TableCell
                                                align="center"
                                                className="green fw-bold">
                                                {info2.status}
                                              </TableCell>
                                              <TableCell align="center">
                                                {info2.status === "Done" ? (
                                                  <Button
                                                    type="Button"
                                                    variant="light"
                                                    style={{
                                                      backgroundColor: "white",
                                                    }}>
                                                    Correction
                                                  </Button>
                                                ) : (
                                                  <></>
                                                )}
                                              </TableCell>
                                            </>
                                          ) : (
                                            <></>
                                          );
                                        })}
                                      <TableCell
                                        align="center"
                                        className="text-end">
                                        <OverlayTrigger
                                          trigger="click"
                                          key="bottom"
                                          placement="auto"
                                          rootClose
                                          overlay={
                                            <Popover
                                              id={`popover-positioned-bottom`}>
                                              <Popover.Body>
                                                <div
                                                  className="d-grid gap-2"
                                                  style={{
                                                    marginBottom: ".5em",
                                                  }}>
                                                  <Button
                                                    onClick={() => {
                                                      handleDeleteTask(
                                                        info.teammate,
                                                        index
                                                      );
                                                    }}
                                                    variant="light"
                                                    style={{
                                                      textAlign: "left",
                                                    }}
                                                    block>
                                                    <FontAwesomeIcon
                                                      icon="fa-solid fa-trash"
                                                      style={{
                                                        paddingRight: ".5em",
                                                      }}
                                                    />
                                                    Delete Task
                                                  </Button>
                                                </div>
                                                <div
                                                  className="d-grid gap-2"
                                                  style={{
                                                    marginBottom: ".5em",
                                                  }}>
                                                  <Button
                                                    onClick={() => {
                                                      handleUpTask(
                                                        info.teammate,
                                                        info1.priority,
                                                        info1.tasknumber,
                                                        info.data.tasks.length
                                                      );
                                                    }}
                                                    variant="light"
                                                    style={{
                                                      textAlign: "left",
                                                    }}
                                                    block>
                                                    <FontAwesomeIcon
                                                      icon="fa-solid fa-chevron-up"
                                                      style={{
                                                        paddingRight: ".5em",
                                                      }}
                                                    />
                                                    Move Up
                                                  </Button>
                                                </div>
                                                <div
                                                  className="d-grid gap-2"
                                                  style={{
                                                    marginBottom: ".5em",
                                                  }}>
                                                  <Button
                                                    onClick={() => {
                                                      handleDownTask(
                                                        info.teammate,
                                                        info1.priority,
                                                        info1.tasknumber
                                                      );
                                                    }}
                                                    variant="light"
                                                    style={{
                                                      textAlign: "left",
                                                    }}
                                                    block>
                                                    <FontAwesomeIcon
                                                      icon="fa-solid fa-chevron-down"
                                                      style={{
                                                        paddingRight: ".5em",
                                                      }}
                                                    />
                                                    Move Down
                                                  </Button>
                                                </div>
                                              </Popover.Body>
                                            </Popover>
                                          }>
                                          <FontAwesomeIcon
                                            className="pointer"
                                            icon="fa-solid fa-ellipsis-vertical"
                                            style={{
                                              color: "blue",
                                              paddingRight: ".25em",
                                            }}
                                          />
                                        </OverlayTrigger>
                                      </TableCell>
                                    </TableRow>
                                  );
                                })
                            )}
                          </>
                        );
                      })}
                  </TableBody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
