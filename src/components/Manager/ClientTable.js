import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'
export default function ClientTable(props) {

    return (
        <Table
            style={{
                userSelect: "none",
                borderCollapse: 'separate',
                borderSpacing: '0 10px',
            }}
        >
            <TableBody className="curve-box-homelist">
                {props?.team
                    .map((info) => {
                        return (
                            <>{info?.data?.tasks?.filter((info1) => { return info1.client === props?.clientSelected }).filter((info1) => {
                                return props?.filter !== "All" ?
                                    info1.updates[
                                        0
                                    ].status === props?.filter
                                    : info1.updates[
                                        0
                                    ].status !== props?.filter
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
                                        }}
                                        className="box-shadow"
                                    >
                                        <TableCell
                                            style={{
                                                fontFamily: 'rockwen',
                                            }}
                                            align="center"
                                            className="tablecell"
                                        >
                                            {info.data.name}
                                        </TableCell>
                                        <TableCell
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
                                                            }}
                                                            align="center"
                                                            className="tablecell"
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
                                                            }}
                                                            align="center"
                                                            className="tablecell"
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
                                                            }}
                                                            align="center"
                                                            className="tablecell"
                                                        >
                                                            {info2.status === 'Done' || info2.status === 'Completed'
                                                                ? props?.dateFormatChange(
                                                                    info2.endDate,
                                                                )
                                                                : ''}
                                                            <br />
                                                            {info2.status === 'Done' || info2.status === 'Completed'
                                                                ? props?.timeFormatChange(
                                                                    info2.endTime,
                                                                )
                                                                : ''}
                                                        </TableCell>
                                                        <TableCell
                                                            style={{
                                                                fontFamily: 'rockwen',
                                                            }}
                                                            align="center"
                                                            className="tablecell"
                                                        >
                                                            {info2.corrections === '0'
                                                                ? info2.corrections
                                                                : '+' +
                                                                info2.corrections}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            className="tablecell"
                                                            style={
                                                                (info2.status === 'Done' && {
                                                                    fontFamily: 'rockwen',
                                                                    color: '#000000',
                                                                    fontWeight: 'bold',
                                                                }) ||
                                                                (info2.status ===
                                                                    'Completed' && {
                                                                    fontFamily: 'rockwen',
                                                                    color: '#000000',
                                                                    fontWeight: 'bold',
                                                                }) ||
                                                                (info2.status ===
                                                                    'On Going' && {
                                                                    fontFamily: 'rockwen',
                                                                    color: '#24A43A',
                                                                    fontWeight: 'bold',
                                                                }) ||
                                                                (info2.status === 'Paused' && {
                                                                    fontFamily: 'rockwen',
                                                                    color: '#2972B2',
                                                                    fontWeight: 'bold',
                                                                }) ||
                                                                (info2.status ===
                                                                    'Assigned' && {
                                                                    fontFamily: 'rockwen',
                                                                    color: '#D1AE00',
                                                                    fontWeight: 'bold',
                                                                })
                                                            }
                                                        >
                                                            {info2.status === 'Done' ? (
                                                                <FontAwesomeIcon
                                                                    className="pointer"
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
    )
}

