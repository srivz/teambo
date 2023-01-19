import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { ref, set } from 'firebase/database'
import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { db } from '../../firebase-config'

export default function TeammateTaskHistory(props) {
  const [showDoubt, setShowDoubt] = useState(false)
  const [query, setQuery] = useState(false)
  const handleClose = () => setShowDoubt(false);
  const handleShow = () => setShowDoubt(true);
  const dateFormatChange = (date) => {
    if (date === '--') {
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
  const handleChange = (event) => {
    setQuery(event.target.value)
  }
  const handleSend = () => {
    set(ref(db, `/manager/${props?.managerId}/teammates/${props?.teammateIndex}/data/tasks/${props?.indexselected}/query/`), query)
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
            <Button variant="light" onClick={() => { handleShow() }} style={{ position: "absolute", right: "1em" }}>
              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />{" "}
            </Button><Modal show={showDoubt}
              backdrop="static" onHide={() => { handleClose() }}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Write your query to manager here:</Form.Label>
                    <Form.Control as="textarea" onChange={handleChange} rows={3} />
                  </Form.Group>
                  <Button variant="primary" onClick={() => { handleSend() }}>
                    Send
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "20px" }}>
          <Row style={{ alignItems: "bottom", padding: "auto", margin: "auto" }}>
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
              <div className={props?.teamtasks[props?.indexselected]?.task.length > 20 ? 'marquee' : ''}> <h5>{props?.teamtasks[props?.indexselected]?.task}</h5></div>
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
                  align="center"
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
