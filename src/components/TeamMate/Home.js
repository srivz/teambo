import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import Dropdown from 'react-bootstrap/Dropdown'
import { onAuthStateChanged } from 'firebase/auth'
import { onValue, ref, update } from 'firebase/database'
import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { auth, db } from '../../firebase-config'
import Loader from '../Loader/Loader'
import NavBar from '../Navs/NavBar'
import pause from '../../assets/images/pause.svg'
import paused from '../../assets/images/paused.svg'
import play from '../../assets/images/play.svg'
import played from '../../assets/images/played.svg'
import tick from '../../assets/images/tick.svg'
import TeammateTaskHistory from './TeammateTaskHistory'
import Notifications from './Notifications'
import axios from 'axios'
import { readTask, readTeammate } from '../../database/read/teammateReadFunction'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [taskSelected, setTaskSelected] = useState()
  const [user, setUser] = useState()
  const [teammate, setTeammate] = useState({})
  const [clients, setClients] = useState({})
  const [id, setId] = useState('')
  const [filter, setFilter] = useState('All')
  const [managerId, setManagerId] = useState('')
  const [managerEmail, setManagerEmail] = useState('')
  const [teammateIndex, setTeammateIndex] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [otherNotifications, setOtherNotifications] = useState()
  const [attendanceMarked, setAttedencedMarked] = useState(false)
  const [task, setTask] = useState([])


  async function fetchTeammateData(userEmail) {
    try {
      const teammateData = await readTeammate(userEmail);
      setTeammate(teammateData.data);
      setId(teammateData.id);
      setOtherNotifications(teammateData.data.requests);
    } catch (error) {
      console.error(error);
    }
  }

  onAuthStateChanged(auth, (user) => { if (user) { } else { window.location.href = "/" } })

  async function fetchTeammateTask(id) {
    try {
      const task = await readTask(id);
      console.log("task: ", task)
      if (task) {
        setTask(task)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTeammateTask(id)
  }, [id]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userLog) => {
      setUser(userLog.email);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchTeammateData(user);
    setLoading(false);
  }, [user])

  const timeStampFormatChange = (stamp) => {
    if (stamp === '--') {
      return "--"
    }
    const timestamp = new Date(stamp.seconds * 1000);
    let dateOnly = timestamp.toLocaleDateString('default', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
    let timeOnly = timestamp.toLocaleTimeString('default', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })

    return (
      <>
        {dateOnly}
        <br />
        {timeOnly}
      </>
    )
  }

  const diff_hours = (dt2, dt1) => {
    var diff = (new Date("" + dt2).getTime() - new Date("" + dt1).getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(diff);
  }

  const playTask = (e, index, length) => {
    var now = new Date()
    teammate.tasks.forEach((task, i) => {
      if (i === index) {
        update(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/tasks/${index}/updates/${length - 1}`), {
          status: 'On Going',
          startTimeStamp: now,
        })
      } else if (task.updates[task.updates.length - 1].status === 'On Going') {
        pauseTask(e, i)
      }
    })
  }

  const pauseTask = (e, index, length) => {
    var today = new Date()
    let now = diff_hours(today, teammate.tasks[index].updates[teammate.tasks[index].updates.length - 1]
      .startTimeStamp)
    let manHour = parseFloat(teammate.tasks[index].manHours) + now
    let manHour1 = parseFloat(teammate.manHours) + now
    update(ref(db, `/manager/${managerId}/clients/${teammate.tasks[index].clientIndex}/`), { manHours: clients[teammate.tasks[index].clientIndex].manHours + manHour })
    update(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/`), { manHours: manHour1 })
    update(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/tasks/${index}/`), { manHours: manHour })
    update(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/tasks/${index}/updates/${teammate.tasks[index].updates.length - 1}`), {
      status: 'Paused',
      startTimeStamp: "0",
    })
  }

  const completeTask = async (e, index, length) => {
    var today = new Date()
    if (teammate.tasks[index].updates[teammate.tasks[index].updates.length - 1].status === "On Going") {
      let now = diff_hours(today, teammate.tasks[index].updates[teammate.tasks[index].updates.length - 1].startTimeStamp)
      let manHour = parseFloat(teammate.tasks[index].manHours) + now
      let manHour1 = parseFloat(teammate.manHours) + now
      update(ref(db, `/manager/${managerId}/clients/${teammate.tasks[index].clientIndex}/`), { manHours: clients[teammate.tasks[index].clientIndex].manHours + now })
      update(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/`), { manHours: manHour1 })
      update(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/tasks/${index}/`), { manHours: manHour })
    }
    update(ref(db, `/manager/${managerId}/teammates/${teammateIndex}/data/tasks/${index}/updates/${length - 1}`), {
      status: 'Done',
      startTimeStamp: null,
      endDate:
        String(today.getDate()).padStart(2, '0') +
        '/' +
        String(today.getMonth() + 1).padStart(2, '0') +
        '/' +
        today.getFullYear(),
      endTime:
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
    })
    const subject = `
                  <h4>${teammate.teammateName} completed the ${teammate.tasks[index].task} task.</h4>
                  <br />
                  <p>Thank you</p>
                `
    const heading = "Teammate Request"
    const text = `${teammate.teammateName} requests you to join his team.Login to your Teambo account to reply to his request.`
    try {
      const res = await axios.post("https://us-central1-teambo-c231b.cloudfunctions.net/taskCompleted", {
        heading, fromEmail: teammate.email, toEmail: managerEmail, subject: subject, text: text
      });
      if (res.status === 200) {
      }
      else {
        alert("Something went wrong");
      }

    } catch (err) {
      alert("error")
      console.log(err)
    }
  }

  const doNothing = () => { }
  const dateFormatChange = (date) => {
    if (date === '--' || date === undefined) {
      return '--'
    }
    let givenDate = date?.split('/')
    let months = [
      '',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    let dateMonth = months[parseInt(givenDate[1])]
    return dateMonth + ',' + givenDate[0] + ' ' + givenDate[2]
  }
  const timeFormatChange = (time) => {
    if (time === '--' || time === undefined) {
      return '--'
    }
    let givenTime = time?.split(':')
    if (parseInt(givenTime[0]) === 0 || parseInt(givenTime[0]) === 24) {
      let minute =
        parseInt(givenTime[1]) > 9
          ? parseInt(givenTime[1])
          : '0' + parseInt(givenTime[1])
      return '12:' + minute + ' am'
    } else if (parseInt(givenTime[0]) === 12) {
      let minute =
        parseInt(givenTime[1]) > 9
          ? parseInt(givenTime[1])
          : '0' + parseInt(givenTime[1])

      return "12:" + minute + ' pm'
    } else if (parseInt(givenTime[0]) > 12) {
      let hour =
        parseInt(givenTime[0]) % 12 > 9
          ? parseInt(givenTime[0]) % 12
          : '0' + parseInt(givenTime[0] % 12)
      let minute =
        parseInt(givenTime[1]) > 9
          ? parseInt(givenTime[1])
          : '0' + parseInt(givenTime[1])

      return hour + ':' + minute + ' pm'
    } else if (parseInt(givenTime[0]) < 12) {
      let hour =
        parseInt(givenTime[0]) > 9
          ? parseInt(givenTime[0])
          : '0' + parseInt(givenTime[0])
      let minute =
        parseInt(givenTime[1]) > 9
          ? parseInt(givenTime[1])
          : '0' + parseInt(givenTime[1])

      return hour + ':' + minute + ' am'
    }
  }
  function markAttendence(e) {
    if (e.target.checked) {
      const dat = new Date();
      const today = dat.getDate() + "-" + dat.getMonth() + 1 + "-" + dat.getFullYear();
      update(ref(db, `manager/${managerId}/attendence/${today}/${teammateIndex}`), { attendanceMarkedTime: dat, teammateIndex: teammateIndex, name: teammate.teammateName, approved: "No" }).then((res) => {
        console.log(res);
      })
    }
  }
  // useEffect(() => {
  //   const dat = new Date();
  //   const today = dat.getDate() + "-" + dat.getMonth() + 1 + "-" + dat.getFullYear();
  //   onValue(ref(db, `manager/${managerId}/attendence/${today}/${teammateIndex}`), (snapshot) => {
  //     let data = snapshot.val();
  //     if (data.attendanceMarkedTime) {
  //       setAttedencedMarked(true);
  //     }
  //   })
  // }, [teammateIndex, managerId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div id="main">
          <NavBar
              user="TEAMMATE"
              user2="TEAMMATE"
              name={teammate.teammateName}
            role={teammate.designation}
            />
            <Container>
            <Container>
              <Row>
                  <Col style={{ marginTop: '1em' }}>
                    <Row>
                      <Col sm="6" md="6" style={{ marginTop: '1em' }}>
                        <h5 className="blue">{teammate.teammateName}</h5>
                      <h6>{teammate.designation}</h6>
                      </Col>

                    <Col
                        sm="6"
                        md="6"
                        style={{
                        marginTop: '1em',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}
                        className="text- end"
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: ' center',
                          alignItems: 'center',
                          height: "20px"
                        }}>
                          <h5 style={{ marginTop: "10px", marginRight: "10px" }}>
                            Attendence
                          </h5>
                          {
                            attendanceMarked ? <Form.Check
                              type="switch"
                              id="custom-switch"
                              checked
                              style={{
                                marginRight: "10px",
                                fontSize: "25px"

                              }}
                            />
                              :
                              <Form.Check
                                type="switch"
                                id="custom-switch"
                                onChange={markAttendence}
                                style={{
                                  marginRight: "10px",
                                  fontSize: "25px"

                                }}
                              />
                          }

                        </div>

                        <Notifications
                          teammate={teammate}
                          id={id}
                          otherNotifications={otherNotifications} />

                        <Dropdown style={{ width: '200px' }}>
                          <Dropdown.Toggle
                            style={{ height: '45px' }}
                            id="dropdown-basic"
                            className="w-100  company-dropdown"
                          >
                            {filter}
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            style={{ width: '200px' }}
                            className="company-dropdown-menu"
                          >
                            <Dropdown.Item
                              onClick={(e) => {
                                setFilter('All')
                              }}
                            >
                              All
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={(e) => {
                                setFilter('On Going')
                              }}
                            >
                              On Going
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={(e) => {
                                setFilter('Assigned')
                              }}
                            >
                              Assigned
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={(e) => {
                                setFilter('Paused')
                              }}
                            >
                              Paused
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={(e) => {
                                setFilter('Done')
                              }}
                            >
                              Done
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                  </Row>
                  <Row className="curve-box-homelist">
                    <Col className="overflow-set-auto table-height2">
                      <Table
                        style={{
                            borderCollapse: 'separate',
                            borderSpacing: '0 20px',
                        }}
                          className="table table-sm table-height2"
                        >
                        <TableHead>
                          <TableRow
                              style={{
                                height: '70px',
                              }}
                            >
                              <TableCell
                              style={{
                                  fontFamily: 'rockwen',
                                  fontWeight: 'bold',
                                }}
                              >
                              Client
                            </TableCell>
                              <TableCell
                              style={{
                                  fontFamily: 'rockwen',
                                  fontWeight: 'bold',
                                }}
                              >
                              Task
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontFamily: 'rockwen',
                                fontWeight: 'bold'
                                }}
                              >
                                Assigned
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                  fontFamily: 'rockwen',
                                fontWeight: 'bold'
                                }}
                              >
                                Deadline
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                  fontFamily: 'rockwen',
                                  fontWeight: 'bold',
                                }}
                              >
                              Corrections
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                  fontFamily: 'rockwen',
                                  fontWeight: 'bold',
                                }}
                              >
                              Status
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                  fontFamily: 'rockwen',
                                  fontWeight: 'bold',
                                }}
                              >
                              Action
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                            {(task === []) ? (
                              <TableRow>
                                <TableCell colSpan={8} align="center" > No tasks assigned</TableCell>
                              </TableRow>
                          ) : (
                                task
                                  ?.filter((info) => {
                                    return filter !== 'All'
                                      ? info.data.status === filter
                                      :
                                      info.data.status !== filter
                                  })
                                  .map((info) => {
                                    return (
                                      <>
                                        <TableRow
                                          style={{
                                            backgroundColor:
                                              info.data
                                                .status !== "DONE"
                                                ? '#fff'
                                                : '#f1f4fb',
                                            height: '70px',
                                          }
                                          }
                                      className="box-shadow"
                                          key={info.id}
                                    >
                                      <TableCell
                                        onClick={() => {
                                          setModalShow(true)
                                              setTaskSelected(info.id)
                                        }}
                                        style={{
                                          fontFamily: 'rockwen',
                                            }} title={info.data.clientName}
                                          > 
                                            {info.data.clientName.length > 23 ? info.data.clientName.slice(0, 20) + "..." : info.data.clientName}
                                      </TableCell>
                                      <TableCell
                                            onClick={() => {

                                          setModalShow(true)
                                              setTaskSelected(info.id)
                                        }}
                                        style={{
                                          fontFamily: 'rockwen',
                                        }}
                                            title={info.data.title}
                                          >
                                            {info.data.title.length > 18 ? info.data.title.slice(0, 15) + "..." : info.data.title}


                                      </TableCell>

                                              <TableCell
                                                onClick={() => {
                                                  setModalShow(true)
                                              setTaskSelected(info.id)
                                                }}
                                                style={{
                                                  fontFamily: 'rockwen',
                                                }}
                                                align="center"
                                          >
                                            {timeStampFormatChange(info.data.assigned)}
                                              </TableCell>
                                              <TableCell
                                                onClick={() => {
                                                  setModalShow(true)
                                              setTaskSelected(info.id)
                                                }}
                                                style={{
                                                  fontFamily: 'rockwen',
                                                }}
                                                align="center"
                                          >
                                            {timeStampFormatChange(info.data.deadline)}
                                              </TableCell>
                                              <TableCell
                                                onClick={() => {
                                                  setModalShow(true)
                                              setTaskSelected(info.id)
                                                }}
                                                style={{
                                                  fontFamily: 'rockwen',
                                                }}
                                                align="center"
                                              >

                                            {info.data.corrections === 0
                                              ? info.data.corrections
                                              : '+' +
                                              info.data.corrections}
                                              </TableCell>
                                              <TableCell
                                                onClick={() => {
                                                  setModalShow(true)
                                              setTaskSelected(info.id)
                                                }}
                                                align="center"
                                                style={
                                                  info.data.status === 'DONE'
                                                    ? {
                                                      color: '#000000',
                                                      fontFamily: 'rockwen',
                                                      fontWeight: 'bold',
                                                    }
                                                    : info.data.status === 'ON_GOING'
                                                      ? {
                                                        color: '#24A43A',
                                                        fontFamily: 'rockwen',
                                                        fontWeight: 'bold',
                                                      }
                                                      : info.data.status === 'PAUSED'
                                                        ? {
                                                          color: '#2972B2',
                                                          fontFamily: 'rockwen',
                                                          fontWeight: 'bold',
                                                        }
                                                        : {
                                                          color: '#D1AE00',
                                                          fontFamily: 'rockwen',
                                                          fontWeight: 'bold',
                                                        }
                                                }
                                              >
                                            {info.data.status === 'DONE' ? (
                                                  <FontAwesomeIcon
                                                    icon="fa-solid fa-circle-check"
                                                    size="2xl"
                                                    style={{
                                                      color: 'blue',
                                                      margin: '.5em',
                                                    }}
                                                  />
                                            ) : (
                                              info.data.status === "ASSIGNED" ? "Assigned" :
                                                info.data.status === "ON_GOING" ? "On Going" :
                                                  info.data.status === "PAUSED" ? "Paused" :
                                                    info.data.status === "DONE" ? "Done" : ""
                                            )}
                                              </TableCell>
                                              <TableCell align="center">
                                                <img
                                                  src={
                                                info.data.status === 'ON_GOING'
                                                      ? paused
                                                      : pause
                                                  }
                                                  alt="play"
                                                  width={30}
                                                  onClick={(e) => {
                                                    playTask(
                                                      e,
                                                      info.id,
                                                      info.updates.length,
                                                    )
                                                  }}
                                                  style={{
                                                    display:
                                                      info.data.status === 'DONE'
                                                        ? 'none'
                                                        : '',
                                                    margin: '.5em',
                                                    cursor: 'pointer',
                                                  }}
                                                />
                                                <img
                                                  src={
                                                info.data.status === 'PAUSED'
                                                      ? played
                                                      : play
                                                  }
                                                  alt="pause"
                                                  width={30}
                                                  onClick={(e) => {
                                                    info.data.status === 'ON_GOING' ?
                                                      pauseTask(
                                                        e,
                                                        info.id,
                                                        info.updates.length,
                                                      ) : doNothing()
                                                  }}
                                                  style={{
                                                    display:
                                                      info.data.status === 'DONE'
                                                        ? 'none'
                                                        : '',
                                                    margin: '.5em',
                                                    cursor: 'pointer',
                                                  }}
                                                />
                                                <img
                                                  src={tick}
                                                  alt="done"
                                                  width={30}
                                                  onClick={(e) => {
                                                    info.data.status !== 'ASSIGNED' ?
                                                      completeTask(
                                                        e,
                                                        info.id,
                                                        info.updates.length,
                                                      ) : doNothing()
                                                  }}
                                                  style={{
                                                    display:
                                                      info.data.status === 'DONE'
                                                        ? 'none'
                                                        : '',
                                                    margin: '.5em',
                                                    cursor: 'pointer',
                                                  }}
                                                />
                                              </TableCell>

                                    </TableRow>
                                    {teammate?.tasks &&
                                      taskSelected !== null ? (
                                      <TeammateTaskHistory
                                        show={modalShow}
                                        onHide={() => {
                                          setModalShow(false)
                                          setTaskSelected(null)
                                        }}
                                              managerid={managerId}
                                              teammateindex={teammateIndex}
                                        indexselected={taskSelected}
                                        teamtasks={teammate.tasks}
                                              name={teammate.teammateName}
                                        designation={teammate.designation}
                                      />
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                )
                              })
                          )}
                        </TableBody>
                      </Table>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Container>
        </div>
      )}
    </>
  )
}
