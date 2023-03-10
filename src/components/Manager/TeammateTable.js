import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import {
    Button,
    Col,
    OverlayTrigger,
    Popover,
    Row,
} from "react-bootstrap";
import { taskArchived, taskMarkedCompleted } from '../../database/write/managerWriteFunctions';
// import TaskHistory from './TaskHistory'
// import SwitchTask from './SwitchTask';
// import { clientTaskComplete, clientTaskDelete } from './ClientTaskCount';
// import { notifyCompleteTask, notifyDeleteTask } from './NotificationFunctions';
// import sendEmail from '../../database/email/sendEmail';
import TaskHistory from './TaskHistory';


export default function TeammateTable(props) {
    const selected = props?.teammateselected
    const filter = props?.filterTeammate;
    const [show, setShow] = useState(false);
    const [taskSelected, setTaskSelected] = useState();
    const [modalShow, setModalShow] = useState(false);
    const tasks = props?.tasksLive
    // const [switchTask, setSwitchTask] = useState()
    // const [prevTeammateId, setPrevTeammateId] = useState("");
    // const [prevTeammateIndex, setPrevTeammateIndex] = useState("");
    // const [prevTaskIndex, setPrevTaskIndex] = useState()
    // const dragItem = useRef();
    // const dragOverItem = useRef();



    //     const handleDeleteSwitchTask = async (teammate, id, index) => {
    //         let list1 = teammate.tasks.slice(0, index);
    //         let list2 = teammate.tasks.slice(index + 1);
    //         let list = list1.concat(list2)
    //         var today = new Date()
    //         let now = 0
    //         const newLiveTaskCount = teammate.liveTasks - 1
    //         if (teammate.tasks[index].updates[teammate.tasks[index].updates.length - 1].status === "On Going")
    //             now = diff_hours(today, teammate.tasks[index].updates[teammate.tasks[index].updates.length - 1].startTimeStamp)
    //         let manHour1 = teammate.manHours + now
    //         update(ref(db, `/manager/${auth.currentUser.uid}/teammates/${id}/data/`), { manHours: manHour1, liveTasks: newLiveTaskCount }).then(() => {
    //             update(ref(db, `/manager/${auth.currentUser.uid}/clients/${teammate.tasks[index].clientIndex}`), { manHours: props?.manager?.clients[teammate.tasks[index].clientIndex].manHours + now })
    //         })
    //         set(ref(db, `/manager/${auth.currentUser.uid}/teammates/${id}/data/tasks`), list)
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //         const subject = `
    //                     <h4> Your Task ${teammate.tasks[index].task} has been Switched to another teammate By manager ${props?.manager.name}</h4>
    //                     <br />
    //                     <p>Thank you</p>
    //                 `
    //         const heading = "Task Switched";
    //         const text = `Your Task ${teammate.tasks[index].task} has been Removed By manger ${props?.manager.name}`
    //         try {
    //             const res = await axios.post("https://us-central1-teambo-c231b.cloudfunctions.net/taskCompleted", {
    //                 heading, fromEmail: props?.manager.email, toEmail: teammate.email, subject: subject, name: teammate.name, text: text, whatsAppNo: teammate?.whatsAppNo
    //             });
    //             if (res.status === 200) {
    //             }
    //             else {
    //                 alert("Something went wrong");
    //             }
    //         } catch (err) {
    //             alert("error")
    //             console.log(err)
    //         }
    //     }

    const handleCompleteTask = async (id) => {
        taskMarkedCompleted(id)
    }
    const handleDeleteTask = async (id) => {
        taskArchived(id)
    }
    const timeStampFormatChange = (stamp) => {
        if (stamp === '--') {
            return "--"
        }
        const timestamp = new Date(stamp.seconds * 1000);
        let dateOnly = timestamp.toLocaleDateString('default', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
        let timeOnly = timestamp.toLocaleTimeString('default', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })

        return (
            <>
                {dateOnly}
                <br />
                {timeOnly}
            </>
        )
    }
    // const dragStart = (e, index) => {
    //     dragItem.current = index;

    // }
    // const dragEnter = (e, index) => {
    //     dragOverItem.current = index;
    // }

    // const drop = (e, list, id) => {
    //     let copyList = [...list];
    //     const dragItemContent = copyList[dragItem.current];
    //     copyList.splice(dragItem.current, 1);
    //     copyList.splice(dragOverItem.current, 0, dragItemContent);
    //     dragItem.current = null;
    //     dragOverItem.current = null;
    //     update(ref(db, `/manager/${props?.managerId}/teammates/${id}/data/`), {
    //         tasks: copyList,
    //     })
    // }



    return (<>
        <div className="overflow-set-auto table-height1">
            <Row className="table-height1">
                <Col>
                    <Table
                        stickyHeader
                        style={{
                            borderCollapse: 'separate',
                            borderSpacing: '0 10px',
                            paddingLeft: "10px",
                        }}>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    style={{
                                        fontFamily: 'rockwen',
                                        width: "180px"
                                    }}
                                    align="center"
                                >
                                    Client
                                </TableCell>
                                <TableCell
                                    style={{
                                        fontFamily: 'rockwen',
                                        width: "150px"
                                    }}
                                    align="center"
                                >
                                    Task
                                </TableCell>
                                <TableCell
                                    style={{
                                        fontFamily: 'rockwen',
                                        width: "130px"
                                    }}
                                    align="center"
                                >
                                    Assigned
                                </TableCell>
                                <TableCell
                                    style={{
                                        fontFamily: 'rockwen',
                                        width: "130px"
                                    }}
                                    align="center"
                                >
                                    Deadline
                                </TableCell>
                                <TableCell
                                    style={{
                                        fontFamily: 'rockwen',
                                        width: "100px"
                                    }}
                                    align="center"
                                >
                                    Completed
                                </TableCell>
                                <TableCell
                                    style={{
                                        fontFamily: 'rockwen',
                                        width: "100px"
                                    }}
                                    align="center"
                                >
                                    Corrections
                                </TableCell>
                                <TableCell
                                    style={{
                                        fontFamily: 'rockwen',
                                        width: "120px"
                                    }}
                                    align="center"
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    style={{
                                        fontFamily: 'rockwen',
                                        width: "60px"
                                    }}
                                    align="center"></TableCell>
                            </TableRow>
                        </TableHead>
            <TableBody className="curve-box-homelist" >
                            {tasks === [] ?
                                (<TableRow>
                                        <TableCell colSpan={8} align="center" > No tasks assigned</TableCell>
                                </TableRow>)
                                : (tasks.filter((info) => { return (selected === info.data.teammateId) }).filter((info) => {
                                    return (filter !== "All" ?
                                        info.data.status === filter.split(" ").join("_").toUpperCase()
                                        : info.data.status !== filter)
                                }).map((info) => {
                                        return (
                                            <TableRow
                                                key={info.id}
                                                style={{
                                                        backgroundColor:
                                                        info.data.status !== 'DONE'
                                                                ? '#fff'
                                                                : '#f1f4fb',
                                                        borderRadius: "15px",
                                                        marginLeft: "5px",
                                                        marginRight: "5px",
                                                        boxShadow: "0px 1px 18px #0000001A",
                                                    }}
                                                draggable
                                                // onDragStart={(e) => {
                                                //     dragStart(e, info.id)
                                                // }}
                                                // onDragEnter={(e) => {
                                                //     dragEnter(e, info.id)
                                                // }}
                                                // onDragEnd={(e) => {
                                                //     drop(e, info.data, info?.data.teammateId)
                                                // }}

                                            >
                                                <TableCell
                                                    onClick={() => {
                                                        setModalShow(true);
                                                        setTaskSelected(info.id);
                                                    }}
                                                    style={{
                                                        fontFamily: 'rockwen',

                                                    }}
                                                    align="center"
                                                    title={info.data.clientName}
                                                >
                                                    {info.data.clientName.length > 15 ? info.data.clientName.slice(0, 12) + "..." : info.data.clientName}
                                                </TableCell>
                                                <TableCell
                                                    onClick={() => {
                                                        setModalShow(true);
                                                        setTaskSelected(info.id);
                                                    }}
                                                    style={{
                                                        fontFamily: 'rockwen'
                                                    }}
                                                    align="center"
                                                    title={info.data.title}
                                                >{info?.data.title?.length < 14 ? info.data.title : info?.data.title?.slice(0, 11) + "..."}
                                                    {info.query ?
                                                        (
                                                            <div style={{ marginLeft: ".8em" }} class="notification-dot"></div>
                                                        ) :
                                                        (
                                                            <></>
                                                        )
                                                    }
                                                </TableCell>
                                                <TableCell
                                                                    onClick={() => {
                                                                        setModalShow(true);
                                                        setTaskSelected(info.id);
                                                                    }}
                                                                    style={{
                                                                        fontFamily: 'rockwen',
                                                                        width: "120px"
                                                                    }}
                                                                    align="center"

                                                                >
                                                    {timeStampFormatChange(
                                                        info.data.assigned
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    onClick={() => {
                                                                        setModalShow(true);
                                                        setTaskSelected(info.id);
                                                                    }}
                                                                    style={{
                                                                        fontFamily: 'rockwen',
                                                                        width: "120px"
                                                                    }}
                                                                    align="center"

                                                >
                                                    {timeStampFormatChange(
                                                        info.data.deadline
                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    onClick={() => {
                                                                        setModalShow(true);
                                                        setTaskSelected(info.id);
                                                                    }}
                                                                    style={{
                                                                        fontFamily: 'rockwen',
                                                                    }}
                                                                    align="center"

                                                                >
                                                    {info.data.status === 'DONE'
                                                        ? timeStampFormatChange(
                                                            info.data.completedOn,
                                                                        )
                                                                        : '--'}
                                                                </TableCell>
                                                                <TableCell
                                                                    onClick={() => {
                                                                        setModalShow(true);
                                                        setTaskSelected(info.id);
                                                                    }}
                                                                    style={{
                                                                        fontFamily: 'rockwen',
                                                                    }}
                                                                    align="center"

                                                                >
                                                    {info.data.corrections === 0
                                                        ? info.data.corrections
                                                                        : '+' +
                                                        info.data.corrections}

                                                                </TableCell>
                                                                <TableCell
                                                                    onClick={() => {
                                                                        setModalShow(true);
                                                        setTaskSelected(info.id);
                                                                    }}
                                                                    align="center"

                                                                    style={
                                                                        info.data.status === 'DONE' ? {
                                                                            fontFamily: 'rockwen',
                                                                            color: '#000000',
                                                                            fontWeight: 'bold',
                                                                        } :
                                                                            info.data.status ===
                                                                                'ON_GOING' ? {
                                                                                        fontFamily: 'rockwen',
                                                                                        color: '#24A43A',
                                                                                        fontWeight: 'bold',
                                                                                        width: '105px'
                                                                                } :
                                                                                info.data.status === 'PAUSED' ? {
                                                                                        fontFamily: 'rockwen',
                                                                                        color: '#2972B2',
                                                                                        fontWeight: 'bold',
                                                                                    } :
                                                                                        info.data.status ===
                                                                                        'ASSIGNED' ? {
                                                                                                fontFamily: 'rockwen',
                                                                                                color: '#D1AE00',
                                                                                                fontWeight: 'bold',
                                                                                        } : {}
                                                                    }
                                                                >
                                                    {info.data.status === 'DONE' ? (
                                                                            <FontAwesomeIcon
                                                                            size="xl"
                                                                            icon="fa-solid fa-circle-check"
                                                                        />
                                                                    ) : (
                                                            info.data.status === "ASSIGNED" ? "Assigned" :
                                                                info.data.status === "ON_GOING" ? "On Going" :
                                                                    info.data.status === "PAUSED" ? "Paused" :
                                                                        info.data.status === "DONE" ? "Done" : ""
                                                                    )}
                                                </TableCell>

                                                <TableCell
                                                    align="center"
                                                    className="text-end"
                                                >
                                                    {filter === "All" ? <OverlayTrigger
                                                        trigger="click"
                                                        key="bottom"
                                                        placement="auto"
                                                        rootClose
                                                        overlay={show ?
                                                            <Popover
                                                                id={`popover-positioned-bottom`}
                                                            >
                                                                <Popover.Body>
                                                                    <Row
                                                                        className="d-grid gap-2"
                                                                        style={{
                                                                            marginBottom: '.5em',
                                                                        }}
                                                                    >
                                                                        <Button
                                                                            disabled={info.data.status !== 'DONE' ? true : false}
                                                                            onClick={() => {
                                                                                handleCompleteTask(
                                                                                    info.id
                                                                                );
                                                                                setShow(false);
                                                                            }}
                                                                            variant="light"
                                                                            style={{
                                                                                textAlign: 'left',
                                                                            }}
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon="fa-solid fa-circle-check"
                                                                                style={{
                                                                                    paddingRight:
                                                                                        ".5em",
                                                                                    color: "blue",
                                                                                }}
                                                                            />
                                                                            Mark Completed
                                                                        </Button>
                                                                    </Row>
                                                                    <Row
                                                                        className="d-grid gap-2"
                                                                        style={{
                                                                            marginBottom: '.5em',
                                                                        }}
                                                                    >  <Button
                                                                        variant="light"
                                                                        style={{
                                                                            textAlign: 'left',
                                                                        }}
                                                                        onClick={(e) => {
                                                                            // setPrevTeammateId(info.teammateId);
                                                                            // setPrevTeammateIndex(info.teammateIndex);
                                                                            // setPrevTaskIndex(index);
                                                                            // setSwitchTask(info);
                                                                            setShow(false);
                                                                        }}
                                                                    >
                                                                            <FontAwesomeIcon
                                                                                icon="fa-solid fa-shuffle"
                                                                                style={{
                                                                                    paddingRight:
                                                                                        '.5em',
                                                                                    color: "blue",
                                                                                }}
                                                                            />
                                                                            Switch Task To..
                                                                        </Button>
                                                                    </Row>
                                                                    <Row
                                                                        className="d-grid gap-2"
                                                                        style={{
                                                                            marginBottom: '.5em',
                                                                        }}
                                                                    >
                                                                        <Button
                                                                            onClick={() => {
                                                                                handleDeleteTask(
                                                                                    info.id
                                                                                );
                                                                                setShow(false);
                                                                            }}
                                                                            variant="light"
                                                                            style={{
                                                                                textAlign: 'left',
                                                                            }}
                                                                            block
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon="fa-solid fa-trash"
                                                                                style={{
                                                                                    paddingRight:
                                                                                        '.5em',
                                                                                    color: "blue",
                                                                                }}
                                                                            />
                                                                            Delete Task
                                                                        </Button>
                                                                    </Row>
                                                                </Popover.Body>
                                                            </Popover> : <></>
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            className="pointer"
                                                            size='xl'
                                                            color='#3975ea'
                                                            icon="fa-solid fa-ellipsis-vertical"
                                                            onClick={() => { setShow(true) }}
                                                        />
                                                    </OverlayTrigger> : <></>}
                                                </TableCell>
                                                {taskSelected !== null && (
                                                    <TaskHistory
                                                        show={modalShow}
                                                        onHide={() => { setModalShow(false); setTaskSelected(null); }}
                                                        teamtasks={tasks}
                                                        id={taskSelected}
                                                        name={props.name}
                                                        teammateId={selected}
                                                        managerId={props.managerId}
                                                        designation={props.designation}
                                                    />
                                                )
                                                }
                                        </TableRow>
                                    )
                                })



                                )
                            }



                            {/* {switchTask &&
                                    <SwitchTask
                                    show={true}
                                    setswitchtask={setSwitchTask}
                                    prevtasklist={info.data}
                                    props={props}
                                    manager={props?.manager}
                                    managerid={props?.managerId}
                                    switchtask={switchTask}
                                    handledeletetask={handleDeleteSwitchTask}
                                    prevteammateindex={prevTeammateIndex}
                                    prevteammateid={prevTeammateId}
                                    prevtaskindex={prevTaskIndex}
                                    />}  */}

                        </TableBody>
                    </Table>
                </Col>
            </Row>
        </div>
    </>
    )
}
