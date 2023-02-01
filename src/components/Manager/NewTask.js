import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form, OverlayTrigger } from "react-bootstrap";
import { db } from "../../firebase-config";
import moment from "moment";
import Dropdown from 'react-bootstrap/Dropdown';
import notifyNewTask from "./NotificationFunctions";
import clientTaskAdd from "./ClientTaskCount";
import axios from "axios";
import { addNewTask, addNewClient } from "../../database/write/managerWriteFunctions";
import { sendNewTaskEmail } from "../../database/email/Sendemail";
// import WhatsAppMessageSend from "../WhatsappMessageSend";


export default function NewTask(props) {
  const [show, setShow] = useState(false);
  const [assignedDate, setAssignedDate] = useState();
  const [newClient, setNewClient] = useState("");
  const [clientList, setClientList] = useState(props?.manager?.clients);
  const [teamRequest, setTeamRequest] = useState([]);
  const [newTask, setNewTask] = useState({
    client: "",
    clientIndex: "",
    task: "",
    manHours: 0,
    updates: {
      0: {
        description: { 0: "" },
        assignedStartDate: "--",
        assignedStartTime: "--",
        corrections: "0",
        startTimeStamp: "null",
        deadlineDate: "--",
        deadlineTime: "--",
        status: "Assigned",
      },
    },
  });

  const handleChange = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setNewTask({ ...newTask, ...newInput });
  };
  const handleDescriptionChange = (event) => {
    newTask.updates[0].description[0] = event.target.value;
  };

  const handleStartDateChange = (event) => {
    setAssignedDate(event.target.value)
    let date = (event.target.value).split("-")
    newTask.updates[0].assignedStartDate = date[2] + "/" + date[1] + "/" + date[0]
  };

  const handleStartTimeChange = (event) => {
    newTask.updates[0].assignedStartTime = event.target.value;
  };
  const handleDateChange = (event) => {
    let date = (event.target.value).split("-")
    newTask.updates[0].deadlineDate = date[2]+"/"+date[1]+"/"+date[0]
  };

  const handleTimeChange = (event) => {
    newTask.updates[0].deadlineTime = event.target.value;
  };

  useEffect(() => {
    onValue(ref(db, `/manager/${props?.managerId}/teammates/${props?.teammateIndex}/data`), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setTeamRequest(data.notifications)
        return true
      }
    })
  }, [props])

  const validateForm = () => {
    if (newTask.client === '' || newTask.task === '' || newTask.updates[0].assignedStartTime === '--' || newTask.updates[0].assignedStartDate === '--' || newTask.updates[0].description === '') {
      return false
    }
    else { return true }
  }
  const handleNewTask = () => {
    if (validateForm()) {
      if (props?.name === "No Teammate") {
        alert("Select a Teammate first")
      } else {

        const newDate = new Date(newTask.updates[0].deadlineDate + " " + newTask.updates[0].deadlineTime)
        var today = new Date(),
          date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        addNewTask(props?.teammate.name, props?.manager.companyName, props?.manager.companyId, "clientName", "clientId", props?.managerId, date, props?.managerId, props?.manager.managerEmail, newTask.task, newDate)
        sendNewTaskEmail(props?.teammate.teammateEmail, props?.manager, newTask)
        clientTaskAdd(props?.managerId, newTask.clientIndex, props?.manager?.clients[newTask.clientIndex].taskCount, props?.manager?.clients[newTask.clientIndex].totalTaskCount)

        setNewTask({
          client: "",
          task: "",
          manHours: 0,
          updates: {
            0: {
              description: { 0: "" },
              assignedStartDate: "--",
              assignedStartTime: "--",
              corrections: "0",
              deadlineDate: "--",
              startTimeStamp: "null",
              deadlineTime: "--",
              status: "Assigned",
            },
          },
        })
      }
    } else {
      alert("Fill all the required field!!")
    }
  };

 const searchClient=(e)=>{
  setNewClient(e.target.value)
   const newFilter = props?.manager?.clients.filter((val) => {
     return val.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    if (e.target.value === "") {
      setClientList(props?.manager?.clients);
    } else {
      setClientList(newFilter);
    }
 }

  const addClient = () => {
    if (props?.manager?.clients) {
      let clientAvailable = false
      props?.manager?.clients?.forEach((client) => {
        if (newClient === client.name) clientAvailable = true
      })
      if (clientAvailable) {
        alert("Client Already Added")
      }
      else {
        const clients = [...props?.manager?.clients, { name: newClient, taskCount: 0, totalTaskCount: 0, manHours: 0, clientNumber: props?.manager?.clients.length }];
        update(ref(db, `manager/${props?.managerId}/`), { clients });

        addNewClient(props?.manager.companyId, "clientId", "NewClientName", props?.managerId, props?.manager.managerName, props?.manager.companyName)
      }
    }
    else {
      const clients = [{ name: newClient, taskCount: 0, totalTaskCount: 0, manHours: 0, clientNumber: 0 }];
      update(ref(db, `manager/${props?.managerId}/`), { clients });
    }
    setNewClient('')
  }
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
                    {newTask.client === "" ? "Select" : newTask.client}
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
                        {
                          props?.manager?.clients ? clientList?.length === 0 && newClient === "" ?
                            props?.manager?.clients?.map((client, index) => {
                              return (
                                <Dropdown.Item
                                  key={index}
                                  onClick={(e) => {
                                    setNewTask((oldTask) => {
                                      return { ...oldTask, client: client.name, clientIndex: client.clientNumber };
                                    });
                                  }}
                                >
                                  {client.name}
                                </Dropdown.Item>
                              );
                            }) :
                            props?.manager?.clients?.map((client, index) => {
                              return (
                                <Dropdown.Item
                                  key={index}
                                  onClick={(e) => {
                                    setNewTask((oldTask) => {
                                      return { ...oldTask, client: client.name, clientIndex: client.clientNumber };
                                    });
                                  }}
                                >
                                  {client.name}
                                </Dropdown.Item>
                              );
                            }) : <></>
                        }</Row></div>
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
                  onChange={handleDescriptionChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 deadline"
              controlId="formPlaintext3"
            >
              <Form.Label column md="4" sm="4">
                Start Time
              </Form.Label>
              <Col sm="4" md="4">
                <Form.Control
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                  name="assignedStartDate"
                  style={{ fontSize: "12px" }}
                  onChange={handleStartDateChange}
                />
              </Col>
              <Col sm="4" md="4">
                <Form.Control
                  type="time"
                  style={{ fontSize: "12px" }}
                  name="assignedStartTime"
                  onChange={handleStartTimeChange}
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
                  min={assignedDate || moment().format("YYYY-MM-DD")}
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
