import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Popover,
  Row,
  Table,
} from "react-bootstrap";
import NavBar from "../Navs/NavBar";

export default function HomeList() {
  return (
    <div id="main">
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
              <Table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="box-shadow curve-box-sidelist">
                    <td>
                      <h5>Feri Abishek</h5>
                      <p className="grey">Video Editor / Graphic Designer</p>
                    </td>
                  </tr>
                  <tr className="box-shadow curve-box-sidelist">
                    <td>
                      <h5>Surya</h5>
                      <p className="grey">Graphic Designer</p>
                    </td>
                  </tr>
                  <tr className="box-shadow curve-box-sidelist">
                    <td>
                      <h5>Sivasundar</h5>
                      <p className="grey">Video Editor / Graphic Designer</p>
                    </td>
                  </tr>
                  <tr className="box-shadow curve-box-sidelist">
                    <td>
                      <h5>Mithun</h5>
                      <p className="grey">Graphic Designer</p>
                    </td>
                  </tr>
                </tbody>
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
                    icon="fa-solid fa-list"
                    style={{ paddingRight: "1em" }}
                  />

                  <FontAwesomeIcon
                    icon="fa-solid fa-grip "
                    style={{ paddingRight: "1em" }}
                  />
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
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Client</th>
                      <th scope="col">Task</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Corrections</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="box-shadow curve-box-homelist">
                      <td>Chaicup</td>
                      <td>Website UI</td>
                      <td>Jan,21 2023</td>
                      <td>11.00 am</td>
                      <td>+6</td>
                      <td className="green fw-bold">On Going</td>

                      <td className="text-end">
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
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                                    Delete
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
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
                      </td>
                    </tr>
                    <tr className="box-shadow curve-box-homelist">
                      <td>Teabon</td>
                      <td>Menu</td>
                      <td>Jan,19 2023</td>
                      <td>11.00 am</td>
                      <td>0</td>
                      <td className="yellow fw-bold">Assigned</td>

                      <td className="text-end">
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
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                                    Delete
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
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
                      </td>
                    </tr>
                    <tr className="box-shadow curve-box-homelist">
                      <td>TVS</td>
                      <td>Instagram ad Video</td>
                      <td>Jan,18 2023</td>
                      <td>11.00 am</td>
                      <td>+2</td>
                      <td className="blue fw-bold">Paused</td>

                      <td className="text-end">
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
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                                    Delete
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
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
                      </td>
                    </tr>
                    <tr className="box-shadow curve-box-homelist">
                      <td>TVS</td>
                      <td>banner design</td>
                      <td>Jan,15 2023</td>
                      <td>11.00 am</td>
                      <td>+2</td>
                      <td className="fw-bold">Done</td>
                      <td className="text-end">
                        <Button
                          type="Button"
                          variant="light"
                          style={{ backgroundColor: "white" }}>
                          Correction
                        </Button>{" "}
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
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                                    Delete
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
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
                      </td>
                    </tr>
                    <tr className="box-shadow curve-box-homelist">
                      <td>TVS</td>
                      <td>banner design</td>
                      <td>Jan,15 2023</td>
                      <td>11.00 am</td>
                      <td>+2</td>
                      <td className="fw-bold">Done</td>
                      <td className="text-end">
                        <Button
                          type="Button"
                          variant="light"
                          style={{ backgroundColor: "white" }}>
                          Correction
                        </Button>{" "}
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
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                                    Delete
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
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
                      </td>
                    </tr>
                    <tr className="box-shadow curve-box-homelist">
                      <td>TVS</td>
                      <td>banner design</td>
                      <td>Jan,15 2023</td>
                      <td>11.00 am</td>
                      <td>+2</td>
                      <td className="fw-bold">Done</td>
                      <td className="text-end">
                        <Button
                          type="Button"
                          variant="light"
                          style={{ backgroundColor: "white" }}>
                          Correction
                        </Button>{" "}
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
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                                    Delete
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
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
                      </td>
                    </tr>
                    <tr className="box-shadow curve-box-homelist">
                      <td>TVS</td>
                      <td>banner design</td>
                      <td>Jan,15 2023</td>
                      <td>11.00 am</td>
                      <td>+2</td>
                      <td className="fw-bold">Done</td>
                      <td className="text-end">
                        <Button
                          type="Button"
                          variant="light"
                          style={{ backgroundColor: "white" }}>
                          Correction
                        </Button>{" "}
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
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                                    Delete
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
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
                      </td>
                    </tr>
                    <tr className="box-shadow curve-box-homelist">
                      <td>TVS</td>
                      <td>banner design</td>
                      <td>Jan,15 2023</td>
                      <td>11.00 am</td>
                      <td>+2</td>
                      <td className="fw-bold">Done</td>
                      <td className="text-end">
                        <Button
                          type="Button"
                          variant="light"
                          style={{ backgroundColor: "white" }}>
                          Correction
                        </Button>{" "}
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
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                                    Delete
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                                    Move Up
                                  </Button>
                                </div>
                                <div
                                  className="d-grid gap-2"
                                  style={{ marginBottom: ".5em" }}>
                                  <Button
                                    variant="light"
                                    block>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
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
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
