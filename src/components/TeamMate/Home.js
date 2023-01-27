import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import Dropdown from 'react-bootstrap/Dropdown'
import { onAuthStateChanged } from 'firebase/auth'
import { onValue, ref, update, set } from 'firebase/database'
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

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [taskSelected, setTaskSelected] = useState()
  const [once, setOnce] = useState(true)
  const [once1, setOnce1] = useState(true)
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

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (once) {
        setLoading(true)
        let id = user.email.split('.')
        let newId = id.join('_')
        onValue(ref(db, `/teammate/${newId}`), (snapshot) => {
          if (snapshot.exists()) {
            setId(newId)
            if (snapshot.val().notifications) {
              setOtherNotifications(snapshot.val().notifications)
            }
            setTeammate(snapshot.val())
            if (snapshot.val().link) {
              setManagerId(snapshot.val().link.managerId)
              setTeammateIndex(snapshot.val().link.index)
              getDetails(snapshot.val().link.managerId, snapshot.val().link.index)
            }
            setLoading(false)
          } else {
            setLoading(false)
            console.log('No data available')
          }
        })
        setOnce(false)
      }
    } else {
      window.location.href = '/'
    }
  })

  const getDetails = (managerId, index) => {
    if (once1) {
      setLoading(true)
      onValue(ref(db, `/manager/${managerId}/teammates/${index}/data`), (snapshot) => {
        if (snapshot.exists()) {
          setTeammate(snapshot.val())
          setLoading(false)
        } else {
          setLoading(false)
          console.log('No data available')
        }
      })
      onValue(ref(db, `/manager/${managerId}/clients/`), (snapshot) => {
        if (snapshot.exists()) {
          setClients(snapshot.val())
          setLoading(false)
        } else {
          setLoading(false)
          console.log('No data available')
        }
      })
      onValue(ref(db, `/manager/${managerId}/email`), (snapshot) => {
        if (snapshot.exists()) {
          setManagerEmail(snapshot.val())
          setLoading(false)
        } else {
          setLoading(false)
          console.log('No data available')
        }
      })
      setOnce1(false)
    }
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
                  <h4>${teammate.name} completed the ${teammate.tasks[index].task} task.</h4>
                  <br />
                  <p>Thank you</p>
                `
    const heading = "Teammate Request"
    const text = `${teammate.name} requests you to join his team.Login to your Teambo account to reply to his request.`
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
      update(ref(db, `manager/${managerId}/attendence/${today}/${id}`), { attendanceMarkedTime: dat }).then((res) => {
        console.log(res);
      })
    }
  }
  useEffect(() => {
    const dat = new Date();
    const today = dat.getDate() + "-" + dat.getMonth() + 1 + "-" + dat.getFullYear();
    onValue(ref(db, `manager/${managerId}/attendence/${today}/${id}`), (snapshot) => {
      let data = snapshot.val();
      if (data.attendanceMarkedTime) {
        setAttedencedMarked(true);
      }
    })
  }, [id]);




  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div id="main">
          <NavBar
              user="TEAMMATE"
              user2="TEAMMATE"
            name={teammate.name}
            role={teammate.designation}
            />
            <Container>
            <Container>
              <Row>
                  <Col style={{ marginTop: '1em' }}>
                    <Row>
                      <Col sm="6" md="6" style={{ marginTop: '1em' }}>
                      <h5 className="blue">{teammate.name}</h5>
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
                          otherNotifications={otherNotifications}
                        managerId={managerId}
                          teammateIndex={teammateIndex} />

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
                              align="center"
                              style={{
                                  fontFamily: 'rockwen',
                                  fontWeight: 'bold',
                                }}
                              >
                              Client
                            </TableCell>
                            <TableCell
                              align="center"
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
                                fontWeight: 'bold',
                                }}
                              >
                                Start Time
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                  fontFamily: 'rockwen',
                                  fontWeight: 'bold',
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
                            {(teammate.liveTasks === 0) ? (
                              <TableRow>
                                <TableCell colSpan={8} align="center" > No tasks assigned</TableCell>
                              </TableRow>
                          ) : (
                                teammate?.tasks
                                  ?.filter((info) => {
                                    return filter !== 'All'
                                      ? info.updates[info.updates.length - 1]
                                        ?.status === filter
                                      : info.updates[info.updates.length - 1]
                                        ?.status !== filter
                                  })
                                  .map((info, index) => {
                                    return (
                                      <>
                                        <TableRow
                                          style={(info.updates[
                                            info.updates.length - 1
                                          ].status === "Archived" && {
                                            display: "none"
                                          }) || (info.updates[
                                            info.updates.length - 1
                                          ].status === "Completed" && {
                                            display: "none"
                                          }) || {
                                            backgroundColor:
                                              info.updates[info.updates.length - 1]
                                                .status !== 'Done'
                                                ? '#fff'
                                                : '#f1f4fb',
                                            height: '70px',
                                          }
                                          }
                                      className="box-shadow"
                                      key={index}
                                    >
                                      <TableCell
                                        onClick={() => {
                                          setModalShow(true)
                                          setTaskSelected(index)
                                        }}
                                        style={{
                                          fontFamily: 'rockwen',
                                        }}
                                            align="center" title={info.client}
                                      >
                                            {info.client.length > 23 ? info.client.slice(0, 20) + "..." : info.client}
                                      </TableCell>
                                      <TableCell
                                        onClick={() => {
                                          setModalShow(true)
                                          setTaskSelected(index)
                                        }}
                                        style={{
                                          fontFamily: 'rockwen',
                                        }}
                                        align="center"
                                      >
                                        {info.task}
                                      </TableCell>
                                      {info.updates
                                        .sort((a, b) =>
                                          a.corrections > b.corrections
                                            ? 1
                                            : -1,
                                        )
                                            .filter((info2, index3) => index3 === 0)
                                        .map((info2) => {
                                          return (
                                            <>
                                              <TableCell
                                                onClick={() => {
                                                  setModalShow(true)
                                                  setTaskSelected(index)
                                                }}
                                                style={{
                                                  fontFamily: 'rockwen',
                                                }}
                                                align="center"
                                              >{dateFormatChange(
                                                info.updates[info.updates.length - 1].assignedStartDate,
                                              )}
                                                <br />
                                                {timeFormatChange(
                                                  info.updates[info.updates.length - 1].assignedStartTime,
                                                )}
                                              </TableCell>
                                              <TableCell
                                                onClick={() => {
                                                  setModalShow(true)
                                                  setTaskSelected(index)
                                                }}
                                                style={{
                                                  fontFamily: 'rockwen',
                                                }}
                                                align="center"
                                              > {dateFormatChange(
                                                info.updates[info.updates.length - 1].deadlineDate,
                                              )}
                                                <br />
                                                {timeFormatChange(
                                                  info.updates[info.updates.length - 1].deadlineTime,
                                                )}
                                              </TableCell>
                                              <TableCell
                                                onClick={() => {
                                                  setModalShow(true)
                                                  setTaskSelected(index)
                                                }}
                                                style={{
                                                  fontFamily: 'rockwen',
                                                }}
                                                align="center"
                                              >
                                                +
                                                {
                                                  info.updates[info.updates.length - 1].corrections
                                                }
                                              </TableCell>
                                              <TableCell
                                                onClick={() => {
                                                  setModalShow(true)
                                                  setTaskSelected(index)
                                                }}
                                                align="center"
                                                style={
                                                  info.updates[info.updates.length - 1].status === 'Done'
                                                    ? {
                                                      color: '#000000',
                                                      fontFamily: 'rockwen',
                                                      fontWeight: 'bold',
                                                    }
                                                    : info.updates[info.updates.length - 1].status === 'On Going'
                                                      ? {
                                                        color: '#24A43A',
                                                        fontFamily: 'rockwen',
                                                        fontWeight: 'bold',
                                                      }
                                                      : info.updates[info.updates.length - 1].status === 'Paused'
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
                                                {info.updates[info.updates.length - 1].status === 'Done' ? (
                                                  <FontAwesomeIcon
                                                    icon="fa-solid fa-circle-check"
                                                    size="2xl"
                                                    style={{
                                                      color: 'blue',
                                                      margin: '.5em',
                                                    }}
                                                  />
                                                ) : (
                                                    info.updates[info.updates.length - 1].status
                                                )}
                                              </TableCell>
                                              <TableCell align="center">
                                                <img
                                                  src={
                                                    info.updates[info.updates.length - 1].status === 'On Going'
                                                      ? paused
                                                      : pause
                                                  }
                                                  alt="play"
                                                  width={30}
                                                  onClick={(e) => {
                                                    playTask(
                                                      e,
                                                      index,
                                                      info.updates.length,
                                                    )
                                                  }}
                                                  style={{
                                                    display:
                                                      info.updates[info.updates.length - 1].status === 'Done'
                                                        ? 'none'
                                                        : '',
                                                    margin: '.5em',
                                                    cursor: 'pointer',
                                                  }}
                                                />
                                                <img
                                                  src={
                                                    info.updates[info.updates.length - 1].status === 'Paused'
                                                      ? played
                                                      : play
                                                  }
                                                  alt="pause"
                                                  width={30}
                                                  onClick={(e) => {
                                                    info.updates[info.updates.length - 1].status === 'On Going' ?
                                                      pauseTask(
                                                        e,
                                                        index,
                                                        info.updates.length,
                                                      ) : doNothing()
                                                  }}
                                                  style={{
                                                    display:
                                                      info.updates[info.updates.length - 1].status === 'Done'
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
                                                    info.updates[info.updates.length - 1].status !== 'Assigned' ?
                                                      completeTask(
                                                        e,
                                                        index,
                                                        info.updates.length,
                                                      ) : doNothing()
                                                  }}
                                                  style={{
                                                    display:
                                                      info.updates[info.updates.length - 1].status === 'Done'
                                                        ? 'none'
                                                        : '',
                                                    margin: '.5em',
                                                    cursor: 'pointer',
                                                  }}
                                                />
                                              </TableCell>
                                            </>
                                          )
                                        })}
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
                                              name={teammate.name}
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
