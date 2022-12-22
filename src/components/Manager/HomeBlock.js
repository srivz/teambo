import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  Button,
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
                style={{ marginTop: "1em" }}>
                <h3 className="blue">Teammate Tasks</h3>
              </Col>
              <Col
                sm="6"
                md="6"
                style={{ marginTop: "1em" }}
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
              sm="3"
              md="3">
              <div class="cards">
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
              </div>

              <div class="cards">
                <div class="heading bg-blue p-2 rounded-3">
                  <h5>Priyadharshan</h5>
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
              </div>
            </Col>
            <Col
              sm="3"
              md="3">
              <div class="cards">
                <div class="heading bg-blue p-2 rounded-3">
                  <h5>Surya</h5>
                  <h6>Graphic Designer</h6>
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
                <Row>
                  <Col sm="6">
                    <h6>TVS</h6>
                    <h6>Instagram ad Video</h6>
                  </Col>
                  <Col sm="6">
                    <h6 class="blue fw-bold text-end">Paused</h6>
                  </Col>
                </Row>
              </div>
              <div class="cards">
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
              </div>
            </Col>
            <Col
              sm="3"
              md="3">
              <div class="cards">
                <div class="heading bg-blue p-2 rounded-3">
                  <h5>Sivasundar</h5>
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
              </div>
              <div class="cards">
                <div class="heading bg-blue p-2 rounded-3">
                  <h5>Mithun</h5>
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
              </div>
              <div class="cards">
                <div class="heading bg-blue p-2 rounded-3">
                  <h5>Thandil</h5>
                  <h6> Graphic Designer</h6>
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
              </div>
            </Col>
            <Col
              sm="3"
              md="3">
              <div class="cards">
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
                <Row>
                  <Col sm="6">
                    <h6>TVS</h6>
                    <h6>Instagram ad Video</h6>
                  </Col>
                  <Col sm="6">
                    <h6 class="blue fw-bold text-end">Paused</h6>
                  </Col>
                </Row>
              </div>
              <div class="cards">
                <div class="heading bg-blue p-2 rounded-3">
                  <h5>Sathish</h5>
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
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
}
