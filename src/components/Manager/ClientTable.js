import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Col, Row } from 'react-bootstrap'
export default function ClientTable(props) {
    const selected = props?.clientSelected
    const filter = props?.filter
    const tasks = props?.task
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

        return dateOnly + "\n" + timeOnly
    }
    return (<>
        <div className="overflow-set-auto table-height1">
            <Row className="table-height1">
                <Col>
                    <Table
                        stickyHeader
                        style={{
                            userSelect: "none",
                            borderCollapse: 'separate',
                            borderSpacing: '0 10px',
                            paddingLeft: "10px",
                        }}>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    style={{
                                        fontFamily: 'rockwen',
                                        width: "150px"
                                    }}
                                    align="center"
                                >
                                    Teammate
                                </TableCell>
                                <TableCell
                                    style={{
                                        fontFamily: 'rockwen',
                                        width: "180px"
                                    }}
                                    align="center"
                                >
                                    Task
                                </TableCell>
                                <TableCell
                                    style={{
                                        fontFamily: 'rockwen',
                                        width: "100px"
                                    }}
                                    align="center"
                                >
                                    Start Time
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
                                        width: "100px"
                                    }}
                                    align="center"
                                >
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="curve-box-homelist">
                            {tasks === [] ?
                                (<TableRow>
                                    <TableCell colSpan={8} align="center" > No tasks assigned</TableCell>
                                </TableRow>)
                                : (tasks.filter((info) => {
                                    return (selected === info.data.clientId)
                                }).filter((info) => {
                                    return (filter !== "All" ?
                                        info.data.status === filter.split(" ").join("_").toUpperCase()
                                        : info.data.status !== filter)
                                }).map((info) => {
                                    return (
                                        <TableRow
                                            key={info.id}
                                            style={{
                                                backgroundColor:
                                                    info.data.status !== 'Done'
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
                                                style={{
                                                    fontFamily: 'rockwen',

                                                }}
                                                align="center"
                                                title={info.data.teammateName}
                                            >
                                                {info.data.teammateName.length > 15 ? info.data.teammateName.slice(0, 12) + "..." : info.data.teammateName}
                                            </TableCell>
                                            <TableCell
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
                                                style={{
                                                    fontFamily: 'rockwen',
                                                }}
                                                align="center"

                                            >
                                                {info.data.status === 'Done'
                                                    ? timeStampFormatChange(
                                                        info.data.completedOn,
                                                    )
                                                    : '--'}
                                            </TableCell>
                                            <TableCell
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
                                        </TableRow>
                                    )
                                })
                                )
                            }
                        </TableBody>
                    </Table>
                </Col>
            </Row>
        </div>
    </>
    )
}

