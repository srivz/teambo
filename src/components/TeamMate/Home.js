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

export default function Home() {
  return (
    <div id="main">
      <Container>
        <NavBar />
        {/* <Row>
          <Col
            sm="6"
            md="6"
            style={{ marginTop: "1em" }}>
            <h5>
              <img
                className="w-25 m-lg-2"
                src="./images/Group 3.svg"
                alt=""
              />
              <span className="border-left"></span>
              <span className="blue letter-spacing mt-2">MANAGER</span>
            </h5>
          </Col>
          <Col
            sm="6"
            md="6"
            style={{ marginTop: "1em" }}>
            <h5
              className="text-end"
              id="heading-inTableRowo">
              Feri Abishek<span className="border-left"></span>
              <span className="grey h6">Video Editor / Graphic Designers</span>
              <span className="border-left"></span>
              <span className="blue mt-2">Log Out</span>
            </h5>
          </Col>
        </Row> */}
        <Container>
          <Row>
            <Col style={{ marginTop: "1em" }}>
              <Row>
                <Col
                  sm="6"
                  md="6"
                  style={{ marginTop: "1em" }}>
                  <h5 className="blue">Feri Abishek</h5>
                  <h6>Video Editor / Graphic Designer</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table className="table table-sm">
                    <TableHead>
                      <TableRow>
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
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow className="box-shadow">
                        <TableCell align="center">Chaicup</TableCell>
                        <TableCell align="center">Website UI</TableCell>
                        <TableCell align="center">Jan,21 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">+6</TableCell>
                        <TableCell
                          align="center"
                          style={{ color: "#24a43a", fontWeight: "bold" }}>
                          On Going
                        </TableCell>
                        <TableCell align="center">
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-play"
                            size="lg"
                            style={{ margin: ".5em" }}
                            color="green"
                          />
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-pause"
                            size="lg"
                            style={{ margin: ".5em" }}
                          />
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-check"
                            size="lg"
                            style={{ margin: ".5em" }}
                          />
                        </TableCell>
                        <TableCell className="text-end">
                          <OverlayTrigger
                            TableRowigger="click"
                            key="bottom"
                            placement="auto"
                            rootClose
                            overlay={
                              <Popover id={`popover-positioned-bottom`}>
                                <Popover.Body>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                        icon="fa-solid fa-TableRowash"
                                        style={{ paddingRight: ".5em" }}
                                      />
                                      Delete Task
                                    </Button>
                                  </div>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                    classNameName="d-grid gap-2"
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
                              size="lg"
                              style={{ color: "blue", margin: ".5em" }}
                            />
                          </OverlayTrigger>
                        </TableCell>
                      </TableRow>
                      <TableRow className="box-shadow">
                        <TableCell align="center">Teabon</TableCell>
                        <TableCell align="center">Menu</TableCell>
                        <TableCell align="center">Jan,19 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">0</TableCell>
                        <TableCell
                          align="center"
                          style={{ color: "#d1ae00", fontWeight: "bold" }}>
                          Assigned
                        </TableCell>
                        <TableCell align="center">
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-play"
                            size="lg"
                            style={{ margin: ".5em" }}
                            color="green"
                          />
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-pause"
                            size="lg"
                            style={{ margin: ".5em" }}
                          />
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-check"
                            size="lg"
                            style={{ margin: ".5em" }}
                          />
                        </TableCell>
                        <TableCell className="text-end">
                          <OverlayTrigger
                            TableRowigger="click"
                            key="bottom"
                            placement="auto"
                            rootClose
                            overlay={
                              <Popover id={`popover-positioned-bottom`}>
                                <Popover.Body>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                        icon="fa-solid fa-TableRowash"
                                        style={{ paddingRight: ".5em" }}
                                      />
                                      Delete Task
                                    </Button>
                                  </div>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                    classNameName="d-grid gap-2"
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
                              size="lg"
                              style={{ color: "blue", margin: ".5em" }}
                            />
                          </OverlayTrigger>
                        </TableCell>
                      </TableRow>
                      <TableRow className="box-shadow">
                        <TableCell align="center">TVS</TableCell>
                        <TableCell align="center">Instagram ad Video</TableCell>
                        <TableCell align="center">Jan,18 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">+2</TableCell>
                        <TableCell
                          align="center"
                          style={{ color: "#3975ea", fontWeight: "bold" }}>
                          Paused
                        </TableCell>
                        <TableCell align="center">
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-play"
                            size="lg"
                            style={{ margin: ".5em" }}
                            color="green"
                          />
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-pause"
                            size="lg"
                            style={{ margin: ".5em" }}
                          />
                          <FontAwesomeIcon
                            icon="fa-solid fa-circle-check"
                            size="lg"
                            style={{ margin: ".5em" }}
                          />
                        </TableCell>
                        <TableCell className="text-end">
                          <OverlayTrigger
                            TableRowigger="click"
                            key="bottom"
                            placement="auto"
                            rootClose
                            overlay={
                              <Popover id={`popover-positioned-bottom`}>
                                <Popover.Body>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                        icon="fa-solid fa-TableRowash"
                                        style={{ paddingRight: ".5em" }}
                                      />
                                      Delete Task
                                    </Button>
                                  </div>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                    classNameName="d-grid gap-2"
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
                              size="lg"
                              style={{ color: "blue", margin: ".5em" }}
                            />
                          </OverlayTrigger>
                        </TableCell>
                      </TableRow>
                      <TableRow className="box-shadow">
                        <TableCell align="center">TVS</TableCell>
                        <TableCell align="center">banner design</TableCell>
                        <TableCell align="center">Jan,15 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">+2</TableCell>
                        <TableCell
                          style={{ fontWeight: "bold" }}
                          align="center">
                          Done
                        </TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell className="text-end">
                          <OverlayTrigger
                            TableRowigger="click"
                            key="bottom"
                            placement="auto"
                            rootClose
                            overlay={
                              <Popover id={`popover-positioned-bottom`}>
                                <Popover.Body>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                        icon="fa-solid fa-TableRowash"
                                        style={{ paddingRight: ".5em" }}
                                      />
                                      Delete Task
                                    </Button>
                                  </div>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                    classNameName="d-grid gap-2"
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
                              size="lg"
                              style={{ color: "blue", margin: ".5em" }}
                            />
                          </OverlayTrigger>
                        </TableCell>
                      </TableRow>
                      <TableRow className="box-shadow">
                        <TableCell align="center">TVS</TableCell>
                        <TableCell align="center">banner design</TableCell>
                        <TableCell align="center">Jan,15 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">+2</TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}>
                          Done
                        </TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell className="text-end">
                          <OverlayTrigger
                            TableRowigger="click"
                            key="bottom"
                            placement="auto"
                            rootClose
                            overlay={
                              <Popover id={`popover-positioned-bottom`}>
                                <Popover.Body>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                        icon="fa-solid fa-TableRowash"
                                        style={{ paddingRight: ".5em" }}
                                      />
                                      Delete Task
                                    </Button>
                                  </div>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                    classNameName="d-grid gap-2"
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
                              size="lg"
                              style={{ color: "blue", margin: ".5em" }}
                            />
                          </OverlayTrigger>
                        </TableCell>
                      </TableRow>
                      <TableRow className="box-shadow">
                        <TableCell align="center">TVS</TableCell>
                        <TableCell align="center">banner design</TableCell>
                        <TableCell align="center">Jan,15 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">+2</TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}>
                          Done
                        </TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell className="text-end">
                          <OverlayTrigger
                            TableRowigger="click"
                            key="bottom"
                            placement="auto"
                            rootClose
                            overlay={
                              <Popover id={`popover-positioned-bottom`}>
                                <Popover.Body>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                        icon="fa-solid fa-TableRowash"
                                        style={{ paddingRight: ".5em" }}
                                      />
                                      Delete Task
                                    </Button>
                                  </div>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                    classNameName="d-grid gap-2"
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
                              size="lg"
                              style={{ color: "blue", margin: ".5em" }}
                            />
                          </OverlayTrigger>
                        </TableCell>
                      </TableRow>
                      <TableRow className="box-shadow">
                        <TableCell align="center">TVS</TableCell>
                        <TableCell align="center">banner design</TableCell>
                        <TableCell align="center">Jan,15 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">+2</TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}>
                          Done
                        </TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell className="text-end">
                          <OverlayTrigger
                            TableRowigger="click"
                            key="bottom"
                            placement="auto"
                            rootClose
                            overlay={
                              <Popover id={`popover-positioned-bottom`}>
                                <Popover.Body>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                        icon="fa-solid fa-TableRowash"
                                        style={{ paddingRight: ".5em" }}
                                      />
                                      Delete Task
                                    </Button>
                                  </div>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                    classNameName="d-grid gap-2"
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
                              size="lg"
                              style={{ color: "blue", margin: ".5em" }}
                            />
                          </OverlayTrigger>
                        </TableCell>
                      </TableRow>
                      <TableRow className="box-shadow">
                        <TableCell align="center">TVS</TableCell>
                        <TableCell align="center">banner design</TableCell>
                        <TableCell align="center">Jan,15 2023</TableCell>
                        <TableCell align="center">11.00 am</TableCell>
                        <TableCell align="center">+2</TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}>
                          Done
                        </TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell className="text-end">
                          <OverlayTrigger
                            TableRowigger="click"
                            key="bottom"
                            placement="auto"
                            rootClose
                            overlay={
                              <Popover id={`popover-positioned-bottom`}>
                                <Popover.Body>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                        icon="fa-solid fa-TableRowash"
                                        style={{ paddingRight: ".5em" }}
                                      />
                                      Delete Task
                                    </Button>
                                  </div>
                                  <div
                                    classNameName="d-grid gap-2"
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
                                    classNameName="d-grid gap-2"
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
                              size="lg"
                              style={{ color: "blue", margin: ".5em" }}
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
      </Container>
    </div>
  );
}
