import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Modal, Row, Table } from 'react-bootstrap'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { auth } from '../../firebase-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { notApprovedTeammate } from '../../database/read/managerReadFunction';
import { approveTeammateAttendance } from '../../database/write/managerWriteFunctions';
const localizer = momentLocalizer(moment);

function ShowModal(props) {
    const attendance = props?.attendance;
    function approveAttendence(managerId, teammateId, index) {
        let dat = new Date();
        let today = dat.toLocaleDateString();
        approveTeammateAttendance(today, managerId, teammateId)
    }
    return (
        <div>
            <Modal
                backdrop="static"
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Attendance Sheet ::: {props?.date}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {attendance.length !== 0 ?
                        <>APPROVED <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>S.No</TableCell>
                                    <TableCell>Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attendance.filter((info) => { return (info.data.isApproved === true) })
                                    .map((info, index) => {
                                        return (
                                            <TableRow key={info.id}>
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {info.data.teammateName}
                                                </TableCell>
                                            </TableRow>)
                                    })}
                            </TableBody>
                        </Table>
                            NOT APPROVED

                            < Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>S.No</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {attendance.filter((info) => { return (info.data.isApproved === false) })
                                        .map((info, index) => {
                                            return (
                                                    <TableRow key={info.id}>
                                                        <TableCell align='center'>
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell>
                                                            {info.data.teammateName}
                                                        </TableCell>
                                                        <TableCell >
                                                            <FontAwesomeIcon
                                                                onClick={() => { approveAttendence(info.data.managerId, info.data.teammateId, index) }}
                                                                className="pointer"
                                                                size="2xl"
                                                                color='green'
                                                                icon="fa-solid fa-circle-check"
                                                            />
                                                        </TableCell>
                                                    </TableRow>)
                                            })}
                                </TableBody>
                            </Table>
                        </>
                        : <div align="center">Not Available</div>}
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default function Attendance(props) {
    const [modalShow, setModalShow] = useState(false);
    const [attendance, setAttendance] = useState({})
    const [date, setDate] = useState()
    //DEMO EVENTS DATA
    const eventData = [
        {
            title: '3/3',
            start: new Date(2023, 0, 28, 9, 0, 0),
            end: new Date(2023, 0, 28, 9, 0, 0)
        },
        {
            title: '1/3',
            start: new Date(2023, 0, 15, 13, 0, 0),
            end: new Date(2023, 0, 15, 13, 0, 0)
        },
    ];

    const onSelectEventSlotHandler = async (slotInfo) => {
        let dat = new Date(slotInfo.start);
        let today = dat.toLocaleDateString();
        setDate(today)
        const attendanceData = await notApprovedTeammate(today, auth.currentUser.uid)
        setAttendance(attendanceData)
        setModalShow(true);
    }
    const doNothing = () => { }
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body style={{ position: 'relative' }} >
                    <Row>
                        <div className="calendar-container" style={{ position: 'relative', marginTop: "1em" }}>
                        <Calendar
                            selectable
                                events={eventData}
                            localizer={localizer}
                            views={['month']}
                            style={{ height: 450 }}
                                onSelectEvent={(slotInfo) => { moment() > slotInfo.start ? onSelectEventSlotHandler(slotInfo) : doNothing() }}
                            onSelectSlot={(slotInfo) => { moment() > slotInfo.start ? onSelectEventSlotHandler(slotInfo) : doNothing() }}
                            />
                        </div></Row>
                </Modal.Body>
            </Modal>
            {modalShow &&
                <ShowModal
                date={date}
                attendance={attendance}
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
            }
        </div>
    )
}
