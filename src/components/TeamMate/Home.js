import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import Dropdown from 'react-bootstrap/Dropdown'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { auth } from '../../firebase-config'
import Loader from '../Loader/Loader'
import NavBar from '../Navs/NavBar'
import pause from '../../assets/images/pause.svg'
import paused from '../../assets/images/paused.svg'
import play from '../../assets/images/play.svg'
import played from '../../assets/images/played.svg'
import tick from '../../assets/images/tick.svg'
import TeammateTaskHistory from './TeammateTaskHistory'
import Notifications from './Notifications'
import { readTask, readTeammate } from '../../database/read/teammateReadFunction'
import { takeTask, pauseTask, taskDone, markTeammateAttendance } from '../../database/write/teammateWriteFunction'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [taskSelected, setTaskSelected] = useState()
  const [user, setUser] = useState()
  const [teammate, setTeammate] = useState({})
  const [teammateId, setTeammateId] = useState('')
  const [filter, setFilter] = useState("All")
  const [modalShow, setModalShow] = useState(false)
  const [otherNotifications, setOtherNotifications] = useState()
  const [attendanceMarked, setAttedancedMarked] = useState(false)
  const [tasks, setTasks] = useState([])

  async function fetchTeammateData(userEmail) {
    try {
      const teammateData = await readTeammate(userEmail);
      setTeammate(teammateData.data);
      setTeammateId(teammateData.id);
      setOtherNotifications(teammateData.data.requests);
      const dat = new Date();
      const today = dat.toLocaleDateString();
      if (teammateData.data.attendanceMarkedDate === today) {
        setAttedancedMarked(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  onAuthStateChanged(auth, (user) => { if (user) { } else { window.location.href = "/" } })

  async function fetchTeammateTask(id) {
    try {
      setTasks(await readTask(id))
    } catch (error) {
      console.error(error);
    }
  }
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

  useEffect(() => {
    fetchTeammateTask(teammateId)
  }, [teammateId]);


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


  const playTask = (id, teammate_id) => {
    var now = new Date()
    takeTask(id, teammate_id, now).then(() => { fetchTeammateTask(teammateId) })
  }

  const pauseTaskNow = (teammate_id) => {
    pauseTask(teammate_id).then(() => { fetchTeammateTask(teammateId) })
  }

  const completeTask = (id) => {
    taskDone(id).then(() => { fetchTeammateTask(teammateId) })
  }

  const doNothing = () => { }

  function markAttendence() {
      const dat = new Date();
    const today = dat.toLocaleDateString();
    markTeammateAttendance(teammate.companyId, teammateId, teammate.currentManagerId, teammate.teammateName, teammate.currentManagerName, teammate.companyName, today, dat)
    setAttedancedMarked(true);
  }

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
                                onChange={() => { markAttendence() }}
                                style={{
                                  marginRight: "10px",
                                  fontSize: "25px"

                                }}
                              />
                          }

                        </div>

                        <Notifications
                          teammate={teammate}
                          id={teammateId}
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
                            {tasks === [] ? (
                              <TableRow>
                                <TableCell colSpan={8} align="center" > No tasks assigned</TableCell>
                              </TableRow>
                          ) : (
                                tasks.filter((info) => {
                                  return (filter !== "All" ?
                                    info.data.status === filter.split(" ").join("_").toUpperCase()
                                    : info.data.status !== filter)
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
                                                      info.id,
                                                      info.data.teammateId
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
                                                      pauseTaskNow(
                                                        info.data.teammateId,
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
                                                        info.id
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
                                        {taskSelected !== null &&
                                      <TeammateTaskHistory
                                        show={modalShow}
                                          onHide={() => { setModalShow(false); setTaskSelected(null); }}
                                          teamtasks={tasks}
                                          id={taskSelected}
                                          name={teammate.teammateName}
                                          email={teammate.teammateEmail}
                                          teammateId={teammateId}
                                          managerId={teammate.currentManagerId}
                                        designation={teammate.designation}
                                        />
                                        }
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
