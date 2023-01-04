import React, {
    // useState
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
// import TaskHistory from './TaskHistory';
export default function ClientTable(props) {
    // const [modalShow, setModalShow] = useState(false);
    // const [taskSelected, setTaskSelected] = useState();

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
                            <>{info?.tasks?.filter((info1) => { return info1.client === props?.clientSelected }).filter((info1) => {
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
                                            onClick={() => {
                                                // setModalShow(true);
                                                // setTaskSelected(index);
                                            }}
                                            style={{
                                                fontFamily: 'rockwen',
                                            }}
                                            align="center"
                                            className="tablecell"
                                        >
                                            {index} {info.teammate}
                                        </TableCell>
                                        <TableCell
                                            onClick={() => {
                                                // setModalShow(true);
                                                // setTaskSelected(index);
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
                                                            onClick={() => {
                                                                // setModalShow(true);
                                                                // setTaskSelected(index);
                                                            }}
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
                                                            onClick={() => {
                                                                // setModalShow(true);
                                                                // setTaskSelected(index);
                                                            }}
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
                                                            onClick={() => {
                                                                // setModalShow(true);
                                                                // setTaskSelected(index);
                                                            }}
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
                                                            onClick={() => {
                                                                // setModalShow(true);
                                                                // setTaskSelected(index);
                                                            }}
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
                                                            onClick={() => {
                                                                // setModalShow(true);
                                                                // setTaskSelected(index);
                                                            }}
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
                                                                    // onClick={() => {  }}
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
                                {/* {info?.tasks && taskSelected !== null ? (
                                    <TaskHistory
                                        show={modalShow}
                                        id={info?.teammateEmail}
                                        onHide={() => { setModalShow(false); setTaskSelected(null); }}
                                        indexselected={taskSelected}
                                        teamtasks={info?.tasks}
                                        name={info?.teammate}
                                        designation={info?.teammateDesignation}
                                    />
                                ) : (
                                    <></>
                                )} */}
                            </>
                        )
                    })}
            </TableBody>
        </Table>
    )
}

