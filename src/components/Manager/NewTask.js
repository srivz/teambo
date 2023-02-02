import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form, OverlayTrigger } from "react-bootstrap";
import moment from "moment";
import Dropdown from 'react-bootstrap/Dropdown';
// import notifyNewTask from "./NotificationFunctions";
import { addNewTask, addNewClient } from "../../database/write/managerWriteFunctions";
import { sendNewTaskEmail } from "../../database/email/sendEmail";
import { readClients } from "../../database/read/managerReadFunction";
import { auth } from "../../firebase-config";


export default function NewTask(props) {
  const [show, setShow] = useState(false);
  const [prevClients, setPrevClients] = useState([]); 
  const [newClient, setNewClient] = useState("");
  const [clientList, setClientList] = useState([]);
  const [user, setUser] = useState()
  const [newTask, setNewTask] = useState({
    clientName: "",
    clientId: "",
    task: "",
    description: "",
        deadlineDate: "--",
        deadlineTime: "--",
    status: "Assigned",
  });

  async function fetchData() {
    try {
      const data = await readClients(user);
      setPrevClients(data)
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
  useEffect(() => {
    fetchData1();
    async function fetchData1() {
      try {
        const data = await readClients(user);
        setPrevClients(data)
      } catch (error) {
        console.error(error);
      }
    }
  }, [user])


  const searchClient = (e) => {
    setNewClient(e.target.value)
    const newFilter = prevClients.filter((val) => {
      return val.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    if (e.target.value === "") {
      setClientList(prevClients);
    } else {
      setClientList(newFilter);
    }
  }

  const addClient = () => {
    addNewClient(new Date(), props?.manager.companyId, newClient, props?.managerId, props?.manager.managerName, props?.manager.companyName)
    fetchData()
    setNewClient('')
  }

  const handleChange = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setNewTask({ ...newTask, ...newInput });
  };

  const handleDateChange = (event) => {
    let date = (event.target.value).split("-")
    newTask.deadlineDate = date[1] + "/" + date[2] + "/" + date[0]
  };

  const handleTimeChange = (event) => {
    newTask.deadlineTime = event.target.value;
  };

  const validateForm = () => {
    if (newTask.client === '' || newTask.task === '' || newTask.description === '') {
      return false
    }
    else { return true }
  }
  const handleNewTask = () => {
    if (validateForm()) {
      if (props?.name === "No Teammate") {
        alert("Select a Teammate first")
      } else {
        let now = new Date();
        let newDate = "--"
        if (newTask.deadlineDate !== "--" && newTask.deadlineTime !== "--") {
          let date = newTask.deadlineDate + " " + newTask.deadlineTime + ":00"
          newDate = new Date(date);
        }
        addNewTask(
          0,
          props?.manager.companyId,
          props?.manager.companyName,
          newTask.clientId,
          newTask.clientName,
          props?.managerId,
          props?.teammate.teammateName,
          props?.teammateId,
          now,
          props?.managerId,
          props?.manager.managerEmail,
          newTask.task,
          now,
          newDate,
          newTask.description,
          "DESCRIPTION_ADDED")
        sendNewTaskEmail(props?.teammate.teammateEmail, props?.manager, newTask)
        setNewTask({
          clientName: "",
          clientId: "",
          task: "",
          description: "",
          deadlineDate: "--",
          deadlineTime: "--",
          status: "Assigned",
        });
        // window.location.reload();
        setShow(false);
      }
    } else {
      alert("Fill all the required field!!")
    }
  };

  return (
    <>
      <OverlayTrigger
        trigger="click"
        key="bottom"
        placement="bottom"
        rootClose
        overlay={show ?
          <div
            className="bg-white"
            style={{
              zIndex: "5",
              padding: "1em",
              marginTop: "10px",
              marginLeft: "-50px",
              width: "400px",
              boxShadow: "rgba(0, 0, 0, 0.15) 1px 3px 5px",
            }}
          >
            <h5 className="blue">{props?.name}</h5>
            <h6>{props?.designation}</h6>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext1">
              <Form.Label column sm="4" md="4">
                Client*
              </Form.Label>
              <Col sm="8">
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="w-100 client-dropdown"
                  >
                    {newTask.clientName === "" ? "Select" : newTask.clientName}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="client-dropdown-menu">
                    <div className="add-new-input">
                      <input className="add-new-input-textbox"
                        type="text"
                        name="newClient"
                        placeholder="&#xf002;    Search"
                        value={newClient}
                        onChange={searchClient}
                      />
                      <button onClick={() => { addClient(); }} >Add</button>
                    </div>
                    <div className=" client-dropdown-menu-list client-dropdown-menu-height">
                      <Row className="client-dropdown-menu-height">
                        {clientList.length === 0 && newClient === "" ?
                          prevClients.map((client) => {
                            return (
                              <Dropdown.Item
                                key={client.id}
                                onClick={(e) => {
                                  setNewTask((oldTask) => {
                                    return { ...oldTask, clientName: client.data.clientName, clientId: client.id };
                                  });
                                }}
                              >
                                {client.data.clientName}
                              </Dropdown.Item>
                            );
                          }) :
                          clientList.map((client) => {
                            return (
                              <Dropdown.Item
                                key={client.id}
                                onClick={(e) => {
                                  setNewTask((oldTask) => {
                                    return { ...oldTask, clientName: client.data.clientName, clientId: client.id };
                                  });
                                }}
                              >
                                {client.data.clientName}
                              </Dropdown.Item>
                            );
                          })}</Row></div>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext2">
              <Form.Label column md="4" sm="4">
                Task*
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" name="task" onChange={handleChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext3">
              <Form.Label column md="4" sm="4">
                Description*
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  as="textarea"
                  name="description"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 deadline"
              controlId="formPlaintext4"
            >
              <Form.Label column md="4" sm="4">
                Deadline
              </Form.Label>
              <Col sm="4" md="4">
                <Form.Control
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                  name="deadlineDate"
                  style={{ fontSize: "12px" }}
                  onChange={handleDateChange}
                />
              </Col>
              <Col sm="4" md="4">
                <Form.Control
                  type="time"
                  style={{ fontSize: "12px" }}
                  name="deadlineTime"
                  onChange={handleTimeChange}
                />
              </Col>
            </Form.Group>
            <div
              className="d-grid gap-2"
              style={{
                marginBottom: ".5em",
              }}
            >
              <Button
                variant="primary"
                onClick={() => {
                  handleNewTask();
                }}
                style={{
                  textAlign: "center",
                }}
                block
              >
                Assign
              </Button>
            </div>
          </div> : <></>
        }
      >
        <Button
          type="Button"
          variant="light"
          className="add-task-button"
          onClick={() => { setShow(true); }}
        >
          <FontAwesomeIcon
            icon="fa-regular fa-square-plus"
            style={{ paddingRight: ".5em", fontSize: "16px" }}
          />
          New Task
        </Button>
      </OverlayTrigger>
    </>
  );
}
