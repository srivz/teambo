import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import {
  Button,
  Col,
  Container,
  Dropdown,
  OverlayTrigger,
  Row,
} from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Loader from "../Loader/Loader";
import NewTask from "./NewTask";
import ClientTable from './ClientTable';
import TeammateTable from './TeammateTable';
import { useNavigate } from 'react-router'
import NavBar from '../Navs/NavBar';
import { auth, db } from '../../firebase-config'
import { onValue, ref, set } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'


export default function HomeList() {
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("teammateSelected")) === undefined ? null : JSON.parse(localStorage.getItem("teammateSelected"))
  );
  const [clientSelected, setClientSelected] = useState(
    JSON.parse(localStorage.getItem('clientSelected')) === undefined ? null : JSON.parse(localStorage.getItem('clientSelected')),);
  const [filter, setFilter] = useState("All");
  const [teammateEmail, setTeammateEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("Teammate");
  const [searchText, setSearchText] = useState("");
  const [searchText2, setSearchText2] = useState("");
  const [manager, setManager] = useState({})
  const [once, setOnce] = useState(true)
  const [once1, setOnce1] = useState(true)
  const [managerId, setManagerId] = useState('')
  const [managerName, setManagerName] = useState('')
  const [teamRequest, setTeamRequest] = useState([])
  const [teammateList, setTeammateList] = useState([])
  const [teammateSet, setTeammateSet] = useState([])
  const [allTasks, setAllTasks] = useState([])

  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (once) {
        setLoading(true)
        onValue(ref(db, `manager/${user.uid}`), (snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val()
            setManager(data)
            setManagerId(user.uid)
            setManagerName(user.displayName)
            setTeammateSet(data.teammates)
            if (data.teammates !== undefined) {
              getTeammates(data.teammates)
            }
          } else {
            console.log('No data available')
          }
          setLoading(false)
        })
        setOnce(false)
      }
    } else {
      window.location.href = '/'
    }
  })

  const getTeammates = (teamList) => {
    if (once1) {
      setTeammateList(teamList)
      teamList.forEach((teammate1) => {
        let data = teammate1.data;
        let teammate = teammate1.teammateId;
        setAllTasks((oldTasks) => {
          return [...oldTasks, { tasks: data.tasks, teammateEmail: teammate, teammate: data.name, teammateDesignation: data.designation }]
        })
        })
    }
      setOnce1(false)
    }


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
  const getTeammatesWithMail = (teammate) => {
    onValue(ref(db, `teammate/${teammate}`), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setTeamRequest(data.notifications)
        return true
      } else {
        alert('User not available')
      }
    })
  }

  const addTeammate = () => {
    if (teammateEmail === '') {
      alert('Enter email first')
      return
    }
    let id = teammateEmail.split('.')
    let newId = id.join('_')
    getTeammatesWithMail(newId)
    if (teammateSet === undefined) {
      if (teamRequest === undefined) {
        let newArr = [{ managerId, managerName }]
        set(ref(db, `teammate/${newId}/notifications/`), { requests: newArr })
      } else {
        let newArr = []
        let exists = false
        teamRequest.forEach((element) => {
          if (element.managerId === managerId) {
            exists = true
          }
          newArr.push(element)
        })
        if (exists) {
          alert('Already requested !')
        } else {
          let newArr2 = [...newArr, { managerId, managerName }]
          set(ref(db, `teammate/${newId}/notifications/`), { requests: newArr2 })
        }
      }
    } else {
      let newArr = []
      teammateSet.forEach((element) => {
        newArr.push(element)
      })
      let exist = newArr.includes(newId)
      if (exist) {
        alert('Already a Teammate !')
      } else {
        if (teamRequest === undefined) {
          let newArr = [{ managerId, managerName }]
          set(ref(db, `teammate/${newId}/notifications/`), { requests: newArr })
        } else {
          let newArr = []
          let exists = false
          teamRequest.forEach((element) => {
            if (element.managerId === managerId) {
              exists = true
            }
            newArr.push(element)
          })
          if (exists) {
            alert('Already requested !')
          } else {
            let newArr2 = [...newArr, { managerId, managerName }]
            set(ref(db, `teammate/${newId}/notifications/`), { requests: newArr2 })
          }
        }
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
          <div id="main" style={{ backgroundColor: "#fff" }}>
            <NavBar
              user="MANAGER"
              user2="MANAGER"
              name={manager.name}
              role={manager.designation}
            />
            <Container>
            <Row>
                <Col sm={3} md={3} style={{ marginTop: '1em' }}>
                <Tabs
                    defaultActiveKey="Teammate"
                  id="uncontrolled-tab-example"
                    className="mt-3"
                    onSelect={(e) => { setTab(e); }}
                    style={{ width: 'fit-content' }}
                >
                    <Tab eventKey="Teammate" title="Teammate">
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
                          padding: '.4em',
                          border: "2px solid #CDCDCD",
                          borderRadius: "25px",
                          outline: "none",
                        }}
                        type="search"
                        name="search"
                        id="search"
                          onChange={(e) => setSearchText(e.target.value)}
                          placeholder="Search"
                        />
                        <div className="overflow-set-auto table-height">
                        <Table
                            className="table-height"
                          style={{
                            borderCollapse: 'separate',
                            borderSpacing: '0 10px',
                            }}
                          >
                          <TableHead>
                            <TableRow></TableRow>
                          </TableHead>
                            <TableBody>
                              {!teammateList ? (
                                <TableRow colSpan={7} align="center">
                                No teammate right now
                              </TableRow>
                              ) : (teammateList?.filter((info) => {
                                return info.data?.name.toLowerCase().includes(searchText?.toLowerCase())
                              })?.map((info) => {
                                return (
                                  <TableRow
                                    key={info.teammate}
                                    className="box-shadow"
                                    onClick={() => {
                                      localStorage.setItem(
                                        'teammateSelected',
                                        JSON.stringify(info.teammateId)
                                      );
                                      setSelected(info.teammateId);
                                    }}
                                    style={{ backgroundColor: "#fff !important" }}
                                  >
                                    <TableCell
                                      style={{
                                        backgroundColor:
                                          selected === info.teammateId
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
                    <Tab eventKey="Company" title="Company">
                      <div className="task-box">
                        <input
                          className="rounded-2 w-100"
                          style={{
                            marginTop: '1em',
                            padding: '.4em',
                            border: "2px solid #CDCDCD",
                            borderRadius: "25px",
                            outline: "none",
                          }}
                          type="search"
                          name="search"
                          id="search"
                          placeholder="Search"
                          onChange={(e) => setSearchText2(e.target.value)}

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
                              {!manager?.clients ? (
                              <TableRow
                                colSpan={7}
                                align="center">
                                  No Clients right now
                              </TableRow>
                              ) : (
                                  manager?.clients?.filter((info) => {
                                    return info.toLowerCase().includes(searchText2?.toLowerCase())
                                  })
                                    ?.map((info) => {
                                      return (
                                        <TableRow
                                          key={info}
                                          onClick={() => {
                                            setClientSelected(info);
                                            localStorage.setItem(
                                              'clientSelected',
                                              JSON.stringify(info)
                                            );
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
                                              paddingTop: '1em',
                                              paddingBottom: '0.5em',
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
                  {!(selected || clientSelected) ? (
                  <Row>
                      <Col sm={6} md={6} style={{ marginTop: '1em' }}>
                        <h5 className="blue">No {tab}</h5>
                        <h6>Selected</h6>
                    </Col>
                    <Col
                      sm={6}
                      md={6}
                        style={{ marginTop: '1em' }}
                        className="text-end"
                      >
                    </Col>
                  </Row>
                ) : (
                      tab === "Teammate" ? teammateList
                        .filter((info) => info.teammateId === selected)
                    .map((info, index) => {
                      return (
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
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                              <Dropdown 
                                style={{ width: "150px", marginRight: '1em' }}>
                                <Dropdown.Toggle
                                  id="dropdown-basic"
                                  style={{ height: "45px" }}
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
                                      setFilter("Done")
                                    }}
                                  >Done
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
                                  navigate('/manager/home/block')
                                }}
                                icon="fa-solid fa-grip "
                                style={{ paddingRight: '1em', fontSize: "20px" }}
                              />
                              <NewTask
                                name={info.data.name}
                                designation={info.data.designation}
                                teammate={info.teammate}
                                teammateIndex={info.teammateIndex}
                                tasks={info.data.tasks}
                                manager={manager}
                                managerId={managerId}
                              />
                            </div>
                          </Col>
                        </Row>
                      )
                    }) : (manager?.clients
                          ?.filter((info) => info === clientSelected)
                      .map((info) => {
                        return (
                          <Row>
                            <Col sm={6} md={6} style={{ marginTop: '1.5em' }}>
                              <h4 className="blue">{info}</h4>
                            </Col>
                            <Col
                              sm={6}
                              md={6}
                              style={{ marginTop: '1em' }}
                              className="text-end"
                            >
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                <Dropdown 
                                  style={{ width: "200px" }}>
                                  <Dropdown.Toggle
                                    style={{ height: "45px" }}
                                    id="dropdown-basic"
                                    className="w-100  company-dropdown"
                                  >{filter}
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu
                                    style={{ width: "200px" }} className="company-dropdown-menu">
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
                                        setFilter("Done")
                                      }}
                                    >Done
                                    </Dropdown.Item><Dropdown.Item
                                      onClick={(e) => {
                                        setFilter("Completed")
                                      }}
                                    >Completed
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </Col>
                          </Row>)
                      }))
                )}
                <div className="overflow-set-auto table-height1">
                  <Row className="table-height1">
                      <Col>
                        {
                          teammateList && tab === "Teammate" ?
                            <TeammateTable
                              filterTeammate={filter}
                              teammateselected={selected}
                              team={teammateList}
                              addTeammate={addTeammate}
                              manager={manager}
                              managerId={managerId}
                              allTasks={allTasks} />
                            : <></>}
                        {
                          allTasks && tab === "Company" ? <ClientTable
                            filter={filter}
                            allTasks={allTasks}
                            clientSelected={clientSelected}
                            dateFormatChange={dateFormatChange}
                            timeFormatChange={timeFormatChange} /> : <></>
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
