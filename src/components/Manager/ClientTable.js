import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Col, Row } from 'react-bootstrap'
export default function ClientTable(props) {
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
                                        width: "100px"
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
                                        width: "100px"
                                    }}
                                    align="center"
                                >
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="curve-box-homelist">
                            {props?.team
                                .map((info) => {
                                    return (
                                        <>{info?.data?.tasks?.filter((info1) => { return info1.client === props?.clientSelected })
                                            .filter((info1) => {
                                                return props?.filter !== "All" ?
                                                info1.updates[
                                                    0
                                                ].status === props?.filter
                                                : info1.updates[
                                                    0
                                                    ].status !== props?.filter && info1.updates[
                                                        0
                                                    ].status !== "Completed"
                                            })
                                            .map((info1, index) => {
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
                                                        boxShadow: "0px 3px 12px #0000001D",
                                                        borderRadius: "15px"
                                                    }}
                                                >
                                                    <TableCell
                                                        style={{
                                                            fontFamily: 'rockwen',
                                                            width: "130px"
                                                        }}
                                                        align="center"

                                                    >
                                                        {info.data.name}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            fontFamily: 'rockwen',
                                                            width: "200px"
                                                        }}
                                                        align="center"
                                                        title={info1.task}
                                                    >
                                                        {info1.task.length < 16 ? info1.task : info1.task.slice(0, 13) + "..."}
                                                    </TableCell>
                                                    {info1.updates
                                                        .sort((a, b) =>
                                                            a.corrections > b.corrections
                                                                ? -1
                                                                : 1,
                                                        )
                                                        .filter(
                                                            (info2, index1) => index1 === 0,
                                                        )
                                                        .map((info2) => {
                                                            return (
                                                                <>
                                                                    <TableCell
                                                                        style={{
                                                                            fontFamily: 'rockwen',
                                                                            width: "130px"
                                                                        }}
                                                                        align="center"

                                                                    >
                                                                        {props?.dateFormatChange(
                                                                            info2.assignedDate,
                                                                        )}
                                                                        <br />
                                                                        {props?.timeFormatChange(
                                                                            info2.assignedTime,
                                                                        )}
                                                                    </TableCell>
                                                                    <TableCell
                                                                        style={{
                                                                            fontFamily: 'rockwen',
                                                                            width: "130px"
                                                                        }}
                                                                        align="center"

                                                                    >
                                                                        {props?.dateFormatChange(
                                                                            info2.deadlineDate,
                                                                        )}
                                                                        <br />
                                                                        {props?.timeFormatChange(
                                                                            info2.deadlineTime,
                                                                        )}
                                                                    </TableCell>
                                                                    <TableCell
                                                                        style={{
                                                                            fontFamily: 'rockwen',
                                                                            width: "130px"
                                                                        }}
                                                                        align="center"

                                                                    >
                                                                        {info2.status === 'Done' || info2.status === 'Completed'
                                                                            ? props?.dateFormatChange(
                                                                                info2.endDate,
                                                                            )
                                                                            : '--'}
                                                                        <br />
                                                                        {info2.status === 'Done' || info2.status === 'Completed'
                                                                            ? props?.timeFormatChange(
                                                                                info2.endTime,
                                                                            )
                                                                            : '--'}
                                                                    </TableCell>
                                                                    <TableCell
                                                                        style={{
                                                                            fontFamily: 'rockwen',
                                                                            width: "100px"
                                                                        }}
                                                                        align="center"

                                                                    >
                                                                        {info2.corrections === '0'
                                                                            ? info2.corrections
                                                                            : '+' +
                                                                            info2.corrections}
                                                                    </TableCell>
                                                                    <TableCell
                                                                        align="center"

                                                                        style={
                                                                            (info2.status === 'Done' && {
                                                                                fontFamily: 'rockwen',
                                                                                color: '#000000',
                                                                                fontWeight: 'bold',
                                                                                width: "150px"
                                                                            }) ||
                                                                            (info2.status ===
                                                                                'Completed' && {
                                                                                fontFamily: 'rockwen',
                                                                                color: '#000000',
                                                                                fontWeight: 'bold',
                                                                                width: "150px"
                                                                            }) ||
                                                                            (info2.status ===
                                                                                'On Going' && {
                                                                                fontFamily: 'rockwen',
                                                                                color: '#24A43A',
                                                                                fontWeight: 'bold',
                                                                                width: "150px"
                                                                            }) ||
                                                                            (info2.status === 'Paused' && {
                                                                                fontFamily: 'rockwen',
                                                                                color: '#2972B2',
                                                                                fontWeight: 'bold',
                                                                                width: "150px"
                                                                            }) ||
                                                                            (info2.status ===
                                                                                'Assigned' && {
                                                                                fontFamily: 'rockwen',
                                                                                color: '#D1AE00',
                                                                                fontWeight: 'bold',
                                                                                width: "150px"
                                                                            })
                                                                        }
                                                                    >
                                                                        {info2.status === 'Done' ? (
                                                                            <FontAwesomeIcon
                                                                                size="xl"
                                                                                icon="fa-solid fa-circle-check"
                                                                            />
                                                                        ) : (
                                                                            info2.status
                                                                        )}
                                                                    </TableCell>
                                                                </>
                                                            )
                                                        })}
                                                </TableRow>
                                            )
                                        })
                                        }
                                        </>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </Col>
            </Row>
        </div>
    </>
    )
}

