import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap'

export default function TeammateTaskHistory(props) {
  const [showDoubt, setShowDoubt] = useState(false)
  const [query, setQuery] = useState(false)
  const handleClose = () => setShowDoubt(false);
  const handleShow = () => setShowDoubt(true);
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
  // const handleChange = (event) => {
  //   setQuery(event.target.value)
  // }
  // const handleExtraChange = (event) => {
    // setQuery(props?.teamtasks?.filter((info) => { return (props?.id === info.id) })
    //   .map((info) => {
    //     return (info.communications.filter((info1) => { return (info1.data.type === "QUERY_ADDED") })
    //       .map((info1) => { return (info1.data.query) }))
    //   }) + " " + event.target.value)
  // }
  // const handleSend = () => {
  //   console.log(query)
  //   handleClose();
  // }

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
            </Button>
            <Modal show={showDoubt}
              backdrop="static" onHide={() => { handleClose() }}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                {/* {[props?.teamtasks?.filter((info) => { return (props?.id === info.id) })
                  .map((info) => {
                    return (info.communications.filter((info1) => { return (info1.data.type === "QUERY_ADDED") })
                      .map((info1) => { return (info1.data.query) }))
                  })] === [] ?
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
                  </Form> :
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Do you want to add something else to your previous query:<br />"
                        {props?.teamtasks?.filter((info) => { return (props?.id === info.id) })
                          .map((info) => {
                            return (
                              info.communications.filter((info1) => { return (info1.data.type === "QUERY_ADDED") && (info1.data.isVisible === true) })
                                .map((info1) => {
                                  return (<div key={info1.id}>{info1.data.query}</div>)
                                }))
                          })}...</Form.Label>
                      <Form.Control as="textarea" onChange={handleExtraChange} rows={3} />
                    </Form.Group>
                    <Button variant="primary" onClick={() => { handleSend() }}>
                      Send
                    </Button>
                  </Form>
                } */}
              </Modal.Body>
            </Modal>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "1.5em", marginLeft: "1.5em", marginRight: "1.5em" }}>
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
