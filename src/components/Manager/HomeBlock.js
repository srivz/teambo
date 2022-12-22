import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
} from "react-bootstrap";
import NavBar from "../Navs/NavBar";

export default function HomeBlock(props) {
  function handleViewChange() {
    props.onChange(true);
  }
  return (
    <div id="main">
      <NavBar />
      <Container>
        <Row>
          <Col style={{ marginTop: "1em" }}>
            <Row>
              <Col
                sm="6"
                md="6"
                style={{ marginTop: "3" }}>
                <h3 className="blue">Teammate Tasks</h3>
              </Col>
              <Col
                sm="6"
                md="6"
                style={{ marginTop: "3" }}
                className=" text-end">
                <div>
                  <FontAwesomeIcon
                    onClick={() => {
                      handleViewChange();
                    }}
                    icon="fa-solid fa-list"
                    style={{ paddingRight: "1em" }}
                  />

                  <FontAwesomeIcon
                    color="#5f8fee"
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
                        <h5 className="blue">Feri Abishek</h5>
                        <h6>Video Editor / Graphic Designer</h6>
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
                            <Form.Control type="text" />
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
                            <Form.Control type="text" />
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
                            <Form.Control as="textarea" />
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
          </Col>
          <Row>
            <Col
              sm="4"
              md="4">
              <Card
                style={{
                  maxWidth: "300px",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderRadius: "20px",
                  padding: "10px",
                }}>
                <div class="heading bg-blue p-2 rounded-3">
                  <h5>Feri Abishek</h5>
                  <h6>Video Editor / Graphic Designer</h6>
                </div>
                <Row>
                  <Col sm="6">
                    <h6>Chaicup</h6>
                    <h6>Website UI</h6>
                  </Col>
                  <Col sm="6">
                    <h6 class="green fw-bold text-end">On Going</h6>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <h6>Teabon</h6>
                    <h6>Menu</h6>
                  </Col>
                  <Col sm="6">
                    <h6 class="yellow fw-bold text-end">Assigned</h6>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <h6>TVS</h6>
                    <h6>Instagram ad Video</h6>
                  </Col>
                  <Col sm="6">
                    <h6 class="blue fw-bold text-end">Paused</h6>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col
              sm="4"
              md="4">
              <Card
                style={{
                  maxWidth: "300px",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderRadius: "20px",
                  padding: "10px",
                }}>
                <div class="heading bg-blue p-2 rounded-3">
                  <h5>Feri Abishek</h5>
                  <h6>Video Editor / Graphic Designer</h6>
                </div>
                <Row>
                  <Col sm="6">
                    <h6>Chaicup</h6>
                    <h6>Website UI</h6>
                  </Col>
                  <Col sm="6">
                    <h6 class="green fw-bold text-end">On Going</h6>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <h6>Teabon</h6>
                    <h6>Menu</h6>
                  </Col>
                  <Col sm="6">
                    <h6 class="yellow fw-bold text-end">Assigned</h6>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <h6>TVS</h6>
                    <h6>Instagram ad Video</h6>
                  </Col>
                  <Col sm="6">
                    <h6 class="blue fw-bold text-end">Paused</h6>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col
              sm="4"
              md="4">
              <Card
                style={{
                  maxWidth: "300px",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderRadius: "20px",
                  padding: "10px",
                }}>
                <div class="heading bg-blue p-2 rounded-3">
                  <h5>Feri Abishek</h5>
                  <h6>Video Editor / Graphic Designer</h6>
                </div>
                <Row>
                  <Col sm="6">
                    <h6>Chaicup</h6>
                    <h6>Website UI</h6>
                  </Col>
                  <Col sm="6">
                    <h6 class="green fw-bold text-end">On Going</h6>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <h6>Teabon</h6>
                    <h6>Menu</h6>
                  </Col>
                  <Col sm="6">
                    <h6 class="yellow fw-bold text-end">Assigned</h6>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <h6>TVS</h6>
                    <h6>Instagram ad Video</h6>
                  </Col>
                  <Col sm="6">
                    <h6 class="blue fw-bold text-end">Paused</h6>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col
              sm="4"
              md="4">
              <Card
                style={{
                  maxWidth: "300px",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderRadius: "20px",
                  padding: "10px",
                }}>
                <div class="heading bg-blue p-2 rounded-3">
                  <h5>Feri Abishek</h5>
                  <h6>Video Editor / Graphic Designer</h6>
                </div>
                <Row>
                  <Col sm="6">
                    <h6>Chaicup</h6>
                    <h6>Website UI</h6>
                  </Col>
                  <Col sm="6">
                    <h6 class="green fw-bold text-end">On Going</h6>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <h6>Teabon</h6>
                    <h6>Menu</h6>
                  </Col>
                  <Col sm="6">
                    <h6 class="yellow fw-bold text-end">Assigned</h6>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <h6>TVS</h6>
                    <h6>Instagram ad Video</h6>
                  </Col>
                  <Col sm="6">
                    <h6 class="blue fw-bold text-end">Paused</h6>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Row>
      </Container>
      {/* <div id="main">
      <NavBar />
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
                style={{ marginTop: "1em", padding: ".25em" }}
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
                  <TableRow
                    className="box-shadow"
                    onClick={() => setSelected(1)}>
                    <TableCell
                      style={{
                        backgroundColor: selected === 1 ? "#e2ecff" : "#f9fbff",
                        height: "fit-content",
                        borderRadius: "5px",
                      }}>
                      <h5>Feri Abishek</h5>
                      <p className="grey">Video Editor / Graphic Designer</p>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    className="box-shadow"
                    onClick={() => setSelected(2)}>
                    <TableCell
                      style={{
                        backgroundColor: selected === 2 ? "#e2ecff" : "#f9fbff",
                        height: "fit-content",
                        borderRadius: "5px",
                      }}>
                      <h5>Surya</h5>
                      <p className="grey">Graphic Designer</p>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    className="box-shadow"
                    onClick={() => setSelected(3)}>
                    <TableCell
                      style={{
                        backgroundColor: selected === 3 ? "#e2ecff" : "#f9fbff",
                        height: "fit-content",
                        borderRadius: "5px",
                      }}>
                      <h5>Sivasundar</h5>
                      <p className="grey">Video Editor / Graphic Designer</p>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    className="box-shadow"
                    onClick={() => setSelected(4)}>
                    <TableCell
                      style={{
                        backgroundColor: selected === 4 ? "#e2ecff" : "#f9fbff",
                        height: "fit-content",
                        borderRadius: "5px",
                      }}>
                      <h5>Mithun</h5>
                      <p className="grey">Graphic Designer</p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Col>
          <Col
            sm={9}
            md={9}
            style={{ marginTop: "1em" }}>
            <Row>
              <Col
                sm={6}
                md={6}
                style={{ marginTop: "1em" }}>
                <h5 className="blue">Feri Abishek</h5>
                <h6>Video Editor / Graphic Designer</h6>
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
                    color="#5f8fee"
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
                        <h5 className="blue">Feri Abishek</h5>
                        <h6>Video Editor / Graphic Designer</h6>
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
                            <Form.Control type="text" />
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
                            <Form.Control type="text" />
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
                            <Form.Control as="textarea" />
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
                        className="green fw-bold">
                        On Going
                      </TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell
                        align="center"
                        className="text-end">
                        <OverlayTrigger
                          trigger="click"
                          key="bottom"
                          placement="auto"
                          rootClose
                          overlay={
                            <Popover id={`popover-positioned-bottom`}>
                              <Popover.Body>
                                <div
                                  className="d-grid gap-2"
                                  style={{
                                    marginBottom: ".5em",
                                  }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-trash"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Delete Task
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-up"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-down"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Down
                                  </Button>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }>
                          <FontAwesomeIcon
                            icon="fa-solid fa-ellipsis-vertical"
                            style={{ color: "blue", paddingRight: ".25em" }}
                          />
                        </OverlayTrigger>
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
                        className="yellow fw-bold">
                        Assigned
                      </TableCell>
                      <TableCell align="center"></TableCell>

                      <TableCell
                        align="center"
                        className="text-end">
                        <OverlayTrigger
                          trigger="click"
                          key="bottom"
                          placement="auto"
                          rootClose
                          overlay={
                            <Popover id={`popover-positioned-bottom`}>
                              <Popover.Body>
                                <div
                                  className="d-grid gap-2"
                                  style={{
                                    marginBottom: ".5em",
                                  }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-trash"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Delete Task
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-up"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-down"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Down
                                  </Button>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }>
                          <FontAwesomeIcon
                            icon="fa-solid fa-ellipsis-vertical"
                            style={{ color: "blue", paddingRight: ".25em" }}
                          />
                        </OverlayTrigger>
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
                        className="blue fw-bold">
                        Paused
                      </TableCell>
                      <TableCell align="center"></TableCell>

                      <TableCell
                        align="center"
                        className="text-end">
                        <OverlayTrigger
                          trigger="click"
                          key="bottom"
                          placement="auto"
                          rootClose
                          overlay={
                            <Popover id={`popover-positioned-bottom`}>
                              <Popover.Body>
                                <div
                                  className="d-grid gap-2"
                                  style={{
                                    marginBottom: ".5em",
                                  }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-trash"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Delete Task
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-up"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-down"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Down
                                  </Button>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }>
                          <FontAwesomeIcon
                            icon="fa-solid fa-ellipsis-vertical"
                            style={{ color: "blue", paddingRight: ".25em" }}
                          />
                        </OverlayTrigger>
                      </TableCell>
                    </TableRow>

                    <TableRow
                      style={{
                        backgroundColor: done === 1 ? "#fff" : "#f9fbff",
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
                        className="fw-bold">
                        Done
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          type="Button"
                          variant="light"
                          style={{ backgroundColor: "white" }}>
                          Correction
                        </Button>{" "}
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
                            <Popover id={`popover-positioned-bottom`}>
                              <Popover.Body>
                                <div
                                  className="d-grid gap-2"
                                  style={{
                                    marginBottom: ".5em",
                                  }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-trash"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Delete Task
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-up"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-down"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Down
                                  </Button>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }>
                          <FontAwesomeIcon
                            icon="fa-solid fa-ellipsis-vertical"
                            style={{ color: "blue", paddingRight: ".25em" }}
                          />
                        </OverlayTrigger>
                      </TableCell>
                    </TableRow>

                    <TableRow
                      style={{
                        backgroundColor: done === 1 ? "#fff" : "#f9fbff",
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
                        className="fw-bold">
                        Done
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          type="Button"
                          variant="light"
                          style={{ backgroundColor: "white" }}>
                          Correction
                        </Button>{" "}
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
                            <Popover id={`popover-positioned-bottom`}>
                              <Popover.Body>
                                <div
                                  className="d-grid gap-2"
                                  style={{
                                    marginBottom: ".5em",
                                  }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-trash"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Delete Task
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-up"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-down"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Down
                                  </Button>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }>
                          <FontAwesomeIcon
                            icon="fa-solid fa-ellipsis-vertical"
                            style={{ color: "blue", paddingRight: ".25em" }}
                          />
                        </OverlayTrigger>
                      </TableCell>
                    </TableRow>

                    <TableRow
                      style={{
                        backgroundColor: done === 1 ? "#fff" : "#f9fbff",
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
                        className="fw-bold">
                        Done
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          type="Button"
                          variant="light"
                          style={{ backgroundColor: "white" }}>
                          Correction
                        </Button>{" "}
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
                            <Popover id={`popover-positioned-bottom`}>
                              <Popover.Body>
                                <div
                                  className="d-grid gap-2"
                                  style={{
                                    marginBottom: ".5em",
                                  }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-trash"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Delete Task
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-up"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-down"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Down
                                  </Button>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }>
                          <FontAwesomeIcon
                            icon="fa-solid fa-ellipsis-vertical"
                            style={{ color: "blue", paddingRight: ".25em" }}
                          />
                        </OverlayTrigger>
                      </TableCell>
                    </TableRow>

                    <TableRow
                      style={{
                        backgroundColor: done === 1 ? "#fff" : "#f9fbff",
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
                        className="fw-bold">
                        Done
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          type="Button"
                          variant="light"
                          style={{ backgroundColor: "white" }}>
                          Correction
                        </Button>{" "}
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
                            <Popover id={`popover-positioned-bottom`}>
                              <Popover.Body>
                                <div
                                  className="d-grid gap-2"
                                  style={{
                                    marginBottom: ".5em",
                                  }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-trash"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Delete Task
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-up"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-down"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Down
                                  </Button>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }>
                          <FontAwesomeIcon
                            icon="fa-solid fa-ellipsis-vertical"
                            style={{ color: "blue", paddingRight: ".25em" }}
                          />
                        </OverlayTrigger>
                      </TableCell>
                    </TableRow>

                    <TableRow
                      style={{
                        backgroundColor: done === 1 ? "#fff" : "#f9fbff",
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
                        className="fw-bold">
                        Done
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          type="Button"
                          variant="light"
                          style={{ backgroundColor: "white" }}>
                          Correction
                        </Button>{" "}
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
                            <Popover id={`popover-positioned-bottom`}>
                              <Popover.Body>
                                <div
                                  className="d-grid gap-2"
                                  style={{
                                    marginBottom: ".5em",
                                  }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-trash"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Delete Task
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-up"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    style={{
                                      textAlign: "left",
                                    }}
                                    block>
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-chevron-down"
                                      style={{ paddingRight: ".5em" }}
                                    />
                                    Move Down
                                  </Button>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }>
                          <FontAwesomeIcon
                            icon="fa-solid fa-ellipsis-vertical"
                            style={{ color: "blue", paddingRight: ".25em" }}
                          />
                        </OverlayTrigger>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container> */}
    </div>
  );
}
