import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
} from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import NewTask from "./NewTask";
import { auth } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth'
import NavBar from "../Navs/NavBar";
import { useNavigate } from "react-router";
import Loader from "../Loader/Loader";
import TaskHistory from "./TaskHistory";
import readManagers, { readAllLiveTasks, readTeammatesFromList } from "../../database/read/managerReadFunction";



export default function HomeBlock(props) {
  // const fromTeammate = useRef({});
  // const toTeammate = useRef({});
  const navigate = useNavigate();
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("teammateSelected")) === undefined ? 0 : JSON.parse(localStorage.getItem("teammateSelected"))
  );
  const [manager, setManager] = useState({});
  const [managerId, setManagerId] = useState({});
  const [loading, setLoading] = useState(true);
  const [teammateList, setTeammateList] = useState([]);
  const [taskSelected, setTaskSelected] = useState();
  const [user, setUser] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [tasks, setTasks] = useState([])


  async function fetchManagerData(userUid) {
    try {
      const managerData = await readManagers(userUid);
      setManager(managerData.data);
      setManagerId(managerData.id);
      const teammate = await readTeammatesFromList(managerData.id);
      setTeammateList(teammate);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTasks(id) {
    try {
      const data = await readAllLiveTasks(id);
      setTasks(data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userLog) => {
      setUser(userLog.uid);
    });
    return () => unsubscribe();
  }, []);

  onAuthStateChanged(auth, (user) => { if (user) { } else { window.location.href = "/" } })

  useEffect(() => {
    setLoading(true);
    fetchManagerData(user);
    fetchTasks(user);
    setLoading(false);
  }, [user])


  // const diff_hours = (dt2, dt1) => {
  //   var diff = (new Date("" + dt2).getTime() - new Date("" + dt1).getTime()) / 1000;
  //   diff /= (60 * 60);
  //   return Math.abs(diff);
  // }
  // const handleDeleteTask = (teammate, id, index) => {
  //   let list1 = teammate.tasks.slice(0, index);
  //   let list2 = teammate.tasks.slice(index + 1);
  //   let list = list1.concat(list2)
  //   set(ref(db, `/manager/${managerId}/teammates/${id}/data/tasks`), list)
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // function dragStart(e, index, list, id) {
  //   fromTeammate.current.id = id;
  //   fromTeammate.current.tasks = list;
  //   fromTeammate.current.taskIndex = index;
  // }

  // function dragEnter(e, index, list, id) {
  //   toTeammate.current.id = id;
  //   toTeammate.current.tasks = list;
  //   toTeammate.current.taskIndex = index;
  // }

  // function drop(e, index, list, id) {
  //   if (fromTeammate.current.id === toTeammate.current.id && fromTeammate.current.taskIndex === toTeammate.current.taskIndex) {
  //     return;
  //   }
  //   var today = new Date()
  //   if (fromTeammate.current.id === toTeammate.current.id) {
  //     let copyList = [...fromTeammate.current.tasks];
  //     const dragItemContent = copyList[fromTeammate.current.taskIndex];
  //     copyList.splice(fromTeammate.current.taskIndex, 1);
  //     copyList.splice(toTeammate.current.taskIndex, 0, dragItemContent);
  //     fromTeammate.current.taskIndex = null;
  //     toTeammate.current.taskIndex = null;
  //     let now = 0
  //     if (manager.teammates[fromTeammate.current.id].data.tasks[index].updates[manager.teammates[fromTeammate.current.id].data.tasks[index].updates.length - 1].status === "On Going")
  //       now = diff_hours(today, manager.teammates[fromTeammate.current.id].data.tasks[index].updates[manager.teammates[fromTeammate.current.id].data.tasks[index].updates.length - 1].startTimeStamp)
  //     let manHour1 = manager.teammates[fromTeammate.current.id].data.manHours + now
  //     update(ref(db, `/manager/${managerId}/teammates/${id}/data/`), { manHours: manHour1 }).then(() => {
  //       update(ref(db, `/manager/${managerId}/clients/${manager.teammates[fromTeammate.current.id].data.tasks[index].clientIndex}`), { manHours: props?.manager?.clients[manager.teammates[fromTeammate.current.id].data.tasks[index].clientIndex].manHours + now })
  //     })
  //     update(ref(db, `/manager/${managerId}/teammates/${fromTeammate.current.id}/data/`), {
  //       tasks: copyList,
  //     })
  //   }
  //   else {
  //     let copyList = [...fromTeammate.current.tasks];
  //     const dragItemContent = copyList[fromTeammate.current.taskIndex];
  //     const newTask = {
  //       client: dragItemContent?.client,
  //       task: dragItemContent?.task,
  //       manHours: 0,
  //       clientIndex: dragItemContent?.clientIndex,
  //       updates: dragItemContent?.updates.concat({
  //         description: ['This task was switched to you.'],
  //         startTimeStamp: "null",
  //         assignedStartDate: dragItemContent?.updates[dragItemContent?.updates?.length - 1].assignedStartDate,
  //         assignedStartTime: dragItemContent?.updates[dragItemContent?.updates?.length - 1].assignedStartTime,
  //         corrections: dragItemContent?.updates?.length || 0,
  //         deadlineDate: '--',
  //         deadlineTime: '--',
  //         status: 'Assigned',
  //       },),
  //     }
  //     newTask.updates[newTask.updates.length - 2].status = "Done"
  //     newTask.updates[newTask.updates.length - 2].endDate =
  //       String(today.getDate()).padStart(2, '0') +
  //       '/' +
  //       String(today.getMonth() + 1).padStart(2, '0') +
  //       '/' +
  //       today.getFullYear()
  //     newTask.updates[newTask.updates.length - 2].endTime =
  //       today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  //     newTask.updates[newTask.updates.length - 2].startTimeStamp = null
  //     let now = 0
  //     if (manager.teammates[fromTeammate.current.id].data.tasks[index].updates[manager.teammates[fromTeammate.current.id].data.tasks[index].updates.length - 1].status === "On Going")
  //       now = diff_hours(today, manager.teammates[fromTeammate.current.id].data.tasks[index].updates[manager.teammates[fromTeammate.current.id].data.tasks[index].updates.length - 1].startTimeStamp)
  //     let manHour1 = manager.teammates[fromTeammate.current.id].data.manHours + now
  //     let toLiveTask = manager.teammates[toTeammate.current.id].data.liveTasks + 1
  //     let toTotalNumberOfTasks = manager.teammates[toTeammate.current.id].data.totalNumberOfTasks + 1
  //     let fromLiveTask = manager.teammates[fromTeammate.current.id].data.liveTasks - 1
  //     update(ref(db, `/manager/${managerId}/teammates/${id}/data/`), { manHours: manHour1 }).then(() => {
  //       update(ref(db, `/manager/${managerId}/clients/${manager.teammates[fromTeammate.current.id].data.tasks[index].clientIndex}`), { manHours: manager.clients[manager.teammates[fromTeammate.current.id].data.tasks[index].clientIndex].manHours + now })
  //     })
  //     if (toLiveTask >= 0 && toLiveTask >= 0) {
  //       update(ref(db, `/manager/${managerId}/teammates/${fromTeammate.current.id}/data`), { liveTasks: fromLiveTask })
  //       update(ref(db, `/manager/${managerId}/teammates/${toTeammate.current.id}/data`), { liveTasks: toLiveTask, totalNumberOfTasks: toTotalNumberOfTasks })
  //     }
  //     if (toTeammate.current.tasks) {
  //       set(ref(db, `manager/${managerId}/teammates/${toTeammate.current.id}/data/tasks/${toTeammate.current.tasks.length || 0}`), newTask,)
  //       handleDeleteTask(fromTeammate.current, fromTeammate.current.id, fromTeammate.current.taskIndex)
  //     }
  //     else {
  //       set(ref(db, `manager/${managerId}/teammates/${toTeammate.current.id}/data/tasks/0`), newTask,)
  //       handleDeleteTask(fromTeammate.current, fromTeammate.current.id, fromTeammate.current.taskIndex)
  //     }
  //   }
  // }

  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <NavBar
        user="MANAGER"
        user2="MANAGER"
        name={manager.managerName}
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
                      .filter((info) => info.id === selected)
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
                                  className="pointer"
                                  onClick={() => {
                                    navigate('/manager/home/list');
                                  }}
                                  icon="fa-solid fa-list"
                                  style={{ marginRight: "1em", fontSize: "20px" }}
                                />

                                <FontAwesomeIcon
                                  className="pointer"
                                  icon="fa-solid fa-grip "
                                  color="#5f8fee"
                                  style={{ marginRight: "1em", fontSize: "20px" }}
                                />
                                <NewTask
                                  name={info.data.teammateName}
                                  designation={info.data.designation}
                                  teammate={info.data}
                                  teammateId={info.id}
                                  tasks={info.data.tasks}
                                  manager={manager}
                                  managerId={managerId}
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
              <Container className="overflow-set-auto table-height2">
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 300: 1, 600: 2, 750: 3, 900: 4 }}>
                  <Masonry>
                    {teammateList === [] ? (
                      <Row
                        colSpan={7}
                        align="center">
                        No teammate right now
                      </Row>
                    ) : (
                        teammateList.map((info) => {
                          return (
                            <div
                              key={info.id}
                              onClick={() => {
                                localStorage.setItem(
                                  "teammateSelected",
                                  JSON.stringify(info.id)
                                );
                                setSelected(info.id);
                              }}>
                              <div className="cards">
                                <div className="heading bg-blue p-3 rounded-3">
                                  <h5>{info.data.teammateName}</h5>
                                  <span>{info.data.designation}</span>
                                </div>
                                {tasks === [] ? (
                                  <div className="card-tasks">
                                    <Row
                                      colSpan={7}
                                      align="center"

                                    // onDragEnter={(e) => {
                                    //   dragEnter(e, 0, info?.data?.tasks, info?.id)
                                    // }}
                                    // onDragEnd={(e) => {
                                    //   drop(e, 0, info?.data?.tasks, info?.id)
                                    // }}
                                    >
                                      No tasks assigned
                                    </Row>
                                  </div>
                                ) : (tasks.filter((info1) => { return info.id === info1.data.teammateId }).map((info1) => {
                                  return (
                                    <div
                                      style={{ padding: "1.6em" }}
                                      key={info1.id}
                                      onClick={() => {
                                        setModalShow(true);
                                        setTaskSelected(info1.id);
                                      }}
                                      className="card-tasks">
                                      <Row draggable
                                      // onDragStart={(e) => {
                                      //   dragStart(e, index, info?.data?.tasks, info?.id)
                                      // }}
                                      // onDragEnter={(e) => {
                                      //   dragEnter(e, index, info?.data?.tasks, info?.id)
                                      // }}
                                      // onDragEnd={(e) => {
                                      //   drop(e, index, info?.data?.tasks, info?.id)
                                      // }}
                                      >
                                        <Col sm="8">
                                          <span title={info1.data.clientName}>{info1.data.clientName.length < 14 ? info1.data.clientName : info1?.data.clientName?.slice(0, 11) + "..."}</span>
                                          <br />
                                          <span title={info1.data.title}>{info1.data.title.length < 24 ? info1.data.title : info1?.data.title?.slice(0, 21) + "..."}</span>
                                        </Col>
                                        <Col sm="4">
                                          <span
                                            style={
                                              (info1.data.status === "DONE" && {
                                                fontFamily: "rockwen",
                                                color: "#000000",
                                                fontWeight: "bold",
                                              }) ||
                                              (info1.data.status === "ON_GOING" && {
                                                fontFamily: "rockwen",
                                                color: "#24A43A",
                                                fontWeight: "bold",
                                              }) ||
                                              (info1.data.status === "PAUSED" && {
                                                fontFamily: "rockwen",
                                                color: "#2972B2",
                                                fontWeight: "bold",
                                              }) ||
                                              (info1.data.status === "ASSIGNED" && {
                                                fontFamily: "rockwen",
                                                color: "#D1AE00",
                                                fontWeight: "bold",
                                              }) ||
                                              ({
                                                fontFamily: "rockwen",
                                                color: "#000000",
                                                fontWeight: "bold",
                                              })
                                            }
                                            className="text-end task-status">
                                            {
                                              info1.data.status === "ASSIGNED" ? "Assigned" :
                                                info1.data.status === "ON_GOING" ? "On Going" :
                                                  info1.data.status === "PAUSED" ? "Paused" :
                                                    info1.data.status === "DONE" ? "Done" : ""
                                            }</span>
                                        </Col>
                                      </Row>
                                      <hr className="divider" style={{ marginBottom: "-22px" }} />
                                    </div>

                                  )
                                })
                                )}
                              </div>
                            </div>
                          )
                        }
                        ))}
                  </Masonry>
                </ResponsiveMasonry>
              </Container>
            </Row>
          </Container>
          {
            teammateList?.data?.tasks !== undefined && taskSelected !== null ? (
              <TaskHistory
                show={modalShow}
                onHide={() => { setModalShow(false); setTaskSelected(null); }}
                indexselected={taskSelected}
                teamtasks={tasks}
                name={teammateList.data.name}
                managerid={managerId}
                teammateid={teammateList.id}
                designation={teammateList?.data?.designation}
              />
            ) : (
              <></>
            )}
        </div>
      }

    </div>
  );
}
