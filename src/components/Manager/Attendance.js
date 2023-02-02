import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Button, Col, Modal, Row, Table } from 'react-bootstrap'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { onValue, ref } from 'firebase/database';
import { auth, db } from '../../firebase-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { notApprovedTeammate } from '../../database/read/managerReadFunction';
import { approveTeammateAttendance } from '../../database/write/managerWriteFunctions';
const localizer = momentLocalizer(moment);

function ShowApprovalList(props) {
    function approveAttendence(managerId, teammateId) {
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
                        Attendance Approval Sheet
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body> {props?.attendanceNotApproved !== [] ?
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>{console.log(props?.attendanceNotApproved)}
                        <TableBody>
                            {props?.attendanceNotApproved?.map((info, index) => {
                                return (
                                    <TableRow key={info.id}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {info.data.teammateName}
                                        </TableCell>
                                        <TableCell >
                                            <FontAwesomeIcon
                                                onClick={() => { approveAttendence(info.data.managerId, info.data.teammateId) }}
                                                className="pointer"
                                                size="2xl"
                                                color='green'
                                                icon="fa-solid fa-circle-check"
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            }
                        </TableBody>
                    </Table> : <TableCell>Not Available</TableCell>}
                </Modal.Body>
            </Modal>
        </div >
    )
}
function ShowModal(props) {
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
                        Attendance Sheet
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props?.attendance !== null ?
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'></TableCell>
                                <TableCell>Name</TableCell>
                            </TableRow>
                        </TableHead>
                            <TableBody> 
                                {props?.attendance
                                    .map((info, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell align='center'>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {info.name}
                                                </TableCell>
                                            </TableRow>)
                                    })}
                            </TableBody>
                        </Table> : <div style={{ align: "center" }}>Not Available</div>}
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default function Attendance(props) {
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [attendance, setAttendance] = useState({})
    const [attendanceNotApproved, setAttendanceNotApproved] = useState([])
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

    const onSelectEventSlotHandler = (slotInfo) => {
        let today = new Date(slotInfo.start)
        let day = String(today.getDate()).padStart(2, '0') +
            '-' +
            String(today.getMonth() + 1).padStart(2, '0') +
            '-' +
            today.getFullYear()
        onValue(ref(db, `manager/${props?.managerid}/attendence/${day}/`), (snapshot) => {
            let data = snapshot.val();
            setAttendance(data);
        })
        setModalShow(true);
    }
    const approveHandle = () => {
        let dat = new Date();
        let today = dat.toLocaleDateString();
        const attendanceData = notApprovedTeammate(today, props?.managerId)
        setAttendanceNotApproved(attendanceData)
        setModalShow2(true);
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
                    <Row><Col className='text-end'>
                        <Button style={{ position: 'relative', width: "100px", float: "right" }}
                            onClick={() => {
                                approveHandle();
                            }}
                            variant="light">Approve</Button></Col>
                    </Row>
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
                        />{modalShow ?
                            <ShowModal
                                attendance={attendance}
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            /> : <></>}
                            {modalShow2 ?
                                <ShowApprovalList
                                    managerId={auth.currentUser.uid}
                                    attendanceNotApproved={attendanceNotApproved}
                                    show={modalShow2}
                                    onHide={() => setModalShow2(false)}
                                /> : <></>}
                        </div></Row>
                </Modal.Body>
            </Modal>
        </div>
    )
}
