import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onValue, ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { db } from '../../firebase-config'
import Dropdown from 'react-bootstrap/Dropdown'
import { notifySwitchFromTask, notifySwitchToTask } from './NotificationFunctions'

export default function SwitchTask(props) {
    const [newClient, setNewClient] = useState('')
    const [teammateId, setTeammateId] = useState(null)
    const [teammateName, setTeammateName] = useState('')
    const [prevTasks, setPrevTasks] = useState([])
    const [teammateList, setTeammateList] = useState([])
    const [newTask, setNewTask] = useState()
    const [teamRequest, setTeamRequest] = useState([]);
    const [teamRequest1, setTeamRequest1] = useState([]);
    const close = () => { props?.setswitchtask(''); }

    useEffect(() => {
        setNewTask([{
            client: props?.switchtask?.client,
            task: props?.switchtask?.task,
            manHours: 0,
            clientIndex: props?.switchtask?.clientIndex,
            updates: props?.switchtask?.updates.concat({
                description: ['This task was switched to you.'],
                assignedStartDate: props?.switchtask?.updates[props?.switchtask?.updates.length - 1].assignedStartDate,
                assignedStartTime: props?.switchtask?.updates[props?.switchtask?.updates.length - 1].assignedStartTime,
                corrections: props?.switchtask?.updates.length,
                deadlineDate: '--',
                startTimeStamp: "null",
                deadlineTime: '--',
                status: 'Assigned',
            },),
        }])
    }, [props])
    useEffect(() => {
        onValue(ref(db, `/manager/${props?.managerid}/teammates/${teammateId}/data`), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                setPrevTasks(data.tasks)
                setTeamRequest(data.notifications)
                return true
            } else {
            }
        })
    }, [props, teammateId])
    useEffect(() => {
        onValue(ref(db, `/manager/${props?.managerid}/teammates/${props?.prevteammateindex}/data`), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                setTeamRequest1(data.notifications)
                return true
            } else {
            }
        })
    }, [props])
    const handleNewTask = () => {
        if (teammateId === '') {
            alert('First Select a teammate')
        } else {
            if (!prevTasks) {
                notifySwitchToTask(teamRequest, props?.managerid, teammateId, props?.switchtask?.client);
                notifySwitchFromTask(teamRequest1, props?.managerid, props?.prevteammateindex, props?.switchtask?.client);
                set(ref(db, `/manager/${props?.managerid}/teammates/${teammateId}/data/tasks`), newTask,)
                    .then(() => {
                        props?.handleDeleteTask(props?.prevtasklist, props?.prevteammateindex, props?.prevtaskindex)
                        close()
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                let newArr = []
                let exists = false
                prevTasks.forEach((element) => {
                    exists = true
                    newArr.push(element)
                })
                if (!exists) {
                } else {
                    let newArr2 = newTask.concat(newArr)
                    notifySwitchToTask(teamRequest, props?.managerid, teammateId, props?.switchtask?.client);
                    notifySwitchFromTask(teamRequest1, props?.managerid, props?.prevteammateindex, props?.switchtask?.client);
                    set(ref(db, `/manager/${props?.managerid}/teammates/${teammateId}/data/tasks`), newArr2,)
                        .then(() => {
                            props?.handledeletetask(props?.prevtasklist, props?.prevteammateindex, props?.prevtaskindex)
                            close()
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }

            }
        }
    }
    // console.log(props)
    const searchClient = (e) => {
        setNewClient(e.target.value)
        const newFilter = props?.props?.team
            .filter((client) => {
                return client.teammate !== props?.prevteammateid
            })
            .filter((val) => {
                return val.data.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            })
        if (e.target.value === '') {
            setTeammateList(
                props?.props?.team.filter((client) => {
                    return client.teammate !== props?.prevteammateid
                }),
            )
        } else {
            setTeammateList(newFilter)
        }
    }
    return (props?.show ?
        <div className="bg-white switch-task-box" style={{}}>
            <Button
                variant="light"
                onClick={(e) => {
                    close()
                }}
                className="mb-3"
            >
                <FontAwesomeIcon icon="fa-solid fa-chevron-left" /> Close
            </Button>
            <h5 className="blue">Move Task To.. </h5>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext1">
                <Form.Label column sm="4" md="4">
                    Teammate
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
                                            return client.teammateIndex !== props?.prevteammateindex
                                        })
                                        .map((client, index) => {
                                            return (
                                                <Dropdown.Item
                                                    key={index}
                                                    onClick={(e) => {
                                                        setTeammateName(client.data.name)
                                                        setTeammateId(client.teammateIndex)
                                                    }}
                                                >
                                                    {client.data.name}
                                                </Dropdown.Item>
                                            )
                                        })
                                    : teammateList
                                        .filter((client) => {
                                            return client.teammateIndex !== props?.prevteammateindex
                                        })
                                        .map((client, index) => {
                                        return (
                                            <Dropdown.Item
                                                key={index}
                                                onClick={(e) => {
                                                    setTeammateName(client.data.name)
                                                    setTeammateId(client.teammateIndex)
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
                    onClick={() => {
                        handleNewTask();
                    }}
                    style={{
                        textAlign: 'center',
                    }}
                    block
                >
                    Switch
                </Button>
            </div>
        </div> : <></>
    )
}
