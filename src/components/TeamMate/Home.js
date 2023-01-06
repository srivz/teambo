import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import Dropdown from 'react-bootstrap/Dropdown'
import { onAuthStateChanged } from 'firebase/auth'
import { onChildChanged, onValue, ref, remove, update } from 'firebase/database'
import React, { useState } from 'react'
import { Badge, Col, Container, Offcanvas, Row } from 'react-bootstrap'
import { auth, db } from '../../firebase-config'
import Loader from '../Loader/Loader'
import NavBar from '../Navs/NavBar'
import pause from '../../assets/images/pause.svg'
import paused from '../../assets/images/paused.svg'
import play from '../../assets/images/play.svg'
import played from '../../assets/images/played.svg'
import tick from '../../assets/images/tick.svg'
import TeammateTaskHistory from './TeammateTaskHistory'

export default function Home() {
  var today = new Date()
  const [loading, setLoading] = useState(true)
  const [taskSelected, setTaskSelected] = useState()
  const [once, setOnce] = useState(true)
  const [once2, setOnce2] = useState(true)
  const [teammate, setTeammate] = useState({})
  const [id, setId] = useState('')

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [filter, setFilter] = useState('All')
  const [modalShow, setModalShow] = useState(false)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (once) {
        setLoading(true)
        let id = user.email.split('.')
        let newId = id.join('_')
        onValue(ref(db, `teammate/${newId}`), (snapshot) => {
          if (snapshot.exists()) {
            setTeammate(snapshot.val())
            setId(newId)
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

  const acceptChange = (managerId, managerTeam) => {
    if (managerTeam === undefined) {
      update(ref(db, `manager/${managerId}/`), { teammates: [id] })
      remove(ref(db, `teammate/${id}/requests/`))
      setLoading(false)
    } else {
      let newArr = []
      let exists = false
      managerTeam.forEach((element) => {
        if (element === id) {
          exists = true
        }
        newArr.push(element)
      })
      if (exists) {
        setLoading(false)
      } else {
        let newArr2 = [...newArr, id]
        update(ref(db, `manager/${managerId}/`), { teammates: newArr2 })
        remove(ref(db, `teammate/${id}/requests/`))
        setLoading(false)
      }
    }
  }
  const accept = (managerId) => {
    setLoading(true)
    if (once2) {
      onValue(ref(db, `manager/${managerId}`), (snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val()
          acceptChange(managerId, data.teammates)
        } else {
          alert('No manager found')
          setLoading(false)
        }
      })
      setOnce2(false)
    }
    setLoading(false)
  }

  const reject = (index) => {
    remove(ref(db, `teammate/${id}/requests/${index}`))
  }

  onChildChanged(ref(db, `/teammate/${id}`), () => {
    window.location.reload()
  })

  const playTask = (e, index, length) => {
    var timeInMs = today.getTime()
    var time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    teammate.tasks.forEach((task, i) => {
      if (i === index) {
        update(ref(db, `teammate/${id}/tasks/${index}/updates/${length - 1}`), {
          status: 'On Going',
          startTime: time,
          startTimeInMs: timeInMs,
        })
      } else if (task.updates[task.updates.length - 1].status === 'On Going') {
        update(
          ref(
            db,
            `teammate/${id}/tasks/${i}/updates/${task.updates.length - 1}`,
          ),
          {
            status: 'Paused',
          },
        )
      }
    })
  }

  function getHourFormatFromMilliSeconds(millisec) {
    var seconds = (millisec / 1000).toFixed(0)
    var minutes = Math.floor(Number(seconds) / 60).toString()
    let hours
    if (Number(minutes) > 59) {
      hours = Math.floor(Number(minutes) / 60)
      hours = hours >= 10 ? hours : '0' + hours
      minutes = (Number(minutes) - hours * 60).toString()
      minutes = Number(minutes) >= 10 ? minutes : '0' + minutes
    }
    seconds = Math.floor(Number(seconds) % 60).toString()
    seconds = Number(seconds) >= 10 ? seconds : '0' + seconds
    if (!hours) {
      hours = '00'
    }
    if (!minutes) {
      minutes = '00'
    }
    if (!seconds) {
      seconds = '00'
    }
    return hours + ':' + minutes + ':' + seconds
  }

  const pauseTask = (e, index, length) => {
    var timeInMs = today.getTime()
    var stTime =
      teammate.tasks[index].updates[teammate.tasks[index].updates.length - 1]
        .startTimeInMs
    var totTime = timeInMs - stTime
    if (
      teammate.tasks[index].updates[teammate.tasks[index].updates.length - 1]
        .totalTimeInMs
    ) {
      totTime =
        totTime +
        teammate.tasks[index].updates[teammate.tasks[index].updates.length - 1]
          .totalTimeInMs
    }
    var timeGapInMs = totTime
    var timeGap = getHourFormatFromMilliSeconds(totTime)
    update(ref(db, `teammate/${id}/tasks/${index}/updates/${length - 1}`), {
      status: 'Paused',
      totalTime: timeGap,
      totalTimeInMs: timeGapInMs,
    })
  }

  const completeTask = (e, index, length) => {
    update(ref(db, `teammate/${id}/tasks/${index}/updates/${length - 1}`), {
      status: 'Done',
      totalTimeInMs: 0,
      startTime: null,
      startTimeInMs: null,
      endDate:
        String(today.getDate()).padStart(2, '0') +
        '/' +
        String(today.getMonth() + 1).padStart(2, '0') +
        '/' +
        today.getFullYear(),
      endTime:
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
    })
  }

  const dateFormatChange = (date) => {
    if (date === '--') {
      return '--'
    }
    let givenDate = date.split('/')
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
    if (time === '--') {
      return '--'
    }
    let givenTime = time.split(':')
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
              <Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Requests</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {!teammate.requests ? (
                  <Row
                    style={{
                        boxShadow: 'rgba(0, 0, 0, 0.55) 0px 1px 3px',
                        margin: '.5em',
                        color: 'black',
                        padding: '1em',
                        fontFamily: 'rockwen',
                        border: '2px black',
                    }}
                      align="center"
                    >
                    No Requests Available
                  </Row>
                ) : (
                  teammate.requests.map((info, index) => {
                    return (
                      <>
                        <Row
                          style={{
                            boxShadow: 'rgba(0, 0, 0, 0.55) 0px 1px 3px',
                            margin: '.5em',
                            color: 'black',
                            padding: '1em',
                            fontFamily: 'rockwen',
                            border: '2px black',
                          }}
                          key={index}
                        >
                          <Col md={8} sm={8}>
                            {info.managerName}
                          </Col>
                          <Col md={2} sm={2}>
                            <Badge
                              as="button"
                              onClick={() => {
                                reject(index)
                              }}
                              style={{
                                padding: '.5em',
                                color: 'black',
                                fontFamily: 'rockwen',
                                fontWeight: 'bold',
                                borderRadius: '25px',
                              }}
                              bg="light"
                            ><FontAwesomeIcon
                                className="pointer"
                                size="xl"
                                icon="fa-solid fa-circle-xmark" />
                            </Badge>
                          </Col>
                          <Col md={2} sm={2}>
                            <Badge
                              as="button"
                              onClick={() => {
                                accept(info.managerId)
                              }}
                              style={{
                                padding: '.5em',
                                color: 'black',
                                fontFamily: 'rockwen',
                                fontWeight: 'bold',
                                borderRadius: '25px',
                              }}
                              bg="light"
                            ><FontAwesomeIcon
                                className="pointer"
                                size="xl"
                                icon="fa-solid fa-circle-check"
                              />
                            </Badge>
                          </Col>
                        </Row>
                        <br />
                      </>
                    )
                  })
                )}
              </Offcanvas.Body>
            </Offcanvas>
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
                        <Dropdown style={{ width: '200px', marginRight: '1em' }}>
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
                            <Dropdown.Item
                              onClick={(e) => {
                                setFilter('Completed')
                              }}
                            >
                              Completed
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      <Badge
                        as="button"
                        onClick={handleShow}
                        style={{
                          color: 'black',
                          fontFamily: 'rockwen',
                          fontWeight: 'bold',
                          borderRadius: '25px',
                        }}
                          bg="light"
                        >
                        {!teammate.requests ? 0 : teammate.requests.length}
                        </Badge>
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
                              Date
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                  fontFamily: 'rockwen',
                                  fontWeight: 'bold',
                                }}
                              >
                              Time
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
                          {!teammate.tasks ? (
                              <TableRow colSpan={7} align="center">
                              No tasks right now
                            </TableRow>
                          ) : (
                            teammate.tasks
                                  .filter((info) => {
                                    return filter !== 'All'
                                      ? info.updates[info.updates.length - 1]
                                        .status === filter
                                      : info.updates[info.updates.length - 1]
                                        .status !== filter
                                  })
                                  .map((info, index) => {
                                    return (
                                      <>
                                        <TableRow
                                          style={{
                                            backgroundColor:
                                              info.updates[info.updates.length - 1]
                                            .status !== 'Done'
                                            ? '#fff'
                                            : '#f1f4fb',
                                        height: '70px',
                                      }}
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
                                        align="center"
                                      >
                                        {info.client}
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
                                        .filter((info2, index) => index === 0)
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
                                              >
                                                {dateFormatChange(
                                                  info.updates[
                                                    info.updates.length - 1
                                                  ].deadlineDate,
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
                                                {timeFormatChange(
                                                  info.updates[
                                                    info.updates.length - 1
                                                  ].deadlineTime,
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
                                                  info.updates[
                                                    info.updates.length - 1
                                                  ].corrections
                                                }
                                              </TableCell>
                                              <TableCell
                                                onClick={() => {
                                                  setModalShow(true)
                                                  setTaskSelected(index)
                                                }}
                                                align="center"
                                                style={
                                                  info.updates[
                                                    info.updates.length - 1
                                                  ].status === 'Done'
                                                    ? {
                                                      color: '#000000',
                                                      fontFamily: 'rockwen',
                                                      fontWeight: 'bold',
                                                    }
                                                    : info.updates[
                                                      info.updates.length - 1
                                                    ].status === 'Completed'
                                                      ? {
                                                        color: '#000000',
                                                        fontFamily: 'rockwen',
                                                        fontWeight: 'bold',
                                                      }
                                                      : info.updates[
                                                        info.updates.length - 1
                                                      ].status === 'On Going'
                                                        ? {
                                                          color: '#24A43A',
                                                          fontFamily: 'rockwen',
                                                          fontWeight: 'bold',
                                                        }
                                                        : info.updates[
                                                          info.updates.length - 1
                                                        ].status === 'Paused'
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
                                                {info.updates[
                                                  info.updates.length - 1
                                                ].status === 'Done' ? (
                                                  <FontAwesomeIcon
                                                    icon="fa-solid fa-circle-check"
                                                    size="2xl"
                                                    style={{
                                                      color: 'blue',
                                                      margin: '.5em',
                                                    }}
                                                  />
                                                ) : (
                                                  info.updates[
                                                    info.updates.length - 1
                                                  ].status
                                                )}
                                              </TableCell>
                                              <TableCell align="center">
                                                <img
                                                  src={
                                                    info.updates[
                                                      info.updates.length - 1
                                                    ].status === 'On Going'
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
                                                      info.updates[
                                                        info.updates.length - 1
                                                      ].status === 'Done' ||
                                                        info.updates[
                                                          info.updates.length - 1
                                                        ].status === 'Completed'
                                                        ? 'none'
                                                        : '',
                                                    margin: '.5em',
                                                    cursor: 'pointer',
                                                  }}
                                                />
                                                <img
                                                  src={
                                                    info.updates[
                                                      info.updates.length - 1
                                                    ].status === 'Paused'
                                                      ? played
                                                      : play
                                                  }
                                                  alt="pause"
                                                  width={30}
                                                  onClick={(e) => {
                                                    pauseTask(
                                                      e,
                                                      index,
                                                      info.updates.length,
                                                    )
                                                  }}
                                                  style={{
                                                    display:
                                                      info.updates[
                                                        info.updates.length - 1
                                                      ].status === 'Done' ||
                                                        info.updates[
                                                          info.updates.length - 1
                                                        ].status === 'Completed'
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
                                                    completeTask(
                                                      e,
                                                      index,
                                                      info.updates.length,
                                                    )
                                                  }}
                                                  style={{
                                                    display:
                                                      info.updates[
                                                        info.updates.length - 1
                                                      ].status === 'Done' ||
                                                        info.updates[
                                                          info.updates.length - 1
                                                        ].status === 'Completed'
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
