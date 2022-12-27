import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
} from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function HomeBlock(props) {
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
    props.onChange(true);
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
  return (
    <div id="main">
      <Container>
        <Row>
          <Col style={{ marginTop: "1em" }}>
            {!selected ? (
              <Row>
                <Col
                  sm={6}
                  md={6}
                  style={{ marginTop: "1em" }}>
                  <h3 className="blue">Teammate Tasks</h3>
                </Col>
                <Col
                  sm={6}
                  md={6}
                  style={{ marginTop: "1em" }}
                  className="text-end">
                  <div>
                    <FontAwesomeIcon
                      onClick={() => {
                        handleViewChange();
                      }}
                      icon="fa-solid fa-list"
                      style={{ paddingRight: "1em" }}
                    />

                    <FontAwesomeIcon
                      icon="fa-solid fa-grip "
                      color="#5f8fee"
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
                          <h5 className="blue">No User</h5>
                          <h6>selected</h6>
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
                .map((info) => {
                  return selected ? (
                    <Row>
                      <Col
                        sm={6}
                        md={6}
                        style={{ marginTop: "1em" }}>
                        <h3 className="blue">Teammate Tasks</h3>
                      </Col>
                      <Col
                        sm={6}
                        md={6}
                        style={{ marginTop: "1em" }}
                        className="text-end">
                        <div>
                          <FontAwesomeIcon
                            onClick={() => {
                              handleViewChange();
                            }}
                            icon="fa-solid fa-list"
                            style={{ paddingRight: "1em" }}
                          />

                          <FontAwesomeIcon
                            icon="fa-solid fa-grip "
                            color="#5f8fee"
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
          </Col>
          <Container>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 300: 1, 600: 2, 750: 3, 900: 4 }}>
              <Masonry>
                {!props.team ? (
                  <Row
                    colSpan={7}
                    align="center">
                    No teammate right now
                  </Row>
                ) : (
                  props.team.map((info) => {
                    return (
                      <div
                        key={info.teammate}
                        onClick={() => setSelected(info.teammate)}>
                        <div className="cards">
                          <div className="heading bg-blue p-3 rounded-3">
                            <h5>{info.data.name}</h5>
                            <span>{info.data.designation}</span>
                          </div>
                          {!info.data.tasks ? (
                            <div className="card-tasks">
                              <Row
                                colSpan={7}
                                align="center">
                                No tasks assigned
                              </Row>
                            </div>
                          ) : (
                            info.data.tasks
                              .sort((a, b) =>
                                a.priority > b.priority ? 1 : -1
                              )
                              .map((info1, index) => {
                                return (
                                  <div
                                    key={info1}
                                    className="card-tasks">
                                    <Row>
                                      <Col sm="8">
                                        <span>{info1.client}</span>
                                        <br />
                                        <span>{info1.task}</span>
                                      </Col>
                                      <Col sm="4">
                                        {info1.updates
                                          .sort((a, b) =>
                                            a.corrections > b.corrections
                                              ? -1
                                              : 1
                                          )
                                          .map((info2, id2) => {
                                            return id2 === 0 ? (
                                              <span className="green fw-bold text-end task-status">
                                                {info2.status}
                                              </span>
                                            ) : (
                                              <></>
                                            );
                                          })}
                                      </Col>
                                    </Row>
                                    <hr class="divider" />
                                  </div>
                                );
                              })
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
                {/* 
                <div>
                  <div className="cards">
                    <div className="heading bg-blue p-3 rounded-3">
                      <h5>Priyadharshan</h5>
                      <span>Video Editor / Graphic Designer</span>
                    </div>
                    <div className="card-tasks">
                      <Row>
                        <Col sm="8">
                          <span>Chaicup</span>
                          <br />
                          <span>Website UI</span>
                        </Col>
                        <Col sm="4">
                          <span className="green fw-bold text-end task-status">
                            On Going
                          </span>
                        </Col>
                      </Row>
                      <hr class="divider" />
                      <Row>
                        <Col sm="8">
                          <span>Teabon</span>
                          <br />
                          <span>Menu</span>
                        </Col>
                        <Col sm="4">
                          <span className="yellow fw-bold text-end task-status">
                            Assigned
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="cards">
                    <div className="heading bg-blue p-3 rounded-3">
                      <h5>Surya</h5>
                      <span>Graphic Designer</span>
                    </div>
                    <div className="card-tasks">
                      <Row>
                        <Col sm="8">
                          <span>Chaicup</span>
                          <br />
                          <span>Website UI</span>
                        </Col>
                        <Col sm="4">
                          <span className="green fw-bold text-end task-status">
                            On Going
                          </span>
                        </Col>
                      </Row>
                      <hr class="divider" />
                      <Row>
                        <Col sm="8">
                          <span>Teabon</span>
                          <br />
                          <span>Menu</span>
                        </Col>
                        <Col sm="4">
                          <span className="yellow fw-bold text-end task-status">
                            Assigned
                          </span>
                        </Col>
                      </Row>
                      <hr class="divider" />
                      <Row>
                        <Col sm="8">
                          <span>TVS</span>
                          <br />
                          <span>Instagram ad Video</span>
                        </Col>
                        <Col sm="4">
                          <span className="blue fw-bold text-end task-status">
                            Paused
                          </span>
                        </Col>
                      </Row>
                      <hr class="divider" />
                      <Row>
                        <Col sm="8">
                          <span>TVS</span>
                          <br />
                          <span>Instagram ad Video</span>
                        </Col>
                        <Col sm="4">
                          <span className="blue fw-bold text-end task-status">
                            Paused
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="cards">
                    <div className="heading bg-blue p-3 rounded-3">
                      <h5>Feri Abishek</h5>
                      <span>Video Editor / Graphic Designer</span>
                    </div>
                    <div className="card-tasks">
                      <Row>
                        <Col sm="8">
                          <span>Chaicup</span>
                          <br />
                          <span>Website UI</span>
                        </Col>
                        <Col sm="4">
                          <span className="green fw-bold text-end task-status">
                            On Going
                          </span>
                        </Col>
                      </Row>
                      <hr class="divider" />
                      <Row>
                        <Col sm="8">
                          <span>Teabon</span>
                          <br />
                          <span>Menu</span>
                        </Col>
                        <Col sm="4">
                          <span className="yellow fw-bold text-end task-status">
                            Assigned
                          </span>
                        </Col>
                      </Row>
                      <hr class="divider" />
                      <Row>
                        <Col sm="8">
                          <span>TVS</span>
                          <br />
                          <span>Instagram ad Video</span>
                        </Col>
                        <Col sm="4">
                          <span className="blue fw-bold text-end task-status">
                            Paused
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="cards">
                    <div className="heading bg-blue p-3 rounded-3">
                      <h5>Sivasundar</h5>
                      <span>Video Editor / Graphic Designer</span>
                    </div>
                    <div className="card-tasks">
                      <Row>
                        <Col sm="8">
                          <span>Chaicup</span>
                          <br />
                          <span>Website UI</span>
                        </Col>
                        <Col sm="4">
                          <span className="green fw-bold text-end task-status">
                            On Going
                          </span>
                        </Col>
                      </Row>
                      <hr class="divider" />
                      <Row>
                        <Col sm="8">
                          <span>Teabon</span>
                          <br />
                          <span>Menu</span>
                        </Col>
                        <Col sm="4">
                          <span className="yellow fw-bold text-end task-status">
                            Assigned
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="cards">
                    <div className="heading bg-blue p-3 rounded-3">
                      <h5>Mithun</h5>
                      <span>Video Editor / Graphic Designer</span>
                    </div>
                    <div className="card-tasks">
                      <Row>
                        <Col sm="8">
                          <span>Chaicup</span>
                          <br />
                          <span>Website UI</span>
                        </Col>
                        <Col sm="4">
                          <span className="green fw-bold text-end task-status">
                            On Going
                          </span>
                        </Col>
                      </Row>
                      <hr class="divider" />
                      <Row>
                        <Col sm="8">
                          <span>Teabon</span>
                          <br />
                          <span>Menu</span>
                        </Col>
                        <Col sm="4">
                          <span className="yellow fw-bold text-end task-status">
                            Assigned
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="cards">
                    <div className="heading bg-blue p-3 rounded-3">
                      <h5>Thandil</h5>
                      <span> Graphic Designer</span>
                    </div>
                    <div className="card-tasks">
                      <Row>
                        <Col sm="8">
                          <span>Chaicup</span>
                          <br />
                          <span>Website UI</span>
                        </Col>
                        <Col sm="4">
                          <span className="green fw-bold text-end task-status">
                            On Going
                          </span>
                        </Col>
                      </Row>
                      <hr class="divider" />
                      <Row>
                        <Col sm="8">
                          <span>Teabon</span>
                          <br />
                          <span>Menu</span>
                        </Col>
                        <Col sm="4">
                          <span className="yellow fw-bold text-end task-status">
                            Assigned
                          </span>
                        </Col>
                      </Row>
                      <hr class="divider" />
                      <Row>
                        <Col sm="8">
                          <span>TVS</span>
                          <br />
                          <span>Instagram ad Video</span>
                        </Col>
                        <Col sm="4">
                          <span className="blue fw-bold text-end task-status">
                            Paused
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="cards">
                    <div className="heading bg-blue p-3 rounded-3">
                      <h5>Feri Abishek</h5>
                      <span>Video Editor / Graphic Designer</span>
                    </div>
                    <div className="card-tasks">
                      <Row>
                        <Col sm="6">
                          <span>Chaicup</span>
                          <br />
                          <span>Website UI</span>
                        </Col>
                        <Col sm="6">
                          <span className="green fw-bold text-end task-status">
                            On Going
                          </span>
                        </Col>
                      </Row>
                      <hr class="divider" />
                      <Row>
                        <Col sm="6">
                          <span>Teabon</span>
                          <br />
                          <span>Menu</span>
                        </Col>
                        <Col sm="6">
                          <span className="yellow fw-bold text-end task-status">
                            Assigned
                          </span>
                        </Col>
                      </Row>
                      <hr class="divider" />
                      <Row>
                        <Col sm="6">
                          <span>TVS</span>
                          <br />
                          <span>Instagram ad Video</span>
                        </Col>
                        <Col sm="6">
                          <span className="blue fw-bold text-end task-status">
                            Paused
                          </span>
                        </Col>
                      </Row>
                      <hr class="divider" />
                      <Row>
                        <Col sm="6">
                          <span>TVS</span>
                          <br />
                          <span>Instagram ad Video</span>
                        </Col>
                        <Col sm="6">
                          <span className="blue fw-bold text-end task-status">
                            Paused
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="cards">
                    <div className="heading bg-blue p-3 rounded-3">
                      <h5>Sathish</h5>
                      <span>Video Editor / Graphic Designer</span>
                    </div>
                    <div className="card-tasks">
                      <Row>
                        <Col sm="6">
                          <span>Chaicup</span>
                          <br />
                          <span>Website UI</span>
                        </Col>
                        <Col sm="6">
                          <span className="green fw-bold text-end task-status">
                            On Going
                          </span>
                        </Col>
                      </Row>
                      <hr class="divider" />
                      <Row>
                        <Col sm="6">
                          <span>Teabon</span>
                          <br />
                          <span>Menu</span>
                        </Col>
                        <Col sm="6">
                          <span className="yellow fw-bold text-end task-status">
                            Assigned
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div> */}
              </Masonry>
            </ResponsiveMasonry>
          </Container>
        </Row>
      </Container>
    </div>
  );
}
