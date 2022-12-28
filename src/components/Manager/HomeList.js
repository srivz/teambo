import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { onChildChanged, ref, update } from "firebase/database";
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
import { db } from "../../firebase-config";

export default function HomeList(props) {
  var today = new Date();
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("teammateSelected"))
  );
  const [taskSelected, setTaskSelected] = useState();
  const [newTask, setNewTask] = useState({
    client: "",
    task: "",
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
    await props.addTask(newTask, id, tasknumber);
    await window.location.reload();
  };

  const handleDeleteTask = (id, index) => {
    props.deleteTask(id, index);
  };

  onChildChanged(ref(db, `/teammate/`), () => {
    window.location.reload();
  });

  function swap(arr, from, to) {
    let temp = arr[from];
    arr[from] = arr[to];
    arr[to] = temp;
  }

  const handleUpTask = (id, index, tasks, taskLength) => {
    if (index === 0) {
      alert("Its already on the top");
    } else {
      let newarr = tasks;
      swap(newarr, index, index - 1);
      update(ref(db, `teammate/${id}/`), {
        tasks: newarr,
      });
      window.location.reload();
    }
  };

  const handleDownTask = (id, index, tasks, taskLength) => {
    if (index === taskLength - 1) {
      alert("Its already on the bottom");
    } else {
      let newarr = tasks;
      swap(newarr, index + 1, index);
      update(ref(db, `teammate/${id}/`), {
        tasks: newarr,
      });
      window.location.reload();
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
                          onClick={() => {
                            localStorage.setItem(
                              "teammateSelected",
                              JSON.stringify(info.teammate)
                            );
                            setTaskSelected(null);
                            setSelected(info.teammate);
                          }}>
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
              <Row>
                <Col
                  sm={6}
                  md={6}
                  style={{ marginTop: "1em" }}>
                  <h5 className="blue">No Teammate</h5>
                  <h6>Selected</h6>
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
                          <h5 className="blue">No Teammate</h5>
                          <h6>Selected</h6>
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
              props.team
                .filter((info) => info.teammate === selected)
                .map((info, index) => {
                  return selected ? (
                    <Row key={index}>
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
                              <TableRow align="center">
                                <TableCell>No tasks assigned</TableCell>
                              </TableRow>
                            ) : (
                              info.data.tasks.map((info1, index) => {
                                return taskSelected !== index ? (
                                  <TableRow
                                    key={index}
                                    style={{
                                      backgroundColor:
                                        info1.updates[info1.updates.length - 1]
                                          .status !== "Done"
                                          ? "#fff"
                                          : "#f9fbff",
                                      height: "70px",
                                    }}
                                    className="box-shadow">
                                    <TableCell
                                      onClick={() => {
                                        setTaskSelected(index);
                                      }}
                                      align="center">
                                      {info1.client}
                                    </TableCell>
                                    <TableCell
                                      onClick={() => {
                                        setTaskSelected(index);
                                      }}
                                      align="center">
                                      {info1.task}
                                    </TableCell>
                                    {info1.updates ? (
                                      <>
                                        <TableCell
                                          onClick={() => {
                                            setTaskSelected(index);
                                          }}
                                          align="center">
                                          {
                                            info1.updates[
                                              info1.updates.length - 1
                                            ].date
                                          }
                                        </TableCell>
                                        <TableCell
                                          onClick={() => {
                                            setTaskSelected(index);
                                          }}
                                          align="center">
                                          {
                                            info1.updates[
                                              info1.updates.length - 1
                                            ].time
                                          }
                                        </TableCell>
                                        <TableCell
                                          onClick={() => {
                                            setTaskSelected(index);
                                          }}
                                          align="center">
                                          {info1.updates[
                                            info1.updates.length - 1
                                          ].corrections === "0"
                                            ? info1.updates[
                                                info1.updates.length - 1
                                              ].corrections
                                            : "+" +
                                              info1.updates[
                                                info1.updates.length - 1
                                              ].corrections}
                                        </TableCell>
                                        <TableCell
                                          onClick={() => {
                                            setTaskSelected(index);
                                          }}
                                          align="center"
                                          style={
                                            (info1.updates[
                                              info1.updates.length - 1
                                            ].status === "Done" && {
                                              color: "#000000",
                                              fontWeight: "bold",
                                            }) ||
                                            (info1.updates[
                                              info1.updates.length - 1
                                            ].status === "On Going" && {
                                              color: "#24A43A",
                                              fontWeight: "bold",
                                            }) ||
                                            (info1.updates[
                                              info1.updates.length - 1
                                            ].status === "Paused" && {
                                              color: "#2972B2",
                                              fontWeight: "bold",
                                            }) ||
                                            (info1.updates[
                                              info1.updates.length - 1
                                            ].status === "Assigned" && {
                                              color: "#D1AE00",
                                              fontWeight: "bold",
                                            })
                                          }>
                                          {
                                            info1.updates[
                                              info1.updates.length - 1
                                            ].status
                                          }
                                        </TableCell>
                                        <TableCell align="center">
                                          {info1.updates[
                                            info1.updates.length - 1
                                          ].status === "Done" ? (
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
                                    )}
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
                                                      index,
                                                      info.data.tasks,
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
                                                      index,
                                                      info.data.tasks,
                                                      info.data.tasks.length
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
                                ) : (
                                  <TableRow
                                    key={index}
                                    style={{
                                      backgroundColor:
                                        info1.updates[info1.updates.length - 1]
                                          .status !== "Done"
                                          ? "#fff"
                                          : "#f9fbff",
                                    }}
                                    className="box-shadow">
                                    <TableCell
                                      onClick={() => {
                                        setTaskSelected(null);
                                      }}
                                      align="center">
                                      {info1.client}
                                    </TableCell>
                                    <TableCell
                                      onClick={() => {
                                        setTaskSelected(null);
                                      }}
                                      align="center">
                                      {info1.task}
                                      <br />
                                      <br />
                                      <p>{info1.description}</p>
                                    </TableCell>
                                    <TableCell
                                      onClick={() => {
                                        setTaskSelected(null);
                                      }}
                                      align="center">
                                      {info1.updates
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
                                      align="center">
                                      {info1.updates
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
                                      align="center">
                                      {info1.updates
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
                                      align="center">
                                      {info1.updates
                                        .sort((a, b) =>
                                          a.corrections > b.corrections ? -1 : 1
                                        )
                                        .map((info2) => {
                                          return (
                                            <p
                                              style={
                                                (info2.status === "Done" && {
                                                  color: "#000000",
                                                }) ||
                                                (info2.status ===
                                                  "On Going" && {
                                                  color: "#24A43A",
                                                }) ||
                                                (info2.status === "Paused" && {
                                                  color: "#2972B2",
                                                }) ||
                                                (info2.status ===
                                                  "Assigned" && {
                                                  color: "#D1AE00",
                                                })
                                              }>
                                              {info2.status}
                                              <br />
                                            </p>
                                          );
                                        })}
                                    </TableCell>

                                    <TableCell align="center">
                                      {info1.updates[info1.updates.length - 1]
                                        .status === "Done" ? (
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
                                                      index,
                                                      info.data.tasks,
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
                                                      index,
                                                      info.data.tasks,
                                                      info.data.tasks.length
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
