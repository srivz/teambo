import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { onChildChanged, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
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
import { db } from "../../firebase-config";
import Loader from "../Loader/Loader";
import NewTask from "./NewTask";
import ClientTable from './ClientTable';
import TeammateTable from './TeammateTable';
export default function HomeList(props) {
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem('teammateSelected')),
  );
  const [clientSelected, setClientSelected] = useState(
    JSON.parse(localStorage.getItem('clientSelected')),);
  const [filter, setFilter] = useState("All");
  const [teammateEmail, setTeammateEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("Teammate");


  function handleViewChange() {
    props.onChange(false)
  }
  useEffect(() => {
    return () => {
      if (tab === "Company") {
        setSelected(null);
        localStorage.setItem(
          'teammateSelected',
          JSON.stringify(null)
        );
        setClientSelected(null);
        localStorage.setItem(
          'clientSelected',
          JSON.stringify(null)
        );
      }
      else {
        setClientSelected(null);
        localStorage.setItem(
          'clientSelected',
          JSON.stringify(null)
        );
        setSelected(null);
        localStorage.setItem(
          'teammateSelected',
          JSON.stringify(null)
        );
      }
    }
  }, [tab])

  onChildChanged(ref(db, `/teammate/`), () => {
    setLoading(true)
    window.location.reload()
  })
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

      return "12" + ':' + minute + ' pm'
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
                    defaultActiveKey="Teammate"
                  id="uncontrolled-tab-example"
                    className="mt-3"
                    onSelect={(e) => { setTab(e); setSelected(""); setClientSelected("") }}
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
                          padding: '.25em',
                          borderRadius: '25px',
                          border: '2px solid #e8e7e7',
                          paddingLeft: '20px',
                        }}
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search"
                          disabled
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
                                  props?.team.map((info) => {
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
                    <Tab eventKey="Company" title="Company">
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
                          disabled
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
                              {!props?.manager?.clients ? (
                              <TableRow
                                colSpan={7}
                                align="center">
                                  No Clients right now
                              </TableRow>
                            ) : (
                                  props?.manager?.clients?.map((info) => {
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
                      <div>
                          {/* <FontAwesomeIcon
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
                        /> */}
                      </div>
                    </Col>
                  </Row>
                ) : (
                      tab === "Teammate" ? props?.team
                    .filter((info) => info.teammate === selected)
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
                      )
                    }) : (props?.manager?.clients
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
                                {/* <FontAwesomeIcon
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
                                <NewTask /> */}
                              </div>
                            </Col>
                          </Row>)
                      }))
                )}
                <div className="overflow-set-auto table-height1">
                  <Row className="table-height1">
                      <Col>
                        {
                          props?.team && tab === "Teammate" ?
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
                            : <></>}
                        {
                          props?.allTasks && tab === "Company" ? <ClientTable
                              filter={filter}
                            allTasks={props?.allTasks}
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
