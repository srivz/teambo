import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { ref, set } from 'firebase/database'
import React, { useState } from 'react'
import {
  Button,
  Col,
  Form,
  Modal,
  Row,
  Table,
} from 'react-bootstrap'
import { db } from '../../firebase-config'

export default function TaskHistory(props) {
  var today = new Date()
  const [taskUpdate, setTaskUpdate] = useState({
    corrections: '',
    status: 'Assigned',
    deadlineDate: '--',
    deadlineTime: '--',
  });

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
    if (parseInt(givenTime[0]) === 0) {
      return '12:' + givenTime[1] + ' am'
    } else if (parseInt(givenTime[0]) > 12) {
      let hour =
        parseInt(givenTime[0]) % 12 > 9
          ? parseInt(givenTime[0]) % 12
          : '0' + String(parseInt(givenTime[0]) % 12)
      let minute =
        parseInt(givenTime[1]) > 9
          ? parseInt(givenTime[1])
          : '0' + String(givenTime[1])

      return hour + ':' + minute + ' pm'
    } else if (parseInt(givenTime[0]) < 13) {
      let hour =
        parseInt(givenTime[0]) > 9
          ? parseInt(givenTime[0])
          : '0' + String(givenTime[0])
      let minute =
        parseInt(givenTime[1]) > 9
          ? parseInt(givenTime[1])
          : '0' + String(givenTime[1])

      return hour + ':' + minute + ' am'
    }
  }

  const handleTaskCorrection = (id, index, correction) => {
    set(ref(db, `/teammate/${id}/tasks/${index}/updates/${correction}`), {

      assignedDate:
        String(today.getDate()).padStart(2, '0') +
        '/' +
        String(today.getMonth() + 1).padStart(2, '0') +
        '/' +
        today.getFullYear(),
      assignedTime:
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
      corrections: taskUpdate.corrections,
      status: 'Assigned',
      deadlineDate: '--',
      deadlineTime: '--',
    })
      // .then(() => props.setLoading(false))
      .catch((err) => {
        console.log(err)
        // props.setLoading(false)
      })
  }
  const handleTaskCorrectionClear = () => {
    setTaskUpdate({
      corrections: '',
      status: 'Assigned',
      deadlineDate: '--',
      deadlineTime: '--',
    })
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
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
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
                    defaultValue={props?.teamTasks[props.indexSelected]?.clientEmail}
                    name="clientEmail"
                  // onChange={handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={1} md={1} style={{ marginTop: '1.5em' }}>
              <h6>Client</h6>
            </Col>
            <Col sm={3} md={3} style={{ marginTop: '1em' }}>
              <h4>{props?.teamTasks[props.indexSelected]?.client}</h4>
            </Col>
            <Col sm={1} md={1} style={{ marginTop: '1.5em' }}>
              <h6>Task</h6>
            </Col>
            <Col sm={3} md={3} style={{ marginTop: '1em' }}>
              <h4>{props?.teamTasks[props.indexSelected]?.task}</h4>
            </Col>
            <Col sm={1} md={1} style={{ marginTop: '1.5em' }}>
              <h6>Status</h6>
            </Col>
            <Col sm={3} md={3} style={{ marginTop: '1em' }}>
              <h4
                style={
                  (props?.teamTasks[props.indexSelected]?.updates[
                    props?.teamTasks[props.indexSelected]?.updates.length - 1
                  ].status === 'Done' && {
                    fontFamily: 'rockwen',
                    color: '#000000',
                  }) ||
                  (props?.teamTasks[props.indexSelected]?.updates[
                    props?.teamTasks[props.indexSelected]?.updates.length - 1
                  ].status === 'On Going' && {
                    fontFamily: 'rockwen',
                    color: '#24A43A',
                  }) ||
                  (props?.teamTasks[props.indexSelected]?.updates[
                    props?.teamTasks[props.indexSelected]?.updates.length - 1
                  ].status === 'Paused' && {
                    fontFamily: 'rockwen',
                    color: '#2972B2',
                  }) ||
                  (props?.teamTasks[props.indexSelected]?.updates[
                    props?.teamTasks[props.indexSelected]?.updates.length - 1
                  ].status === 'Assigned' && {
                    fontFamily: 'rockwen',
                    color: '#D1AE00',
                  })
                }
              >
                {
                  props?.teamTasks[props.indexSelected]?.updates[
                    props?.teamTasks[props.indexSelected]?.updates.length - 1
                  ].status
                }
              </h4>
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
                    width: "100px",
                    fontFamily: 'rockwen',
                  }}
                  align="center"
                >
                  Corrections
                </TableCell>
                <TableCell
                  style={{
                    width: "200px",
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
                <TableCell
                  align="center"
                >
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Row sm={12} md={12}>
            <Button onClick={props.onHide} variant="outline-primary" block>
              + Add Correction
            </Button>
          </Row>

          <Table>
            <TableBody>
              {props?.teamTasks[props.indexSelected]?.updates
                .sort((a, b) =>
                  a.corrections > b.corrections
                    ? -1
                    : 1,
                ).map((info, index) => {
                  return (
                    <TableRow>
                      <TableCell
                        style={{
                          width: "100px",
                          fontFamily: 'rockwen',
                        }}
                        align="center"
                      >
                        {info.corrections === "0" ? "0" : "+" + info.corrections}
                      </TableCell>
                      <TableCell
                        style={{
                          width: "200px",
                          fontFamily: 'rockwen',
                        }}
                        align="center"
                      >
                        {info.description}
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: 'rockwen',
                        }}
                        align="center"
                      >
                        {dateFormatChange(
                          info.assignedDate,
                        )}
                        <br />
                        {timeFormatChange(
                          info.assignedTime,
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: 'rockwen',
                        }}
                        align="center"
                      >

                        {dateFormatChange(
                          info.deadlineDate,
                        )}
                        <br />
                        {timeFormatChange(
                          info.deadlineTime,
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: 'rockwen',
                        }}
                        align="center"
                      >
                        {info.status === 'Done'
                          ? dateFormatChange(
                            info.assignedDate,
                          )
                          : <br />}
                        <br />
                        {info.status === 'Done'
                          ? timeFormatChange(
                            info.assignedTime,
                          )
                          : <br />}
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: 'rockwen',
                        }}
                        align="center"
                      ><FontAwesomeIcon
                          className="pointer"
                          onClick={handleTaskCorrection}
                          size="2xl"
                          style={{
                            color: 'blue',
                            paddingRight: '.25em',
                          }} icon="fa-solid fa-square-check" />
                        <FontAwesomeIcon
                          className="pointer"
                          onClick={handleTaskCorrectionClear}
                          icon="fa-solid fa-square-xmark"
                          size="2xl"
                          style={{
                            color: 'red',
                            paddingRight: '.25em',
                          }} />
                      </TableCell>
                    </TableRow>);
                })}
            </TableBody>
          </Table>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  )
}
