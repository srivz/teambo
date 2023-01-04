import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
export default function ClientTable(props) {
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
                        Teammate
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


            <TableBody className="curve-box-homelist">
                {props?.allTasks
                    .map((info) => {
                        return (
                            <>
                                {
                                    info?.tasks?.filter((info1) => {
                                        return props?.filter !== "All" ?
                                            info1.updates[
                                                info1.updates.length - 1
                                            ].status === props?.filter
                                            : info1.updates[
                                                info1.updates.length - 1
                                            ].status !== props?.filter
                                    }).filter((info1) => {
                                        return info1.client === props?.clientSelected
                                    })
                                        ?.map((info1, index) => {
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
                                                        {info.teammate}
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
                                                                        style={{
                                                                            fontFamily: 'rockwen',
                                                                        }}
                                                                        align="center"
                                                                        className="tablecell"
                                                                    >
                                                                        {props?.dateFormatChange(
                                                                            info1.updates[
                                                                                info1.updates.length - 1
                                                                            ].assignedDate,
                                                                        )}
                                                                        <br />
                                                                        {props?.timeFormatChange(
                                                                            info1.updates[
                                                                                info1.updates.length - 1
                                                                            ].assignedTime,
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
                                                                            info1.updates[
                                                                                info1.updates.length - 1
                                                                            ].deadlineDate,
                                                                        )}
                                                                        <br />
                                                                        {props?.timeFormatChange(
                                                                            info1.updates[
                                                                                info1.updates.length - 1
                                                                            ].deadlineTime,
                                                                        )}
                                                                    </TableCell>
                                                                    <TableCell
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
                                                                            ? props?.dateFormatChange(
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
                                                                            ? props?.timeFormatChange(
                                                                                info1.updates[
                                                                                    info1.updates
                                                                                        .length - 1
                                                                                ].endTime,
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

