import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
} from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import NewTask from "./NewTask";

export default function HomeBlock(props) {
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("teammateSelected"))
  );
  function handleViewChange() {
    props.onChange(true);
  }
  return (
    <div id="main">
      <Container>
        <Row className="curve-box-homelist">
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
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                    <FontAwesomeIcon
                      onClick={() => {
                        handleViewChange();
                      }}
                      icon="fa-solid fa-list"
                      style={{ paddingRight: "1em", fontSize: "20px" }}
                    />

                    <FontAwesomeIcon
                      icon="fa-solid fa-grip "
                      color="#5f8fee"
                      style={{ paddingRight: "1em", fontSize: "20px" }}
                    />
                    <NewTask
                      name={"No Teammate"}
                      description={"Selected"}
                    />
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
                            style={{ paddingRight: "1em", fontSize: "20px" }}
                          />

                          <FontAwesomeIcon
                            icon="fa-solid fa-grip "
                            color="#5f8fee"
                            style={{ paddingRight: "1em", fontSize: "20px" }}
                          />
                          <NewTask
                            name={info.data.name}
                            description={info.data.designation}
                            teammate={info.teammate}
                            tasks={info.data.tasks}
                          />
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <></>
                  );
                })
            )}
          </Col>
          <Container className="overflow-set-auto table-height1">
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
                        onClick={() => {
                          localStorage.setItem(
                            "teammateSelected",
                            JSON.stringify(info.teammate)
                          );
                          setSelected(info.teammate);
                        }}>
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
                            info.data.tasks.map((info1, index) => {
                              return (
                                <div
                                  key={index}
                                  className="card-tasks">
                                  <Row>
                                    <Col sm="8">
                                      <span>{info1.client}</span>
                                      <br />
                                      <span>{info1.task}</span>
                                    </Col>
                                    <Col sm="4">
                                      {info1.updates ? (
                                        <span
                                          style={
                                            (info1.updates[
                                              info1.updates.length - 1
                                            ].status === "Done" && {
                                              fontFamily: "rockwen",
                                              color: "#000000",
                                              fontWeight: "bold",
                                            }) || (info1.updates[
                                              info1.updates.length - 1
                                            ].status === "Completed" && {
                                              fontFamily: "rockwen",
                                              color: "#000000",
                                              fontWeight: "bold",
                                            }) ||
                                            (info1.updates[
                                              info1.updates.length - 1
                                            ].status === "On Going" && {
                                              fontFamily: "rockwen",
                                              color: "#24A43A",
                                              fontWeight: "bold",
                                            }) ||
                                            (info1.updates[
                                              info1.updates.length - 1
                                            ].status === "Paused" && {
                                              fontFamily: "rockwen",
                                              color: "#2972B2",
                                              fontWeight: "bold",
                                            }) ||
                                            (info1.updates[
                                              info1.updates.length - 1
                                            ].status === "Assigned" && {
                                              fontFamily: "rockwen",
                                              color: "#D1AE00",
                                              fontWeight: "bold",
                                            })
                                          }
                                          className="text-end task-status">
                                          {
                                            info1.updates[
                                              info1.updates.length - 1
                                            ].status
                                          }
                                        </span>
                                      ) : (
                                        <></>
                                      )}
                                    </Col>
                                  </Row>
                                  <hr className="divider" />
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </Masonry>
            </ResponsiveMasonry>
          </Container>
        </Row>
      </Container>
    </div>
  );
}
