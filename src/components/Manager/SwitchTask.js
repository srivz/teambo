import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ref, set, update } from "firebase/database";
import React, { useState } from "react";
import { Button, Row, Col, Form, OverlayTrigger } from "react-bootstrap";
import { db } from "../../firebase-config";
import moment from "moment";
import Dropdown from 'react-bootstrap/Dropdown';


export default function NewTask(props) {
    var today = new Date();
    const [newClient, setNewClient] = useState("");
    const [clientList, setClientList] = useState([]);
    const [newTask, setNewTask] = useState({
        client: "",
        task: "",
        clientEmail: "",
        updates: {
            0: {
                description: "",
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
        newTask.updates[0].description = event.target.value;
    };
    const handleDateChange = (event) => {
        let date = (event.target.value).split("-")
        newTask.updates[0].deadlineDate = date[2] + "/" + date[1] + "/" + date[0]
    };

    const handleTimeChange = (event) => {
        newTask.updates[0].deadlineTime = event.target.value;
    };

    const handleNewTask = async (id, tasknumber) => {
        set(ref(db, `/teammate/${id}/tasks/${tasknumber}/`), newTask)
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const searchClient = (e) => {
        setNewClient(e.target.value)
        const newFilter = props.manager?.clients.filter((val) => {
            return val.toLowerCase().includes(e.target.value.toLowerCase());
        });
        if (e.target.value === "") {
            setClientList(props.manager?.clients);
        } else {
            setClientList(newFilter);
        }
    }
    const addClient = () => {
        if (props.manager.clients) {
            const clients = [...props.manager.clients, newClient];
            update(ref(db, `manager/${props.managerId}/`), {
                clients,
            });
        } else {
            const clients = [newClient];
            update(ref(db, `manager/${props.managerId}/`), {
                clients
            });
        }
        window.location.reload()
    }



    return (
        <div
            className="switch-task-box"
        >
            <Button variant="light" onClick={props.setSwitchMode(false)}>
                <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />{" "}
                Close
            </Button>
            <h5 className="blue">Move Task to..</h5>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext1">
                <Form.Label column sm="2" md="2">
                    Teammate
                </Form.Label>
                <Col sm="10">
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
                                <button onClick={addClient}>Add</button>
                            </div>
                            <div className=" client-dropdown-menu-list client-dropdown-menu-height">
                                <Row className="client-dropdown-menu-height">
                                    {
                                        clientList.length === 0 && newClient === "" ?
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
                                            })}</Row></div>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext2">
                <Form.Label column md="2" sm="2">
                    Client
                </Form.Label>
                <Col sm="2">
                    Chaicup
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext2">
                <Form.Label column md="2" sm="2">
                    Task
                </Form.Label>
                <Col sm="2">
                    Chaicup
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext3">
                <Form.Label column md="2" sm="2">
                    Description
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        as="textarea"
                        name="description"
                        rows={4}
                        onChange={handleDescriptionChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group
                as={Row}
                className="mb-3 deadline"
                controlId="formPlaintext3"
            >
                <Form.Label column md="2" sm="2">
                    Deadline
                </Form.Label>
                <Col sm="5" md="5">
                    <Form.Control
                        type="date"
                        min={moment().format("YYYY-MM-DD")}
                        name="deadlineDate"
                        style={{ fontSize: "12px" }}
                        onChange={handleDateChange}
                    />
                </Col>
                <Col sm="5" md="5">
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
                        handleNewTask(
                            props?.teammate,
                            props?.tasks !== undefined ? props?.tasks?.length : 0
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

    );
}
