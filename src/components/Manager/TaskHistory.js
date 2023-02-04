import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { auth } from '../../firebase-config'
import moment from 'moment'
import { addAdditionalCorrection, addQueryReply } from '../../database/write/managerWriteFunctions'

export default function TaskHistory(props) {
  const [showDoubt, setShowDoubt] = useState(false)
  const handleClose = () => setShowDoubt(false);
  const handleShow = () => setShowDoubt(true);
  const [updateTaskForm, setUpdateTaskForm] = useState(false)
  const [updateAdditionalTaskForm, setUpdateAdditionalTaskForm] = useState(false)
  const [taskUpdate, setTaskUpdate] = useState({
    corrections: '',
    status: 'Assigned',
    deadlineDate: '--',
    description: '',
    deadlineTime: '--',
  })
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
  // const handleTaskCorrection = (id, index, correction) => {
  // }
  const handleAdditionalTaskCorrection = (id) => {
    let now = new Date();
    let newDate = "--"
    if (taskUpdate.deadlineDate !== "--" && taskUpdate.deadlineTime !== "--") {
      let date = taskUpdate.deadlineDate + " " + taskUpdate.deadlineTime + ":00"
      newDate = new Date(date);
    }
    addAdditionalCorrection(id, newDate, now, props.managerId, auth.currentUser.email, props.teammateId, taskUpdate.description, "DESCRIPTION_ADDED")
    handleTaskCorrectionClear();
  }

  const handleQuery = (id, queryId) => {
    let now = new Date();
    addQueryReply(id, now, props.managerId, auth.currentUser.email, props.teammateId, taskUpdate.description, queryId, "QUERY_REPLIED")
    handleTaskCorrectionClear();
  }
  const handleTaskCorrectionClear = () => {
    setTaskUpdate({
      corrections: '',
      deadlineDate: '--',
      deadlineTime: '--',
      assignedStartDate: '--',
      assignedStartTime: '--',
      description: '',
    })
    setUpdateTaskForm(false)
    setUpdateAdditionalTaskForm(false)
  }
  const handleDateChange = (event) => {
    let date = event.target.value.split('-')
    taskUpdate.deadlineDate = date[1] + '/' + date[2] + '/' + date[0]
  }
  const handleChange = (event) => {
    let newInput = { [event.target.name]: event.target.value }
    setTaskUpdate({ ...taskUpdate, ...newInput })
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
                [props.teamtasks.filter((info) => { return (props?.id === info.id) })
                  .map((info) => {
                    return (info.communications.filter((info1) => { return (info1.data.type === "QUERY_ADDED") })
                      .map((info1) => { return (info1.data.query) }))
                  })] === []
                  ? {
                    border: '1px solid #9b9b9b',
                    color: 'black',
                    fontFamily: 'rockwen',
                    fontWeight: 'bold',
                    borderRadius: '15px',
                    position: "absolute",
                    right: "1em"
                  }
                  : {
                    border: '1px solid #9b9b9b',
                    color: 'black',
                    fontFamily: 'rockwen',
                    fontWeight: 'bold',
                    borderRadius: '15px',
                    position: "absolute",
                    right: "1em"
                  }
              }>
              <FontAwesomeIcon
                className="pointer"
                icon="fa-regular fa-envelope"
                size="xl" />
              {[props.teamtasks.filter((info) => { return (props?.id === info.id) })
                .map((info) => {
                  return (info.communications.filter((info1) => { return (info1.data.type === "QUERY_ADDED") })
                    .map((info1) => { return (info1.data.query) }))
                })] === [] ?
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
                {[props.teamtasks.filter((info) => { return (props?.id === info.id) })
                  .map((info) => {
                    return (info.communications.filter((info1) => { return (info1.data.type === "QUERY_ADDED") })
                      .map((info1) => { return (info1.data.query) }))
                  })] === [] ?

                  props.teamtasks.filter((info) => { return (props?.id === info.id) })
                    .map((info) => {
                      return (
                        info.communications.filter((info1) => { return (info1.data.type === "QUERY_ADDED") && (info1.data.isVisible === true) })
                          .map((info1) => {
                            return (<div key={info1.id}>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                                  <Form.Label>Teammate has a query:<br />"{info1.data.query}"</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        onChange={handleChange}
                        rows={3} />
                    </Form.Group>
                    <Button variant="primary" onClick={() => {
                                  handleQuery(
                                    info.id, info1.id
                                  )
                    }}>
                      Send
                    </Button>
                              </Form></div>)
                          }))
                    })

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
          </Row>
          {props?.teamtasks?.filter((info) => { return (props?.id === info.id) }).map((info) => {
            return (
              <Row style={{ paddingLeft: ".5em", alignItems: "bottom" }} key={info.id}>
            <Col sm={1} md={1} style={{ marginTop: '1em' }}>
              <h6>Client</h6>
            </Col>
                <Col sm={3} md={3} style={{ marginTop: '.75em' }} title={info.data.clientName}>
                  <h5>{info.data.clientName.length > 15 ? info.data.clientName.slice(0, 12) + "..." : info.data.clientName}
              </h5>
            </Col>
            <Col sm={1} md={1} style={{ marginTop: '1em' }}>
              <h6>Task</h6>
            </Col>
                <Col sm={3} md={3} style={{ marginTop: '.75em' }} title={info.data.title}>
                  {info.data.title.length > 20 ? info.data.title.slice(0, 17) + "..." : info.data.title}
            </Col>
            <Col sm={1} md={1} style={{ marginTop: '1em' }}>
              <h6>Status</h6>
            </Col>
                <Col sm={3} md={3} style={{ marginTop: '.75em' }}>
                    <h5
                      style={
                      (info.data.status === 'DONE' && {
                          fontFamily: 'rockwen',
                          color: '#000000',
                        }) ||
                      (info.data.status === 'ON_GOING' && {
                          fontFamily: 'rockwen',
                          color: '#24A43A',
                        }) ||
                      (info.data.status === 'PAUSED' && {
                          fontFamily: 'rockwen',
                          color: '#2972B2',
                        }) ||
                      (info.data.status === 'ASSIGNED' && {
                          fontFamily: 'rockwen',
                          color: '#D1AE00',
                        })
                      }
                    >
                    {
                      info.data.status === "ASSIGNED" ? "Assigned" :
                        info.data.status === "ON_GOING" ? "On Going" :
                          info.data.status === "PAUSED" ? "Paused" :
                            info.data.status === "DONE" ? "Done" : ""
                      }
                  </h5>

            </Col>
              </Row>)
          })}
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
                  Assigned
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
                    {props?.teamtasks.filter((info) => { return (info.id === props?.id) })
                      .map((info) => {
                        return (<>
                          {info.data.status === 'DONE' ? <Button
                            disabled={
                              info.data.status !== 'DONE' || updateTaskForm
                            }
                            onClick={() => { setUpdateTaskForm(true); setUpdateAdditionalTaskForm(false); }}
                            variant="outline-primary"
                            block
                          >
                            + Add Correction
                          </Button> : <></>
                          }
                          {info.data.status !== 'DONE' ? <Button
                            disabled={updateAdditionalTaskForm}
                            onClick={() => { setUpdateAdditionalTaskForm(true); }}
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
                    +{props?.teamtasks.filter((info) => { return (info.id === props?.id) })
                      .map((info, index) => {
                        return (info.data.corrections)
                      })}
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
                  >
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
                      // onClick={() =>
                        // handleTaskCorrection(
                        //   props?.id,
                        //   props?.indexselected,
                        //   props?.teamtasks[props?.indexselected]?.updates?.length,
                        // )
                      // }
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
                      onChange={handleChange}
                    />
                  </TableCell>
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
                        handleAdditionalTaskCorrection(
                          props?.id
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

              {props?.teamtasks.filter((info) => { return (info.id === props?.id) })
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
                        {info.data.corrections === 0
                          ? '0'
                          : '+' + info.data.corrections}
                      </TableCell>
                      <TableCell
                        style={{
                          width: '200px',
                          fontFamily: 'rockwen',
                        }}
                        align="center"
                      >{info.communications.filter((info1) => { return (info1.data.type = "DESCRIPTION_ADDED") }).sort((a, b) => {
                        return new Date(b.data.createdAt.seconds * 1000) - new Date(a.data.createdAt.seconds * 1000)
                      }).map((info1) => { return (<div key={info1.id}>{info1.data.description}</div>) })}
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: 'rockwen',
                        }}
                        align="center"
                      >{timeStampFormatChange(
                        info.data.assigned,
                      )}
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: 'rockwen',
                        }}
                        align="center"
                      >

                        {timeStampFormatChange(
                          info.data.deadline,
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: 'rockwen',
                        }}
                        align="center"
                      >
                        {info.data.status === 'DONE'
                          ? timeStampFormatChange(
                            info.data.completedOn,
                          )
                          : '--'}
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
