import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ref, set, update } from "firebase/database";
import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, OverlayTrigger } from "react-bootstrap";
import { db } from "../../firebase-config";
import moment from "moment";
import Dropdown from 'react-bootstrap/Dropdown';
import Popover from 'react-bootstrap/Popover';


export default function SwitchTask(props) {
    var today = new Date();
    const [newClient, setNewClient] = useState("");
    const [teammateId, setTeammateId] = useState("");
    const [teammateName, setTeammateName] = useState("");
    const [taskNumber, setTaskNumber] = useState(0);
    const [teammateList, setTeammateList] = useState([]);
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

    const handleDescriptionChange = (event) => {
        newTask.updates[0].description[0] = event.target.value;
    };
    const handleDateChange = (event) => {
        let date = (event.target.value).split("-")
        newTask.updates[0].deadlineDate = date[2] + "/" + date[1] + "/" + date[0]
    };

    const handleTimeChange = (event) => {
        newTask.updates[0].deadlineTime = event.target.value;
    };

    const handleNewTask = async () => {

        if (teammateId === "") {
            alert("First Select a teammate")
        }
        else {
            props?.handleDeleteTask(props?.prevTeammateId, props?.prevTaskIndex);
            set(ref(db, `/teammate/${teammateId}/tasks/${taskNumber}/`), newTask)
                .then(() => {
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    };

    const searchClient = (e) => {
        setNewClient(e.target.value)
        const newFilter = props?.props?.team.filter((client) => {
            return client.teammate !== props.prevTeammateId
        }).filter((val) => {
            return val.data.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        if (e.target.value === "") {
            setTeammateList(props?.props?.team.filter((client) => {
                return client.teammate !== props.prevTeammateId
            }));
        } else {
            setTeammateList(newFilter);
        }
    }


    useEffect(() => {
        setNewTask((task) => {
            return { ...task, task: props?.switchTask?.task, client: props?.switchTask?.client, clientEmail: props?.switchTask?.clientEmail, }
        })
    }, [props]);

    console.log(props);
    console.log(newTask);

    return (
        <div
            className="bg-white switch-task-box"
            style={{

            }}
        >
            <Button variant="light" onClick={(e) => {
                props.setSwitchTask("");
            }} className="mb-3">
                <FontAwesomeIcon icon="fa-solid fa-chevron-left" />{" "}
                Close
            </Button>
            <h5 className="blue">Move Task To.. </h5>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext1">
                <Form.Label column sm="4" md="4">
                    Teammate-
                </Form.Label>
                        <Col sm="8">
                            <Dropdown>
                                <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className="w-100 client-dropdown"
                                >
                            {teammateName ? teammateName : "Select Teammate"}
                                </Dropdown.Toggle>

                        <Dropdown.Menu className="client-dropdown-menu w-100">
                                    <div className="add-new-input">
                                <input className="add-new-input-textbox w-100"
                                            type="text"
                                            name="newClient"
                                            placeholder="&#xf002;    Search"
                                            value={newClient}
                                            onChange={searchClient}
                                        />
                                    </div>
                            <div className="client-dropdown-menu-list client-dropdown-menu-height">
                                {teammateList.length === 0 && newClient === "" ?
                                    props?.props?.team.filter((client) => {
                                        return client.teammate !== props.prevTeammateId
                                    })
                                        .map((client, index) => {
                                            return (
                                                <Dropdown.Item
                                                    key={index}
                                                    onClick={(e) => {
                                                        setTeammateName(client.data.name)
                                                        setTeammateId(client.teammate)
                                                        setTaskNumber(client.data.tasks.length)
                                                    }}
                                                >
                                                    {client.data.name}
                                                </Dropdown.Item>
                                            );
                                        })
                                    :
                                    teammateList.map((client, index) => {
                                        return (
                                            <Dropdown.Item
                                                key={index}
                                                onClick={(e) => {
                                                    setTeammateName(client.data.name)
                                                    setTeammateId(client.teammate)
                                                    setTaskNumber(client.data.tasks.length)
                                                }}
                                            >
                                                {client.data.name}
                                            </Dropdown.Item>
                                        );
                                    })}

                            </div>
                                </Dropdown.Menu>
                            </Dropdown>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintext2">
                <Form.Label column md="4" sm="4">
                    Client
                </Form.Label>
                <Col sm="8">
                    <Form.Control
                        type="text"
                        name="client"
                        disabled
                        value={newTask.client}
                    />
                </Col>
            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintext2">
                                <Form.Label column md="4" sm="4">
                                    Task
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control
                                        type="text"
                                        name="task"
                                        disabled
                        value={newTask.task}
                                    />
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
                            <div
                                className="d-grid gap-2"
                                style={{
                                    marginBottom: ".5em",
                                }}
                            >
                <Button
                            variant="primary"
                    onClick={handleNewTask}
                            style={{
                                textAlign: "center",
                            }}
                            block
                        >
                    Switch
                </Button> 
                            </div>
        </div>

    );
}
