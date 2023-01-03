import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { onChildChanged, ref, remove, set, update } from 'firebase/database'
import emailjs from '@emailjs/browser';
import React, { useState } from 'react'
import {
  Button,
  Col,
  Container,
  Dropdown,
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
import SwitchTask from './SwitchTask';
import ClientTable from './ClientTable';

export default function HomeList(props) {
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem('teammateSelected')),
  );
  const [filter, setFilter] = useState("All");
  const [teammateEmail, setTeammateEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [taskSelected, setTaskSelected] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [clientSelected, setClientSelected] = useState("");


  function handleViewChange() {
    props.onChange(false)
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
      from_name: props.manager.name,
      message: `Your task ${teammate.tasks[index].task} from client ${teammate.tasks[index].client} has been approved by your manager ${props.manager.name}`,
      from_email: props.manager.email,
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
      setLoading(false)
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
      setLoading(false)
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
    props.addTeammate(teammateEmail);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
          <div id="main" style={{ backgroundColor: "#fff" }}>
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
                        <div className="overflow-set-auto table-height">
                        <Table
                            className="table-height"
                          style={{
                              borderCollapse: 'separate',
                              borderSpacing: '0 20px',
                            }}
                          >
                          <TableHead>
                            <TableRow></TableRow>
                          </TableHead>
                            <TableBody>
                              {!props.team ? (
                                <TableRow colSpan={7} align="center">
                                No teammate right now
                              </TableRow>
                            ) : (
                                  props.team.map((info) => {
                                return (
                                  <TableRow
                                    key={info.teammate}
                                    className="box-shadow"
                                    onClick={() => {
                                      localStorage.setItem(
                                        'teammateSelected',
                                        JSON.stringify(info.teammate)
                                      );
                                      setSelected(info.teammate);
                                    }}
                                    style={{ backgroundColor: "#fff !important" }}
                                  >
                                    <TableCell
                                      style={{
                                        backgroundColor:
                                          selected === info.teammate
                                            ? '#E2ECFF'
                                            : '#F9FBFF',
                                        height: 'fit-content',
                                        borderRadius: '6px',
                                        borderBottom: "1px solid #fff",
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
                        <div className="overflow-set-auto table-height">
                        <Table
                            className="table-height"
                          style={{
                              borderCollapse: 'separate',
                              borderSpacing: '0 20px',
                            }}
                          >
                          <TableHead>
                            <TableRow></TableRow>
                          </TableHead>
                          <TableBody>
                              {!props.manager?.clients ? (
                              <TableRow
                                colSpan={7}
                                align="center">
                                  No Clients right now
                              </TableRow>
                            ) : (
                                  props.manager?.clients?.map((info) => {
                                return (
                                  <TableRow
                                    key={info}
                                    onClick={() => {
                                      setClientSelected(info);
                                    }} style={{ backgroundColor: "#fff !important" }}

                                    className="box-shadow">
                                    <TableCell
                                      style={{
                                        backgroundColor:
                                          info === clientSelected
                                            ? '#E2ECFF'
                                            : '#F9FBFF',
                                        height: 'fit-content',
                                        borderRadius: '6px',
                                        borderBottom: "1px solid #fff",
                                        paddingTop: '.5em',
                                        paddingBottom: '0em',
                                        cursor: "pointer"
                                      }}>
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
                            style={{ paddingRight: '1em', fontSize: "20px" }}
                        />

                        <FontAwesomeIcon
                          onClick={() => {
                              handleViewChange()
                          }}
                          icon="fa-solid fa-grip "
                            style={{ paddingRight: '1em', fontSize: "20px" }}
                        />
                        <NewTask
                            name={'No Teammate'}
                            designation={'Selected'}
                        />
                      </div>
                    </Col>
                  </Row>
                ) : (
                      props.team
                    .filter((info) => info.teammate === selected)
                    .map((info, index) => {
                      return selected ? (
                        <Row key={index}>
                          <Col sm={6} md={6} style={{ marginTop: '1em' }}>
                            {
                              clientSelected === "" ? <><h5 className="blue">{info.data.name}</h5>
                                <h6>{info.data.designation}</h6></> : <h5 className="blue">{clientSelected}</h5>

                            }

                          </Col>
                          <Col
                            sm={6}
                            md={6}
                            style={{ marginTop: '1em' }}
                            className="text-end"
                          >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                              <Dropdown
                                style={{ width: "150px", marginRight: '1em' }}>
                                <Dropdown.Toggle
                                  id="dropdown-basic"
                                  className="w-100  company-dropdown"
                                >{filter}
                                </Dropdown.Toggle>

                                <Dropdown.Menu
                                  style={{ width: "100px" }} className="company-dropdown-menu">
                                  <Dropdown.Item
                                    onClick={(e) => {
                                      setFilter("All")
                                    }}
                                  >All
                                  </Dropdown.Item><Dropdown.Item
                                    onClick={(e) => {
                                      setFilter("On Going")
                                    }}
                                  >On Going
                                  </Dropdown.Item><Dropdown.Item
                                    onClick={(e) => {
                                      setFilter("Assigned")
                                    }}
                                  >Assigned
                                  </Dropdown.Item><Dropdown.Item
                                    onClick={(e) => {
                                      setFilter("Paused")
                                    }}
                                  >Paused
                                  </Dropdown.Item><Dropdown.Item
                                    onClick={(e) => {
                                      setFilter("Completed")
                                    }}
                                  >Completed
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                              <FontAwesomeIcon
                                icon="fa-solid fa-list"
                                color="#5f8fee"
                                style={{
                                  paddingRight: '1em', fontSize: "20px"
                                }}
                              />
                              <FontAwesomeIcon
                                onClick={() => {
                                  handleViewChange()
                                }}
                                icon="fa-solid fa-grip "
                                style={{ paddingRight: '1em', fontSize: "20px" }}
                              />
                              <NewTask
                                name={info.data.name}
                                designation={info.data.designation}
                                teammate={info.teammate}
                                tasks={info.data.tasks}
                                manager={props.manager}
                                managerId={props.managerId}
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
                        {
                          clientSelected === "" ?
                            <TeammateTable
                              filterTeammate={filter}
                              teammateselected={selected}
                              viewType={props?.viewType}
                              team={props?.team}
                              onChange={props?.onChange}
                              addTeammate={props?.addTeammate}
                              manager={props?.manager}
                              managerId={props?.managerId}
                              allTasks={props?.allTasks} />
                            :
                            <ClientTable filter={filter} allTasks={props.allTasks} clientSelected={clientSelected} dateFormatChange={dateFormatChange} timeFormatChange={timeFormatChange} />
                        }

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
