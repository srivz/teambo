import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { ref, set } from 'firebase/database'
import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { db } from '../../firebase-config'
import moment from 'moment'

export default function TaskHistory(props) {
  var today = new Date()
  const [showDoubt, setShowDoubt] = useState(false)
  const handleClose = () => setShowDoubt(false);
  const handleShow = () => setShowDoubt(true);
  const [updateTaskForm, setUpdateTaskForm] = useState(false)
  const [updateAdditionalTaskForm, setUpdateAdditionalTaskForm] = useState(false)
  const [taskUpdate, setTaskUpdate] = useState({
    corrections: '',
    status: 'Assigned',
    assignedDate: props?.teamtasks[props?.indexselected]?.updates.assignedDate,
    assignedTime: props?.teamtasks[props?.indexselected]?.updates.assignedTime,
    deadlineDate: '--',
    description: '',
    deadlineTime: '--',
  })
  const dateFormatChange = (date) => {
    if (date === '--' || !date) {
      return '--'
    }
    let givenDate = date.split('/')
    let months = [
      '-',
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
    if (time === '--' || !time) {
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

  const handleTaskCorrection = (id, index, correction) => {
    set(ref(db, `/manager/${props?.managerId}/teammates/${props?.teammateIndex}/data/tasks/${index}/updates/${correction}`), {
      assignedDate:
        String(today.getDate()).padStart(2, '0') +
        '/' +
        String(today.getMonth() + 1).padStart(2, '0') +
        '/' +
        today.getFullYear(),
      assignedTime:
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
      corrections: props?.teamtasks[props?.indexselected]?.updates?.length,
      status: 'Assigned',
      deadlineDate: taskUpdate.deadlineDate,
      description: { 0: taskUpdate.description },
      deadlineTime: taskUpdate.deadlineTime,
    })
      .then(() => { setUpdateTaskForm(false); setUpdateAdditionalTaskForm(false); })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleTaskCorrection1 = (id, index, correction) => {
    set(ref(db, `/manager/${props?.managerId}/teammates/${props?.teammateIndex}/data/tasks/${index}/updates/${correction - 1}/`), {
      assignedDate:
        String(today.getDate()).padStart(2, '0') +
        '/' +
        String(today.getMonth() + 1).padStart(2, '0') +
        '/' +
        today.getFullYear(),
      assignedTime:
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
      corrections: correction - 1,
      status: props?.teamtasks[props?.indexselected]?.updates[0].status,
      deadlineDate: props?.teamtasks[props?.indexselected]?.updates[0].deadlineDate,
      description: [taskUpdate.description].concat(props?.teamtasks[props?.indexselected]?.updates[0].description),
      deadlineTime: props?.teamtasks[props?.indexselected]?.updates[0].deadlineTime,
    })
      .then(() => { setUpdateTaskForm(false); setUpdateAdditionalTaskForm(false); })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleTaskCorrectionClear = () => {
    setTaskUpdate({
      corrections: '',
      deadlineDate: '--',
      description: '',
      deadlineTime: '--',
    })
    setUpdateTaskForm(false)
    setUpdateAdditionalTaskForm(false)
  }
  const handleAdditionalTaskCorrection1 = (id, index, correction) => {
    set(ref(db, `/manager/${props?.managerId}/teammates/${props?.teammateIndex}/data/tasks/${index}/updates/${correction - 1}/description/`),
      [taskUpdate.description].concat(props?.teamtasks[props?.indexselected]?.updates[0].description))
      .then(() => {
        set(ref(db, `/manager/${props?.managerId}/teammates/${props?.teammateIndex}/data/tasks/${index}/query/`), null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleDateChange = (event) => {
    let date = event.target.value.split('-')
    taskUpdate.deadlineDate = date[2] + '/' + date[1] + '/' + date[0]
  }
  const handleChange = (event) => {
    let newInput = { [event.target.name]: event.target.value }
    setTaskUpdate({ ...taskUpdate, ...newInput })
  }
  const handleChange1 = (event) => {
    let newInput = { [event.target.name]: event.target.value }
    setTaskUpdate({ ...taskUpdate, ...newInput })
  }
  const descriptionList = (array) => {
    return <p>{array}<br /></p>
  }
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <Button variant="light" onClick={props?.onHide}>
              <FontAwesomeIcon icon="fa-solid fa-chevron-left" />{" "}
              Close
            </Button>
            <Button variant="light" onClick={() => { handleShow() }}
              style={
                props?.teamtasks[props?.indexselected]?.query
                  ? {
                    border: '1px solid #9b9b9b',
                    color: 'black',
                    fontFamily: 'rockwen',
                    fontWeight: 'bold',
                    padding: '.5em',
                    paddingLeft: '1.5em',
                    borderRadius: '15px',
                    position: "absolute",
                    right: "1em"
                  }
                  : {
                    border: '1px solid #9b9b9b',
                    color: 'black',
                    fontFamily: 'rockwen',
                    fontWeight: 'bold',
                    padding: '.5em',
                    borderRadius: '15px',
                    position: "absolute",
                    right: "1em"
                  }
              }>
              <FontAwesomeIcon
                className="pointer"
                icon="fa-regular fa-envelope"
                size="2xl" />
              {props?.teamtasks[props?.indexselected]?.query ?
                (
                  <div style={{ marginBottom: "5px", marginLeft: "5px" }} class="notification-dot"></div>
                ) :
                (
                  <></>
                )
              }
            </Button>
            <Modal show={showDoubt}
              backdrop="static" onHide={() => { handleClose() }}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                {props?.teamtasks[props?.indexselected]?.query ?
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Teammate has a query:<br />"{props?.teamtasks[props?.indexselected]?.query}"</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        onChange={handleChange1}
                        rows={3} />
                    </Form.Group>
                    <Button variant="primary" onClick={() => {
                      handleAdditionalTaskCorrection1(
                        props?.id,
                        props?.indexselected,
                        props?.teamtasks[props?.indexselected]?.updates?.length,
                      )
                    }}>
                      Send
                    </Button>
                  </Form>
                  : <>No Queries From The Teammate</>}
              </Modal.Body>
            </Modal>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "1.5em", marginLeft: "1.5em", marginRight: "1.5em" }}>
          <Row style={{ padding: "auto", margin: "auto" }}>
            <Col sm={6} md={6} style={{ marginTop: '1em' }}>
              <h5>{props?.name}</h5>
              <h6>{props?.designation}</h6>
            </Col>
            <Col
              sm={6}
              md={6}
              style={{ marginTop: '1em' }}
              className="text-end"
            >
              <Form.Group
                as={Row}
                className="mb-3 deadline"
                controlId="formPlaintext3"
              >
                <Form.Label column md="4" sm="4">
                  Client Email
                </Form.Label>
                <Col sm="8" md="8">
                  <Form.Control
                    type="text"
                    defaultValue={props?.teamtasks[props?.indexselected]?.clientEmail}
                    name="clientEmail"
                    disabled
                  // onChange={handleclientEmailChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ paddingLeft: ".5em", alignItems: "bottom" }}>
            <Col sm={1} md={1} style={{ marginTop: '1em' }}>
              <h6>Client</h6>
            </Col>
            <Col sm={3} md={3} style={{ marginTop: '.75em' }}>
              <h5>{props?.teamtasks[props?.indexselected]?.client}</h5>
            </Col>
            <Col sm={1} md={1} style={{ marginTop: '1em' }}>
              <h6>Task</h6>
            </Col>
            <Col sm={3} md={3} style={{ marginTop: '.75em' }}>
              <div className={props?.teamtasks[props?.indexselected]?.task.length > 20 ? 'marquee' : ''}><h5>{props?.teamtasks[props?.indexselected]?.task}</h5></div>
            </Col>
            <Col sm={1} md={1} style={{ marginTop: '1em' }}>
              <h6>Status</h6>
            </Col>
            <Col sm={3} md={3} style={{ marginTop: '.75em' }}>
              {props?.teamtasks[props?.indexselected]?.updates
              .sort((a, b) => (a.corrections > b.corrections ? -1 : 1))
              .filter((info, index) => { return (index === 0) })
              .map((info) => {
                return (<>
                  <h5
                    style={
                      (info.status === 'Done' && {
                        fontFamily: 'rockwen',
                        color: '#000000',
                      }) ||
                      (info.status === 'Completed' && {
                        fontFamily: 'rockwen',
                        color: '#000000',
                      }) ||
                      (info.status === 'On Going' && {
                        fontFamily: 'rockwen',
                        color: '#24A43A',
                      }) ||
                      (info.status === 'Paused' && {
                        fontFamily: 'rockwen',
                        color: '#2972B2',
                      }) ||
                      (info.status === 'Assigned' && {
                        fontFamily: 'rockwen',
                        color: '#D1AE00',
                      })
                    }
                  >
                    {
                      info.status
                    }
                  </h5></>)
              })}

            </Col>
          </Row>
          <Table
            style={{
              borderCollapse: 'separate',
              borderSpacing: '0 10px',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    width: '100px',
                    fontFamily: 'rockwen',
                  }}
                >
                  Corrections
                </TableCell>
                <TableCell
                  style={{
                    width: '200px',
                    fontFamily: 'rockwen',
                  }}
                  align="center"
                >
                  Description
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'rockwen',
                  }}
                  align="center"
                >
                  Start Time
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'rockwen',
                  }}
                  align="center"
                >
                  Deadline
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'rockwen',
                  }}
                  align="center"
                >
                  Completed
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={7}>
                  <Row className="d-grid gap-2">
                    {props?.teamtasks[props?.indexselected]?.updates
                      .sort((a, b) => (a.corrections > b.corrections ? -1 : 1))
                      .filter((info, index) => { return (index === 0) })
                      .map((info, index) => {
                        return (<>
                          {info.status === 'Done' ? <Button style={info.status === 'Completed'
                            ? { display: 'none' }
                            : { display: 'auto' }}
                            disabled={
                              info.status !== 'Done' || updateTaskForm
                            }
                            onClick={() => { setUpdateTaskForm(true); setUpdateAdditionalTaskForm(false); }}
                            variant="outline-primary"
                            block
                          >
                            + Add Correction
                          </Button> : <></>
                          }
                          {info.status !== 'Done' ? <Button
                            style={info.status === 'Completed'
                              ? { display: 'none' }
                              : { display: 'auto' }}
                            disabled={updateAdditionalTaskForm}
                            onClick={() => setUpdateAdditionalTaskForm(true)}
                            variant="outline-primary"
                            block
                          >
                            + Add Additional Correction
                          </Button> : <></>
                          }</>)
                      })}
                  </Row>
                </TableCell>
              </TableRow>
              {updateTaskForm ? (
                <TableRow>
                  <TableCell
                    style={{
                      width: '100px',
                      fontFamily: 'rockwen',
                    }}
                    align="center"
                  >
                    +{props?.teamtasks[props?.indexselected]?.updates?.length}
                  </TableCell>
                  <TableCell
                    style={{
                      width: '200px',
                      fontFamily: 'rockwen',
                    }}
                    align="center"
                  >
                    <Form.Control
                      as="textarea"
                      name="description"
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: 'rockwen',
                    }}
                    align="center"
                  ></TableCell>
                  <TableCell
                    style={{
                      fontFamily: 'rockwen',
                    }}
                    align="center"
                  >
                    <Row className="justify-content-md-center">
                      <Col sm={10}>
                        <Form.Control
                          type="date"
                          min={moment().format('YYYY-MM-DD')}
                          name="deadlineDate"
                          style={{ fontSize: '12px' }}
                          onChange={handleDateChange}
                        />
                      </Col>
                    </Row>
                    <br />
                    <Row className="justify-content-md-center">
                      <Col sm={10}>
                        <Form.Control
                          type="time"
                          name="deadlineTime"
                          style={{ fontSize: '12px' }}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: 'rockwen',
                    }}
                    align="center"
                  >
                    <FontAwesomeIcon
                      className="pointer"
                      onClick={() =>
                        handleTaskCorrection(
                          props?.id,
                          props?.indexselected,
                          props?.teamtasks[props?.indexselected]?.updates?.length,
                        )
                      }
                      size="2xl"
                      style={{
                        color: 'blue',
                        paddingRight: '.25em',
                      }}
                      icon="fa-solid fa-square-check"
                    />
                    <FontAwesomeIcon
                      className="pointer"
                      onClick={handleTaskCorrectionClear}
                      icon="fa-solid fa-square-xmark"
                      size="2xl"
                      style={{
                        color: 'red',
                        paddingRight: '.25em',
                      }}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <></>
              )}
              {updateAdditionalTaskForm ? (
                <TableRow>
                  <TableCell
                    style={{
                      width: '100px',
                      fontFamily: 'rockwen',
                    }}
                    align="center"
                  >
                  </TableCell>
                  <TableCell
                    style={{
                      width: '200px',
                      fontFamily: 'rockwen',
                    }}
                    align="center"
                  >
                    <Form.Control
                      as="textarea"
                      name="description"
                      onChange={handleChange1}
                    />
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: 'rockwen',
                    }}
                    align="center"
                  ></TableCell>
                  <TableCell
                    style={{
                      fontFamily: 'rockwen',
                    }}
                    align="center"
                  >
                    <Row className="justify-content-md-center">
                      <Col sm={10}>

                      </Col>
                    </Row>
                    <br />
                    <Row className="justify-content-md-center">
                      <Col sm={10}>

                      </Col>
                    </Row>
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: 'rockwen',
                    }}
                    align="center"
                  >
                    <FontAwesomeIcon
                      className="pointer"
                      onClick={() =>
                        handleTaskCorrection1(
                          props?.id,
                          props?.indexselected,
                          props?.teamtasks[props?.indexselected]?.updates?.length,
                        )
                      }
                      size="2xl"
                      style={{
                        color: 'blue',
                        paddingRight: '.25em',
                      }}
                      icon="fa-solid fa-square-check"
                    />
                    <FontAwesomeIcon
                      className="pointer"
                      onClick={() => handleTaskCorrectionClear()}
                      icon="fa-solid fa-square-xmark"
                      size="2xl"
                      style={{
                        color: 'red',
                        paddingRight: '.25em',
                      }}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <></>
              )}

              {props?.teamtasks[props?.indexselected]?.updates
                .sort((a, b) => (a.corrections > b.corrections ? -1 : 1))
                .map((info, index) => {
                  return (
                    <TableRow style={index !== 0 ? { opacity: '50%' } : {}}>
                      <TableCell
                        style={{
                          width: '100px',
                          fontFamily: 'rockwen',
                        }}
                        align="center"
                      >
                        {info.corrections === '0'
                          ? '0'
                          : '+' + info.corrections}
                      </TableCell>
                      <TableCell
                        style={{
                          width: '200px',
                          fontFamily: 'rockwen',
                        }}
                        align="center"
                      >{info.description.map(descriptionList)}
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: 'rockwen',
                        }}
                        align="center"
                      >
                        {dateFormatChange(info.assignedDate)}
                        <br />
                        {timeFormatChange(info.assignedTime)}
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: 'rockwen',
                        }}
                        align="center"
                      >
                        {dateFormatChange(info.deadlineDate)}
                        <br />
                        {timeFormatChange(info.deadlineTime)}
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: 'rockwen',
                        }}
                        align="center"
                      >
                        {info.status === 'Done' ||
                          info.status === 'Completed' ? (
                          dateFormatChange(info.endDate)
                        ) : (
                          <br />
                        )}
                        <br />
                        {info.status === 'Done' ||
                          info.status === 'Completed' ? (
                          timeFormatChange(info.endTime)
                        ) : (
                          <br />
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  )
}
