import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { onChildChanged, ref, remove, set, update } from 'firebase/database'
import emailjs from '@emailjs/browser';
import React, { useState } from 'react'
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { db } from "../../firebase-config";
import Loader from "../Loader/Loader";
import NewTask from "./NewTask";
import TaskHistory from './TaskHistory'

export default function HomeList(props) {
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem('teammateSelected')),
  )

  const [teammateEmail, setTeammateEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [taskSelected, setTaskSelected] = useState()
  const [modalShow, setModalShow] = React.useState(false)

  function handleViewChange() {
    props?.onChange(false)
  }

  const handleDeleteTask = (id, index) => {
    setLoading(true);
    remove(ref(db, `/teammate/${id}/tasks/${index}/`))
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCompleteTask = (teammate, id, index, latest) => {
    setLoading(true)
    const info = {
      to_name: teammate.name,
      from_name: props?.manager.name,
      message: `Your task ${teammate.tasks[index].task} from client ${teammate.tasks[index].client} has been approved by your manager ${props?.manager.name}`,
      from_email: props?.manager.email,
      to_email: teammate.email
    }
    // fetch('https://example.com/profile', {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(info),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:');
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });



    emailjs.send("service_8babtb3", "template_3e3kpdk", info, "E1o2OcJneKcoyHqxA").then((res) => {

    }).catch((err) => console.log(err));
    set(ref(db, `/teammate/${id}/tasks/${index}/updates/${latest}/status`), "Completed")
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onChildChanged(ref(db, `/teammate/`), () => {
    setLoading(true)
    window.location.reload()
  })

  function swap(arr, from, to) {
    let temp = arr[from]
    arr[from] = arr[to]
    arr[to] = temp
  }

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
  const handleUpTask = (id, index, tasks, taskLength) => {
    setLoading(true)
    if (index === 0) {
      props?.setLoading(false)
      alert('Its already on the top')
    } else {
      let newarr = tasks
      swap(newarr, index, index - 1)
      update(ref(db, `teammate/${id}/`), {
        tasks: newarr,
      })
    }
  }

  const handleDownTask = (id, index, tasks, taskLength) => {
    setLoading(true)
    if (index === taskLength - 1) {
      props?.setLoading(false)
      alert('Its already on the bottom')
    } else {
      let newarr = tasks
      swap(newarr, index + 1, index)
      update(ref(db, `teammate/${id}/`), {
        tasks: newarr,
      })
    }
  }
  const addTeammate = () => {
    props?.addTeammate(teammateEmail);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div id="main">
            <Container>
            <Row>
                <Col sm={3} md={3} style={{ marginTop: '1em' }}>
                <Tabs
                    defaultActiveKey="home"
                  id="uncontrolled-tab-example"
                  className="mt-3"
                    style={{ width: 'fit-content' }}
                >
                  <Tab eventKey="home" title="Teammate">
                    <div className="task-box">
                      <OverlayTrigger
                        trigger="click"
                        key="auto"
                        placement="auto"
                        rootClose
                        overlay={
                          <div
                            className="bg-white "
                            style={{
                              padding: '1em',
                              marginTop: '10px',
                              marginLeft: '-50px',
                              width: '400px',
                              boxShadow: 'rgba(0, 0, 0, 0.15) 1px 3px 5px',
                            }}
                          >
                            <Row>
                              <Col md={'10'}>
                                <input
                                  className="rounded-2 w-100"
                                  style={{
                                    marginTop: '.5em',
                                    padding: '.25em',
                                    borderRadius: '25px',
                                    border: '2px solid #e8e7e7',
                                    paddingLeft: '20px',
                                  }}
                                  type="email"
                                  name="email"
                                  id="search"
                                  placeholder="Teammate's Email"
                                  onChange={(e) =>
                                    setTeammateEmail(e.target.value)
                                  }
                                />
                              </Col>
                              <Col md={'2'}>
                                <Button
                                  style={{
                                    marginTop: '.5em',
                                    borderRadius: '25px',
                                    border: '2px solid #e8e7e7',
                                  }}
                                  type="Button"
                                  variant="light"
                                  onClick={() => addTeammate()}
                                  className="bg-white box-shadow rounded-4"
                                >
                                  <FontAwesomeIcon icon="fa-regular fa-square-plus" />
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        }
                        >
                        <Button
                          type="Button"
                          variant="light"
                            className="bg-white box-shadow rounded-4"
                          >
                          <FontAwesomeIcon
                            icon="fa-regular fa-square-plus"
                              style={{ paddingRight: '.5em' }}
                          />
                          Add Teammate
                        </Button>
                      </OverlayTrigger>

                      <input
                        className="rounded-2 w-100"
                        style={{
                          marginTop: '1em',
                          padding: '.25em',
                          borderRadius: '25px',
                          border: '2px solid #e8e7e7',
                          paddingLeft: '20px',
                        }}
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search"
                      />
                        <div className="overflow-set-auto table-height1">
                        <Table
                            className="table-height1"
                          style={{
                              borderCollapse: 'separate',
                              borderSpacing: '0 20px',
                            }}
                          >
                          <TableHead>
                            <TableRow></TableRow>
                          </TableHead>
                          <TableBody>
                              {!props?.team ? (
                                <TableRow colSpan={7} align="center">
                                No teammate right now
                              </TableRow>
                            ) : (
                                  props?.team.map((info) => {
                                return (
                                  <TableRow
                                    key={info.teammate}
                                    className="box-shadow"
                                    onClick={() => {
                                      localStorage.setItem(
                                        'teammateSelected',
                                        JSON.stringify(info.teammate),
                                      )
                                      setSelected(info.teammate)
                                    }}
                                  >
                                    <TableCell
                                      style={{
                                        backgroundColor:
                                          selected === info.teammate
                                            ? '#e2ecff'
                                            : '#f9fbff',
                                        height: 'fit-content',
                                        borderRadius: '5px',
                                        paddingTop: '.5em',
                                        paddingBottom: '0em',
                                      }}
                                    >
                                      <h5>{info.data.name}</h5>
                                      <p className="grey">
                                        {info.data.designation}
                                      </p>
                                    </TableCell>
                                  </TableRow>
                                )
                              })
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="profile" title="Company">
                    <div className="task-box">
                        <div className="overflow-set-auto table-height1">
                        <Table
                            className="table-height1"
                          style={{
                              borderCollapse: 'separate',
                              borderSpacing: '0 20px',
                            }}
                          >
                          <TableHead>
                            <TableRow></TableRow>
                          </TableHead>
                          <TableBody>

                              {!props?.manager?.clients ? (
                              <TableRow
                                colSpan={7}
                                align="center">
                                No Companies right now
                              </TableRow>
                            ) : (
                                  props?.manager?.clients?.map((info, index) => {
                                return (
                                  <TableRow
                                    key={index}

                                    className="box-shadow">
                                    <TableCell>
                                      <h5>{info}</h5>
                                    </TableCell>
                                  </TableRow>
                                )
                              })
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </Tab>
                  </Tabs>
              </Col>
              <Col
                className="curve-box-homelist"
                sm={9}
                md={9}
                  style={{ marginTop: '1em' }}
                >
                {!selected ? (
                  <Row>
                      <Col sm={6} md={6} style={{ marginTop: '1em' }}>
                      <h5 className="blue">No Teammate</h5>
                      <h6>Selected</h6>
                    </Col>
                    <Col
                      sm={6}
                      md={6}
                        style={{ marginTop: '1em' }}
                        className="text-end"
                      >
                      <div>
                        <FontAwesomeIcon
                          icon="fa-solid fa-list"
                          color="#5f8fee"
                            style={{ paddingRight: '1em' }}
                        />

                        <FontAwesomeIcon
                          onClick={() => {
                              handleViewChange()
                          }}
                          icon="fa-solid fa-grip "
                            style={{ paddingRight: '1em' }}
                        />
                        <NewTask
                            name={'No Teammate'}
                            designation={'Selected'}
                        />
                      </div>
                    </Col>
                  </Row>
                ) : (
                      props?.team
                    .filter((info) => info.teammate === selected)
                    .map((info, index) => {
                      return selected ? (
                        <Row key={index}>
                          <Col sm={6} md={6} style={{ marginTop: '1em' }}>
                            <h5 className="blue">{info.data.name}</h5>
                            <h6>{info.data.designation}</h6>
                          </Col>
                          <Col
                            sm={6}
                            md={6}
                            style={{ marginTop: '1em' }}
                            className="text-end"
                          >
                            <div>
                              <FontAwesomeIcon
                                icon="fa-solid fa-list"
                                color="#5f8fee"
                                style={{ paddingRight: '1em' }}
                              />

                              <FontAwesomeIcon
                                onClick={() => {
                                  handleViewChange()
                                }}
                                icon="fa-solid fa-grip "
                                style={{ paddingRight: '1em' }}
                              />
                              <NewTask
                                name={info.data.name}
                                designation={info.data.designation}
                                teammate={info.teammate}
                                tasks={info.data.tasks}
                                manager={props?.manager}
                                managerId={props?.managerId}
                              />
                            </div>
                          </Col>
                        </Row>
                      ) : (
                        <></>
                        )
                    })
                )}
                <div className="overflow-set-auto table-height1">
                  <Row className="table-height1">
                    <Col>
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
                                  fontFamily: 'rockwen',
                              }}
                                align="center"
                              >
                              Client
                            </TableCell>
                            <TableCell
                              style={{
                                  fontFamily: 'rockwen',
                              }}
                                align="center"
                              >
                              Task
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
                            <TableCell
                              style={{
                                  fontFamily: 'rockwen',
                              }}
                                align="center"
                              >
                              Corrections
                            </TableCell>
                            <TableCell
                              style={{
                                  fontFamily: 'rockwen',
                              }}
                                align="center"
                              >
                              Status
                              </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className="curve-box-homelist">
                            {props?.team
                            .filter((info) => info.teammate === selected)
                            .map((info, index) => {
                              return (
                                <>
                                  {!info.data.tasks ? (
                                    <TableRow colSpan={7} align="center">
                                      No tasks assigned
                                    </TableRow>
                                  ) : (
                                    info.data.tasks.map((info1, index) => {
                                      return (
                                        <TableRow
                                          key={index}
                                          style={{
                                            backgroundColor:
                                              info1.updates[
                                                info1.updates.length - 1
                                              ].status !== 'Done' || info1.updates[
                                                info1.updates.length - 1
                                              ].status !== 'Completed'
                                                ? '#fff'
                                                : '#f1f4fb',
                                            height: '70px',
                                          }}
                                          className="box-shadow"
                                        >
                                          <TableCell
                                            onClick={() => {
                                              setModalShow(true);
                                              setTaskSelected(index);
                                            }}
                                            style={{
                                              fontFamily: 'rockwen',
                                            }}
                                            align="center"
                                          >
                                            {info1.client}
                                          </TableCell>
                                          <TableCell
                                            onClick={() => {
                                              setModalShow(true);
                                              setTaskSelected(index);
                                            }}
                                            style={{
                                              fontFamily: 'rockwen',
                                            }}
                                            align="center"
                                          >
                                            {info1.task}
                                          </TableCell>
                                          {info1.updates
                                            .sort((a, b) =>
                                              a.corrections > b.corrections
                                                ? 1
                                                : -1,
                                            )
                                            .filter(
                                              (info2, index) => index === 0,
                                            )
                                            .map((info2) => {
                                              return (
                                                <>
                                                  <TableCell
                                                    onClick={() => {
                                                      setModalShow(true);
                                                      setTaskSelected(index);
                                                    }}
                                                    style={{
                                                      fontFamily: 'rockwen',
                                                    }}
                                                    align="center"
                                                  >
                                                    {dateFormatChange(
                                                      info1.updates[
                                                        info1.updates.length - 1
                                                      ].assignedDate,
                                                    )}
                                                    <br />
                                                    {timeFormatChange(
                                                      info1.updates[
                                                        info1.updates.length - 1
                                                      ].assignedTime,
                                                    )}
                                                  </TableCell>
                                                  <TableCell
                                                    onClick={() => {
                                                      setModalShow(true);
                                                      setTaskSelected(index);
                                                    }}
                                                    style={{
                                                      fontFamily: 'rockwen',
                                                    }}
                                                    align="center"
                                                  >
                                                    {dateFormatChange(
                                                      info1.updates[
                                                        info1.updates.length - 1
                                                      ].deadlineDate,
                                                    )}
                                                    <br />
                                                    {timeFormatChange(
                                                      info1.updates[
                                                        info1.updates.length - 1
                                                      ].deadlineTime,
                                                    )}
                                                  </TableCell>
                                                  <TableCell
                                                    onClick={() => {
                                                      setModalShow(true);
                                                      setTaskSelected(index);
                                                    }}
                                                    style={{
                                                      fontFamily: 'rockwen',
                                                    }}
                                                    align="center"
                                                  >
                                                    {info1.updates[
                                                      info1.updates.length - 1
                                                    ].status === 'Done' || info1.updates[
                                                      info1.updates.length - 1
                                                    ].status === 'Completed'
                                                      ? dateFormatChange(
                                                        info1.updates[
                                                          info1.updates
                                                            .length - 1
                                                        ].endDate,
                                                      )
                                                      : ''}
                                                    <br />
                                                    {info1.updates[
                                                      info1.updates.length - 1
                                                    ].status === 'Done' || info1.updates[
                                                      info1.updates.length - 1
                                                    ].status === 'Completed'
                                                      ? timeFormatChange(
                                                        info1.updates[
                                                          info1.updates
                                                            .length - 1
                                                        ].endTime,
                                                      )
                                                      : ''}
                                                  </TableCell>
                                                  <TableCell
                                                    onClick={() => {
                                                      setModalShow(true);
                                                      setTaskSelected(index);
                                                    }}
                                                    style={{
                                                      fontFamily: 'rockwen',
                                                    }}
                                                    align="center"
                                                  >
                                                    {info1.updates[
                                                      info1.updates.length - 1
                                                    ].corrections === '0'
                                                      ? info1.updates[
                                                        info1.updates.length -
                                                        1
                                                      ].corrections
                                                      : '+' +
                                                      info1.updates[
                                                        info1.updates.length -
                                                        1
                                                      ].corrections}
                                                  </TableCell>
                                                  <TableCell
                                                    onClick={() => {
                                                      setModalShow(true);
                                                      setTaskSelected(index);
                                                    }}
                                                    align="center"
                                                    style={
                                                      (info1.updates[
                                                        info1.updates.length - 1
                                                      ].status === 'Done' && {
                                                        fontFamily: 'rockwen',
                                                        color: '#000000',
                                                        fontWeight: 'bold',
                                                      }) ||
                                                      (info1.updates[
                                                        info1.updates.length - 1
                                                      ].status ===
                                                        'Completed' && {
                                                        fontFamily: 'rockwen',
                                                        color: '#000000',
                                                        fontWeight: 'bold',
                                                      }) ||
                                                      (info1.updates[
                                                        info1.updates.length - 1
                                                      ].status ===
                                                        'On Going' && {
                                                        fontFamily: 'rockwen',
                                                        color: '#24A43A',
                                                        fontWeight: 'bold',
                                                      }) ||
                                                      (info1.updates[
                                                        info1.updates.length - 1
                                                      ].status === 'Paused' && {
                                                        fontFamily: 'rockwen',
                                                        color: '#2972B2',
                                                        fontWeight: 'bold',
                                                      }) ||
                                                      (info1.updates[
                                                        info1.updates.length - 1
                                                      ].status ===
                                                        'Assigned' && {
                                                        fontFamily: 'rockwen',
                                                        color: '#D1AE00',
                                                        fontWeight: 'bold',
                                                      })
                                                    }
                                                  >
                                                    {info1.updates[
                                                      info1.updates.length - 1
                                                    ].status === 'Done' ? (
                                                      <FontAwesomeIcon
                                                        // onClick={() => {  }}
                                                        className="pointer"
                                                        size="xl"
                                                        icon="fa-solid fa-circle-check"
                                                      />
                                                    ) : (
                                                      info1.updates[
                                                        info1.updates.length - 1
                                                      ].status
                                                    )}
                                                  </TableCell>
                                                </>
                                              )
                                            })}
                                          <TableCell
                                            align="center"
                                            className="text-end"
                                          >
                                            <OverlayTrigger
                                              trigger="click"
                                              key="bottom"
                                              placement="auto"
                                              rootClose
                                              overlay={
                                                <Popover
                                                  id={`popover-positioned-bottom`}
                                                >
                                                  <Popover.Body>
                                                    <div
                                                      className="d-grid gap-2"
                                                      style={{
                                                        marginBottom: '.5em',
                                                      }}
                                                    >
                                                      <Button
                                                        disabled={info1.updates[
                                                          info1.updates.length - 1
                                                        ].status !== 'Done' ? true : false}
                                                        onClick={() => {
                                                          handleCompleteTask(
                                                            info.data,
                                                            info.teammate,
                                                            index, info1.updates.length - 1
                                                          )
                                                        }}
                                                        variant="light"
                                                        style={{
                                                          textAlign: 'left',
                                                        }}
                                                      >
                                                        <FontAwesomeIcon
                                                          icon="fa-solid fa-circle-check"
                                                          style={{
                                                            paddingRight:
                                                              ".5em",
                                                          }}
                                                        />
                                                        Mark Completed
                                                      </Button>
                                                    </div>
                                                    <Row
                                                      className="d-grid gap-2"
                                                      style={{
                                                        marginBottom: '.5em',
                                                      }}
                                                    >
                                                      <Button
                                                        onClick={() => {
                                                          handleUpTask(
                                                            info.teammate,
                                                            index,
                                                            info.data.tasks,
                                                            info.data.tasks
                                                              .length,
                                                          )
                                                        }}
                                                        variant="light"
                                                        style={{
                                                          textAlign: 'left',
                                                        }}
                                                      >
                                                        <FontAwesomeIcon
                                                          icon="fa-solid fa-chevron-up"
                                                          style={{
                                                            paddingRight:
                                                              ".5em",
                                                          }}
                                                        />
                                                        Move Up
                                                      </Button>
                                                    </Row>
                                                    <Row
                                                      className="d-grid gap-2"
                                                      style={{
                                                        marginBottom: '.5em',
                                                      }}
                                                    >
                                                      <Button
                                                        onClick={() => {
                                                          handleDownTask(
                                                            info.teammate,
                                                            index,
                                                            info.data.tasks,
                                                            info.data.tasks
                                                              .length,
                                                          )
                                                        }}
                                                        variant="light"
                                                        style={{
                                                          textAlign: 'left',
                                                        }}
                                                      >
                                                        <FontAwesomeIcon
                                                          icon="fa-solid fa-chevron-down"
                                                          style={{
                                                            paddingRight:
                                                              ".5em",
                                                          }}
                                                        />
                                                        Move Down
                                                      </Button>
                                                    </Row><Row
                                                      className="d-grid gap-2"
                                                      style={{
                                                        marginBottom: '.5em',
                                                      }}
                                                    >
                                                      <Button
                                                        disabled={info1.updates[
                                                          info1.updates.length - 1
                                                        ].status !== 'Done' ? true : false}
                                                        // onClick={() => {
                                                        //   handleSwitchTask(
                                                        //     info.teammate
                                                        //   )
                                                        // }}
                                                        variant="light"
                                                        style={{
                                                          textAlign: 'left',
                                                        }}
                                                        block
                                                      >
                                                        <FontAwesomeIcon
                                                          icon="fa-solid fa-shuffle"
                                                          style={{
                                                            paddingRight:
                                                              '.5em',
                                                          }}
                                                        />
                                                        Switch Task To..
                                                      </Button>
                                                    </Row>
                                                    <Row
                                                      className="d-grid gap-2"
                                                      style={{
                                                        marginBottom: '.5em',
                                                      }}
                                                    >
                                                      <Button
                                                        onClick={() => {
                                                          handleDeleteTask(
                                                            info.teammate,
                                                            index,
                                                          )
                                                        }}
                                                        variant="light"
                                                        style={{
                                                          textAlign: 'left',
                                                        }}
                                                        block
                                                      >
                                                        <FontAwesomeIcon
                                                          icon="fa-solid fa-trash"
                                                          style={{
                                                            paddingRight:
                                                              '.5em',
                                                          }}
                                                        />
                                                        Delete Task
                                                      </Button>
                                                    </Row>
                                                  </Popover.Body>
                                                </Popover>
                                              }
                                            >
                                              <FontAwesomeIcon
                                                className="pointer"
                                                icon="fa-solid fa-ellipsis-vertical"
                                                style={{
                                                  color: 'blue',
                                                  paddingRight: '.25em',
                                                }}
                                              />
                                            </OverlayTrigger>
                                          </TableCell>
                                        </TableRow>
                                      )
                                    })
                                  )}

                                  {info.data.tasks && taskSelected !== null ? (
                                    <TaskHistory
                                      show={modalShow}
                                      id={info.teammate}
                                      onHide={() => { setModalShow(false); setTaskSelected(null); }}
                                      indexselected={taskSelected}
                                        teamtasks={info.data.tasks}
                                      name={info.data.name}
                                      designation={info.data.designation}
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </>
                              )
                            })}
                        </TableBody>
                      </Table>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  )
}
