import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
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
import { auth } from '../../firebase-config'
import readManagers, { readAllLiveTasks, readClients, readTeammatesFromList } from '../../database/read/managerReadFunction';
import { onAuthStateChanged } from 'firebase/auth';
import { requestTeammate } from '../../database/write/managerWriteFunctions';
import { sendRequestTeammateEmail } from '../../database/email/sendEmail';


export default function HomeList() {
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("teammateSelected")) === undefined ? null : JSON.parse(localStorage.getItem("teammateSelected"))
  );
  const [clientSelected, setClientSelected] = useState(
    JSON.parse(localStorage.getItem('clientSelected')) === undefined ? null : JSON.parse(localStorage.getItem('clientSelected')),);
  const [filter, setFilter] = useState("All");
  const [teammateEmail, setTeammateEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(JSON.parse(localStorage.getItem('tabSelected')) === null || JSON.parse(localStorage.getItem('tabSelected')) === undefined ? "Teammate" : JSON.parse(localStorage.getItem('tabSelected')));
  const [searchText, setSearchText] = useState("");
  const [searchText2, setSearchText2] = useState("");
  const [manager, setManager] = useState({})
  const [user, setUser] = useState()
  const [managerId, setManagerId] = useState('')
  const [teammateList, setTeammateList] = useState([])
  const [clientList, setClientList] = useState([])
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState([])

  const navigate = useNavigate();

  async function fetchManagerData(userUid) {
    try {
      const managerData = await readManagers(userUid);
      setManager(managerData.data);
      setManagerId(managerData.id);
      const teammate = await readTeammatesFromList(managerData.id);
      setTeammateList(teammate);
      const clients = await readClients(managerData.id);
      setClientList(clients);
      fetchTasks(managerData.id)

    } catch (error) {
      console.error(error);
    }
  }
  async function fetchTasks(id) {
    try {
      const data = await readAllLiveTasks(id);
      setTasks(data)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userLog) => {
      setUser(userLog.uid);
    });
    return () => unsubscribe();
  }, []);

  onAuthStateChanged(auth, (user) => { if (user) { } else { window.location.href = "/" } })

  useEffect(() => {
    setLoading(true);
    fetchManagerData(user);
    setLoading(false);
  }, [user])

  const addTeammate = async () => {
    if (teammateEmail === '') {
      alert('Enter email first')
      return
    }
    requestTeammate(managerId, manager.managerName, teammateEmail);
    sendRequestTeammateEmail(teammateEmail, manager)
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
          <div id="main" style={{ backgroundColor: "#fff" }}>
            <NavBar
              id={managerId}
              user="MANAGER"
              user2="MANAGER"
              name={manager.managerName}
              role={manager.designation}
            />
            <Container>
            <Row>
                <Col sm={3} md={3} style={{ marginTop: '1em' }}>
                  <Tabs
                    className="tabclass"
                    activeKey={tab}
                    onSelect={(e) => {
                      setTab(e);
                      localStorage.setItem(
                        'tabSelected',
                        JSON.stringify(e)
                      );
                    }}>
                    <Tab eventKey="Teammate" title="Teammate">
                      <div className="task-box">
                        <Row>
                          <Col sm={10} md={10}>
                            <input
                              className="rounded-2 w-100"
                              style={{
                                padding: '.4em',
                                paddingLeft: '1em',
                                border: "1px solid #CDCDCD",
                                borderRadius: "25px",
                                outline: "none",
                              }}
                              type="search"
                              name="search"
                              id="search"
                              onChange={(e) => { setSearchText(e.target.value); }}
                              placeholder="Search"
                            />
                          </Col>
                          <Col sm={1} md={1}>
                            <OverlayTrigger
                              trigger="click"
                              key="auto"
                              placement="auto"
                              rootClose
                              overlay={show ?
                                <div
                                  className="bg-white "
                                  style={{
                                    border: '2px solid #e8e7e7',
                                    padding: '1em',
                                    marginTop: '10px',
                                    marginLeft: '-150px',
                                    zIndex: "5",
                                    boxShadow: 'rgba(0, 0, 0, 0.15) 1px 3px 5px',
                                  }}
                                >
                                  <Row>
                                    <Col md={10}>
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
                                    <Col md={1}>
                                      <FontAwesomeIcon
                                        style={{
                                          marginTop: '.275em',
                                        }}
                                        size="2xl"
                                        className="pointer"
                                        onClick={() => {
                                          addTeammate();
                                          setShow(false);
                                        }}
                                        icon="fa-regular fa-square-plus" />
                                    </Col>
                                  </Row>
                                </div> : <></>
                              }
                            >
                              <FontAwesomeIcon
                                title='Add Teammate'
                                size='2xl'
                                icon="fa-regular fa-square-plus"
                                className='pointer'
                                style={{ marginLeft: "-10px", marginTop: "3px" }}
                                onClick={() => { setShow(true) }}
                              />
                            </OverlayTrigger>
                          </Col>
                        </Row>
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
                                return info.data?.teammateName?.toLowerCase().includes(searchText?.toLowerCase())
                              })?.map((info) => {
                                return (
                                  <TableRow
                                    key={info.id}
                                    className="box-shadow"
                                    onClick={() => {
                                      localStorage.setItem(
                                        'teammateSelected',
                                        JSON.stringify(info.id)
                                      );
                                      setSelected(info.id);
                                    }}
                                    style={{ backgroundColor: "#fff !important" }}
                                  >
                                    <TableCell
                                      style={{
                                        backgroundColor:
                                          selected === info.id
                                            ? '#E2ECFF'
                                            : '#F9FBFF',
                                        borderRadius: '6px',
                                        borderBottom: "1px solid #fff",
                                        paddingTop: '.5em',
                                        paddingBottom: '0em',
                                        height: "10px !important",
                                        width: "100% !important"
                                      }}
                                    >
                                      <h6>{info.data.teammateName}</h6>
                                      <p className="grey" style={{ fontSize: "12px" }}>
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
                    <Tab eventKey="Company" title="Company" >
                      <div className="task-box">
                        <input
                          className="rounded-2 w-100"
                          style={{
                            padding: '.5em',
                            paddingLeft: "1em",
                            border: "1px solid #CDCDCD",
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
                              {clientList === [] ? (
                              <TableRow
                                colSpan={7}
                                align="center">
                                  No Clients right now
                              </TableRow>
                              ) : (
                                  clientList.filter((info) => {
                                    return info.data.clientName.toLowerCase().includes(searchText2?.toLowerCase())
                                  })
                                    ?.map((info) => {
                                      return (
                                        <TableRow
                                          key={info.id}
                                          onClick={() => {
                                            setClientSelected(info.id);
                                            localStorage.setItem(
                                              'clientSelected',
                                              JSON.stringify(info.id)
                                            );
                                          }} style={{ backgroundColor: "#fff !important" }}

                                          className="box-shadow">
                                          <TableCell
                                            style={{
                                              backgroundColor:
                                                info.id === clientSelected
                                                  ? '#E2ECFF'
                                                  : '#F9FBFF',
                                              height: 'fit-content',
                                              borderRadius: '6px',
                                              borderBottom: "1px solid #fff",
                                              paddingTop: '1em',
                                              paddingBottom: '0.5em',
                                              cursor: "pointer"
                                            }}
                                            title={info.data.clientName}>
                                            <h5>{info.data.clientName.length > 23 ? info.data.clientName.slice(0, 20) + "..." : info.data.clientName}</h5>
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
                        .filter((info) => info.id === selected)
                    .map((info, index) => {
                      return (
                        <Row key={index}>
                          <Col sm={6} md={6} style={{ paddingLeft: '1.5em', marginTop: '1em' }}>
                            <h5 className="blue">{info.data.teammateName}</h5>
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
                                >
                                  {filter}
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
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                              <FontAwesomeIcon
                                className="pointer"
                                icon="fa-solid fa-list"
                                color="#5f8fee"
                                style={{
                                  marginRight: '1em', fontSize: "20px"
                                }}
                              />
                              <FontAwesomeIcon
                                className="pointer"
                                onClick={() => {
                                  navigate('/manager/home/block')
                                }}
                                icon="fa-solid fa-grip "
                                style={{ marginRight: '1em', fontSize: "20px" }}
                              />
                              <NewTask
                                updateData={fetchManagerData}
                                name={info.data.teammateName}
                                designation={info.data.designation}
                                teammate={info.data}
                                teammateId={info.id}
                                tasks={info.data.tasks}
                                manager={manager}
                                managerId={managerId}
                              />
                            </div>
                          </Col>
                        </Row>
                      )
                    }) : (clientList.filter((info) => info.id === clientSelected)?.map((info) => {
                        return (
                          <Row>
                            <Col sm={6} md={6} style={{ paddingLeft: '1.5em', marginTop: '1.5em' }}>
                              <h4 className="blue">{info.data.clientName}</h4>
                            </Col>
                            <Col
                              sm={6}
                              md={6}
                              style={{ marginTop: '1em' }}
                              className="text-end"
                            >
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                <Dropdown
                                  style={{
                                    width: "200px"
                                  }}>
                                  <Dropdown.Toggle
                                    style={{
                                      height: "45px"
                                    }}
                                    id="dropdown-basic"
                                    className="w-100  company-dropdown"
                                  >{filter}
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu
                                    style={{
                                      width: "200px"
                                    }} className="company-dropdown-menu">
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
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </Col>

                          </Row>)
                      }))
                  )}

                  {teammateList && tab === "Teammate" ?
                    <TeammateTable
                      filterTeammate={filter}
                      teammateselected={selected}
                      team={teammateList}
                      tasksLive={tasks}
                      name={teammateList
                        .filter((info) => info.id === selected)
                        .map((info) => {
                          return (info.data.teammateName)
                        })}
                      designation={teammateList
                        .filter((info) => info.id === selected)
                        .map((info) => {
                          return (info.data.designation)
                        })}
                      addTeammate={addTeammate} /> : <></>
                  }
                  {clientList && tab === "Company" ?
                    <ClientTable filter={filter} task={tasks} team={teammateList} clientSelected={clientSelected} /> : <></>
                  }
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  )
}
