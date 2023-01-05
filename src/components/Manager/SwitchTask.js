import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { db } from '../../firebase-config'
import Dropdown from 'react-bootstrap/Dropdown'

export default function SwitchTask(props) {
    const [newClient, setNewClient] = useState('')
    const [teammateId, setTeammateId] = useState('')
    const [teammateName, setTeammateName] = useState('')
    const [taskNumber, setTaskNumber] = useState(0)
    const [teammateList, setTeammateList] = useState([])
    const [newTask, setNewTask] = useState()
    useEffect(() => {
        var today = new Date()
        setNewTask({
            client: props?.switchTask?.client,
            task: props?.switchTask?.task,
            clientEmail: props?.switchTask?.clientEmail,
            updates: props?.switchTask?.updates.concat({
                description: ['This task was switched to you.'],
                assignedDate:
                    String(today.getDate()).padStart(2, '0') +
                    '/' +
                    String(today.getMonth() + 1).padStart(2, '0') +
                    '/' +
                    today.getFullYear(),
                assignedTime:
                    today.getHours() +
                    ':' +
                    today.getMinutes() +
                    ':' +
                    today.getSeconds(),
                corrections: props?.switchTask?.updates.length,
                deadlineDate: '--',
                deadlineTime: '--',
                status: 'Assigned',
            },),
        })
    }, [props])
    const handleNewTask = () => {
        if (teammateId === '') {
            alert('First Select a teammate')
        } else {
            set(ref(db, `/teammate/${teammateId}/tasks/${taskNumber}`), newTask,)
                .then(() => {
                    props?.handleDeleteTask(props?.prevTaskList, props?.prevTeammateId, props?.prevTaskIndex)
                    window.location.reload()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const searchClient = (e) => {
        setNewClient(e.target.value)
        const newFilter = props?.props?.team
            .filter((client) => {
                return client.teammate !== props.prevTeammateId
            })
            .filter((val) => {
                return val.data.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            })
        if (e.target.value === '') {
            setTeammateList(
                props?.props?.team.filter((client) => {
                    return client.teammate !== props.prevTeammateId
                }),
            )
        } else {
            setTeammateList(newFilter)
        }
    }

    return (
        <div className="bg-white switch-task-box" style={{}}>
            <Button
                variant="light"
                onClick={(e) => {
                    props.setSwitchTask('')
                }}
                className="mb-3"
            >
                <FontAwesomeIcon icon="fa-solid fa-chevron-left" /> Close
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
                            {teammateName ? teammateName : 'Select Teammate'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="client-dropdown-menu w-100">
                            <div className="add-new-input">
                                <input
                                    className="add-new-input-textbox w-100"
                                    type="text"
                                    name="newClient"
                                    placeholder="&#xf002;    Search"
                                    value={newClient}
                                    onChange={searchClient}
                                />
                            </div>
                            <div className="client-dropdown-menu-list client-dropdown-menu-height">
                                {teammateList.length === 0 && newClient === ''
                                    ? props?.props?.team
                                        .filter((client) => {
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
                                            )
                                        })
                                    : teammateList.map((client, index) => {
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
                                        )
                                    })}
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Form.Group>

            <div
                className="d-grid gap-2"
                style={{
                    marginBottom: '.5em',
                }}
            >
                <Button
                    variant="primary"
                    onClick={handleNewTask}
                    style={{
                        textAlign: 'center',
                    }}
                    block
                >
                    Switch
                </Button>
            </div>
        </div>
    )
}
