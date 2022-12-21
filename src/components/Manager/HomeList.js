import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Popover,
  Row,
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
              <Table
                style={{
                  borderCollapse: "separate",
                  borderSpacing: "0 20px",
                }}>
                <TableHead>
                  <TableRow>
                    <TableHead scope="col"></TableHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className="box-shadow curve-box-sidelist">
                    <TableCell>
                      <h5>Feri Abishek</h5>
                      <p className="grey">Video Editor / Graphic Designer</p>
                    </TableCell>
                  </TableRow>
                  <TableRow className="box-shadow curve-box-sidelist">
                    <TableCell>
                      <h5>Surya</h5>
                      <p className="grey">Graphic Designer</p>
                    </TableCell>
                  </TableRow>
                  <TableRow className="box-shadow curve-box-sidelist">
                    <TableCell>
                      <h5>Sivasundar</h5>
                      <p className="grey">Video Editor / Graphic Designer</p>
                    </TableCell>
                  </TableRow>
                  <TableRow className="box-shadow curve-box-sidelist">
                    <TableCell>
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
                    <TableRow className="box-shadow">
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
                      </TableCell>
                    </TableRow>
                    <TableRow className="box-shadow curve-box-homelist">
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
                      </TableCell>
                    </TableRow>
                    <TableRow
                      style={{
                        backgroundColor: "#fff",
                        height: "60px",
                        borderRadius: "5px",
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
                      </TableCell>
                    </TableRow>
                    <TableRow className="box-shadow curve-box-homelist">
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
                      </TableCell>
                    </TableRow>
                    <TableRow className="box-shadow curve-box-homelist">
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
                      </TableCell>
                    </TableRow>
                    <TableRow className="box-shadow curve-box-homelist">
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
                      </TableCell>
                    </TableRow>
                    <TableRow className="box-shadow curve-box-homelist">
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
                      </TableCell>
                    </TableRow>
                    <TableRow className="box-shadow curve-box-homelist">
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
                      </TableCell>
                    </TableRow>
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
