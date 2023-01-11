import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onValue, ref, update } from "firebase/database";
import React, { useState } from "react";
import { Button, Row, Col, Form, OverlayTrigger } from "react-bootstrap";
import { db } from "../../firebase-config";
import moment from "moment";
import Dropdown from 'react-bootstrap/Dropdown';


export default function NewTask(props) {
  var today = new Date();
  const [newClient,setNewClient]=useState("");
  const [clientList, setClientList] = useState([]);
  const [teamRequest, setTeamRequest] = useState([])
  const [newTask, setNewTask] = useState({
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

  const getTeammatesWithMail = () => {
    onValue(ref(db, `/manager/${props?.managerId}/teammates/${props?.teammateIndex}/data`), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setTeamRequest(data.notifications)
        return true
      } else {
        alert('User not available')
      }
    })
  }

  const handleNewTask = (id, allTasks) => {
    if (props?.name === "No Teammate") {
      alert("Select a Teammate first")
    } else {
      getTeammatesWithMail()
      if (allTasks === undefined) {
        if (teamRequest === undefined) {
          let newArr = [newTask.client + " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime)]
          update(ref(db, `/manager/${props?.managerId}/teammates/${props?.teammateIndex}/data`), { tasks: [newTask], notifications: newArr })
        } else {
          let newArr = []
          let exists = false
          teamRequest.forEach((element) => {
            exists = true
            newArr.push(element)
          })
          if (exists) {
            let newArr2 = [...newArr, newTask.client + " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime)]
            update(ref(db, `/manager/${props?.managerId}/teammates/${props?.teammateIndex}/data`), { tasks: [newTask], notifications: newArr2 })
          }
        }
      }
      else {
        if (teamRequest === undefined) {
          let newArr = [newTask.client + " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime)]
          update(ref(db, `/manager/${props?.managerId}/teammates/${props?.teammateIndex}/data`), { tasks: [newTask].concat(allTasks), notifications: newArr })
        } else {
          let newArr = []
          let exists = false
          teamRequest.forEach((element) => {
            exists = true
            newArr.push(element)
          })
          if (exists) {
            let newArr2 = [...newArr, newTask.client + " New Task added on " + dateFormatChange(newTask.updates[0].assignedDate) + " at " + timeFormatChange(newTask.updates[0].assignedTime)]
            update(ref(db, `/manager/${props?.managerId}/teammates/${props?.teammateIndex}/data`), { tasks: [newTask].concat(allTasks), notifications: newArr2 })
          }
        }
      }
    }

  };

 const searchClient=(e)=>{
  setNewClient(e.target.value)
   const newFilter = props?.manager?.clients.filter((val) => {
      return val.toLowerCase().includes(e.target.value.toLowerCase());
    });
    if (e.target.value === "") {
      setClientList(props?.manager?.clients);
    } else {
      setClientList(newFilter);
    }
 }
  const addClient = () => {
    if (props?.manager?.clients) {
      if (props?.manager.clients.includes(newClient)) {
        alert("Client Already Added")
      } else {
        const clients = [...props.manager.clients, newClient];
        update(ref(db, `manager/${props?.managerId}/`), {
          clients,
        });
      }
  }else{
    const clients = [newClient];
      update(ref(db, `manager/${props?.managerId}/`), {
    clients
     });
    } 
  }
  return (
    <>
      <OverlayTrigger
        trigger="click"
        key="bottom"
        placement="bottom"
        rootClose
        overlay={
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
                        onChange={searchClient}
                      />
                      <button onClick={() => { addClient(); }} >Add</button>
                    </div>
                    <div className=" client-dropdown-menu-list client-dropdown-menu-height">
                      <Row className="client-dropdown-menu-height">
                        {
                          props?.manager ? clientList?.length === 0 && newClient === "" ?
                            props?.manager?.clients?.map((client, index) => {
                              return (
                                <Dropdown.Item
                                  key={index}
                                  onClick={(e) => {
                                    setNewTask((oldTask) => {
                                      return { ...oldTask, client };
                                    });
                                  }}
                                >
                                  {client}
                                </Dropdown.Item>
                              );
                            }) :
                            clientList.map((client, index) => {
                              return (
                                <Dropdown.Item
                                  key={index}
                                  onClick={(e) => {
                                    setNewTask((oldTask) => {
                                      return { ...oldTask, client };
                                    });
                                  }}
                                >
                                  {client}
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
                  handleNewTask(
                    props?.teammate,
                    props?.tasks
                  );
                }}
                style={{
                  textAlign: "center",
                }}
                block
              >
                Assign
              </Button>
            </div>
          </div>
        }
      >
        <Button
          type="Button"
          variant="light"
          className="add-task-button"
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
