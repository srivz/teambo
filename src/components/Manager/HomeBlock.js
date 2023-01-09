import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { onValue, set, ref, update } from 'firebase/database'
import {
  Col,
  Container,
  Row,
} from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import NewTask from "./NewTask";
import { db, auth } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth'
import NavBar from "../Navs/NavBar";
import { useNavigate } from "react-router";
import Loader from "../Loader/Loader";



export default function HomeBlock(props) {
  const fromTeammate = useRef({});
  const toTeammate = useRef({});
  const navigate = useNavigate();
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("teammateSelected"))
  );

  const [manager, setManager] = useState({})
  const [once, setOnce] = useState(true)
  const [loading, setLoading] = useState(true)
  const [once1, setOnce1] = useState(true)
  const [teammateList, setTeammateList] = useState([])

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (once) {
        setLoading(true)
        onValue(ref(db, `manager/${user.uid}`), (snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val()
            setManager(data)
            if (data.teammates !== undefined) {
              getTeammates(data.teammates)
            }
          } else {
            console.log('No data available')
          }
          setLoading(false)
        })
        setOnce(false)
      }
    } else {
      window.location.href = '/'
    }
  })

  const getTeammates = (teamList) => {
    if (once1) {
      setLoading(true)
      teamList.forEach((teammate) => {
        onValue(ref(db, `teammate/${teammate}`), (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val()
            setTeammateList((teammateList) => [
              ...teammateList,
              { data, teammate },
            ])
            setLoading(false);
          } else {
            console.log('No data available')
            setLoading(false)
          }
        })
      })
    }
    setOnce1(false)
  }

  const handleDeleteTask = (teammate, id, index) => {
    let list1 = teammate.tasks.slice(0, index);
    let list2 = teammate.tasks.slice(index + 1);
    let list = list1.concat(list2)
    set(ref(db, `/teammate/${id}/tasks`), list)
      .catch((err) => {
        console.log(err);
      });
  }

  function dragStart(e, index, list, id) {
    fromTeammate.current.id = id;
    fromTeammate.current.tasks = list;
    fromTeammate.current.taskIndex = index;
  }

  function dragEnter(e, index, list, id) {
    console.log(id);
    toTeammate.current.id = id;
    toTeammate.current.tasks = list;
    toTeammate.current.taskIndex = index;
  }

  function drop(e, index, list, id) {
    console.log(list);
    console.log(toTeammate);
    if (fromTeammate.current.id === toTeammate.current.id && fromTeammate.current.taskIndex === toTeammate.current.taskIndex) {
      return;
    }
    if (fromTeammate.current.id === toTeammate.current.id) {
      let copyList = [...fromTeammate.current.tasks];
      const dragItemContent = copyList[fromTeammate.current.taskIndex];
      copyList.splice(fromTeammate.current.taskIndex, 1);
      copyList.splice(toTeammate.current.taskIndex, 0, dragItemContent);
      fromTeammate.current.taskIndex = null;
      toTeammate.current.taskIndex = null;
      update(ref(db, `teammate/${fromTeammate.current.id}/`), {
        tasks: copyList,
      })
      window.location.reload()
    }
    else {
      var today = new Date()
      let copyList = [...fromTeammate.current.tasks];
      const dragItemContent = copyList[fromTeammate.current.taskIndex];
      const newTask = {
        client: dragItemContent?.client,
        task: dragItemContent?.task,
        clientEmail: dragItemContent?.clientEmail,
        updates: dragItemContent?.updates.concat({
          description: ['This task was switched to you.'],
          assignedDate:
            String(today.getDate()).padStart(2, '0') +
            '/' +
            String(today.getMonth() + 1).padStart(2, '0') +
            '/' +
            today.getFullYear(),
          assignedTime:
            today.getHours() +
            ':' +
            today.getMinutes() +
            ':' +
            today.getSeconds(),
          corrections: dragItemContent?.updates?.length || 0,
          deadlineDate: '--',
          deadlineTime: '--',
          status: 'Assigned',
        },),
      }

      if (toTeammate.current.tasks) {
        set(ref(db, `/teammate/${toTeammate.current.id}/tasks/${toTeammate.current.tasks.length || 0}`), newTask,)
        handleDeleteTask(fromTeammate.current, fromTeammate.current.id, fromTeammate.current.taskIndex)
      }
      else {
        set(ref(db, `/teammate/${toTeammate.current.id}/tasks/0`), newTask,)
        handleDeleteTask(fromTeammate.current, fromTeammate.current.id, fromTeammate.current.taskIndex)
      }


    }
  }

  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <NavBar
        user="MANAGER"
        user2="MANAGER"
        name={manager.name}
        role={manager.designation}
      />

      {
        loading ? <Loader /> : <div id="main">
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
                      <div>
                        <FontAwesomeIcon
                          onClick={() => {
                            navigate('/manager/home/list')
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
                    teammateList
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
                                    navigate('/manager/home/list');
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
                    {!teammateList ? (
                      <Row
                        colSpan={7}
                        align="center">
                        No teammate right now
                      </Row>
                    ) : (
                        teammateList.map((info) => {
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
                                        <Row draggable
                                          onDragStart={(e) => {
                                            dragStart(e, index, info?.data?.tasks, info?.teammate)
                                          }}
                                          onDragEnter={(e) => {
                                            dragEnter(e, index, info?.data?.tasks, info?.teammate)
                                          }}
                                          onDragEnd={(e) => {
                                            drop(e, index, info?.data?.tasks, info?.teammate)
                                          }}
                                        >
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
      }

    </div>
  );
}
