import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { ref, set, update } from 'firebase/database'
import emailjs from '@emailjs/browser';
import React, { useRef, useState } from 'react'
import {
    Button,
    OverlayTrigger,
    Popover,
    Row,
} from "react-bootstrap";
import TaskHistory from './TaskHistory'
import SwitchTask from './SwitchTask';
import { db } from '../../firebase-config';

export default function TeammateTable(props) {
    const selected = props?.teammateselected
    const filter = props?.filterTeammate;
    const [taskSelected, setTaskSelected] = useState();
    const [modalShow, setModalShow] = useState(false);
    // const [teammateEmail, setTeammateEmail] = useState('');
    const [switchTask, setSwitchTask] = useState()
    const [prevTeammateId, setPrevTeammateId] = useState("");
    const [prevTeammateIndex, setPrevTeammateIndex] = useState("");
    const [prevTaskIndex, setPrevTaskIndex] = useState()
    const [dragStyle, setDragStyle] = useState("blur(0px)")


    const dragItem = useRef();
    const dragOverItem = useRef();



    const handleDeleteTask = (teammate, id, index) => {
        let list1 = teammate.tasks.slice(0, index);
        let list2 = teammate.tasks.slice(index + 1);
        let list = list1.concat(list2)

        set(ref(db, `/manager/${props?.managerId}/teammates/${id}/data/tasks`), list)
            .catch((err) => {
                console.log(err);
            });
    }
    const handleCompleteTask = (teammate, id, index, latest) => {
        const info = {
            to_name: teammate.name,
            from_name: props?.manager.name,
            message: `Your task ${teammate.tasks[index].task} from client ${teammate.tasks[index].client} has been approved by your manager ${props?.manager.name}`,
            from_email: props?.manager.email,
            to_email: teammate.email
        }

        emailjs.send("service_8babtb3", "template_3e3kpdk", info, "E1o2OcJneKcoyHqxA").then((res) => {
            alert("Email send Successfully");
            set(ref(db, `/manager/${props?.managerId}/teammates/${props?.team.teammateIndex}/data/tasks/${index}/updates/${latest}/status`), "Completed")
                .catch((err) => {
                    console.log(err);
                });
        }).catch((err) => console.log(err));

    }
    function swap(arr, from, to) {
        let temp = arr[from]
        arr[from] = arr[to]
        arr[to] = temp
    }

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
    const handleUpTask = (id, index, tasks, taskLength) => {
        if (index === 0) {
            alert('Its already on the top')
        } else {
            let newarr = tasks
            swap(newarr, index, index - 1)
            update(ref(db, `/manager/${props?.managerId}/teammates/${id}/data/`), {
                tasks: newarr,
            })
        }
    }

    const handleDownTask = (id, index, tasks, taskLength) => {
        if (index === taskLength - 1) {
            alert('Its already on the bottom')
        } else {
            let newarr = tasks
            swap(newarr, index + 1, index)
            update(ref(db, `/manager/${props?.managerId}/teammates/${id}/data/`), {
                tasks: newarr,
            })
        }
    }
    const dragStart = (e, index) => {
        dragItem.current = index;

    }
    const dragEnter = (e, index) => {
        dragOverItem.current = index;
    }

    const drop = (e, list, id) => {
        let copyList = [...list];
        const dragItemContent = copyList[dragItem.current];
        copyList.splice(dragItem.current, 1);
        copyList.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        update(ref(db, `/manager/${props?.managerId}/teammates/${id}/data/`), {
            tasks: copyList,
        })
    }



    return (
        <Table
            style={{
                borderCollapse: 'separate',
                borderSpacing: '0 10px',
            }}
        >
            <TableHead>
                <TableRow>
                    <TableCell
                        style={{
                            fontFamily: 'rockwen',
                        }}
                        align="center"
                    >
                        Client
                    </TableCell>
                    <TableCell
                        style={{
                            fontFamily: 'rockwen',
                        }}
                        align="center"
                    >
                        Task
                    </TableCell>
                    <TableCell
                        style={{
                            fontFamily: 'rockwen',
                        }}
                        align="center"
                    >
                        Assigned
                    </TableCell>
                    <TableCell
                        style={{
                            fontFamily: 'rockwen',
                        }}
                        align="center"
                    >
                        Deadline
                    </TableCell>
                    <TableCell
                        style={{
                            fontFamily: 'rockwen',
                        }}
                        align="center"
                    >
                        Completed
                    </TableCell>
                    <TableCell
                        style={{
                            fontFamily: 'rockwen',
                        }}
                        align="center"
                    >
                        Corrections
                    </TableCell>
                    <TableCell
                        style={{
                            fontFamily: 'rockwen',
                        }}
                        align="center"
                    >
                        Status
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>


            <TableBody className="curve-box-homelist" >
                {props?.team
                    .filter((info) => info.teammateId === selected)
                    .map((info) => {
                        return (
                            <>
                                {!info.data.tasks ? (
                                    <TableRow colSpan={7} align="center">
                                        No tasks assigned
                                    </TableRow>
                                ) : (
                                        info?.data?.tasks?.filter((info1) => {
                                        return filter !== "All" ?
                                            info1.updates[
                                                info1.updates.length - 1
                                            ].status === filter
                                            : info1.updates[
                                                info1.updates.length - 1
                                            ].status !== filter
                                    }).map((info1, index) => {
                                        return (
                                            <TableRow
                                                key={index}
                                                style={{
                                                    backgroundColor:
                                                        info1.updates[
                                                            info1.updates.length - 1
                                                        ].status !== 'Done' || info1.updates[
                                                            info1.updates.length - 1
                                                        ].status !== 'Completed'
                                                            ? '#fff'
                                                            : '#f1f4fb',
                                                    height: '70px',
                                                    filter: dragStyle
                                                }}
                                                className="box-shadow"
                                                draggable
                                                onDragStart={(e) => {
                                                    dragStart(e, index)
                                                }}
                                                onDragEnter={(e) => {
                                                    dragEnter(e, index)
                                                }}
                                                onDragEnd={(e) => {
                                                    drop(e, info?.data?.tasks, info?.teammateIndex)
                                                }}

                                            >
                                                <TableCell
                                                    onClick={() => {
                                                        setModalShow(true);
                                                        setTaskSelected(index);
                                                    }}
                                                    style={{
                                                        fontFamily: 'rockwen',
                                                    }}
                                                    align="center"
                                                    className="tablecell"
                                                >
                                                    {info1.client}
                                                </TableCell>
                                                <TableCell
                                                    onClick={() => {
                                                        setModalShow(true);
                                                        setTaskSelected(index);
                                                    }}
                                                    style={{
                                                        fontFamily: 'rockwen',
                                                    }}
                                                    align="center"
                                                    className="tablecell"
                                                >
                                                    {info1.task}
                                                </TableCell>
                                                {info1.updates
                                                    .sort((a, b) =>
                                                        a.corrections > b.corrections
                                                            ? 1
                                                            : -1,
                                                    )
                                                    .filter(
                                                        (info2, index) => index === 0,
                                                    )
                                                    .map((info2) => {
                                                        return (
                                                            <>
                                                                <TableCell
                                                                    onClick={() => {
                                                                        setModalShow(true);
                                                                        setTaskSelected(index);
                                                                    }}
                                                                    style={{
                                                                        fontFamily: 'rockwen',
                                                                    }}
                                                                    align="center"
                                                                    className="tablecell"
                                                                >
                                                                    {dateFormatChange(
                                                                        info1.updates[
                                                                            info1.updates.length - 1
                                                                        ].assignedDate,
                                                                    )}
                                                                    <br />
                                                                    {timeFormatChange(
                                                                        info1.updates[
                                                                            info1.updates.length - 1
                                                                        ].assignedTime,
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    onClick={() => {
                                                                        setModalShow(true);
                                                                        setTaskSelected(index);
                                                                    }}
                                                                    style={{
                                                                        fontFamily: 'rockwen',
                                                                    }}
                                                                    align="center"
                                                                    className="tablecell"
                                                                >
                                                                    {dateFormatChange(
                                                                        info1.updates[
                                                                            info1.updates.length - 1
                                                                        ].deadlineDate,
                                                                    )}
                                                                    <br />
                                                                    {timeFormatChange(
                                                                        info1.updates[
                                                                            info1.updates.length - 1
                                                                        ].deadlineTime,
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    onClick={() => {
                                                                        setModalShow(true);
                                                                        setTaskSelected(index);
                                                                    }}
                                                                    style={{
                                                                        fontFamily: 'rockwen',
                                                                    }}
                                                                    align="center"
                                                                    className="tablecell"
                                                                >
                                                                    {info1.updates[
                                                                        info1.updates.length - 1
                                                                    ].status === 'Done' || info1.updates[
                                                                        info1.updates.length - 1
                                                                    ].status === 'Completed'
                                                                        ? dateFormatChange(
                                                                            info1.updates[
                                                                                info1.updates
                                                                                    .length - 1
                                                                            ].endDate,
                                                                        )
                                                                        : ''}
                                                                    <br />
                                                                    {info1.updates[
                                                                        info1.updates.length - 1
                                                                    ].status === 'Done' || info1.updates[
                                                                        info1.updates.length - 1
                                                                    ].status === 'Completed'
                                                                        ? timeFormatChange(
                                                                            info1.updates[
                                                                                info1.updates
                                                                                    .length - 1
                                                                            ].endTime,
                                                                        )
                                                                        : ''}
                                                                </TableCell>
                                                                <TableCell
                                                                    onClick={() => {
                                                                        setModalShow(true);
                                                                        setTaskSelected(index);
                                                                    }}
                                                                    style={{
                                                                        fontFamily: 'rockwen',
                                                                    }}
                                                                    align="center"
                                                                    className="tablecell"
                                                                >
                                                                    {info1.updates[
                                                                        info1.updates.length - 1
                                                                    ].corrections === '0'
                                                                        ? info1.updates[
                                                                            info1.updates.length -
                                                                            1
                                                                        ].corrections
                                                                        : '+' +
                                                                        info1.updates[
                                                                            info1.updates.length -
                                                                            1
                                                                        ].corrections}
                                                                </TableCell>
                                                                <TableCell
                                                                    onClick={() => {
                                                                        setModalShow(true);
                                                                        setTaskSelected(index);
                                                                    }}
                                                                    align="center"
                                                                    className="tablecell"
                                                                    style={
                                                                        (info1.updates[
                                                                            info1.updates.length - 1
                                                                        ].status === 'Done' && {
                                                                            fontFamily: 'rockwen',
                                                                            color: '#000000',
                                                                            fontWeight: 'bold',
                                                                        }) ||
                                                                        (info1.updates[
                                                                            info1.updates.length - 1
                                                                        ].status ===
                                                                            'Completed' && {
                                                                            fontFamily: 'rockwen',
                                                                            color: '#000000',
                                                                            fontWeight: 'bold',
                                                                        }) ||
                                                                        (info1.updates[
                                                                            info1.updates.length - 1
                                                                        ].status ===
                                                                            'On Going' && {
                                                                            fontFamily: 'rockwen',
                                                                            color: '#24A43A',
                                                                            fontWeight: 'bold',
                                                                        }) ||
                                                                        (info1.updates[
                                                                            info1.updates.length - 1
                                                                        ].status === 'Paused' && {
                                                                            fontFamily: 'rockwen',
                                                                            color: '#2972B2',
                                                                            fontWeight: 'bold',
                                                                        }) ||
                                                                        (info1.updates[
                                                                            info1.updates.length - 1
                                                                        ].status ===
                                                                            'Assigned' && {
                                                                            fontFamily: 'rockwen',
                                                                            color: '#D1AE00',
                                                                            fontWeight: 'bold',
                                                                        })
                                                                    }
                                                                >
                                                                    {info1.updates[
                                                                        info1.updates.length - 1
                                                                    ].status === 'Done' ? (
                                                                        <FontAwesomeIcon
                                                                            // onClick={() => {  }}
                                                                            className="pointer"
                                                                            size="xl"
                                                                            icon="fa-solid fa-circle-check"
                                                                        />
                                                                    ) : (
                                                                        info1.updates[
                                                                            info1.updates.length - 1
                                                                        ].status
                                                                    )}
                                                                </TableCell>
                                                            </>
                                                        )
                                                    })}
                                                <TableCell
                                                    align="center"
                                                    className="text-end tablecell"
                                                >
                                                    {filter === "All" ? <OverlayTrigger
                                                        trigger="click"
                                                        key="bottom"
                                                        placement="auto"
                                                        rootClose
                                                        overlay={
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
                                                                            disabled={info1.updates[
                                                                                info1.updates.length - 1
                                                                            ].status !== 'Done' ? true : false}
                                                                            onClick={() => {
                                                                                handleCompleteTask(
                                                                                    info.data,
                                                                                    info.teammate,
                                                                                    index, info1.updates.length - 1
                                                                                )
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
                                                                    >
                                                                        <Button
                                                                            onClick={() => {
                                                                                handleUpTask(
                                                                                    info.teammateIndex,
                                                                                    index,
                                                                                    info.data.tasks,
                                                                                    info.data.tasks
                                                                                        .length,
                                                                                )
                                                                            }}
                                                                            variant="light"
                                                                            style={{
                                                                                textAlign: 'left',

                                                                            }}
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon="fa-solid fa-chevron-up"
                                                                                style={{
                                                                                    paddingRight:
                                                                                        ".5em",
                                                                                    color: "blue",
                                                                                }}
                                                                            />
                                                                            Move Up
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
                                                                                handleDownTask(
                                                                                    info.teammateIndex,
                                                                                    index,
                                                                                    info.data.tasks,
                                                                                    info.data.tasks
                                                                                        .length,
                                                                                )
                                                                            }}
                                                                            variant="light"
                                                                            style={{
                                                                                textAlign: 'left',
                                                                            }}
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon="fa-solid fa-chevron-down"
                                                                                style={{
                                                                                    paddingRight:
                                                                                        ".5em",
                                                                                    color: "blue",
                                                                                }}
                                                                            />
                                                                            Move Down
                                                                        </Button>
                                                                    </Row>
                                                                    <Row
                                                                        className="d-grid gap-2"
                                                                        style={{
                                                                            marginBottom: '.5em',
                                                                        }}
                                                                    >  <Button
                                                                            disabled={info1.updates[
                                                                                info1.updates.length - 1
                                                                            ].status === 'Completed' ? true : false}
                                                                        variant="light"
                                                                        style={{
                                                                            textAlign: 'left',
                                                                        }}
                                                                        onClick={(e) => {
                                                                            setPrevTeammateId(info.teammateId)
                                                                            setPrevTeammateIndex(info.teammateIndex)
                                                                            setPrevTaskIndex(index)
                                                                            setSwitchTask(info1)

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
                                                                                    info.data,
                                                                                    info.teammateIndex,
                                                                                    index,
                                                                                )
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
                                                            </Popover>
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            className="pointer"
                                                            icon="fa-solid fa-ellipsis-vertical"
                                                        />
                                                    </OverlayTrigger> : <></>}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                )}


                                {info.data.tasks && taskSelected !== null ? (
                                    <TaskHistory
                                        show={modalShow}
                                        id={info.teammateId}
                                        onHide={() => { setModalShow(false); setTaskSelected(null); }}
                                        indexselected={taskSelected}
                                        teamtasks={info.data.tasks}
                                        name={info.data.name}
                                        managerId={props?.managerId}
                                        teammateIndex={info.teammateIndex}
                                        designation={info.data.designation}
                                    />
                                ) : (
                                    <></>
                                )}
                                {switchTask &&
                                    <SwitchTask
                                    setSwitchTask={setSwitchTask}
                                    prevTaskList={info.data}
                                    props={props}
                                        switchTask={switchTask}
                                    handleDeleteTask={handleDeleteTask}
                                    prevTeammateIndex={prevTeammateIndex}
                                    prevTeammateId={prevTeammateId}
                                        prevTaskIndex={prevTaskIndex}
                                    />}
                            </>
                        )
                    })}
            </TableBody>
        </Table>
    )
}
