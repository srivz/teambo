import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import NavBar from "../Navs/NavBar";

export default function HomeList() {
  const [open, setOpen] = useState();
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
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="box-shadow curve-box">
                    <td>
                      <h5>Feri Abishek</h5>
                      <p className="grey">Video Editor / Graphic Designer</p>
                    </td>
                  </tr>
                  <tr className="box-shadow curve-box">
                    <td>
                      <h5>Surya</h5>
                      <p className="grey">Graphic Designer</p>
                    </td>
                  </tr>
                  <tr className="box-shadow curve-box">
                    <td>
                      <h5>Sivasundar</h5>
                      <p className="grey">Video Editor / Graphic Designer</p>
                    </td>
                  </tr>
                  <tr className="box-shadow curve-box">
                    <td>
                      <h5>Mithun</h5>
                      <p className="grey">Graphic Designer</p>
                    </td>
                  </tr>
                </tbody>
              </table>
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
                <table className="table">
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
                    <tr className="box-shadow curve-box">
                      <td>Chaicup</td>
                      <td>Website UI</td>
                      <td>Jan,21 2023</td>
                      <td>11.00 am</td>
                      <td>+6</td>
                      <td className="green fw-bold">On Going</td>

                      <td className="text-end">
                        <FontAwesomeIcon
                          onClick={() => {
                            open === 1 ? setOpen(null) : setOpen(1);
                          }}
                          icon="fa-solid fa-ellipsis-vertical"
                          style={{ color: "blue", paddingRight: ".25em" }}
                        />
                        <div
                          className="action-box"
                          style={{ display: open === 1 ? "block" : "none" }}>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-trash" />
                              Delete
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                              Move Up
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                              Move Down
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="box-shadow curve-box">
                      <td>Teabon</td>
                      <td>Menu</td>
                      <td>Jan,19 2023</td>
                      <td>11.00 am</td>
                      <td>0</td>
                      <td className="yellow fw-bold">Assigned</td>

                      <td className="text-end">
                        <FontAwesomeIcon
                          onClick={() => {
                            open === 2 ? setOpen(null) : setOpen(2);
                          }}
                          icon="fa-solid fa-ellipsis-vertical"
                          style={{ color: "blue", paddingRight: ".25em" }}
                        />
                        <div
                          className="action-box"
                          style={{ display: open === 2 ? "block" : "none" }}>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-trash" />
                              Delete
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                              Move Up
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                              Move Down
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="box-shadow curve-box">
                      <td>TVS</td>
                      <td>Instagram ad Video</td>
                      <td>Jan,18 2023</td>
                      <td>11.00 am</td>
                      <td>+2</td>
                      <td className="blue fw-bold">Paused</td>

                      <td className="text-end">
                        <FontAwesomeIcon
                          onClick={() => {
                            open === 3 ? setOpen(null) : setOpen(3);
                          }}
                          icon="fa-solid fa-ellipsis-vertical"
                          style={{ color: "blue", paddingRight: ".25em" }}
                        />
                        <div
                          className="action-box"
                          style={{ display: open === 3 ? "block" : "none" }}>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-trash" />
                              Delete
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                              Move Up
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                              Move Down
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="box-shadow curve-box">
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
                        <FontAwesomeIcon
                          onClick={() => {
                            open === 4 ? setOpen(null) : setOpen(4);
                          }}
                          icon="fa-solid fa-ellipsis-vertical"
                          style={{ color: "blue", paddingRight: ".25em" }}
                        />
                        <div
                          className="action-box"
                          style={{ display: open === 4 ? "block" : "none" }}>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-trash" />
                              Delete
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                              Move Up
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                              Move Down
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="box-shadow curve-box">
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
                        <FontAwesomeIcon
                          onClick={() => {
                            open === 5 ? setOpen(null) : setOpen(5);
                          }}
                          icon="fa-solid fa-ellipsis-vertical"
                          style={{ color: "blue", paddingRight: ".25em" }}
                        />
                        <div
                          className="action-box"
                          style={{ display: open === 5 ? "block" : "none" }}>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-trash" />
                              Delete
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                              Move Up
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                              Move Down
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="box-shadow curve-box">
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
                        <FontAwesomeIcon
                          onClick={() => {
                            open === 6 ? setOpen(null) : setOpen(6);
                          }}
                          icon="fa-solid fa-ellipsis-vertical"
                          style={{ color: "blue", paddingRight: ".25em" }}
                        />
                        <div
                          className="action-box"
                          style={{ display: open === 6 ? "block" : "none" }}>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-trash" />
                              Delete
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                              Move Up
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                              Move Down
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="box-shadow curve-box">
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
                        <FontAwesomeIcon
                          onClick={() => {
                            open === 7 ? setOpen(null) : setOpen(7);
                          }}
                          icon="fa-solid fa-ellipsis-vertical"
                          style={{ color: "blue", paddingRight: ".25em" }}
                        />
                        <div
                          className="action-box"
                          style={{ display: open === 7 ? "block" : "none" }}>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-trash" />
                              Delete
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                              Move Up
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                              Move Down
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="box-shadow curve-box">
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
                        <FontAwesomeIcon
                          onClick={() => {
                            open === 8 ? setOpen(null) : setOpen(8);
                          }}
                          icon="fa-solid fa-ellipsis-vertical"
                          style={{ color: "blue", paddingRight: ".25em" }}
                        />
                        <div
                          className="action-box"
                          style={{ display: open === 8 ? "block" : "none" }}>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-trash" />
                              Delete
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
                              Move Up
                            </Button>
                          </div>
                          <div style={{ marginBottom: ".5em" }}>
                            <Button variant="light">
                              <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                              Move Down
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
