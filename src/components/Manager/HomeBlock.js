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
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import NavBar from "../Navs/NavBar";

export default function HomeBlock(props) {
  function handleViewChange() {
    props.onChange(false);
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
          <Container>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4 }}>
              <Masonry>
                <div>
                  <div className="cards">
                    <div className="heading bg-blue p-2 rounded-3">
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
                    <div className="heading bg-blue p-2 rounded-3">
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
                    <div className="heading bg-blue p-2 rounded-3">
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
                    <div className="heading bg-blue p-2 rounded-3">
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
                    <div className="heading bg-blue p-2 rounded-3">
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
                    <div className="heading bg-blue p-2 rounded-3">
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
                    <div className="heading bg-blue p-2 rounded-3">
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
                    <div className="heading bg-blue p-2 rounded-3">
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
                    <div className="heading bg-blue p-2 rounded-3">
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
                </div>
              </Masonry>
            </ResponsiveMasonry>
          </Container>
        </Row>
      </Container>
    </div>
  );
}
