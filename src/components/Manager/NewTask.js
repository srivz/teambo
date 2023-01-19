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


export default function NewTask(props) {
  var today = new Date();
  const [show, setShow] = useState(false);
  const [newClient, setNewClient] = useState("");
  const [clientList, setClientList] = useState(props?.manager?.clients);
  const [teamRequest, setTeamRequest] = useState([]);
  const [newTask, setNewTask] = useState({
    client: "",
    clientIndex: "",
    task: "",
    clientEmail: "",
    updates: {
      0: {
        description: { 0: "" },
        assignedDate:
          String(today.getDate()).padStart(2, "0") +
          "/" +
          String(today.getMonth() + 1).padStart(2, "0") +
          "/" +
          today.getFullYear(),
        assignedTime:
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds(),
        corrections: "0",
        deadlineDate: "--",
        deadlineTime: "--",
        totalTime: "00:0:00",
        totalTimeInMs: "0",
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
      } else {
        alert('User not available')
      }
    })
  }, [props])

  const validateForm = () => {
    if (newTask.client === '' || newTask.clientEmail === '' || newTask.task === '' || newTask.updates[0].description === '') {
      return false
    }
    else { return true }
  }
  const handleNewTask = () => {
    if (validateForm()) {
      if (props?.name === "No Teammate") {
        alert("Select a Teammate first")
      } else {
        if (props?.tasks === undefined) {
          notifyNewTask(teamRequest, props?.managerId, props?.teammateIndex, newTask);
          const newTaskCount = props?.manager.teammates[props?.teammateIndex].data.totalNumberOfTasks + 1
          const newLiveTaskCount = props?.manager.teammates[props?.teammateIndex].data.liveTasks + 1
          clientTaskAdd(props?.managerId, newTask.clientIndex, props?.manager?.clients[newTask.clientIndex].taskCount, props?.manager?.clients[newTask.clientIndex].totalTaskCount)
          update(ref(db, `/manager/${props?.managerId}/teammates/${props?.teammateIndex}/data`), { tasks: [newTask], totalNumberOfTasks: newTaskCount, liveTasks: newLiveTaskCount }).then(async () => {
            setShow(false)
            const subject = `
                  <h4> New Task ${newTask.task} from client ${newTask.client} has been Assigned to you By manager ${props?.manager.name}</h4>
                  <br />
                  <p>Thank you</p>
                `
            const heading = "Task Assigned"
            const text = `New Task ${newTask.task} has been Assigned to you By manager ${props?.manager.name}`
            try {
              const res = await axios.post("https://us-central1-teambo-c231b.cloudfunctions.net/taskCompleted", {
                heading, fromEmail: props?.manager.email, toEmail: props?.teammate.email, subject: subject, name: props?.teammate.name, text: text, whatsAppNo: props?.teammate?.whatsAppNo
              });
              if (res.status === 200) {
                alert("Email sent")
              }
              else {
                alert("Something went wrong");
              }

            } catch (err) {
              alert("error")
              console.log(err)
            }
            setNewTask({
              client: "",
              task: "",
              clientEmail: "",
              updates: {
                0: {
                  description: { 0: "" },
                  assignedDate:
                    String(today.getDate()).padStart(2, "0") +
                    "/" +
                    String(today.getMonth() + 1).padStart(2, "0") +
                    "/" +
                    today.getFullYear(),
                  assignedTime:
                    today.getHours() +
                    ":" +
                    today.getMinutes() +
                    ":" +
                    today.getSeconds(),
                  corrections: "0",
                  deadlineDate: "--",
                  deadlineTime: "--",
                  totalTime: "00:0:0",
                  totalTimeInMs: "0",
                  status: "Assigned",
                },
              },
            })
          })

        }
        else {
          notifyNewTask(teamRequest, props?.managerId, props?.teammateIndex, newTask);
          clientTaskAdd(props?.managerId, newTask.clientIndex, props?.manager?.clients[newTask.clientIndex].taskCount, props?.manager?.clients[newTask.clientIndex].totalTaskCount)
          const newTaskCount = props?.manager.teammates[props?.teammateIndex].data.totalNumberOfTasks + 1
          const newLiveTaskCount = props?.manager.teammates[props?.teammateIndex].data.liveTasks + 1
          update(ref(db, `/manager/${props?.managerId}/teammates/${props?.teammateIndex}/data`), { tasks: [newTask].concat(props?.tasks), totalNumberOfTasks: newTaskCount, liveTasks: newLiveTaskCount }).then(async () => {
            setShow(false);
            const subject = `
                  <h4> New Task ${newTask.task} from client ${newTask.client} has been Assigned to you By manager ${props?.manager.name}</h4>
                  <br />
                  <p>Thank you</p>
                `
            const heading = "Task Assigned"
            const text = `New Task ${newTask.task} has been Assigned to you By manager ${props?.manager.name}`
            try {
              const res = await axios.post("https://us-central1-teambo-c231b.cloudfunctions.net/taskCompleted", {
                heading, fromEmail: props?.manager.email, toEmail: props?.teammate.email, subject: subject, name: props?.teammate.name, text: text, whatsAppNo: props?.teammate?.whatsAppNo
              });
              console.log(res)
              if (res.status === 200) {
                alert("Email sent")
              }
              else {
                alert("Something went wrong");
              }

            } catch (err) {
              alert("error")
              console.log(err)
            }
                setNewTask({
                  client: "",
                  task: "",
                  clientEmail: "",
                  updates: {
                    0: {
                      description: { 0: "" },
                      assignedDate:
                        String(today.getDate()).padStart(2, "0") +
                        "/" +
                        String(today.getMonth() + 1).padStart(2, "0") +
                        "/" +
                        today.getFullYear(),
                      assignedTime:
                        today.getHours() +
                        ":" +
                        today.getMinutes() +
                        ":" +
                        today.getSeconds(),
                      corrections: "0",
                      deadlineDate: "--",
                      deadlineTime: "--",
                      totalTime: "00:0:0",
                      totalTimeInMs: "0",
                      status: "Assigned",
                    },
                  },
                })
          })
        }
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
                            clientList.map((client, index) => {
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
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext2">
              <Form.Label column md="4" sm="4">
                Client Email*
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="email"
                  name="clientEmail"
                  onChange={handleChange}
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
